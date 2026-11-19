import { definePlugin } from "../../shims/types";
import { nextFrame } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import type { GeminiApi, ResponseEvent } from "../gemini";

/** Tab icon that shows the current chat's state: generating, done, draft ready or error. */

type State = "idle" | "rotate" | "done" | "ready" | "error";

const COLORS: Record<Exclude<State, "idle">, string> = {
  rotate: "#3B82F6",
  done: "#22C55E",
  ready: "#F59E0B",
  error: "#EF4444",
};
const EMOJI: Record<Exclude<State, "idle">, string> = { rotate: "🔄", done: "✔️", ready: "👍", error: "🚫" };

/** Gemini's four-point spark on a 64 grid. */
const SPARK = "M32 6C32 21 43 32 58 32C43 32 32 43 32 58C32 43 21 32 6 32C21 32 32 21 32 6Z";
const GRADIENT = `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4285F4"/><stop offset=".6" stop-color="#9B72CB"/><stop offset="1" stop-color="#D96570"/></linearGradient>`;

const GLYPH: Record<Exclude<State, "idle">, string> = {
  rotate: `<path d="M45 49a6 6 0 1 0 6-6" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 51 49" to="360 51 49" dur=".85s" repeatCount="indefinite"/></path>`,
  done: `<path d="M46 49l4 4 7-8" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>`,
  ready: `<path d="M51 56V43M45.5 48.5L51 43l5.5 5.5" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>`,
  error: `<path d="M46.5 44.5l9 9M55.5 44.5l-9 9" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/>`,
};

function svgFor(style: string, state: State): string | null {
  const wrap = (body: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs>${GRADIENT}</defs>${body}</svg>`;
  if (style === "original") {
    return state === "idle" ? null : wrap(`<text x="32" y="50" font-size="48" text-anchor="middle">${EMOJI[state]}</text>`);
  }
  const color = state === "idle" ? "" : COLORS[state];
  const tile = (fill: string) => `<rect width="64" height="64" rx="16" fill="${fill}"/>`;
  switch (style) {
    case "hole":
      return wrap(`${tile("#131314")}<path d="${SPARK}" fill="${color || "url(#g)"}" transform="translate(6 6) scale(.81)"/>`);
    case "bg":
      return wrap(`${tile(color || "#131314")}<path d="${SPARK}" fill="${color ? "#fff" : "url(#g)"}" transform="translate(6 6) scale(.81)"/>`);
    case "dot":
      return wrap(
        `<path d="${SPARK}" fill="url(#g)"/>${color ? `<circle cx="50" cy="50" r="11" fill="#131314"/><circle cx="50" cy="50" r="8" fill="${color}"/>` : ""}`,
      );
    case "badge":
      return wrap(
        `<path d="${SPARK}" fill="url(#g)"/>${state === "idle" ? "" : `<circle cx="51" cy="49" r="13" fill="#131314"/><circle cx="51" cy="49" r="10.5" fill="${color}"/>${GLYPH[state]}`}`,
      );
    default:
      return null;
  }
}

export default definePlugin({
  id: "chatStateFavicons",
  name: "ChatStateFavicons",
  description: "The tab icon shows the chat's state: generating, done, draft ready or error.",
  tags: ["Notifications"],
  icon: I.favicon,
  enabledByDefault: true,
  updated: "2026-10-14",
  dependencies: ["gemini"],
  settings: {
    style: {
      type: "select",
      label: "Style",
      description: "How the state is drawn on the Gemini spark.",
      default: "badge",
      options: [
        { value: "badge", label: "Badge + glyph" },
        { value: "dot", label: "Color dot" },
        { value: "hole", label: "Spark tint" },
        { value: "bg", label: "Background tint" },
        { value: "original", label: "Emoji only" },
      ],
    },
  },
  start(ctx) {
    const gemini = ctx.use<GeminiApi>("gemini");
    const style = ctx.settings.style;

    let conversation = gemini.route().conversationId;
    let typedSinceSwitch = true;
    let justFinished = false;
    let lastError = false;
    let interrupted = false;
    let current: State | null = null;
    let link: HTMLLinkElement | null = null;
    const original = [...document.querySelectorAll<HTMLLinkElement>("link[rel~='icon']")].map((l) => ({ el: l, href: l.href }));

    const hasDraft = () => !!gemini.editorText().replace(/​/g, "").trim();

    function compute(): State {
      const generating = gemini.isGenerating();
      const draft = hasDraft() && typedSinceSwitch;
      if (interrupted && !generating) return draft ? "ready" : "idle";
      if (lastError && !generating) return "error";
      if (generating) return draft ? "ready" : "rotate";
      if (justFinished) {
        if (!hasDraft()) return "done";
        justFinished = false;
        return "ready";
      }
      return draft ? "ready" : "idle";
    }

    function apply(state: State) {
      if (state === current && link?.isConnected) return;
      current = state;
      const svg = svgFor(style, state);
      if (!svg) {
        link?.remove();
        link = null;
        for (const o of original) {
          o.el.href = o.href;
          if (!o.el.isConnected) document.head.append(o.el);
        }
        return;
      }
      for (const l of document.querySelectorAll<HTMLLinkElement>("link[rel~='icon']")) if (l !== link) l.remove();
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        link.type = "image/svg+xml";
        link.dataset.ggpp = "favicon";
      }
      link.dataset.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
      link.setAttribute("href", link.dataset.href);
      if (!link.isConnected) document.head.append(link);
    }

    let queued = false;
    const update = () => {
      if (queued) return;
      queued = true;
      nextFrame(() => {
        queued = false;
        apply(compute());
      });
    };

    ctx.on("gemini:generating", (on: boolean) => {
      if (on) {
        lastError = false;
        interrupted = false;
        justFinished = false;
      }
      update();
    });
    ctx.on("gemini:response-end", (e: ResponseEvent) => {
      if (e.conversationId !== gemini.route().conversationId) return;
      lastError = !!e.error;
      interrupted = !!e.interrupted;
      justFinished = !e.error && !e.interrupted;
      apply(compute());
    });
    ctx.on("gemini:route", () => {
      const id = gemini.route().conversationId;
      if (id === conversation) return;
      conversation = id;
      typedSinceSwitch = false;
      justFinished = false;
      lastError = false;
      interrupted = false;
      update();
    });
    const onInput = (e: Event) => {
      if (!gemini.editor()?.contains(e.target as Node)) return;
      typedSinceSwitch = true;
      update();
    };
    document.addEventListener("input", onInput, { capture: true, signal: ctx.signal });
    document.addEventListener("compositionend", onInput, { capture: true, signal: ctx.signal });

    // Keep our icon the only one when Gemini re-adds its own.
    const mo = new MutationObserver(() => {
      const ours = link?.dataset.href;
      if (link && (!link.isConnected || link.getAttribute("href") !== ours || document.querySelectorAll("link[rel~='icon']").length > 1)) {
        current = null;
        update();
      }
    });
    mo.observe(document.head, { childList: true, subtree: true, attributes: true, attributeFilter: ["href", "rel"] });
    ctx.cleanup(() => mo.disconnect());
    // Background tabs pause rAF; keep the icon fresh there too.
    ctx.setInterval(() => document.hidden && apply(compute()), 1000);

    apply(compute());
    ctx.cleanup(() => {
      link?.remove();
      for (const o of original) {
        o.el.href = o.href;
        if (!o.el.isConnected) document.head.append(o.el);
      }
    });
  },
});
