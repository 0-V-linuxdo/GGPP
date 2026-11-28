/** In-page Gemini tool-permission cards: "Allow Gemini to run … on your machine?" */

const GGPP_UI = "#ggpp-layer, #ggpp-settings, .ggpp-modal, .ggpp-ct, .ggpp-settings";
const CODE_SEL = "pre, code, textarea, [data-test-id*='code']";
const BUTTON_SEL = "button, [role='button']";
const COMPUTER_USE_COPY = /computer\s*use|remote\s*(?:computer|browser)|远程(?:计算机|浏览器)|遠端(?:電腦|瀏覽器)|电脑使用|電腦使用/i;
const COMPUTER_USE_ATTR = /computer-?use|remote-?(?:computer|browser)|cua-/i;
const EXPAND_LABEL = /^(?:expand(?:\s+text)?|show more|展开|展開|显示更多|顯示更多)$/i;
const OVERFLOW_MENU_LABEL = /more options|open menu|conversation actions/i;

const ALLOW_EXACT = new Set([
  "allow",
  "allow once",
  "allow for this chat",
  "always allow",
  "允许",
  "允许一次",
  "允许本次对话",
  "始终允许",
  "允許",
  "允許一次",
  "允許本次對話",
  "始終允許",
]);

const STICKY_EXACT = new Set([
  "allow for this chat",
  "always allow",
  "允许本次对话",
  "始终允许",
  "允許本次對話",
  "始終允許",
]);

const CANCEL_EXACT = new Set(["cancel", "取消"]);

export type AllowPick = {
  kind: "sticky" | "allow";
  label: string;
};

export type ToolPermissionCard = {
  element: Element;
  toolName: string;
  script: string;
  text: string;
};

export function normalizeLabel(text: string | null | undefined): string {
  return String(text ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

export function buttonKind(label: string): AllowPick["kind"] | "cancel" | "other" {
  const t = normalizeLabel(label).toLowerCase();
  if (STICKY_EXACT.has(t)) return "sticky";
  if (ALLOW_EXACT.has(t)) return "allow";
  if (CANCEL_EXACT.has(t)) return "cancel";
  return "other";
}

export function looksLikeToolPermission(text: string): boolean {
  const t = String(text ?? "").replace(/\s+/g, " ");
  if (!t) return false;
  if (/Allow Gemini to\s+run\s+\S+/i.test(t)) return true;
  if (/Waiting for your input/i.test(t) && /\bRun\s+[\w./-]+\?/i.test(t)) return true;
  if (/允许\s*Gemini/i.test(t) && /运行|執行|执行/.test(t)) return true;
  if (/在你的(?:电脑|電腦|设备|設備|机器|機器)上/.test(t) && /允许|允許/.test(t)) return true;
  if (/(等待你的输入|等待您的输入|等待你的輸入)/.test(t) && /运行|執行|执行|Run\s+/i.test(t)) return true;
  return false;
}

export function pickAllowLabel(
  buttons: ReadonlyArray<{ label: string; disabled: boolean }>,
  preferSticky: boolean,
): AllowPick | null {
  const enabled = buttons.filter((b) => !b.disabled).map((b) => ({ ...b, kind: buttonKind(b.label) }));
  if (!enabled.some((b) => b.kind === "cancel")) return null;
  const sticky = enabled.find((b) => b.kind === "sticky");
  const allow = enabled.find((b) => b.kind === "allow");
  const chosen = preferSticky ? sticky ?? allow : allow ?? sticky;
  if (!chosen || (chosen.kind !== "allow" && chosen.kind !== "sticky")) return null;
  return { kind: chosen.kind, label: chosen.label };
}

function elementLabel(el: Element): string {
  return normalizeLabel(el.getAttribute("aria-label") || el.textContent);
}

function isDisabled(el: Element): boolean {
  const btn = el as HTMLButtonElement;
  if (typeof btn.disabled === "boolean" && btn.disabled) return true;
  const aria = el.getAttribute("aria-disabled");
  if (aria === "true") return true;
  return el.hasAttribute("disabled");
}

function isToggle(el: Element): boolean {
  const pressed = el.getAttribute("aria-pressed");
  if (pressed === "true" || pressed === "false") return true;
  const cls = `${(el as HTMLElement).className || ""}`;
  return /\bggpp-star-btn\b/.test(cls);
}

function isOverflowMenu(el: Element): boolean {
  const popup = (el.getAttribute("aria-haspopup") || "").trim().toLowerCase();
  if (popup && popup !== "false") return true;
  return OVERFLOW_MENU_LABEL.test(elementLabel(el));
}

function isButtonish(el: Element): boolean {
  if (el.tagName === "BUTTON") return true;
  if (el.getAttribute("role") === "button") return true;
  try {
    return typeof (el as HTMLElement).matches === "function" && (el as HTMLElement).matches(BUTTON_SEL);
  } catch {
    return false;
  }
}

function inGgppUi(el: Element): boolean {
  try {
    return !!el.closest(GGPP_UI);
  } catch {
    return false;
  }
}

function nodeText(el: Element): string {
  return (el as HTMLElement).innerText || el.textContent || "";
}

function descendantCount(el: Element): number {
  try {
    return el.querySelectorAll("*").length;
  } catch {
    return 1e9;
  }
}

function isRootNode(el: Element): boolean {
  const tag = el.tagName;
  if (tag === "HTML" || tag === "BODY") return true;
  try {
    const doc = typeof document !== "undefined" ? document : null;
    return !!doc && (el === doc.documentElement || el === doc.body);
  } catch {
    return false;
  }
}

function walkParents(start: Element, maxDepth: number, includeSelf = false): Element[] {
  const out: Element[] = [];
  let n: Element | null = includeSelf ? start : start.parentElement;
  for (let depth = 0; n && depth < maxDepth; n = n.parentElement, depth++) {
    if (isRootNode(n)) break;
    out.push(n);
  }
  return out;
}

function smallest(matches: Element[]): Element | null {
  let best: Element | null = null;
  let bestCount = Infinity;
  for (const el of matches) {
    const count = descendantCount(el);
    if (count < bestCount) {
      best = el;
      bestCount = count;
    }
  }
  return best;
}

function attrBlob(el: Element): string {
  return `${el.tagName} ${el.id || ""} ${(el as HTMLElement).className || ""} ${el.getAttribute("aria-label") || ""} ${el.getAttribute("data-test-id") || ""} ${el.getAttribute("data-testid") || ""}`;
}

function looksLikeComputerUseChrome(el: Element): boolean {
  if (COMPUTER_USE_ATTR.test(attrBlob(el))) return true;
  const text = nodeText(el).slice(0, 1200);
  if (COMPUTER_USE_COPY.test(text)) return true;
  if (descendantCount(el) < 80 && /\bcomputer\b/i.test(text)) return true;
  return false;
}

function computedPosition(el: Element): string {
  try {
    const inline = (el as HTMLElement).style?.position || "";
    if (inline) return inline;
    if (typeof getComputedStyle === "function") return getComputedStyle(el).position || "";
  } catch {}
  return "";
}

function isFixedTopRightPill(el: Element): boolean {
  const hosts = [el, ...walkParents(el, 8)];
  const positioned = hosts.some((n) => /fixed|sticky/i.test(computedPosition(n)));
  if (!positioned) return false;
  try {
    const rect = (el as HTMLElement).getBoundingClientRect?.();
    if (!rect || rect.width < 8 || rect.height < 8) return false;
    const vw = typeof window !== "undefined" ? window.innerWidth : 0;
    const vh = typeof window !== "undefined" ? window.innerHeight : 0;
    if (!vw) return false;
    const topish = rect.top >= -12 && rect.top <= Math.max(140, vh * 0.25);
    const rightish = rect.right >= vw - Math.max(280, vw * 0.34);
    const pill = rect.height <= 96 && rect.width <= 320;
    return topish && rightish && pill;
  } catch {
    return false;
  }
}

export function isComputerUseOverlayAllow(el: Element): boolean {
  if (!isButtonish(el) || inGgppUi(el) || isDisabled(el) || isToggle(el)) return false;
  const kind = buttonKind(elementLabel(el));
  if (kind !== "allow" && kind !== "sticky") return false;
  if ([el, ...walkParents(el, 12)].some(looksLikeComputerUseChrome)) return true;
  return isFixedTopRightPill(el);
}

function permissionMatches(el: Element): boolean {
  return looksLikeToolPermission(nodeText(el));
}

function enabledAllowPick(el: Element, preferSticky = true): AllowPick | null {
  const buttons = [...el.querySelectorAll(BUTTON_SEL)].filter((b) => !inGgppUi(b));
  return pickAllowLabel(
    buttons.map((b) => ({ label: elementLabel(b), disabled: isDisabled(b) })),
    preferSticky,
  );
}

/** Smallest permission card around a control; classic cards need enabled Cancel+Allow. */
function cardOf(allowEl: Element, requireEnabledPair = true): Element | null {
  const matches: Element[] = [];
  for (const n of walkParents(allowEl, 16)) {
    if (inGgppUi(n) || !permissionMatches(n)) continue;
    if (requireEnabledPair && !enabledAllowPick(n)) continue;
    matches.push(n);
  }
  return smallest(matches);
}

function overlayHost(allowEl: Element): Element {
  const chrome = walkParents(allowEl, 8).filter((n) => !inGgppUi(n) && looksLikeComputerUseChrome(n));
  return smallest(chrome) || allowEl.parentElement || allowEl;
}

function extractToolName(text: string): string {
  return /(?:Run|运行|執行)\s+([\w./:-]+)\s*[?？]/i.exec(text)?.[1] || /run\s+([\w./:-]+)\s+on your machine/i.exec(text)?.[1] || "";
}

function isCodeLike(text: string): boolean {
  if (!text) return false;
  if (/"function"\s*:/.test(text) && /\bfetch\s*\(/.test(text)) return true;
  if (/\basync\s*\(\)\s*=>/.test(text) && /\bfetch\s*\(/.test(text)) return true;
  if (/\bfetch\s*\(/.test(text) && (/JSON\.stringify/.test(text) || /\bgv2map\b/.test(text))) return true;
  if (/[{};=]/.test(text) && text.length > 40) return true;
  return text.length > 80;
}

const expanded = new WeakSet<Element>();

function expandPermissionCard(card: Element): void {
  const controls = [...card.querySelectorAll(BUTTON_SEL)];
  for (const el of controls) {
    if (inGgppUi(el) || isDisabled(el) || isToggle(el) || isOverflowMenu(el) || expanded.has(el)) continue;
    const label = elementLabel(el);
    const kind = buttonKind(label);
    if (kind === "allow" || kind === "sticky" || kind === "cancel") continue;
    if (!EXPAND_LABEL.test(label)) continue;
    expanded.add(el);
    try {
      (el as HTMLElement).click();
    } catch {
      expanded.delete(el);
    }
  }
}

/** Longest code-like chunk in a card; last equally-long chunk wins. */
export function extractPermissionScript(card: Element): string {
  const nodes = [...card.querySelectorAll(CODE_SEL)];
  let best = "";
  for (const node of nodes) {
    const chunk = normalizeLabel((node as HTMLElement).innerText || node.textContent);
    if (!chunk) continue;
    if (chunk.length > best.length || (chunk.length === best.length && isCodeLike(chunk))) best = chunk;
  }
  return best;
}

function asElement(root: ParentNode): Element | null {
  const el = root as Element;
  return el && typeof el.tagName === "string" ? el : null;
}

function buttonCandidates(root: ParentNode): Element[] {
  const nodes = [...root.querySelectorAll(BUTTON_SEL)];
  const el = asElement(root);
  if (el && isButtonish(el)) nodes.unshift(el);
  return nodes.filter((b) => !inGgppUi(b));
}

function harvestPermissionCards(root: ParentNode): Element[] {
  const found = new Set<Element>();
  const ordered: Element[] = [];
  const seeds: Element[] = [];
  try {
    seeds.push(...root.querySelectorAll(`${CODE_SEL}, ${BUTTON_SEL}`));
  } catch {}
  const self = asElement(root);
  if (self) seeds.unshift(self);
  for (const seed of seeds) {
    const card = cardOf(seed, false);
    if (!card || inGgppUi(card) || found.has(card)) continue;
    found.add(card);
    ordered.push(card);
  }
  return ordered;
}

function inferEvaluateTool(script: string, text: string): string {
  return extractToolName(text) || extractToolName(script) || (isCodeLike(script) ? "evaluate_script" : "");
}

function findClickableAllow(root: ParentNode): { element: Element; overlay: boolean } | null {
  let overlay: Element | null = null;
  let classic: Element | null = null;
  for (const el of buttonCandidates(root)) {
    if (isDisabled(el) || isToggle(el)) continue;
    const kind = buttonKind(elementLabel(el));
    if (kind !== "allow" && kind !== "sticky") continue;
    if (!classic) {
      const card = cardOf(el, true);
      if (card) classic = card;
    }
    if (!overlay && isComputerUseOverlayAllow(el)) overlay = overlayHost(el);
  }
  if (overlay) return { element: overlay, overlay: true };
  if (classic) return { element: classic, overlay: false };
  return null;
}

function bestScriptCard(root: ParentNode): Element | null {
  let best: Element | null = null;
  for (const card of harvestPermissionCards(root)) {
    if (descendantCount(card) >= 800) continue;
    expandPermissionCard(card);
    const script = extractPermissionScript(card);
    if (isCodeLike(script) || permissionMatches(card)) best = card;
  }
  return best;
}

/** Locate the live Allow target, but read script from the smallest permission card — not a huge ancestor. */
export function findToolPermission(root: ParentNode = document): ToolPermissionCard | null {
  const clickable = findClickableAllow(root);
  const scriptCard = bestScriptCard(root);
  const host = clickable?.element || scriptCard;
  if (!host) return null;
  if (scriptCard) expandPermissionCard(scriptCard);
  expandPermissionCard(host);
  const text = normalizeLabel(nodeText(scriptCard || host) || nodeText(host));
  const script = extractPermissionScript(scriptCard || host) || extractPermissionScript(host) || text;
  const toolName = inferEvaluateTool(script, text);
  if (!toolName && !script) return null;
  return { element: host, toolName, script, text };
}

const clicked = new WeakSet<Element>();

function clickTarget(target: Element | undefined): boolean {
  if (!target || isDisabled(target) || clicked.has(target) || isToggle(target)) return false;
  clicked.add(target);
  try {
    (target as HTMLElement).click();
    return true;
  } catch {
    clicked.delete(target);
    return false;
  }
}

function clickClassicAllow(root: ParentNode, preferSticky: boolean): boolean {
  for (const el of buttonCandidates(root)) {
    if (isDisabled(el) || isToggle(el)) continue;
    const kind = buttonKind(elementLabel(el));
    if (kind !== "allow" && kind !== "sticky") continue;
    const card = cardOf(el, true);
    if (!card) continue;
    const buttons = [...card.querySelectorAll(BUTTON_SEL)].filter((b) => !inGgppUi(b));
    const pick = pickAllowLabel(
      buttons.map((b) => ({ label: elementLabel(b), disabled: isDisabled(b) })),
      preferSticky,
    );
    if (!pick) continue;
    const target =
      buttons.find((b) => !isDisabled(b) && !isToggle(b) && buttonKind(elementLabel(b)) === pick.kind && elementLabel(b) === pick.label) ??
      buttons.find((b) => !isDisabled(b) && !isToggle(b) && buttonKind(elementLabel(b)) === pick.kind);
    if (clickTarget(target)) return true;
  }
  return false;
}

function clickOverlayAllow(root: ParentNode): boolean {
  for (const el of buttonCandidates(root)) {
    if (!isComputerUseOverlayAllow(el)) continue;
    if (clickTarget(el)) return true;
  }
  return false;
}

export function clickAllowPrompt(root: ParentNode = document, preferSticky = true): boolean {
  if (clickClassicAllow(root, preferSticky)) return true;
  if (clickOverlayAllow(root)) return true;
  const doc = typeof document !== "undefined" ? document : null;
  if (doc && root !== doc) return clickOverlayAllow(doc);
  return false;
}

/** Click the cancel companion on a recognized tool-permission card. */
export function clickCancelPrompt(card: ToolPermissionCard | Element): boolean {
  const el = "element" in card ? card.element : card;
  const target = [...el.querySelectorAll(BUTTON_SEL)].find(
    (b) => !inGgppUi(b) && !isDisabled(b) && !isToggle(b) && buttonKind(elementLabel(b)) === "cancel",
  );
  return clickTarget(target);
}
