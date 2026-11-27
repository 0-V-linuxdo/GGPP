import { definePlugin } from "../../shims/types";
import { h, nextFrame } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import type { GeminiApi, ResponseEvent } from "../gemini";

/** Status marks on side panel chats: replying, finished while you were away, or error. */

type Status = "live" | "done" | "error";

export default definePlugin({
  id: "chatListStatus",
  name: "ChatListStatus",
  description: "Mark chats in the side panel that are replying, finished while you were away, or ended with an error. Off by default: Gemini already shows a spinner next to those chats.",
  tags: ["Chats", "Notifications"],
  icon: I.list,
  enabledByDefault: false,
  updated: "2026-11-28",
  dependencies: ["gemini"],
  start(ctx) {
    const gemini = ctx.use<GeminiApi>("gemini");
    const status = new Map<string, Status>();

    ctx.css(`
      .ggpp-cls { position: absolute; right: 36px; top: 50%; transform: translateY(-50%); width: 8px; height: 8px; border-radius: 50%; pointer-events: none; z-index: 1; }
      .ggpp-cls[data-s="done"] { background: #3b82f6; }
      .ggpp-cls[data-s="error"] { background: #ef4444; }
      .ggpp-cls[data-s="live"] { width: 10px; height: 10px; border: 2px solid #3b82f6; border-right-color: transparent; animation: ggpp-cls-spin .8s linear infinite; }
      gem-nav-list-item[data-test-id='conversation']:hover .ggpp-cls { display: none; }
      @keyframes ggpp-cls-spin { to { transform: translateY(-50%) rotate(360deg); } }
      @media (prefers-reduced-motion: reduce) { .ggpp-cls[data-s="live"] { animation: none; border-right-color: #3b82f6; } }
    `);

    const idOf = (row: Element) => row.querySelector<HTMLAnchorElement>(gemini.SEL.conversationLink)?.href.match(/\/([0-9a-f]{8,})(?:[/?#]|$)/i)?.[1] ?? null;

    function paint() {
      for (const row of gemini.qa(gemini.SEL.conversationRow)) {
        const id = idOf(row);
        const s = id ? status.get(id) : undefined;
        let mark = row.querySelector<HTMLElement>(":scope > .ggpp-cls");
        if (!s) {
          mark?.remove();
          continue;
        }
        if (!mark) {
          mark = h("span", { class: "ggpp-cls", "aria-hidden": "true" });
          row.append(mark);
        }
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
