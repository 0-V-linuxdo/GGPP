import { definePlugin } from "../../shims/types";
import { h, isEditable, nextFrame } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import type { GeminiApi } from "../gemini";
import type { UiApi } from "../ui";

/** Pin models from Gemini's model picker as one-click chips next to it; Ctrl+M cycles the pinned ones. */

interface Mode {
  id: string;
  name: string;
  hint: string;
}

export interface ModelsApi {
  /** Name of the selected model as the picker shows it. */
  current(): string;
  list(): { id: string; name: string; hint: string }[];
  /** Switch to the model with this catalog name. False when it is not in the catalog. */
  pickByName(name: string): Promise<boolean>;
}

const OPTION = "[data-test-id^='bard-mode-option-']";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default definePlugin({
  id: "betterModeSelect",
  name: "BetterModeSelect",
  description: "Pin models as one-click chips next to the model picker. Ctrl+M cycles the pinned models.",
  tags: ["Composer"],
  icon: I.layers,
  enabledByDefault: true,
  updated: "2026-10-14",
  dependencies: ["gemini", "ui"],
  liveSettings: true,
  settings: {
    hideNativeTrigger: { type: "boolean", label: "Hide model picker", description: "Hide Gemini's own model button when chips are shown. Thinking level stays reachable only through it.", default: false },
    shortcut: { type: "boolean", label: "Ctrl+M", description: "Cycle pinned models with Ctrl+M.", default: true },
  },
  async start(ctx) {
    const gemini = ctx.use<GeminiApi>("gemini");
    const ui = ctx.use<UiApi>("ui");
    let catalog = await ctx.data.get<Mode[]>("catalog", []);
    let pins = await ctx.data.get<string[]>("pins", []);
    const bars = new Set<HTMLElement>();

    ctx.css(`
      body.ggpp-ms-silent :is(.cdk-overlay-container, .cdk-overlay-pane, gem-menu) { opacity: 0 !important; pointer-events: none !important; }
      .ggpp-ms { display: inline-flex; align-items: center; gap: 2px; margin-inline: 2px; }
      .ggpp-ms:empty { display: none; }
      .ggpp-ms-chip {
        all: unset; box-sizing: border-box; height: 32px; padding: 0 10px; border-radius: 16px; cursor: pointer; white-space: nowrap;
        font: 500 13px/32px "Google Sans", var(--ggpp-font); color: var(--gem-sys-color--on-surface-variant, currentColor);
      }
      .ggpp-ms-chip:hover { background: rgb(127 127 127 / 14%); }
      .ggpp-ms-chip[aria-pressed='true'] { color: #ff7a17; }
      .ggpp-ms-chip:focus-visible { outline: 2px solid var(--ggpp-accent); }
      body.ggpp-ms-hide bard-mode-switcher { display: none !important; }
      .ggpp-ms-row { display: flex; align-items: center; gap: 8px; padding: 6px 0; }
      .ggpp-ms-row > span { flex: 1; min-width: 0; }
      .ggpp-ms-row small { display: block; color: var(--ggpp-fg-3); }
    `);

    const trigger = () => gemini.q(gemini.SEL.modeButton);
    const currentName = () => trigger()?.getAttribute("aria-label")?.match(/currently\s+(.+)$/i)?.[1]?.trim() ?? trigger()?.innerText.trim() ?? "";
    const isCurrent = (m: Mode) => {
      const cur = currentName().toLowerCase();
      return !!cur && (m.name.toLowerCase() === cur || m.name.toLowerCase().endsWith(` ${cur}`));
    };

    function learn(items: HTMLElement[]) {
      const found = items.map((el) => {
        const lines = el.innerText.split("\n").map((l) => l.trim()).filter(Boolean);
        return { id: el.dataset.testId!.replace("bard-mode-option-", ""), name: lines[0] ?? "", hint: lines.slice(1).join(" ") };
      });
      if (!found.length || JSON.stringify(found) === JSON.stringify(catalog)) return;
      catalog = found;
      pins = pins.filter((p) => catalog.some((m) => m.id === p));
      void ctx.data.set("catalog", catalog);
      render();
    }
    // Learn the catalog whenever the picker is opened.
    ctx.cleanup(gemini.watch(OPTION, () => void nextFrame(() => learn(gemini.qa(OPTION)))));

    async function silently<T>(fn: () => Promise<T>): Promise<T | undefined> {
      const btn = trigger();
      if (!btn) return undefined;
      document.body.classList.add("ggpp-ms-silent");
      try {
        btn.click();
        return await fn();
      } finally {
        await sleep(30);
        if (document.querySelector(OPTION)) {
          document.querySelector<HTMLElement>(".cdk-overlay-backdrop")?.click();
          document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
        }
        await sleep(200);
        document.body.classList.remove("ggpp-ms-silent");
      }
    }

    async function waitOptions() {
      for (let i = 0; i < 30; i++) {
        const items = gemini.qa(OPTION);
        if (items.length) return items;
        await sleep(50);
      }
      return [];
    }

    async function pick(id: string) {
      await silently(async () => {
        const items = await waitOptions();
        learn(items);
        items.find((el) => el.dataset.testId === `bard-mode-option-${id}`)?.click();
      });
      setTimeout(render, 300);
    }

    /** Cheap update of which chip is active, without rebuilding the chips. */
    function syncActive() {
      for (const chip of document.querySelectorAll<HTMLElement>(".ggpp-ms-chip")) {
        const m = catalog.find((x) => x.id === chip.dataset.mode);
        if (m) chip.setAttribute("aria-pressed", String(isCurrent(m)));
      }
    }
    ctx.setInterval(syncActive, 1500);

    function render() {
      const list = pins.map((p) => catalog.find((m) => m.id === p)).filter((m): m is Mode => !!m);
      document.body.classList.toggle("ggpp-ms-hide", ctx.settings.hideNativeTrigger && list.length > 0);
      bars.forEach((bar) =>
        bar.replaceChildren(
          ...list.map((m) =>
            h(
              "button",
              {
                class: "ggpp-ms-chip",
                type: "button",
                title: m.hint ? `${m.name} — ${m.hint}` : m.name,
                "aria-pressed": String(isCurrent(m)),
                dataset: { mode: m.id },
                onclick: (e: Event) => {
                  e.stopPropagation();
                  if (!isCurrent(m)) void pick(m.id);
                },
              },
              m.name,
            ),
          ),
        ),
      );
    }

    ctx.cleanup(
      gemini.watch("bard-mode-switcher", (sw) => {
        const host = sw.closest(".model-picker-container") ?? sw;
        const bar = h("span", { class: "ggpp-ms" });
        host.before(bar);
        bars.add(bar);
        render();
        // Keep the active chip in sync with the picker label.
        // Gemini may swap the whole button when the model changes, so watch the switcher subtree.
        const mo = new MutationObserver(() => nextFrame(syncActive));
        mo.observe(sw, { attributes: true, attributeFilter: ["aria-label"], childList: true, subtree: true, characterData: true });
        return () => {
          mo.disconnect();
          bar.remove();
          bars.delete(bar);
        };
      }),
    );
    ctx.cleanup(() => document.body.classList.remove("ggpp-ms-hide", "ggpp-ms-silent"));
    ctx.on("settings:betterModeSelect", render);

    // Lets other plugins (BetterQueue) read and switch the model.
    ctx.provide("models", {
      current: () => catalog.find(isCurrent)?.name ?? currentName(),
      list: () => catalog,
      async pickByName(name: string) {
        const m = catalog.find((x) => x.name === name);
        if (!m || isCurrent(m)) return !!m;
        await pick(m.id);
        return true;
      },
    } satisfies ModelsApi);


    window.addEventListener(
      "keydown",
      (e) => {
        if (!ctx.settings.shortcut || e.key.toLowerCase() !== "m" || !e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.repeat || e.isComposing) return;
        if (isEditable(e.target) && !gemini.editor()?.contains(e.target as Node)) return;
        const list = pins.map((p) => catalog.find((m) => m.id === p)).filter((m): m is Mode => !!m);
        if (list.length < 2 || !trigger()) return;
        e.preventDefault();
        e.stopPropagation();
        const i = list.findIndex(isCurrent);
        void pick(list[(i + 1) % list.length].id);
      },
      { capture: true, signal: ctx.signal },
    );

    // Pin editor inside the plugin's settings dialog.
    ctx.provide("panel:betterModeSelect", (el: HTMLElement) => {
      const draw = () => {
        if (!catalog.length) {
          el.replaceChildren(
            h("p", { class: "ggpp-muted" }, "Open Gemini's model picker once so GG++ can learn your models, or:"),
            ui.button("Learn models now", () => void silently(async () => learn(await waitOptions())).then(draw)),
          );
          return;
        }
        const ordered = [...pins.map((p) => catalog.find((m) => m.id === p)!).filter(Boolean), ...catalog.filter((m) => !pins.includes(m.id))];
        el.replaceChildren(
          h("div", { class: "ggpp-section-label" }, "Pinned models"),
          ...ordered.map((m) => {
            const i = pins.indexOf(m.id);
            const move = (d: number) => {
              const j = i + d;
              if (i < 0 || j < 0 || j >= pins.length) return;
              [pins[i], pins[j]] = [pins[j], pins[i]];
              void ctx.data.set("pins", pins);
              draw();
              render();
            };
            return h(
              "div",
              { class: "ggpp-ms-row" },
              h("span", null, m.name, m.hint && h("small", null, m.hint)),
              ui.iconButton(I.chevronDown, "Move down", () => move(1)),
              ui.iconButton(["M18 15l-6-6-6 6"], "Move up", () => move(-1)),
              ui.switch(i >= 0, (on) => {
                pins = on ? [...pins, m.id] : pins.filter((p) => p !== m.id);
                void ctx.data.set("pins", pins);
                draw();
                render();
              }),
            );
          }),
        );
      };
      draw();
    });
  },
});
