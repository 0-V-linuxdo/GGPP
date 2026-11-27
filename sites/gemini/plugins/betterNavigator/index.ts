import { definePlugin } from "../../shims/types";
import { h, isEditable, nextFrame } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import { truncate } from "../../../../src/lib/text";
import type { GeminiApi, Message } from "../gemini";
import { filterNavMessages, isChromeNavText, navLabelText } from "./navItems";

/**
 * A Notion-style outline of the conversation: a tick rail at the right edge of
 * the chat with one tick per message, a hover list of every message, and
 * ↑ / ↓ / Home / End to jump between messages.
 */

export interface NavigatorApi {
  /** Jump to a message element (user-query or model-response). */
  jump(el: HTMLElement): void;
  /** Mark extra classes on ticks (used by MessageStars). */
  setMarks(marks: Set<HTMLElement>): void;
}

const READ_LINE = 0.28;
const LOCK_MS = 1000;
const TOP_OFFSET = 72;

export default definePlugin({
  id: "betterNavigator",
  name: "BetterNavigator",
  description: "An outline rail for long chats: hover to see every message, click or use ↑ / ↓ to jump.",
  tags: ["Navigation"],
  icon: I.scroll,
  enabledByDefault: true,
  updated: "2026-10-14",
  dependencies: ["gemini"],
  settings: {
    showAssistant: { type: "boolean", label: "Show replies", description: "List Gemini's replies in the outline, not only your messages.", default: true },
    jumpEffect: {
      type: "select",
      label: "Jump effect",
      description: "Highlight the message after jumping to it.",
      default: "border",
      options: [
        { value: "border", label: "Highlight border" },
        { value: "none", label: "None" },
      ],
    },
    keyboard: { type: "boolean", label: "Keyboard navigation", description: "↑ / ↓ / Home / End jump between messages when the message box is not focused; Ctrl/⌘ + ↑ / ↓ go to the top or bottom.", default: true },
  },
  start(ctx) {
    const gemini = ctx.use<GeminiApi>("gemini");
    const { showAssistant, jumpEffect } = ctx.settings;
    let items: Message[] = [];
    let current = -1;
    let lockUntil = 0;
    let marks = new Set<HTMLElement>();
    const labels = new WeakMap<HTMLElement, string>();

    ctx.css(`
      .ggpp-nav-rail {
        position: fixed; z-index: 30; display: flex; flex-direction: column; justify-content: center; align-items: flex-end;
        width: 2.5rem; transform: translateY(-50%);
      }
      .ggpp-nav-rail[hidden] { display: none; }
      .ggpp-nav-tick { all: unset; box-sizing: border-box; display: flex; justify-content: flex-end; align-items: center; width: 2.5rem; height: var(--ggpp-tick-h, .75rem); cursor: pointer; flex: none; }
      .ggpp-nav-tick::after { content: ""; height: 1px; width: .375rem; background: var(--ggpp-fg-3); transition: width .15s, background .15s; }
      .ggpp-nav-tick[data-role="model"]::after { width: .75rem; }
      .ggpp-nav-tick.ggpp-cur::after { width: 1rem; height: 2px; background: var(--ggpp-accent); }
      .ggpp-nav-tick.ggpp-live::after { background: none; border-top: 1px dashed var(--ggpp-fg-2); }
      .ggpp-nav-tick.ggpp-marked::after { background: #f59e0b; height: 2px; }
      .ggpp-nav-tick:focus-visible { outline: 2px solid var(--ggpp-accent); }
      .ggpp-nav-menu {
        position: absolute; right: 2.75rem; top: 50%; width: min(18rem, 70vw); max-height: 70vh; overflow: auto;
        padding: 8px; border-radius: 12px; background: var(--ggpp-surface); color: var(--ggpp-fg); box-shadow: var(--ggpp-shadow);
        font: 13px/18px var(--ggpp-font); opacity: 0; pointer-events: none; transform: translate(6px, -50%); transition: opacity .2s, transform .2s;
      }
      .ggpp-nav-rail:hover .ggpp-nav-menu, .ggpp-nav-rail:focus-within .ggpp-nav-menu, .ggpp-nav-rail.ggpp-open .ggpp-nav-menu { opacity: 1; pointer-events: auto; transform: translate(0, -50%); }
      .ggpp-nav-head { padding: 2px 8px 6px; color: var(--ggpp-fg-3); font-variant-numeric: tabular-nums; }
      .ggpp-nav-row { all: unset; box-sizing: border-box; display: flex; gap: 8px; width: 100%; padding: 5px 8px; border-radius: 8px; border: 1px solid transparent; cursor: pointer; }
      .ggpp-nav-row:hover, .ggpp-nav-row.ggpp-aim { background: var(--ggpp-hover); }
      .ggpp-nav-row.ggpp-cur { border-color: var(--ggpp-accent); }
      .ggpp-nav-row span:last-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .ggpp-nav-flash { outline: 2px solid var(--ggpp-accent) !important; outline-offset: 4px; border-radius: 12px; transition: outline-color .3s; }
      @media (prefers-reduced-motion: reduce) {
        .ggpp-nav-tick::after, .ggpp-nav-menu { transition: none; }
        .ggpp-nav-flash { outline: none !important; background: color-mix(in srgb, var(--ggpp-accent) 12%, transparent); }
      }
    `);

    const head = h("div", { class: "ggpp-nav-head" });
    const list = h("div", { role: "list" });
    const menu = h("div", { class: "ggpp-nav-menu" }, head, list);
    const ticks = h("div", { style: { display: "contents" } });
    const rail = h("nav", { class: "ggpp-nav-rail", "aria-label": "Conversation outline", hidden: true }, ticks, menu);
    document.body.append(rail);
    ctx.cleanup(() => rail.remove());

    function label(m: Message) {
      const cached = labels.get(m.el);
      if (cached && !(m.role === "model" && gemini.isGenerating())) return cached;
      let text = navLabelText(m.text);
      if (isChromeNavText(m.role, m.text)) text = "";
      if (!text) text = m.el.querySelector("img") ? "Image" : m.el.querySelector("uploader-file-preview, .file-preview-container *") ? "Attachment" : m.role === "model" && gemini.isGenerating() ? "Writing…" : "…";
      const out = truncate(text, 61);
      labels.set(m.el, out);
      return out;
    }

    function collect() {
      items = filterNavMessages(gemini.messages(), { showAssistant, generating: gemini.isGenerating() });
    }

    function render() {
      collect();
      rail.hidden = items.length < 2;
      if (rail.hidden) return;
      const live = gemini.isGenerating() && items.at(-1)?.role === "model" ? items.at(-1) : undefined;
      ticks.replaceChildren(
        ...items.map((m, i) =>
          h("button", {
            class: `ggpp-nav-tick${i === current ? " ggpp-cur" : ""}${m === live ? " ggpp-live" : ""}${marks.has(m.el) ? " ggpp-marked" : ""}`,
            type: "button",
            dataset: { role: m.role, i: String(i) },
            "aria-label": `Go to message ${i + 1} of ${items.length}`,
            onclick: () => jumpIndex(i),
            onmouseenter: () => aim(i),
          }),
        ),
      );
      list.replaceChildren(
        ...items.map((m, i) =>
          h(
            "button",
            { class: `ggpp-nav-row${i === current ? " ggpp-cur" : ""}`, type: "button", role: "listitem", dataset: { i: String(i) }, onclick: () => jumpIndex(i) },
            h("span", null, m.role === "user" ? "❓" : "🤖"),
            h("span", null, label(m)),
          ),
        ),
      );
      head.textContent = `${Math.max(current, 0) + 1} / ${items.length}`;
      place();
    }

    function place() {
      const scroller = gemini.scroller();
      if (!scroller || rail.hidden) return;
      const r = scroller.getBoundingClientRect();
      const composer = gemini.composer()?.getBoundingClientRect();
      const bottom = composer && composer.top > r.top ? composer.top : r.bottom;
      const height = bottom - Math.max(r.top, 0);
      const per = items.length > 16 ? 0.45 : 0.75;
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const fit = Math.max(2, Math.min(per * rem, (height - 32) / items.length));
      rail.dataset.ticks = String(items.length);
      rail.style.setProperty("--ggpp-tick-h", `${fit}px`);
      let left = r.right - 2.5 * rem - 0.75 * rem;
      // Other extensions (e.g. Gemini Voyager's timeline) put their own rail at the same edge; sit beside it.
      for (const other of document.querySelectorAll<HTMLElement>(".gemini-timeline-bar, [class*='timeline-bar']")) {
        if (rail.contains(other)) continue;
        const o = other.getBoundingClientRect();
        if (o.width && o.left < left + 2.5 * rem && o.right > left) left = o.left - 2.5 * rem - 8;
      }
      rail.style.left = `${left}px`;
      // Keep every tick on screen: clamp the centred rail inside the visible chat area.
      const total = fit * items.length;
      const lo = Math.max(r.top, 0) + total / 2 + 8;
      const hi = Math.min(bottom, innerHeight || bottom) - total / 2 - 8;
      rail.style.top = `${Math.min(Math.max((Math.max(r.top, 0) + bottom) / 2, lo), Math.max(lo, hi))}px`;
    }

    function aim(i: number) {
      list.querySelector(".ggpp-aim")?.classList.remove("ggpp-aim");
      const row = list.children[i] as HTMLElement | undefined;
      row?.classList.add("ggpp-aim");
      row?.scrollIntoView({ block: "nearest" });
    }

    function setCurrent(i: number) {
      if (i === current) return;
      current = i;
      ticks.querySelector(".ggpp-cur")?.classList.remove("ggpp-cur");
      list.querySelector(".ggpp-cur")?.classList.remove("ggpp-cur");
      ticks.children[i]?.classList.add("ggpp-cur");
      list.children[i]?.classList.add("ggpp-cur");
      head.textContent = `${i + 1} / ${items.length}`;
    }

    function track() {
      if (Date.now() < lockUntil || !items.length) return;
      const scroller = gemini.scroller();
      if (!scroller) return;
      if (scroller.scrollTop <= 4) return setCurrent(0);
      if (scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight <= 8) return setCurrent(items.length - 1);
      const r = scroller.getBoundingClientRect();
      const line = r.top + r.height * READ_LINE;
      let idx = 0;
      items.forEach((m, i) => {
        if (m.el.getBoundingClientRect().top <= line) idx = i;
      });
      setCurrent(idx);
    }

    function flash(el: HTMLElement) {
      if (jumpEffect === "none") return;
      const target = el.querySelector<HTMLElement>(".user-query-bubble-with-background, .markdown-main-panel") ?? el;
      target.classList.add("ggpp-nav-flash");
      const ms = matchMedia("(prefers-reduced-motion: reduce)").matches ? 1000 : 2000;
      setTimeout(() => target.classList.remove("ggpp-nav-flash"), ms);
    }

    function jump(el: HTMLElement) {
      const scroller = gemini.scroller();
      if (!scroller || !el.isConnected) return;
      const i = items.findIndex((m) => m.el === el);
      if (i >= 0) setCurrent(i);
      lockUntil = Date.now() + LOCK_MS;
      // Let the browser do the scrolling: Gemini's history scroller may be laid out bottom-up, which
      // breaks manual scrollTop arithmetic. Short messages are centred, tall ones start near the top.
      const go = () => {
        const sr = scroller.getBoundingClientRect();
        const tall = el.getBoundingClientRect().height > sr.height * 0.6;
        el.scrollIntoView({ block: tall ? "start" : "center", behavior: "auto" });
        if (tall) {
          const delta = el.getBoundingClientRect().top - scroller.getBoundingClientRect().top - TOP_OFFSET;
          if (Math.abs(delta) > 16) scroller.scrollBy({ top: delta });
        }
      };
      go();
      // Images and lazy content can shift layout right after the jump.
      setTimeout(go, 120);
      setTimeout(go, 400);
      flash(el);
    }
    const jumpIndex = (i: number) => items[i] && jump(items[i].el);

    let pendingRender = false;
    const scheduleRender = () => {
      if (pendingRender) return;
      pendingRender = true;
      setTimeout(() => {
        pendingRender = false;
        render();
        track();
      }, 150);
    };
    ctx.cleanup(gemini.watch(`${gemini.SEL.userQuery}, ${gemini.SEL.modelResponse}`, () => (scheduleRender(), scheduleRender)));
    ctx.on("gemini:route", () => {
      current = -1;
      scheduleRender();
    });
    ctx.on("gemini:generating", scheduleRender);
    ctx.on("gemini:response-end", () => setTimeout(render, 300));
    document.addEventListener("scroll", () => nextFrame(track), { capture: true, passive: true, signal: ctx.signal });
    window.addEventListener("resize", place, { signal: ctx.signal });
    ctx.setInterval(place, 1000);

    async function toEdge(top: boolean) {
      const scroller = gemini.scroller();
      if (!scroller) return;
      let cancelled = false;
      const cancel = () => (cancelled = true);
      for (const ev of ["wheel", "pointerdown", "touchstart"]) scroller.addEventListener(ev, cancel, { once: true, passive: true });
      if (!top) {
        scroller.scrollTop = scroller.scrollHeight;
        return;
      }
      // Gemini loads older turns when the top is reached; keep going until nothing new arrives.
      for (let tries = 0; tries < 40 && !cancelled; tries++) {
        const before = scroller.scrollHeight;
        scroller.scrollTop = 0;
        await new Promise((r) => setTimeout(r, 400));
        if (scroller.scrollHeight === before) break;
      }
    }

    document.addEventListener(
      "keydown",
      (e) => {
        if (!ctx.settings.keyboard || rail.hidden || isEditable(e.target) || e.isComposing) return;
        if (document.querySelector("#ggpp-layer .ggpp-backdrop")) return;
        if (e.key === "Escape") {
          rail.classList.remove("ggpp-open");
          return;
        }
        if ((e.ctrlKey || e.metaKey) && !e.altKey && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
          e.preventDefault();
          void toEdge(e.key === "ArrowUp");
          return;
        }
        if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
        const map: Record<string, number> = { ArrowUp: current - 1, ArrowDown: current + 1, Home: 0, End: items.length - 1 };
        if (!(e.key in map)) return;
        const i = Math.min(items.length - 1, Math.max(0, map[e.key]));
        e.preventDefault();
        jumpIndex(i);
        aim(i);
      },
      { signal: ctx.signal },
    );

    ctx.provide("navigator", {
      jump,
      setMarks(m) {
        marks = m;
        render();
      },
    } satisfies NavigatorApi);
    render();
  },
});
