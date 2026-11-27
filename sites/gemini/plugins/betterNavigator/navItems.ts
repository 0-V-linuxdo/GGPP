/** Task-mode / computer-use chrome that should not appear in BetterNavigator. */

export type NavRole = "user" | "model";

export type NavEl = {
  closest?: (selector: string) => unknown;
  parentElement?: unknown;
  parentNode?: unknown;
  tagName?: string;
  localName?: string;
  querySelector?: (selector: string) => unknown;
};

export interface MessageLike {
  role: NavRole;
  text: string;
  el?: NavEl | null;
}

const CHROME_LABELS = [
  "allow for this chat",
  "always allow",
  "allow once",
  "keep going",
  "finished thinking",
  "waiting for your input",
  "allow",
  "cancel",
  "continue",
  "copy",
  "share",
  "retry",
  "edit",
  "more",
  "thinking",
  "analyzing",
  "searching",
  "writing",
  "允许本次对话",
  "允许本次聊天",
  "始终允许",
  "允许一次",
  "允许",
  "取消",
  "继续",
  "允許本次對話",
  "始終允許",
  "允許一次",
  "允許",
  "繼續",
  "思考完成",
  "思考中",
  "等待你的输入",
  "等待您的输入",
  "等待你的輸入",
  "等待您的輸入",
].sort((a, b) => b.length - a.length);

const LONG_CHROME: RegExp[] = [
  /^writing[.\u2026\u22EF]+/i,
  /^run\s+[\w./:-]+\s*\?/i,
  /^allow gemini to\s+run\s+[\w./:-]+(?:\s+on your machine)?\s*\??/i,
  /^waiting for your input\.?/i,
  /^允许\s*gemini[^?？]*[?？]/i,
  /^允許\s*gemini[^?？]*[?？]/i,
  /^(?:等待你的输入|等待您的输入|等待你的輸入|等待您的輸入)/,
];

const ELLIPSIS = /^[.\u2026\u22EF]+/;
const JSON_CRUMB = /^(?:\{\s*\}|\[\s*\]|\{\s*\.\.\.\s*\})$/;

export function collapseNavText(text: string): string {
  return String(text ?? "").replace(/\s+/g, " ").trim();
}

export function isWritingPlaceholder(text: string): boolean {
  const s = collapseNavText(text);
  if (!s) return true;
  if (ELLIPSIS.test(s) && (s.length === ELLIPSIS.exec(s)![0].length || /^[.\u2026\u22EF]+$/.test(s))) return true;
  return /^writing[.\u2026\u22EF]*$/i.test(s);
}

function matchListed(s: string): number {
  const lower = s.toLowerCase();
  for (const phrase of CHROME_LABELS) {
    if (!lower.startsWith(phrase) && !s.startsWith(phrase)) continue;
    const rest = s.slice(phrase.length);
    if (rest && !/^[\s.。!！?？]/.test(rest)) continue;
    return phrase.length + (rest.match(/^[.。!！?？]+/)?.[0].length ?? 0);
  }
  return 0;
}

function matchListedFromEnd(s: string): number {
  const lower = s.toLowerCase();
  for (const phrase of CHROME_LABELS) {
    if (!lower.endsWith(phrase) && !s.endsWith(phrase)) continue;
    const before = s.slice(0, s.length - phrase.length);
    if (before && !/[\s.。!！?？]$/.test(before)) continue;
    return phrase.length + (before.match(/[.。!！?？]+$/)?.[0].length ?? 0);
  }
  return 0;
}

function matchLong(s: string): number {
  const ellipsis = ELLIPSIS.exec(s);
  if (ellipsis && (s.length === ellipsis[0].length || /^[.\u2026\u22EF]+(?:\s|$)/.test(s))) return ellipsis[0].length;
  for (const re of LONG_CHROME) {
    const m = re.exec(s);
    if (m && m.index === 0) return m[0].length;
  }
  return 0;
}

function consumeChromeFromStart(text: string, buttonsAlways: boolean): string {
  let s = collapseNavText(text);
  let sawLong = false;
  while (s) {
    const long = matchLong(s);
    if (long) {
      s = collapseNavText(s.slice(long));
      sawLong = true;
      continue;
    }
    if (buttonsAlways || sawLong) {
      const listed = matchListed(s);
      if (listed) {
        s = collapseNavText(s.slice(listed));
        continue;
      }
    }
    break;
  }
  return s;
}

function consumeTrailingButtons(text: string): string {
  let s = collapseNavText(text);
  while (s) {
    const listed = matchListedFromEnd(s);
    if (!listed) break;
    s = collapseNavText(s.slice(0, s.length - listed));
  }
  return s;
}

function isPermissionPayload(s: string): boolean {
  const t = collapseNavText(s);
  if (!t) return true;
  if (JSON_CRUMB.test(t)) return true;
  if (/^\{[\s\S]{0,400}\}$/.test(t) && !/[A-Za-z\u4e00-\u9fff]{4,}\s+[A-Za-z\u4e00-\u9fff]{4,}/.test(t)) return true;
  return false;
}

/** True for empty status, permission cards, continue/allow chips, and action-only labels. */
export function isChromeNavText(_role: NavRole, text: string): boolean {
  const start = consumeChromeFromStart(text, true);
  if (!start) return true;
  const stripped = consumeTrailingButtons(start);
  if (!stripped) return true;
  return isPermissionPayload(stripped);
}

/** Collapsed outline label; chrome-only text becomes "". Permission prefixes are stripped. */
export function navLabelText(text: string): string {
  const leftover = consumeChromeFromStart(text, false);
  if (!leftover) return "";
  const stripped = consumeTrailingButtons(leftover);
  if (!stripped || isPermissionPayload(stripped)) return "";
  if (consumeChromeFromStart(stripped, true) === "") return "";
  return stripped;
}

export function isTopLevelMessageEl(el: NavEl | null | undefined): boolean {
  if (!el) return true;
  const parent = (el.parentElement ?? el.parentNode) as NavEl | null | undefined;
  if (parent && typeof parent.closest === "function") {
    try {
      return !parent.closest("user-query, model-response");
    } catch {
      /* parent walk */
    }
  }
  let node: NavEl | null | undefined = parent;
  const seen = new Set<NavEl>();
  while (node && !seen.has(node)) {
    seen.add(node);
    const tag = String(node.tagName || node.localName || "").toLowerCase();
    if (tag === "user-query" || tag === "model-response") return false;
    node = (node.parentElement ?? node.parentNode) as NavEl | null | undefined;
  }
  return true;
}

function hasNavMedia(el: NavEl | null | undefined): boolean {
  if (!el || typeof el.querySelector !== "function") return false;
  try {
    return !!(el.querySelector("img") || el.querySelector("uploader-file-preview, .file-preview-container *"));
  } catch {
    return false;
  }
}

export function isPermissionWaitText(text: string): boolean {
  const s = collapseNavText(text);
  if (/(?:waiting for your input|等待你的输入|等待您的输入|等待你的輸入|等待您的輸入)/i.test(s)) return true;
  return isChromeNavText("model", s) && /(?:\ballow\b|\bcancel\b|允许|允許|取消)/i.test(s);
}

/**
 * Drop task-mode chrome rows. While generating, keep the last Writing… placeholder
 * even if it has no real label, but never resurrect a permission card.
 */
export function filterNavMessages<T extends MessageLike>(
  messages: readonly T[],
  opts?: { showAssistant?: boolean; generating?: boolean },
): T[] {
  const showAssistant = opts?.showAssistant ?? true;
  const generating = opts?.generating ?? false;
  const top = messages.map((m) => !m.el || isTopLevelMessageEl(m.el));
  const keep = messages.map((m, i) => {
    if (!top[i]) return false;
    if (m.role === "model" && !showAssistant) return false;
    if (hasNavMedia(m.el)) return true;
    return !isChromeNavText(m.role, m.text) && !!navLabelText(m.text);
  });
  if (generating && showAssistant) {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (!top[i] || messages[i]!.role !== "model") continue;
      if (!keep[i] && !keep.some((flag, j) => flag && j > i) && isWritingPlaceholder(messages[i]!.text)) keep[i] = true;
      break;
    }
  }
  return messages.filter((_, i) => keep[i]);
}
