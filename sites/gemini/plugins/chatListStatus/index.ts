import { definePlugin } from "../../shims/types";
import { h, isVisible, nextFrame } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import type { GeminiApi, ResponseEvent } from "../gemini";

/** Status marks on side panel chats: replying, finished while you were away, or error. */

type Status = "live" | "done" | "error";

/** Native sidenav generating indicators; skip our mark when one is actually visible. */
export const NATIVE_SIDEBAR_SPINNER_SEL = [
  "progress",
  "[role='progressbar']",
  "circular-progress",
  "mat-progress-spinner",
  "mat-spinner",
  "[data-mat-icon-name='progress_activity']",
  "[data-mat-icon-name='autorenew']",
  "[data-mat-icon-name='sync']",
  "[fonticon='progress_activity']",
  "[fonticon='autorenew']",
  "[fonticon='sync']",
].join(", ");

/** Gemini app red/orange flag on a conversation row (task / attention). */
export const NATIVE_SIDEBAR_FLAG_SEL = [
  "mat-icon[data-mat-icon-name='flag']",
  "mat-icon[data-mat-icon-name='outlined_flag']",
  "mat-icon[fonticon='flag']",
  "mat-icon[fonticon='outlined_flag']",
  "[data-mat-icon-name='flag']",
  "[data-mat-icon-name='outlined_flag']",
  "[aria-label*='flag' i]",
  "[aria-label*='旗帜']",
  "[aria-label*='红旗']",
].join(", ");

/** Word-boundary pin labels. `*=pin` also matches `spinner`. */
const PIN_SEL = [
  "[aria-label='Pin' i]",
  "[aria-label='Pinned' i]",
  "[aria-label='Unpin' i]",
  "[aria-label^='Pin ' i]",
  "[aria-label^='Unpin ' i]",
  "[aria-label^='Pinned ' i]",
  "[aria-label*='Pin chat' i]",
  "[aria-label*='Unpin chat' i]",
  "[aria-label*='Pinned chat' i]",
  "[aria-label*='置顶']",
  "[aria-label*='取消置顶']",
].join(", ");
const PIN_LABEL = /(?:^|[^a-z])(?:un)?pin(?:ned|ning)?(?:\b|$)|置顶|取消置顶/i;
const MENU_SEL = "[data-test-id='actions-menu-button'], [aria-label*='More options' i], [aria-label*='更多选项']";
const FLAG_PATH = /M14\.4\s*6|M14\s+6l-1-2H5v17|M5 21V4h9|M14\.05\s*4\.5/i;
const SPINNER_NAME = /progress_activity|autorenew|(?:^|\s)sync(?:\s|$)|spinner|loading/i;
const TRAILING_RING_SEL = [
  "span",
  "i",
  "em",
  "div",
  "button",
  "gem-icon-button",
  "svg",
  "mat-icon",
  ".google-symbols",
  "[class*='progress' i]",
  "[class*='spinner' i]",
  "[class*='loading' i]",
  "[class*='circular' i]",
].join(", ");

function isMenuChrome(el: Element): boolean {
  try {
    return !!el.closest(MENU_SEL);
  } catch {
    return false;
  }
}

function isPinChrome(el: Element): boolean {
  try {
    if (el.closest(PIN_SEL)) return true;
  } catch {
    /* tests / invalid selector */
  }
  const label = `${el.getAttribute?.("aria-label") || ""} ${el.getAttribute?.("title") || ""}`;
  return PIN_LABEL.test(label);
}

function isShownStatus(el: Element): boolean {
  if (!isVisible(el) || el.closest(".ggpp-cls")) return false;
  try {
    const s = getComputedStyle(el);
    if (s.visibility === "hidden" || s.display === "none" || s.opacity === "0") return false;
  } catch {
    /* tests / detached */
  }
  return true;
}

function isTransparentColor(color: string): boolean {
  const c = color.trim().toLowerCase();
  return !c || c === "transparent" || c === "rgba(0, 0, 0, 0)" || /,\s*0\)$/.test(c);
}

function isCircularSpinStyle(el: Element): boolean {
  try {
    const s = getComputedStyle(el);
    if (s.animationName && s.animationName !== "none") return true;
    const br = s.borderRadius || "";
    const circular = br === "50%" || br === "999px" || br === "9999px" || /50%/.test(br);
    if (!circular) return false;
    const top = s.borderTopColor || "";
    const right = s.borderRightColor || "";
    const left = s.borderLeftColor || "";
    const bottom = s.borderBottomColor || "";
    if (top && right && top !== right) return true;
    if (!isTransparentColor(top) && (isTransparentColor(right) || isTransparentColor(left) || isTransparentColor(bottom))) return true;
    if (s.borderTopWidth && s.borderTopWidth !== "0px" && (isTransparentColor(right) || isTransparentColor(bottom))) return true;
  } catch {
    /* tests */
  }
  return false;
}

function isTrailingSlot(el: Element, hostBox: DOMRect): boolean {
  const r = el.getBoundingClientRect();
  if (r.width < 8 || r.width > 28 || r.height < 8 || r.height > 28) return false;
  return r.left > hostBox.right - 88 && r.right <= hostBox.right + 4;
}

function shadowKids(el: Element): Element[] {
  const root = (el as HTMLElement & { shadowRoot?: ShadowRoot | null }).shadowRoot;
  if (!root || typeof root.querySelectorAll !== "function") return [];
  try {
    return [...root.querySelectorAll(TRAILING_RING_SEL)];
  } catch {
    return [];
  }
}

function looksLikeNamedSpinner(el: Element): boolean {
  const label = `${el.getAttribute("data-mat-icon-name") || ""} ${el.getAttribute("fonticon") || ""} ${el.getAttribute("aria-label") || ""} ${el.textContent || ""}`.toLowerCase();
  if (SPINNER_NAME.test(label)) return true;
  try {
    const anim = getComputedStyle(el).animationName;
    if (anim && anim !== "none") return true;
  } catch {
    /* tests */
  }
  return false;
}

function looksLikeTrailingRing(el: Element, hostBox: DOMRect): boolean {
  if (!isShownStatus(el) || isPinChrome(el) || isMenuChrome(el) || el.closest(".ggpp-cls")) return false;
  if (!isTrailingSlot(el, hostBox)) return false;
  if (looksLikeNamedSpinner(el) || isCircularSpinStyle(el)) return true;
  try {
    if (el.querySelector?.("circle")) return true;
  } catch {
    /* tests */
  }
  return false;
}

export function rowHasNativeGeneratingSpinner(row: ParentNode): boolean {
  const host = row as Element;
  for (const el of host.querySelectorAll(NATIVE_SIDEBAR_SPINNER_SEL)) {
    if (isShownStatus(el) && !isPinChrome(el) && !isMenuChrome(el)) return true;
  }
  for (const el of host.querySelectorAll("svg, mat-icon, .google-symbols, [class*='spinner' i], [class*='loading' i]")) {
    if (!isShownStatus(el) || isPinChrome(el) || isMenuChrome(el)) continue;
    if (looksLikeNamedSpinner(el)) return true;
  }
  const box = typeof host.getBoundingClientRect === "function" ? host.getBoundingClientRect() : null;
  if (!box) return false;
  const seen = new Set<Element>();
  const consider = (el: Element) => {
    if (seen.has(el)) return false;
    seen.add(el);
    return looksLikeTrailingRing(el, box);
  };
  for (const el of host.querySelectorAll(TRAILING_RING_SEL)) {
    if (consider(el)) return true;
    for (const kid of shadowKids(el)) {
      if (consider(kid)) return true;
    }
  }
  return false;
}

export function rowHasNativeFlag(row: ParentNode): boolean {
  const host = row as Element;
  for (const el of host.querySelectorAll(NATIVE_SIDEBAR_FLAG_SEL)) {
    if (isVisible(el) && !isPinChrome(el)) return true;
  }
  const box = typeof host.getBoundingClientRect === "function" ? host.getBoundingClientRect() : null;
  for (const el of host.querySelectorAll("svg, mat-icon, .google-symbols")) {
    if (!isVisible(el) || isPinChrome(el) || el.closest("a[href]") || el.closest(".ggpp-cls")) continue;
    const label = `${el.getAttribute("data-mat-icon-name") || ""} ${el.getAttribute("fonticon") || ""} ${el.getAttribute("aria-label") || ""} ${el.textContent || ""}`.toLowerCase();
    if (label.includes("flag") || label.includes("旗")) return true;
    const d = [...el.querySelectorAll("path")].map((p) => p.getAttribute("d") || "").join(" ");
    if (FLAG_PATH.test(d)) return true;
    if (box) {
      const r = el.getBoundingClientRect();
      if (r.width >= 10 && r.width <= 28 && r.height >= 10 && r.height <= 28 && r.left > box.right - 72 && r.right < box.right - 12) return true;
    }
  }
  return false;
}

/** Native Gemini flag or spinner already occupies the status slot. */
export function rowHasNativeStatusChrome(row: ParentNode): boolean {
  return rowHasNativeGeneratingSpinner(row) || rowHasNativeFlag(row);
}

export default definePlugin({
  id: "chatListStatus",
  name: "ChatListStatus",
  description: "Mark chats in the side panel that are replying, finished while you were away, or ended with an error. Complements Gemini\'s native spinner, which is sometimes missing.",
  tags: ["Chats", "Notifications"],
  icon: I.list,
  enabledByDefault: true,
  updated: "2026-11-28",
  dependencies: ["gemini"],
  start(ctx) {
    const gemini = ctx.use<GeminiApi>("gemini");
    const status = new Map<string, Status>();

    ctx.css(`
      .ggpp-cls { display: inline-block; flex: none; width: 8px; height: 8px; border-radius: 50%; pointer-events: none; margin-inline-end: 4px; vertical-align: middle; }
      .ggpp-cls[data-s="done"] { background: #3b82f6; }
      .ggpp-cls[data-s="error"] { background: #ef4444; }
      .ggpp-cls[data-s="live"] { width: 12px; height: 12px; border: 2px solid #3b82f6; border-right-color: transparent; background: transparent; animation: ggpp-cls-spin .8s linear infinite; }
      @keyframes ggpp-cls-spin { to { transform: rotate(360deg); } }
      @media (prefers-reduced-motion: reduce) { .ggpp-cls[data-s="live"] { animation: none; border-right-color: #3b82f6; } }
      gem-nav-list-item[data-test-id='conversation']:has(circular-progress, [role='progressbar'], mat-progress-spinner, mat-spinner, [data-mat-icon-name='progress_activity'], [fonticon='progress_activity']) .ggpp-cls { display: none !important; }
    `);

    const idOf = (row: Element) => row.querySelector<HTMLAnchorElement>(gemini.SEL.conversationLink)?.href.match(/\/([0-9a-f]{8,})(?:[/?#]|$)/i)?.[1] ?? null;

    function placeMark(row: Element, mark: HTMLElement) {
      const title = row.querySelector(gemini.SEL.conversationTitle);
      if (title && mark.nextElementSibling !== title) title.before(mark);
      else if (!title && mark.parentElement !== row) row.prepend(mark);
    }

    function paint() {
      for (const row of gemini.qa(gemini.SEL.conversationRow)) {
        const id = idOf(row);
        const s = id ? status.get(id) : undefined;
        let mark = row.querySelector<HTMLElement>(".ggpp-cls");
        if (!s || rowHasNativeStatusChrome(row)) {
          mark?.remove();
          continue;
        }
        if (!mark) {
          mark = h("span", { class: "ggpp-cls", "aria-hidden": "true" });
        }
        placeMark(row, mark);
        mark.dataset.s = s;
        mark.title = s === "live" ? "Replying…" : s === "done" ? "New reply" : "Ended with an error";
      }
    }
    const set = (id: string | null, s: Status | null) => {
      if (!id) return;
      if (s) status.set(id, s);
      else status.delete(id);
      paint();
    };

    ctx.on("gemini:response-start", (e: ResponseEvent) => set(e.conversationId, "live"));
    ctx.on("gemini:stream-start", (e: ResponseEvent) => e.conversationId !== gemini.route().conversationId && set(e.conversationId, "live"));
    ctx.on("gemini:response-left", (e: ResponseEvent) => set(e.conversationId, "live"));
    // A left chat whose stream was cut off: we can't tell how it ends, so drop the spinner.
    ctx.on("gemini:response-lost", (e: ResponseEvent) => status.get(e.conversationId ?? "") === "live" && set(e.conversationId, null));
    ctx.on("gemini:response-elsewhere", (e: ResponseEvent) => set(e.conversationId, e.error ? "error" : "done"));
    ctx.on("gemini:response-end", (e: ResponseEvent) => {
      const open = e.conversationId === gemini.route().conversationId && !e.hidden;
      set(e.conversationId, e.error ? "error" : open || e.interrupted ? null : "done");
    });
    ctx.on("gemini:route", () => {
      const id = gemini.route().conversationId;
      if (id && status.get(id) !== "live") set(id, null);
    });
    // Native generating rings often mount after response-start; repaint live rows so we hide once they appear.
    ctx.setInterval(() => {
      const id = gemini.route().conversationId;
      if (id && status.get(id) === "live" && !gemini.isGenerating()) set(id, null);
      else if ([...status.values()].some((value) => value === "live")) paint();
    }, 500);
    document.addEventListener(
      "visibilitychange",
      () => {
        const id = gemini.route().conversationId;
        if (!document.hidden && id && status.get(id) === "done") set(id, null);
      },
      { signal: ctx.signal },
    );
    ctx.cleanup(gemini.watch(gemini.SEL.conversationRow, () => void nextFrame(paint)));
    ctx.cleanup(() => document.querySelectorAll(".ggpp-cls").forEach((n) => n.remove()));
  },
});
