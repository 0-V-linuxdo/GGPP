import { definePlugin } from "../../shims/types";
import { h, icon } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import type { GeminiApi } from "../gemini";

/**
 * Quote a passage from a reply into your message, then click the quoted lines
 * in the sent message to jump back to (and highlight) the passage they came from.
 */

const HIGHLIGHT_MS = 1800;
const norm = (s: string) => s.replace(/^[\s>*\-•\d.]+/gm, "").replace(/\s+/g, " ").trim().toLowerCase();

export default definePlugin({
  id: "betterQuotes",
  name: "BetterQuotes",
  description: "Quote selected reply text into your message, and click quoted lines to jump back to the passage.",
  tags: ["Messages", "Composer"],
  icon: I.quote,
  enabledByDefault: true,
  updated: "2026-10-14",
  dependencies: ["gemini"],
  settings: {
    quoteButton: { type: "boolean", label: "Quote button", description: "Show a Quote button when you select text in a reply.", default: true },
    jumpToPassage: { type: "boolean", label: "Jump to passage", description: "Click a quoted line in your message to jump to where it came from.", default: true },
  },
  start(ctx) {
    const gemini = ctx.use<GeminiApi>("gemini");
    const supportsHighlights = typeof CSS !== "undefined" && "highlights" in CSS && typeof Highlight !== "undefined";

    ctx.css(`
      .ggpp-quote-btn {
        position: fixed; z-index: 2147482500; display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px;
        border: 0; border-radius: 16px; background: var(--ggpp-fg); color: var(--ggpp-bg); box-shadow: var(--ggpp-shadow);
        font: 500 13px/18px var(--ggpp-font); cursor: pointer;
      }
      .ggpp-quote-btn[hidden] { display: none; }
      ::highlight(ggpp-quote) { background-color: color-mix(in srgb, #f59e0b 45%, transparent); }
      .ggpp-quote-box { outline: 2px solid #f59e0b; outline-offset: 3px; border-radius: 6px; }
      @media (prefers-reduced-motion: reduce) { .ggpp-quote-box { outline: none; background: rgb(127 127 127 / 14%); } }
      ${ctx.settings.jumpToPassage ? "user-query :is(.ggpp-uq, .ggpp-quote-line) { cursor: pointer; }" : ""}
    `);

    // ---------- quote button ----------
    if (ctx.settings.quoteButton) {
      const btn = h("button", { class: "ggpp-quote-btn", type: "button", hidden: true }, icon(I.quote, 14), "Quote");
      document.body.append(btn);
      ctx.cleanup(() => btn.remove());
      let pending = "";
      const place = () => {
        const sel = getSelection();
        const text = sel?.toString().trim() ?? "";
        const node = sel?.rangeCount ? sel.getRangeAt(0).commonAncestorContainer : null;
        const inReply = (node instanceof Element ? node : node?.parentElement)?.closest(gemini.SEL.modelResponse);
        if (!text || !inReply || sel!.isCollapsed) {
          btn.hidden = true;
          return;
        }
        pending = text;
        const r = sel!.getRangeAt(0).getBoundingClientRect();
        btn.hidden = false;
        btn.style.left = `${Math.min(innerWidth - 100, Math.max(8, r.left + r.width / 2 - 40))}px`;
        btn.style.top = `${r.top > 48 ? r.top - 40 : r.bottom + 8}px`;
      };
      document.addEventListener("mouseup", () => setTimeout(place, 10), { signal: ctx.signal });
      document.addEventListener("keyup", (e) => e.shiftKey && place(), { signal: ctx.signal });
      document.addEventListener("scroll", () => (btn.hidden = true), { capture: true, passive: true, signal: ctx.signal });
      btn.addEventListener("mousedown", (e) => e.preventDefault());
      btn.addEventListener("click", () => {
        const quoted = pending
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean)
          .map((l) => `> ${l}`)
          .join("\n");
        const existing = gemini.editorText().trim();
        gemini.setEditorText(`${existing ? `${existing}\n\n` : ""}${quoted}\n\n`);
        btn.hidden = true;
        getSelection()?.removeAllRanges();
      });
    }

    // ---------- jump to passage ----------
    if (!ctx.settings.jumpToPassage) return;

    // Mark lines in your messages that start with ">" (when UserQuotes is off they keep the marker).
    ctx.cleanup(
      gemini.watch(`${gemini.SEL.userQuery} ${gemini.SEL.userLine}`, (line) => {
        if (/^\s*>/.test(line.textContent ?? "")) line.classList.add("ggpp-quote-line");
        return () => line.classList.remove("ggpp-quote-line");
      }),
    );

    function highlight(target: HTMLElement, needle: string) {
      const scroller = gemini.scroller();
      const ranges: Range[] = [];
      if (supportsHighlights) {
        const key = norm(needle).slice(0, 48);
        const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
          const text = n.textContent ?? "";
          if (text.trim().length < 3) continue;
          const t = norm(text);
          if (t && (key.includes(t.slice(0, 24)) || t.includes(key.slice(0, 24)))) {
            const r = document.createRange();
            r.selectNodeContents(n);
            ranges.push(r);
          }
        }
      }
      const anchor = (ranges[0]?.startContainer.parentElement ?? target) as HTMLElement;
      anchor.scrollIntoView({ block: "center" });
      // Then keep it clear of the message box that floats over the bottom of the chat.
      if (scroller) {
        const sr = scroller.getBoundingClientRect();
        const composerTop = gemini.composer()?.getBoundingClientRect().top ?? sr.bottom;
        const mid = (sr.top + Math.min(sr.bottom, composerTop)) / 2;
        const ar = anchor.getBoundingClientRect();
        const delta = ar.top + ar.height / 2 - mid;
        if (Math.abs(delta) > 24) scroller.scrollBy({ top: delta });
      }
      if (ranges.length) {
        const hl = new Highlight(...ranges);
        CSS.highlights.set("ggpp-quote", hl);
        setTimeout(() => CSS.highlights.get("ggpp-quote") === hl && CSS.highlights.delete("ggpp-quote"), HIGHLIGHT_MS);
      } else {
        anchor.classList.add("ggpp-quote-box");
        setTimeout(() => anchor.classList.remove("ggpp-quote-box"), HIGHLIGHT_MS);
      }
    }

    function jump(fromUser: HTMLElement, needle: string) {
      const key = norm(needle).slice(0, 48);
      if (key.length < 6) return false;
      const msgs = gemini.messages();
      const upto = msgs.findIndex((m) => m.el === fromUser);
      let best: { el: HTMLElement; score: number } | null = null;
      for (const m of msgs.slice(0, upto < 0 ? msgs.length : upto)) {
        if (m.role !== "model") continue;
        const text = norm(m.text);
        let score = 0;
        for (let len = key.length; len >= 6; len = Math.floor(len * 0.75)) {
          if (text.includes(key.slice(0, len))) {
            score = len;
            break;
          }
        }
        if (score && (!best || score >= best.score)) best = { el: m.el, score };
      }
      if (!best) return false;
      highlight(best.el, needle);
      return true;
    }

    document.addEventListener(
      "click",
      (e) => {
        if (e.button !== 0 || getSelection()?.toString()) return;
        const line = (e.target as HTMLElement).closest?.<HTMLElement>("user-query :is(.ggpp-uq, .ggpp-quote-line, blockquote)");
        const user = line?.closest<HTMLElement>(gemini.SEL.userQuery);
        if (!line || !user) return;
        if (jump(user, line.textContent ?? "")) {
          e.preventDefault();
          e.stopPropagation();
        }
      },
      { capture: true, signal: ctx.signal },
    );
    ctx.cleanup(() => supportsHighlights && CSS.highlights.delete("ggpp-quote"));
  },
});
