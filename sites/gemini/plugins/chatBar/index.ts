import { definePlugin } from "../../shims/types";
import { h, icon } from "../../../../src/lib/dom";
import type { GeminiApi } from "../gemini";
import { placeComposerChatBar } from "./placeComposerChatBar";

/** A button slot in Gemini's composer toolbar that other plugins fill. */

export interface ChatBarButton {
  id: string;
  icon: string[];
  title: string;
  order?: number;
  onClick(e: MouseEvent, button: HTMLElement): void;
  /** Re-evaluated whenever the bar re-renders or refresh() is called. */
  active?: () => boolean;
  /** Optional text next to the icon (e.g. a counter). */
  text?: () => string;
  /** Custom icon node (re-rendered on refresh); replaces `icon`. */
  render?: () => Node;
}

export interface ChatBarApi {
  register(b: ChatBarButton): () => void;
  refresh(): void;
}


export default definePlugin({
  id: "chatBar",
  name: "Composer Buttons",
  description: "Lets plugins add buttons to the message box toolbar.",
  tags: [],
  required: true,
  hidden: true,
  dependencies: ["gemini"],
  start(ctx) {
    const gemini = ctx.use<GeminiApi>("gemini");
    const buttons = new Map<string, ChatBarButton>();
    const bars = new Set<HTMLElement>();

    ctx.css(`
      .ggpp-chatbar { display: inline-flex; align-items: center; gap: 2px; margin-inline: 4px; }
      .ggpp-chatbar:empty { display: none; }
      .ggpp-chatbar-btn {
        all: unset; box-sizing: border-box; display: inline-flex; align-items: center; justify-content: center; gap: 4px;
        min-width: 36px; height: 36px; padding: 0 8px; border-radius: 18px; cursor: pointer;
        color: var(--gem-sys-color--on-surface-variant, currentColor); font: 500 13px/1 "Google Sans", sans-serif;
      }
      .ggpp-chatbar-btn:hover, .ggpp-chatbar-btn.ggpp-active { background: rgb(127 127 127 / 14%); }
      .ggpp-chatbar-btn:focus-visible { outline: 2px solid #0b57d0; }
      .ggpp-chatbar-btn span:empty { display: none; }
    `);

    function render(bar: HTMLElement) {
      const list = [...buttons.values()].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      bar.replaceChildren(
        ...list.map((b) => {
          const el = h(
            "button",
            {
              class: `ggpp-chatbar-btn${b.active?.() ? " ggpp-active" : ""}`,
              type: "button",
              title: typeof b.title === "string" ? b.title : "",
              "aria-label": b.title,
              dataset: { ggppButton: b.id },
              onclick: (e: MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                try {
                  b.onClick(e, el);
                } catch (err) {
                  ctx.log.error(`button ${b.id} failed`, err);
                }
              },
            },
            b.render ? b.render() : icon(b.icon, 20),
            h("span", null, b.text?.() ?? ""),
          );
          return el;
        }),
      );
    }

    const refresh = () => bars.forEach(render);

    // One bar per composer, kept next to the model picker even when Angular re-renders the toolbar.
    ctx.cleanup(
      gemini.watch(gemini.SEL.composer, (composer) => {
        if (composer.parentElement?.closest(gemini.SEL.composer)) return;
        const bar = h("div", { class: "ggpp-chatbar" });
        const place = () => placeComposerChatBar(bar, composer);
        place();
        bars.add(bar);
        render(bar);
        const mo = new MutationObserver(place);
        mo.observe(composer, { childList: true, subtree: true });
        return () => {
          mo.disconnect();
          bars.delete(bar);
          bar.remove();
        };
      }),
    );
    ctx.cleanup(() => {
      bars.forEach((b) => b.remove());
      bars.clear();
    });

    ctx.provide("chatBar", {
      register(b) {
        buttons.set(b.id, b);
        refresh();
        return () => {
          buttons.delete(b.id);
          refresh();
        };
      },
      refresh,
    } satisfies ChatBarApi);
  },
});
