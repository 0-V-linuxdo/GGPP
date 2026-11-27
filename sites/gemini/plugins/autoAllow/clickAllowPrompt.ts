/** In-page Gemini tool-permission cards: "Allow Gemini to run … on your machine?" */

const GGPP_UI = "#ggpp-layer, #ggpp-settings, .ggpp-modal, .ggpp-ct, .ggpp-settings";

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

function inGgppUi(el: Element): boolean {
  try {
    return !!el.closest(GGPP_UI);
  } catch {
    return false;
  }
}

function cardOf(allowEl: Element): Element | null {
  let n: Element | null = allowEl.parentElement;
  for (let depth = 0; n && depth < 16; n = n.parentElement, depth++) {
    if (n === document.documentElement || n === document.body) break;
    const text = (n as HTMLElement).innerText || n.textContent || "";
    if (!looksLikeToolPermission(text)) continue;
    const buttons = [...n.querySelectorAll("button, [role='button']")].filter((el) => !inGgppUi(el));
    const pick = pickAllowLabel(
      buttons.map((el) => ({ label: elementLabel(el), disabled: isDisabled(el) })),
      true,
    );
    if (pick) return n;
  }
  return null;
}

function extractToolName(text: string): string {
  return /(?:Run|运行|執行)\s+([\w./:-]+)\s*[?？]/i.exec(text)?.[1] || /run\s+([\w./:-]+)\s+on your machine/i.exec(text)?.[1] || "";
}

/** Locate the card once, retaining only the request content needed by a judge. */
export function findToolPermission(root: ParentNode = document): ToolPermissionCard | null {
  for (const card of [...root.querySelectorAll("body *")]) {
    if (inGgppUi(card)) continue;
    const text = normalizeLabel((card as HTMLElement).innerText || card.textContent);
    if (!looksLikeToolPermission(text)) continue;
    const buttons = [...card.querySelectorAll("button, [role='button']")].filter((b) => !inGgppUi(b));
    if (!pickAllowLabel(buttons.map((b) => ({ label: elementLabel(b), disabled: isDisabled(b) })), true)) continue;
    const toolName = extractToolName(text);
    const code = card.querySelector("pre, code, [data-test-id*='code'], textarea");
    const script = normalizeLabel((code as HTMLElement | null)?.innerText || code?.textContent || text);
    return { element: card, toolName, script, text };
  }
  return null;
}

const clicked = new WeakSet<Element>();

export function clickAllowPrompt(root: ParentNode = document, preferSticky = true): boolean {
  const nodes = [...root.querySelectorAll("button, [role='button']")];
  for (const el of nodes) {
    if (inGgppUi(el) || isDisabled(el) || clicked.has(el)) continue;
    const kind = buttonKind(elementLabel(el));
    if (kind !== "allow" && kind !== "sticky") continue;
    const card = cardOf(el);
    if (!card) continue;
    const buttons = [...card.querySelectorAll("button, [role='button']")].filter((b) => !inGgppUi(b));
    const pick = pickAllowLabel(
      buttons.map((b) => ({ label: elementLabel(b), disabled: isDisabled(b) })),
      preferSticky,
    );
    if (!pick) continue;
    const target =
      buttons.find((b) => !isDisabled(b) && buttonKind(elementLabel(b)) === pick.kind && elementLabel(b) === pick.label) ??
      buttons.find((b) => !isDisabled(b) && buttonKind(elementLabel(b)) === pick.kind);
    if (!target || isDisabled(target)) continue;
    clicked.add(target);
    try {
      (target as HTMLElement).click();
      return true;
    } catch {
      clicked.delete(target);
    }
  }
  return false;
}

/** Click the cancel companion on a recognized tool-permission card. */
export function clickCancelPrompt(card: ToolPermissionCard | Element): boolean {
  const el = "element" in card ? card.element : card;
  const target = [...el.querySelectorAll("button, [role='button']")].find((b) => !inGgppUi(b) && !isDisabled(b) && buttonKind(elementLabel(b)) === "cancel");
  if (!target || clicked.has(target)) return false;
  clicked.add(target);
  try {
    (target as HTMLElement).click();
    return true;
  } catch {
    clicked.delete(target);
    return false;
  }
}
