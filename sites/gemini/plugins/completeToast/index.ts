import { definePlugin } from "../../shims/types";
import { h, icon } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import { preview, truncate } from "../../../../src/lib/text";
import type { GeminiApi, ResponseEvent } from "../gemini";

/**
 * A toast when a reply finishes somewhere you are not looking: in a chat you
 * left while it was still answering, or in this tab while it was hidden.
 */


export default definePlugin({
  id: "completeToast",
  name: "CompleteToast",
  description: "Show a toast when a reply finishes in a chat you left or while the tab was hidden. Click it to open the chat.",
  tags: ["Notifications"],
  icon: I.check,
  enabledByDefault: true,
  updated: "2026-10-14",
  dependencies: ["gemini", "ui"],
  settings: {
    keepUntilDismissed: { type: "boolean", label: "Keep until dismissed", description: "Don't auto-close the toast. Dismiss with ×, or by opening the chat.", default: false },
    duration: {
      type: "number",
      label: "Duration",
      description: "Seconds before the toast closes.",
      default: 6,
      min: 1,
      max: 20,
      slider: true,
      unit: "s",
      showIf: (v) => !v.keepUntilDismissed,
    },
    showPreview: { type: "boolean", label: "Show preview", description: "Show a short preview of the finished reply.", default: true },
    whenHidden: { type: "boolean", label: "Hidden tab", description: "Also toast when the open chat finishes while this tab is in the background.", default: true },
  },
  start(ctx) {
    const gemini = ctx.use<GeminiApi>("gemini");
    let card: { el: HTMLElement; id: string | null; timer?: ReturnType<typeof setTimeout>; remaining: number; started: number } | null = null;

    ctx.css(`
      .ggpp-ct {
        position: fixed; top: 3.5rem; right: 1rem; z-index: 2147482500; width: min(22rem, calc(100vw - 1.5rem));
        display: flex; align-items: stretch; border: 1px solid var(--ggpp-border-soft); border-radius: .75rem;
        background: var(--ggpp-bg); color: var(--ggpp-fg); box-shadow: var(--ggpp-shadow); font-family: var(--ggpp-font);
        animation: ggpp-ct-in .18s ease-out;
      }
      .ggpp-ct:hover, .ggpp-ct:focus-within { background: var(--ggpp-surface); }
      .ggpp-ct-main { all: unset; flex: 1; min-width: 0; display: flex; gap: 10px; padding: 12px 4px 12px 14px; cursor: pointer; }
      .ggpp-ct-main .ggpp-icon { color: var(--ggpp-ok); margin-top: 2px; }
      .ggpp-ct-text { min-width: 0; flex: 1; }
      .ggpp-ct-title { font: 600 .875rem/1.25rem var(--ggpp-font); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .ggpp-ct-body { font-size: .75rem; line-height: 1rem; color: var(--ggpp-fg-2); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .ggpp-ct-x { all: unset; padding: 8px; cursor: pointer; opacity: .55; align-self: flex-start; }
      .ggpp-ct-x:hover { opacity: 1; }
      @keyframes ggpp-ct-in { from { opacity: 0; transform: translateY(-.4rem); } }
      @media (prefers-reduced-motion: reduce) { .ggpp-ct { animation: none; } }
    `);

    function hide() {
      if (!card) return;
      clearTimeout(card.timer);
      card.el.remove();
      card = null;
    }
    ctx.cleanup(hide);

    function arm() {
      if (!card) return;
      clearTimeout(card.timer);
      if (ctx.settings.keepUntilDismissed) return;
      card.started = Date.now();
      card.timer = setTimeout(hide, card.remaining);
    }

    function show(id: string | null, title: string, text: string) {
      const body = (ctx.settings.showPreview && preview(text)) || "Response ready";
      const name = truncate(title.replace(/\s+/g, " ").trim(), 48) || "Chat";
      if (card && card.id === id) {
        card.el.querySelector(".ggpp-ct-title")!.textContent = name;
        card.el.querySelector(".ggpp-ct-body")!.textContent = body;
        return;
      }
      hide();
      const el = h(
        "div",
        { class: "ggpp-ct", role: "status", "aria-live": "polite" },
        h(
          "button",
          {
            class: "ggpp-ct-main",
            type: "button",
            onclick: () => {
              hide();
              if (id) gemini.navigate(`${gemini.newChatUrl()}/${id}`);
            },
          },
          icon(I.check, 16),
          h("span", { class: "ggpp-ct-text" }, h("div", { class: "ggpp-ct-title" }, name), h("div", { class: "ggpp-ct-body" }, body)),
        ),
        h("button", { class: "ggpp-ct-x", type: "button", "aria-label": "Dismiss", onclick: hide }, icon(I.x, 14)),
      );
      el.addEventListener("mouseenter", () => {
        if (!card?.timer) return;
        clearTimeout(card.timer);
        card.remaining -= Date.now() - card.started;
      });
      el.addEventListener("mouseleave", () => {
        if (!card || ctx.settings.keepUntilDismissed) return;
        if (card.remaining <= 0) hide();
        else arm();
      });
      document.body.append(el);
      card = { el, id, remaining: ctx.settings.duration * 1000, started: Date.now() };
      arm();
    }

    // Replies that finish in a chat you are not viewing (reported from the network by the extension).
    ctx.on("gemini:response-elsewhere", (e: ResponseEvent) => {
      if (e.error || !e.conversationId) return;
      show(e.conversationId, e.title, "");
    });

    ctx.on("gemini:response-end", (e: ResponseEvent) => {
      if (!ctx.settings.whenHidden || !e.hidden || e.error || e.interrupted) return;
      show(e.conversationId, e.title, e.text ?? "");
    });

    ctx.on("gemini:route", () => {
      const id = gemini.route().conversationId;
      if (card && card.id === id) hide();
    });
  },
});
