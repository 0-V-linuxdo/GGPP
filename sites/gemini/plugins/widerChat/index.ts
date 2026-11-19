import { definePlugin } from "../../shims/types";
import { nextFrame } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import type { GeminiApi } from "../gemini";

export default definePlugin({
  id: "widerChat",
  name: "WiderChat",
  description: "Let the conversation column and message box use more of a wide screen.",
  tags: ["Appearance"],
  icon: I.width,
  dependencies: ["gemini"],
  updated: "2026-10-14",
  settings: {
    width: { type: "number", label: "Maximum width", description: "Maximum chat width in rem.", default: 64, min: 40, max: 200, unit: "rem" },
    fullUserBubble: { type: "boolean", label: "Wide user bubbles", description: "Let your own messages use the full column width.", default: true },
  },
  start(ctx) {
    const gemini = ctx.use<GeminiApi>("gemini");
    const w = `${ctx.settings.width}rem`;
    ctx.css(`
      .ggpp-wide { max-width: ${w} !important; }
      /* Gemini also caps each block inside a reply (paragraphs, lists, code) and centers it. */
      model-response message-content .markdown > *,
      model-response message-content .markdown :is(p, ul, ol, h1, h2, h3, h4, h5, h6, blockquote, table, pre, code-block, hr, response-element, .table-block-component) {
        max-width: 100% !important;
      }
      ${ctx.settings.fullUserBubble ? "user-query :is(.user-query-container, .query-content, .user-query-bubble-with-background) { max-width: 100% !important; }" : ""}
    `);
    // Gemini caps the column on different wrappers across layouts, so find the ones that actually limit width.
    const marked = new Set<HTMLElement>();
    const widen = (from: Element | null, stop: string) => {
      for (let el = from as HTMLElement | null; el && !el.matches(stop); el = el.parentElement) {
        if (marked.has(el)) continue;
        const max = getComputedStyle(el).maxWidth;
        if (max !== "none" && max !== "100%") {
          el.classList.add("ggpp-wide");
          marked.add(el);
        }
      }
    };
    const scan = () => {
      for (const turn of gemini.qa(gemini.SEL.conversationTurn).slice(-3)) {
        widen(turn.querySelector(`${gemini.SEL.modelResponse} message-content`), "chat-window");
        widen(turn.querySelector(gemini.SEL.userQuery), "chat-window");
      }
      widen(gemini.q("input-area-v2"), "input-container");
    };
    ctx.cleanup(gemini.watch(`${gemini.SEL.conversationTurn}, input-area-v2`, () => void nextFrame(scan)));
    ctx.cleanup(() => marked.forEach((el) => el.classList.remove("ggpp-wide")));
  },
});
