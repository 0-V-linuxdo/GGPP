import { definePlugin } from "../../shims/types";
import { h, icon } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import type { GeminiApi } from "../gemini";

/** Code blocks in replies start collapsed to a few lines, with a toggle to expand. */

export default definePlugin({
  id: "autoCollapse",
  name: "AutoCollapse",
  description: "Start code blocks in replies collapsed, with a button to expand them.",
  tags: ["Messages"],
  icon: I.fold,
  updated: "2026-10-14",
  dependencies: ["gemini"],
  settings: {
    minLines: { type: "number", label: "Collapse after", description: "Only collapse blocks longer than this many lines.", default: 8, min: 1, max: 200, unit: "lines" },
    previewLines: { type: "number", label: "Preview", description: "Lines left visible while collapsed.", default: 4, min: 0, max: 50, unit: "lines" },
  },
  start(ctx) {
    const gemini = ctx.use<GeminiApi>("gemini");
    const { minLines, previewLines } = ctx.settings;
    ctx.css(`
      code-block.ggpp-collapsed pre { max-height: calc(${previewLines} * 1.5em + 24px); overflow: hidden !important; mask-image: linear-gradient(#000 60%, transparent); }
      .ggpp-cb-toggle {
        all: unset; display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%; padding: 6px 0;
        font: 500 12px/16px var(--ggpp-font); color: var(--gem-sys-color--on-surface-variant, currentColor); cursor: pointer;
      }
      .ggpp-cb-toggle:hover { text-decoration: underline; }
      code-block:not(.ggpp-collapsed) .ggpp-cb-toggle svg { transform: rotate(180deg); }
    `);

    const done = new WeakSet<HTMLElement>();
    function setup(block: HTMLElement) {
      if (done.has(block)) return;
      const lines = (block.querySelector("pre")?.textContent ?? "").split("\n").length;
      if (lines <= minLines) return;
      done.add(block);
      block.classList.add("ggpp-collapsed");
      const label = h("span");
      const sync = () => (label.textContent = block.classList.contains("ggpp-collapsed") ? `Show all ${lines} lines` : "Collapse");
      const btn = h("button", { class: "ggpp-cb-toggle", type: "button", onclick: () => (block.classList.toggle("ggpp-collapsed"), sync()) }, icon(I.chevronDown, 14), label);
      sync();
      block.append(btn);
      return () => {
        btn.remove();
        block.classList.remove("ggpp-collapsed");
      };
    }

    // Wait for streaming blocks to finish so the line count is final.
    const scan = () => {
      if (gemini.isGenerating()) return;
      for (const b of gemini.qa(`${gemini.SEL.modelResponse} ${gemini.SEL.codeBlock}`)) {
        const undo = setup(b);
        if (undo) undos.push(undo);
      }
    };
    const undos: (() => void)[] = [];
    ctx.cleanup(() => undos.forEach((u) => u()));
    ctx.cleanup(gemini.watch(`${gemini.SEL.modelResponse} ${gemini.SEL.codeBlock}`, () => void setTimeout(scan, 200)));
    ctx.on("gemini:response-end", () => setTimeout(scan, 300));
  },
});
