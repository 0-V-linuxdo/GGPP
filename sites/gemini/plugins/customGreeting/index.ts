import { definePlugin } from "../../shims/types";
import { coerceListSetting } from "../../runtime";
import { h } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import type { GeminiApi } from "../gemini";

/** Your own rotating greetings on the Gemini home screen (and optionally the message box placeholder). */

export default definePlugin({
  id: "customGreeting",
  name: "CustomGreeting",
  description: "Replace the home greeting with your own phrases, rotating per visit, on a timer, or on click.",
  tags: ["Appearance"],
  icon: I.message,
  updated: "2026-10-14",
  dependencies: ["gemini"],
  settings: {
    phrases: {
      type: "list",
      label: "Phrases",
      description: "One greeting per row. Empty keeps Gemini's own.",
      placeholder: "What are we making today?",
      default: ["Stay hungry, stay foolish.", "The best way to predict the future is to invent it.", "Simplicity is the ultimate sophistication."],
    },
    mode: {
      type: "select",
      label: "Rotate",
      description: "When the greeting changes to the next phrase.",
      default: "refresh",
      options: [
        { value: "refresh", label: "Each visit to home" },
        { value: "interval", label: "On a timer" },
        { value: "manual", label: "When I click it" },
      ],
    },
    order: {
      type: "select",
      label: "Order",
      default: "sequential",
      options: [
        { value: "sequential", label: "Sequential" },
        { value: "random", label: "Random" },
      ],
    },
    intervalSec: { type: "number", label: "Timer", description: "Seconds between changes.", default: 10, min: 1, max: 3600, unit: "s", showIf: (v) => v.mode === "interval" },
    placeholder: { type: "boolean", label: "Message box placeholder", description: "Also show the current phrase as the message box placeholder.", default: false },
  },
  async start(ctx) {
    const gemini = ctx.use<GeminiApi>("gemini");
    const phrases = coerceListSetting(ctx.settings.phrases).map((p) => p.trim()).filter(Boolean);
    if (!phrases.length) return;
    let index = await ctx.data.get("index", -1);

    ctx.css(`
      .ggpp-greet-hidden { display: none !important; }
      .ggpp-greeting { margin: 0; text-align: center; white-space: pre-wrap; overflow-wrap: anywhere; }
      .ggpp-greeting.ggpp-clickable { cursor: pointer; user-select: text; }
    `);

    const next = () => {
      if (phrases.length === 1) index = 0;
      else if (ctx.settings.order === "random") {
        let n = index;
        while (n === index) n = Math.floor(Math.random() * phrases.length);
        index = n;
      } else index = (index + 1) % phrases.length;
      void ctx.data.set("index", index);
      paint();
    };

    const views = new Set<HTMLElement>();
    function paint() {
      const text = phrases[Math.max(0, index) % phrases.length];
      views.forEach((v) => (v.textContent = text));
      if (ctx.settings.placeholder) {
        const ed = gemini.editor();
        if (ed && ed.dataset.placeholder !== text) {
          ed.dataset.ggppPlaceholder ??= ed.dataset.placeholder ?? "";
          ed.dataset.placeholder = text;
        }
      }
    }

    ctx.cleanup(
      gemini.watch(gemini.SEL.greeting, (orig) => {
        // Our own heading copies Gemini's classes for styling, so it matches the same selector: skip it.
        if (orig.classList.contains("ggpp-greeting") || orig.previousElementSibling?.classList.contains("ggpp-greeting")) return;
        const classes = [...orig.classList].filter((c) => !c.startsWith("ggpp-") && c !== "greeting-headline").join(" ");
        const view = h("h1", {
          class: `ggpp-greeting ${classes}${ctx.settings.mode === "manual" && phrases.length > 1 ? " ggpp-clickable" : ""}`,
          onclick: () => {
            if (ctx.settings.mode !== "manual" || getSelection()?.toString()) return;
            next();
          },
        });
        // Look like Gemini's heading without reusing its class.
        const cs = getComputedStyle(orig);
        Object.assign(view.style, { font: cs.font, color: cs.color, letterSpacing: cs.letterSpacing, margin: cs.margin });
        orig.classList.add("ggpp-greet-hidden");
        orig.before(view);
        views.add(view);
        paint();
        return () => {
          view.remove();
          views.delete(view);
          orig.classList.remove("ggpp-greet-hidden");
        };
      }),
    );
    ctx.cleanup(() => {
      const ed = gemini.editor();
      if (ed?.dataset.ggppPlaceholder !== undefined) {
        ed.dataset.placeholder = ed.dataset.ggppPlaceholder;
        delete ed.dataset.ggppPlaceholder;
      }
    });

    if (index < 0 || ctx.settings.mode === "refresh") next();
    ctx.on("gemini:route", ({ route, prev }) => {
      if (ctx.settings.mode === "refresh" && route.isHome && !prev.isHome) next();
      else paint();
    });
    if (ctx.settings.mode === "interval" && phrases.length > 1) {
      ctx.setInterval(() => gemini.route().isHome && !document.hidden && next(), ctx.settings.intervalSec * 1000);
    }
  },
});
