import { definePlugin } from "../../shims/types";
import { I } from "../../../../src/lib/icons";
import type { GeminiApi, ResponseEvent } from "../gemini";
import type { UiApi } from "../ui";

/** Retry a reply that ended in an error, using Gemini's own retry control. */

const RETRY = "[data-test-id='regenerate-button'] button, button[data-test-id='regenerate-button'], button[aria-label='Redo'], button[aria-label*='Retry' i], button[aria-label*='Try again' i], button[aria-label*='重试']";
const MENU_ITEM = "gem-menu-item, [role='menuitem']";

export default definePlugin({
  id: "autoRetry",
  name: "AutoRetry",
  description: "Automatically retry a reply that failed with an error.",
  tags: ["Messages"],
  icon: I.retry,
  updated: "2026-10-14",
  dependencies: ["gemini", "ui"],
  settings: {
    maxRetries: { type: "number", label: "Maximum retries", description: "Maximum consecutive retries per conversation.", default: 3, min: 1, max: 10 },
    delay: { type: "number", label: "Delay", description: "Seconds to wait before retrying.", default: 2, min: 0, max: 30, unit: "s" },
  },
  start(ctx) {
    const gemini = ctx.use<GeminiApi>("gemini");
    const ui = ctx.use<UiApi>("ui");
    const counts = new Map<string, number>();
    let timer: ReturnType<typeof setTimeout> | undefined;
    ctx.cleanup(() => clearTimeout(timer));

    ctx.on("gemini:response-end", (e: ResponseEvent) => {
      const key = e.conversationId ?? "new";
      if (!e.error) {
        counts.delete(key);
        return;
      }
      if (e.interrupted) return;
      const n = (counts.get(key) ?? 0) + 1;
      if (n > ctx.settings.maxRetries) {
        counts.delete(key);
        ui.toast({ title: "Max retries reached.", icon: I.x });
        return;
      }
      counts.set(key, n);
      ui.toast({ title: `Retrying… (${n}/${ctx.settings.maxRetries})`, icon: I.retry, duration: ctx.settings.delay * 1000 + 1500 });
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (gemini.isGenerating() || gemini.route().conversationId !== e.conversationId) return;
        const last = gemini.qa(gemini.SEL.modelResponse).pop();
        const btn = last?.querySelector<HTMLElement>(RETRY) ?? gemini.qa(RETRY).pop();
        if (!btn) {
          ui.toast({ title: "Couldn't find Gemini's retry button." });
          return;
        }
        const before = new Set(document.querySelectorAll(MENU_ITEM));
        btn.click();
        // Redo may open a small menu of variants; pick the plain retry.
        setTimeout(() => {
          const opened = [...document.querySelectorAll<HTMLElement>(MENU_ITEM)].filter((el) => !before.has(el) && el.offsetParent);
          if (!opened.length) return;
          (opened.find((el) => /try again|redo|regenerate|重试|重新生成/i.test(el.innerText)) ?? opened[0]).click();
        }, 350);
      }, ctx.settings.delay * 1000);
    });
  },
});
