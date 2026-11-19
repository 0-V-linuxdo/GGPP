/**
 * DOM helpers. Gemini enforces Trusted Types, so nothing here ever assigns
 * HTML strings: every node is built with createElement / createElementNS.
 */

/** Marks nodes GG++ created, so a later GG++ instance can remove what a dead one left behind. */
export const OWN = "data-ggpp-own";

type Child = Node | string | number | false | null | undefined | Child[];
type Props = Record<string, any> & {
  class?: string;
  style?: Partial<CSSStyleDeclaration> | Record<string, string>;
  dataset?: Record<string, string>;
};

function append(el: Element, child: Child) {
  if (child === null || child === undefined || child === false) return;
  if (Array.isArray(child)) child.forEach((c) => append(el, c));
  else el.append(child instanceof Node ? child : String(child));
}

function applyProps(el: Element, props: Props) {
  for (const [key, value] of Object.entries(props)) {
    if (value === undefined || value === null || value === false) continue;
    if (key === "class") el.setAttribute("class", value);
    else if (key === "style") {
      for (const [k, v] of Object.entries(value)) {
        if (k.startsWith("--")) (el as HTMLElement).style.setProperty(k, v as string);
        else ((el as HTMLElement).style as any)[k] = v;
      }
    } else if (key === "dataset") Object.assign((el as HTMLElement).dataset, value);
    else if (key.startsWith("on") && typeof value === "function") {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (key in el && !(el instanceof SVGElement)) (el as any)[key] = value;
    else el.setAttribute(key, value === true ? "" : String(value));
  }
}

export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props?: Props | null,
  ...children: Child[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  el.setAttribute(OWN, "");
  if (props) applyProps(el, props);
  children.forEach((c) => append(el, c));
  return el;
}

const SVG_NS = "http://www.w3.org/2000/svg";

export function svg(tag: string, props?: Props | null, ...children: Child[]): SVGElement {
  const el = document.createElementNS(SVG_NS, tag) as SVGElement;
  if (props) applyProps(el, props);
  children.forEach((c) => append(el, c));
  return el;
}

/** Stroke icon from 24x24 path data (Lucide-style geometry). */
export function icon(paths: string[], size = 18, extra?: Props): SVGElement {
  return svg(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 2,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": "true",
      class: "ggpp-icon",
      ...extra,
    },
    paths.map((d) => svg("path", { d })),
  );
}

export function debounce<A extends unknown[]>(fn: (...a: A) => void, ms: number) {
  let t: ReturnType<typeof setTimeout> | undefined;
  const wrapped = (...a: A) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), ms);
  };
  wrapped.cancel = () => clearTimeout(t);
  return wrapped;
}

export function isVisible(el: Element | null | undefined): el is HTMLElement {
  if (!el || !(el as HTMLElement).isConnected) return false;
  const r = el.getBoundingClientRect();
  return r.width > 0 && r.height > 0;
}

export function onReady(fn: () => void) {
  if (document.body) fn();
  else document.addEventListener("DOMContentLoaded", fn, { once: true });
}

/** Is the event target an editable field (so global shortcuts should back off)? */
export function isEditable(target: EventTarget | null) {
  const el = target as HTMLElement | null;
  if (!el) return false;
  return el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
}

export function download(filename: string, content: string | Blob, type = "text/plain") {
  const blob = content instanceof Blob ? content : new Blob([content], { type: `${type};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = h("a", { href: url, download: filename, style: { display: "none" } });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function uid(prefix = "id") {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Run fn on the next animation frame, or after 100 ms if frames are paused
 * (occluded windows and background panes can stall rAF while the page still counts as visible).
 */
export function nextFrame(fn: () => void) {
  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    fn();
  };
  requestAnimationFrame(run);
  setTimeout(run, 100);
}

/**
 * Remove everything an earlier GG++ instance left in the page. When the extension is reloaded or
 * updated, the old content script is cut off but its elements and classes stay behind.
 */
export function sweepLeftovers() {
  document.querySelectorAll(`[${OWN}], style[data-ggpp], link[data-ggpp], .ggpp-native-item, canvas.ggpp-starry`).forEach((n) => n.remove());
  for (const el of document.querySelectorAll<HTMLElement>("[class*='ggpp-']")) {
    [...el.classList].filter((c) => c.startsWith("ggpp-")).forEach((c) => el.classList.remove(c));
  }
  for (const el of document.querySelectorAll<HTMLElement>("*")) {
    for (const attr of [...el.attributes]) {
      if (!attr.name.startsWith("data-ggpp")) continue;
      if (attr.name === "data-ggpp-label") el.setAttribute("aria-label", attr.value);
      if (attr.name === "data-ggpp-blocked") el.style.removeProperty("display");
      if (attr.name === "data-ggpp-original" && el instanceof HTMLImageElement) el.src = attr.value;
      el.removeAttribute(attr.name);
    }
    for (const prop of [...el.style].filter((p) => p.startsWith("--ggpp-"))) el.style.removeProperty(prop);
  }
  delete document.documentElement.dataset.ggppTheme;
}
