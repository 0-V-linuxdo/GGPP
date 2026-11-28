import { definePlugin } from "../../shims/types";
import { nextFrame } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import type { GeminiApi, ResponseEvent } from "../gemini";

/** Tab icon that shows the current chat's state: generating, done, draft ready or error. */

export type FaviconState = "idle" | "rotate" | "done" | "ready" | "error";

export const ICON_LINK_SEL =
  "link[rel~='icon'], link[rel='apple-touch-icon' i], link[rel='apple-touch-icon-precomposed' i], link[rel='mask-icon' i]";

const COLORS: Record<Exclude<FaviconState, "idle">, string> = {
  rotate: "#3B82F6",
  done: "#22C55E",
  ready: "#F59E0B",
  error: "#EF4444",
};
const EMOJI: Record<Exclude<FaviconState, "idle">, string> = { rotate: "🔄", done: "✔️", ready: "👍", error: "🚫" };

/** Gemini's four-point spark on a 64 grid. */
const SPARK = "M32 6C32 21 43 32 58 32C43 32 32 43 32 58C32 43 21 32 6 32C21 32 32 21 32 6Z";
const GRADIENT = `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4285F4"/><stop offset=".6" stop-color="#9B72CB"/><stop offset="1" stop-color="#D96570"/></linearGradient>`;
const FAVICON_PX = 32;

function glyphSvg(state: Exclude<FaviconState, "idle">, angle: number): string {
  if (state === "rotate") {
    return `<path d="M45 49a6 6 0 1 0 6-6" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" transform="rotate(${angle} 51 49)"/>`;
  }
  if (state === "done") {
    return `<path d="M46 49l4 4 7-8" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  if (state === "ready") {
    return `<path d="M51 56V43M45.5 48.5L51 43l5.5 5.5" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  return `<path d="M46.5 44.5l9 9M55.5 44.5l-9 9" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/>`;
}

export function svgFor(style: string, state: FaviconState, angle = 0): string | null {
  const wrap = (body: string) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="32" height="32"><defs>${GRADIENT}</defs>${body}</svg>`;
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
        `<path d="${SPARK}" fill="url(#g)"/>${state === "idle" ? "" : `<circle cx="51" cy="49" r="13" fill="#131314"/><circle cx="51" cy="49" r="10.5" fill="${color}"/>${glyphSvg(state, angle)}`}`,
      );
    default:
      return null;
  }
}

export function computeFaviconState(input: {
  generating: boolean;
  draft: boolean;
  hasDraft: boolean;
  interrupted: boolean;
  lastError: boolean;
  justFinished: boolean;
}): { state: FaviconState; justFinished: boolean } {
  const { generating, draft, hasDraft, interrupted, lastError } = input;
  if (interrupted && !generating) return { state: draft ? "ready" : "idle", justFinished: false };
  if (lastError && !generating) return { state: "error", justFinished: false };
  if (generating) return { state: "rotate", justFinished: false };
  if (input.justFinished) {
    if (!hasDraft) return { state: "done", justFinished: true };
    return { state: "ready", justFinished: false };
  }
  return { state: draft ? "ready" : "idle", justFinished: false };
}

function svgDataUrl(svg: string): string {
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

function paintSpark(ctx: CanvasRenderingContext2D, fill: string | CanvasGradient) {
  ctx.fillStyle = fill;
  ctx.fill(new Path2D(SPARK));
}

function sparkGradient(ctx: CanvasRenderingContext2D) {
  const g = ctx.createLinearGradient(6, 58, 58, 6);
  g.addColorStop(0, "#4285F4");
  g.addColorStop(0.6, "#9B72CB");
  g.addColorStop(1, "#D96570");
  return g;
}

function roundTile(ctx: CanvasRenderingContext2D, fill: string) {
  ctx.fillStyle = fill;
  if (typeof ctx.roundRect === "function") {
    ctx.beginPath();
    ctx.roundRect(0, 0, 64, 64, 16);
    ctx.fill();
    return;
  }
  ctx.fillRect(0, 0, 64, 64);
}

function paintGlyph(ctx: CanvasRenderingContext2D, state: Exclude<FaviconState, "idle">, angle: number) {
  ctx.save();
  ctx.strokeStyle = "#fff";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = 3.2;
  if (state === "rotate") {
    ctx.translate(51, 49);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.translate(-51, -49);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(51, 49, 6, -0.2 * Math.PI, 1.35 * Math.PI);
    ctx.stroke();
  } else if (state === "done") {
    ctx.beginPath();
    ctx.moveTo(46, 49);
    ctx.lineTo(50, 53);
    ctx.lineTo(57, 45);
    ctx.stroke();
  } else if (state === "ready") {
    ctx.beginPath();
    ctx.moveTo(51, 56);
    ctx.lineTo(51, 43);
    ctx.moveTo(45.5, 48.5);
    ctx.lineTo(51, 43);
    ctx.lineTo(56.5, 48.5);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(46.5, 44.5);
    ctx.lineTo(55.5, 53.5);
    ctx.moveTo(55.5, 44.5);
    ctx.lineTo(46.5, 53.5);
    ctx.stroke();
  }
  ctx.restore();
}

function paintBadge(ctx: CanvasRenderingContext2D, state: Exclude<FaviconState, "idle">, angle: number) {
  ctx.beginPath();
  ctx.fillStyle = "#131314";
  ctx.arc(51, 49, 13, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = COLORS[state];
  ctx.arc(51, 49, 10.5, 0, Math.PI * 2);
  ctx.fill();
  paintGlyph(ctx, state, angle);
}

function paintOnCanvas(style: string, state: FaviconState, angle: number): string | null {
  const svg = svgFor(style, state, angle);
  if (!svg) return null;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = FAVICON_PX;
  const ctx = canvas.getContext("2d");
  if (!ctx || typeof Path2D !== "function") return svgDataUrl(svg);
  ctx.scale(FAVICON_PX / 64, FAVICON_PX / 64);
  const color = state === "idle" ? "" : COLORS[state];
  if (style === "original" && state !== "idle") {
    ctx.font = "48px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(EMOJI[state], 32, 34);
    return canvas.toDataURL("image/png");
  }
  if (style === "hole") {
    roundTile(ctx, "#131314");
    ctx.save();
    ctx.translate(6, 6);
    ctx.scale(0.81, 0.81);
    paintSpark(ctx, color || sparkGradient(ctx));
    ctx.restore();
    return canvas.toDataURL("image/png");
  }
  if (style === "bg") {
    roundTile(ctx, color || "#131314");
    ctx.save();
    ctx.translate(6, 6);
    ctx.scale(0.81, 0.81);
    paintSpark(ctx, color ? "#fff" : sparkGradient(ctx));
    ctx.restore();
    return canvas.toDataURL("image/png");
  }
  paintSpark(ctx, sparkGradient(ctx));
  if (style === "dot" && color) {
    ctx.beginPath();
    ctx.fillStyle = "#131314";
    ctx.arc(50, 50, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(50, 50, 8, 0, Math.PI * 2);
    ctx.fill();
  } else if (style === "badge" && state !== "idle") {
    paintBadge(ctx, state, angle);
  }
  return canvas.toDataURL("image/png");
}

export function faviconHref(style: string, state: FaviconState, angle = 0): string | null {
  try {
    return paintOnCanvas(style, state, angle);
  } catch {
    const svg = svgFor(style, state, angle);
    return svg ? svgDataUrl(svg) : null;
  }
}

export default definePlugin({
  id: "chatStateFavicons",
  name: "ChatStateFavicons",
  description: "The tab icon shows the chat's state: generating, done, draft ready or error.",
  tags: ["Notifications"],
  icon: I.favicon,
  enabledByDefault: true,
  updated: "2026-11-28",
  dependencies: ["gemini"],
  liveSettings: true,
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

    let conversation = gemini.route().conversationId;
    let typedSinceSwitch = true;
    let justFinished = false;
    let lastError = false;
    let interrupted = false;
    let current: FaviconState | null = null;
    let lastStyle: string | null = null;
    let angle = 0;
    let link: HTMLLinkElement | null = null;
    let blobUrl: string | null = null;
    let applying = false;
    const original: { el: HTMLLinkElement; href: string; rel: string; type: string; sizes: string }[] = [];

    function forgetBlob() {
      if (!blobUrl) return;
      try {
        URL.revokeObjectURL(blobUrl);
      } catch {}
      blobUrl = null;
    }

    function toFaviconUrl(dataUrl: string): string {
      try {
        if (typeof URL === "undefined" || typeof atob !== "function" || typeof Blob !== "function") return dataUrl;
        const comma = dataUrl.indexOf(",");
        if (comma < 0 || !dataUrl.startsWith("data:")) return dataUrl;
        const mime = /data:([^;,]+)/.exec(dataUrl.slice(0, comma))?.[1] || "image/png";
        const bin = atob(dataUrl.slice(comma + 1));
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        const next = URL.createObjectURL(new Blob([bytes], { type: mime }));
        forgetBlob();
        blobUrl = next;
        return next;
      } catch {
        return dataUrl;
      }
    }

    const hasDraft = () => !!gemini.editorText().replace(/\u200b/g, "").trim();

    function compute(): FaviconState {
      const next = computeFaviconState({
        generating: gemini.isGenerating(),
        draft: hasDraft() && typedSinceSwitch,
        hasDraft: hasDraft(),
        interrupted,
        lastError,
        justFinished,
      });
      justFinished = next.justFinished;
      return next.state;
    }

    function remember(el: HTMLLinkElement) {
      if (el.dataset.ggpp === "favicon") return;
      if (original.some((o) => o.el === el)) return;
      original.push({
        el,
        href: el.getAttribute("href") || "",
        rel: el.rel,
        type: el.type,
        sizes: el.getAttribute("sizes") || "",
      });
    }

    function restore() {
      link?.remove();
      link = null;
      forgetBlob();
      for (const o of original) {
        if (o.href) o.el.setAttribute("href", o.href);
        if (o.rel) o.el.rel = o.rel;
        if (o.type) o.el.type = o.type;
        if (o.sizes) o.el.setAttribute("sizes", o.sizes);
        if (!o.el.isConnected) document.head.append(o.el);
      }
    }

    function others(): HTMLLinkElement[] {
      const ours = link?.getAttribute("href") || "";
      return [...document.querySelectorAll<HTMLLinkElement>(ICON_LINK_SEL)].filter(
        (l) => l !== link && l.getAttribute("href") !== ours,
      );
    }

    function apply(state: FaviconState, force = false) {
      const style = ctx.settings.style;
      if (style !== lastStyle) force = true;
      const href = faviconHref(style, state, state === "rotate" ? angle : 0);
      const extra = others();
      if (!force && state === current && link?.isConnected && extra.length === 0) {
        return;
      }
      applying = true;
      try {
        current = state;
        lastStyle = style;
        if (!href) {
          restore();
          return;
        }
        const painted = toFaviconUrl(href);
        const type = href.startsWith("data:image/svg") ? "image/svg+xml" : "image/png";
        for (const l of extra) {
          remember(l);
          l.rel = l.rel || "icon";
          l.type = type;
          l.setAttribute("href", painted);
        }
        link?.remove();
        link = document.createElement("link");
        link.id = "ggpp-favicon";
        link.rel = "icon";
        link.type = type;
        link.setAttribute("sizes", "32x32");
        link.dataset.ggpp = "favicon";
        document.head.append(link);
        link.setAttribute("href", painted);
      } finally {
        applying = false;
      }
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
        angle = 0;
      }
      update();
    });
    ctx.on("gemini:response-end", (e: ResponseEvent) => {
      if (e.conversationId !== gemini.route().conversationId) return;
      lastError = !!e.error;
      interrupted = !!e.interrupted;
      justFinished = !e.error && !e.interrupted;
      apply(compute(), true);
    });
    ctx.on("settings:chatStateFavicons", () => apply(compute(), true));
    ctx.on("gemini:route", () => {
      const id = gemini.route().conversationId;
      if (id === conversation) return;
      conversation = id;
      typedSinceSwitch = false;
      justFinished = false;
      lastError = false;
      interrupted = false;
      angle = 0;
      update();
    });
    const onInput = (e: Event) => {
      if (!gemini.editor()?.contains(e.target as Node)) return;
      typedSinceSwitch = true;
      update();
    };
    document.addEventListener("input", onInput, { capture: true, signal: ctx.signal });
    document.addEventListener("compositionend", onInput, { capture: true, signal: ctx.signal });

    const mo = new MutationObserver(() => {
      if (applying) return;
      if (!link?.isConnected || others().length) {
        current = null;
        update();
      }
    });
    mo.observe(document.head, { childList: true, subtree: true, attributes: true, attributeFilter: ["href", "rel"] });
    ctx.cleanup(() => mo.disconnect());
    ctx.setInterval(() => {
      const state = compute();
      if (state === "rotate") {
        angle = (angle + 45) % 360;
        apply(state, true);
        return;
      }
      if (document.hidden) apply(state);
    }, 200);

    apply(compute(), true);
    ctx.cleanup(() => restore());
  },
});
