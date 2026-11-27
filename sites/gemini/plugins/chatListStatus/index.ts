import { definePlugin } from "../../shims/types";
import { h, isVisible, nextFrame } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import type { GeminiApi, ResponseEvent } from "../gemini";

/** Status marks on side panel chats: replying, finished while you were away, or error. */

type Status = "live" | "done" | "error";

/** Native sidenav generating indicators; skip our mark when one is actually visible. */
export const NATIVE_SIDEBAR_SPINNER_SEL = "progress, [role='progressbar'], circular-progress, mat-progress-spinner, mat-spinner";

/** Gemini app red/orange flag on a conversation row (task / attention). */
export const NATIVE_SIDEBAR_FLAG_SEL = [
  "mat-icon[data-mat-icon-name='flag']",
  "mat-icon[data-mat-icon-name='outlined_flag']",
  "mat-icon[fonticon='flag']",
  "mat-icon[fonticon='outlined_flag']",
  "[data-mat-icon-name='flag']",
  "[data-mat-icon-name='outlined_flag']",
  "[aria-label*='flag' i]:not([aria-label*='pin' i])",
  "[aria-label*='旗帜']",
  "[aria-label*='红旗']",
].join(", ");

const PIN_SEL = "[aria-label*='pin' i], [aria-label*='Pinned' i], [aria-label*='Unpin' i], [aria-label*='置顶']";
const FLAG_PATH = /M14\.4\s*6|M14\s+6l-1-2H5v17|M5 21V4h9|M14\.05\s*4\.5/i;

export function rowHasNativeGeneratingSpinner(row: ParentNode): boolean {
  return [...row.querySelectorAll(NATIVE_SIDEBAR_SPINNER_SEL)].some(isVisible);
}

function isPinChrome(el: Element): boolean {
  try {
    return !!el.closest(PIN_SEL);
  } catch {
    return false;
  }
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
    // Safety net: the open chat can't be "replying" once Gemini's stop button is gone.
    ctx.setInterval(() => {
      const id = gemini.route().conversationId;
      if (id && status.get(id) === "live" && !gemini.isGenerating()) set(id, null);
    }, 2000);
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
