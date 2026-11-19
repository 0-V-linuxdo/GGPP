import { definePlugin } from "../../shims/types";
import { I } from "../../../../src/lib/icons";
import type { GeminiApi } from "../gemini";

/**
 * Gemini shows your prompt as plain text, so "> " lines look like any other.
 * This marks those lines and draws them as a left-bar quote.
 */
export default definePlugin({
  id: "userQuotes",
  name: "UserQuotes",
  description: "Show \"> quoted\" lines in your own messages as a left-bar quote.",
  tags: ["Messages"],
  icon: I.quote,
  enabledByDefault: true,
  updated: "2026-10-14",
  dependencies: ["gemini"],
  settings: {
    italic: { type: "boolean", label: "Italic", description: "Render quoted lines in italic.", default: true },
  },
  start(ctx) {
    const gemini = ctx.use<GeminiApi>("gemini");
    ctx.css(`
      .ggpp-uq {
        display: block;
        border-inline-start: 0.25rem solid var(--gem-sys-color--on-surface-variant, currentColor);
        padding-inline-start: 0.75rem;
        opacity: .85;
        ${ctx.settings.italic ? "font-style: italic;" : ""}
      }
    `);
    const QUOTE = /^\s*>\s?/;
    ctx.cleanup(
      gemini.watch(`${gemini.SEL.userQuery} :is(.query-text-line, p)`, (line) => {
        if (!QUOTE.test(line.textContent ?? "")) return;
        line.classList.add("ggpp-uq");
        const first = [...line.childNodes].find((n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim()) as Text | undefined;
        const original = first?.textContent ?? null;
        if (first && original) first.textContent = original.replace(QUOTE, "");
        return () => {
          line.classList.remove("ggpp-uq");
          if (first && original !== null) first.textContent = original;
        };
      }),
    );
  },
});
