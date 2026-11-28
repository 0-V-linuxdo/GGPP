import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  NATIVE_SIDEBAR_FLAG_SEL,
  NATIVE_SIDEBAR_SPINNER_SEL,
  placeStatusMark,
  rowHasNativeFlag,
  rowHasNativeGeneratingSpinner,
  rowHasNativeStatusChrome,
} from "./index";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../../../..");

const nativeGetComputedStyle = globalThis.getComputedStyle;

beforeAll(() => {
  globalThis.getComputedStyle = ((el: Element) => {
    const style = (el as { _style?: CSSStyleDeclaration })._style;
    return (
      style ??
      ({
        visibility: "visible",
        display: "block",
        opacity: "1",
        animationName: "none",
        borderRadius: "0px",
        borderTopColor: "",
        borderRightColor: "",
        borderLeftColor: "",
        borderBottomColor: "",
        borderTopWidth: "0px",
      } as unknown as CSSStyleDeclaration)
    );
  }) as typeof getComputedStyle;
});

afterAll(() => {
  globalThis.getComputedStyle = nativeGetComputedStyle;
});

describe("chatListStatus restore", () => {
  test("plugin is on by default and hides when native spinner or flag is visible", () => {
    const src = readFileSync(resolve(HERE, "index.ts"), "utf8");
    expect(src).toMatch(/enabledByDefault:\s*true/);
    expect(src).not.toMatch(/Off by default: Gemini already shows a spinner/);
    expect(src).toContain("rowHasNativeStatusChrome(row)");
    expect(src).toContain("rowHasNativeFlag");
    expect(src).toContain("placeStatusMark(row, mark)");
    expect(src).toContain("remy-goal-status-badge");
    expect(src).not.toContain("title.before(mark)");
    expect(src).not.toContain("right: 36px");
    expect(src).toContain("width: 16px");
    expect(src).toContain("currentColor");
    expect(src).not.toMatch(/if \(s === "live" && row\.querySelector\(/);
    expect(src).not.toMatch(/const PIN_SEL[\s\S]{0,500}aria-label\*='pin'/);
    expect(src).toContain("[aria-label='Pin' i]");
    expect(src).toContain("looksLikeTrailingRing");
    expect(src).toContain("isPinOnlyChrome");
    expect(src).toContain("looksLikeGeneratingMark");
    expect(src).toContain("rowHasExtraTrailingStatus");
    expect(src).toContain("hovered-trailing-content");
    expect(src).toContain("gem-icon");
    expect(src).toMatch(/status\.values\(\)[\s\S]{0,80}live[\s\S]{0,40}paint\(\)/);
    expect(src).toContain("}, 500)");
  });

  test("v2 restore re-enables retired profiles; old retire-off is gone", () => {
    const migrate = readFileSync(resolve(ROOT, "sites/gemini/migrate.ts"), "utf8");
    const site = readFileSync(resolve(ROOT, "sites/gemini/index.ts"), "utf8");
    expect(migrate).toContain('ggpp:restored-chatListStatus-v2');
    expect(migrate).toContain('chatListStatus: { enabled: true }');
    expect(migrate).toContain('U.setPluginEnabled?.("chatListStatus", true)');
    expect(migrate).not.toMatch(/setPluginEnabled\?\.\("chatListStatus", false\)/);
    expect(migrate).not.toContain("ggpp:retired-chatListStatus-v1");
    expect(site).toContain("retireRedundantPlugins()");
  });
});

function fakeEl(opts: {
  visible?: boolean;
  sel?: string;
  closest?: (s: string) => unknown;
  attrs?: Record<string, string>;
  html?: string;
  className?: string;
  tagName?: string;
  box?: { left: number; right: number; width: number; height: number };
  children?: Array<{ getAttribute: (n: string) => string | null }>;
  style?: Record<string, string>;
  kind?: string;
}) {
  const visible = opts.visible !== false;
  const size = visible ? 16 : 0;
  const box = opts.box ?? { left: 200, right: 216, width: size, height: size };
  const el = {
    isConnected: true,
    _kind: opts.kind,
    _style: opts.style,
    tagName: opts.tagName || "DIV",
    className: opts.className || "",
    getBoundingClientRect: () => ({ width: box.width, height: box.height, left: box.left, right: box.right, top: 0, bottom: box.height }),
    closest: opts.closest ?? ((s: string) => (opts.sel && s.includes(opts.sel) ? {} : null)),
    getAttribute: (n: string) => opts.attrs?.[n] ?? null,
    textContent: opts.attrs?.text ?? "",
    outerHTML: opts.html ?? "",
    querySelector: (s: string) => (s.includes("circle") && opts.kind === "svg-ring" ? {} : null),
    querySelectorAll: (s: string) => (s.includes("path") ? opts.children ?? [] : []),
  };
  return el;
}

function fakeRow(nodes: unknown[], hostBox = { left: 0, right: 260, width: 260, height: 40 }) {
  return {
    querySelectorAll: (sel: string) => {
      const all = nodes as Array<{ _kind?: string }>;
      if (sel.includes("[role='progressbar']") || sel.includes("circular-progress")) {
        return all.filter((n) => n._kind === "spinner");
      }
      if (sel.includes("flag") || sel.includes("红旗") || sel.includes("旗帜")) {
        return all.filter((n) => n._kind === "flag");
      }
      if (sel.startsWith("svg, mat-icon") || sel.startsWith("svg, mat-icon, .google-symbols")) {
        return all.filter((n) => n._kind === "flag" || n._kind === "svg" || n._kind === "svg-ring");
      }
      if (sel.includes("hovered-trailing-content")) {
        return all.filter((n) => n._kind === "trail");
      }
      if (sel.startsWith("span,") || sel.includes("gem-icon-button") || sel.includes("gem-icon")) {
        return all.filter((n) => n._kind === "ring" || n._kind === "svg-ring" || n._kind === "spinner" || n._kind === "svg" || n._kind === "gem-icon");
      }
      return [];
    },
    getBoundingClientRect: () => hostBox,
  } as unknown as ParentNode;
}

describe("rowHasNativeGeneratingSpinner", () => {
  test("selector covers progressbar hosts", () => {
    expect(NATIVE_SIDEBAR_SPINNER_SEL).toContain("[role='progressbar']");
    expect(NATIVE_SIDEBAR_SPINNER_SEL).toContain("circular-progress");
    expect(NATIVE_SIDEBAR_SPINNER_SEL).toContain("mat-progress-spinner");
    expect(NATIVE_SIDEBAR_SPINNER_SEL).toContain("progress_activity");
  });

  test("false when the row has no native spinner", () => {
    expect(rowHasNativeGeneratingSpinner(fakeRow([]))).toBe(false);
  });

  test("false for a zero-size progressbar (native spinner missing)", () => {
    const hidden = fakeEl({ visible: false, kind: "spinner" });
    expect(rowHasNativeGeneratingSpinner(fakeRow([hidden]))).toBe(false);
  });

  test("true only when a native spinner has layout size", () => {
    const hidden = fakeEl({ visible: false, kind: "spinner" });
    const shown = fakeEl({ visible: true, kind: "spinner" });
    expect(rowHasNativeGeneratingSpinner(fakeRow([hidden, shown]))).toBe(true);
  });

  test("true for Gemini progress_activity generating icon", () => {
    const icon = fakeEl({ visible: true, attrs: { "data-mat-icon-name": "progress_activity" }, kind: "spinner" });
    expect(rowHasNativeGeneratingSpinner(fakeRow([icon]))).toBe(true);
    expect(rowHasNativeStatusChrome(fakeRow([icon]))).toBe(true);
  });

  test("aria-label=spinner is a spinner, not a pin", () => {
    const spinner = fakeEl({
      visible: true,
      kind: "svg",
      attrs: { "aria-label": "spinner" },
      closest: () => null,
    });
    expect(rowHasNativeGeneratingSpinner(fakeRow([spinner]))).toBe(true);
    expect(rowHasNativeStatusChrome(fakeRow([spinner]))).toBe(true);
  });

  test("unlabeled trailing CSS ring hides GG++", () => {
    const ring = fakeEl({
      visible: true,
      kind: "ring",
      box: { left: 188, right: 204, width: 16, height: 16 },
      closest: () => null,
      style: {
        visibility: "visible",
        display: "block",
        opacity: "1",
        animationName: "rotate",
        borderRadius: "50%",
        borderTopColor: "currentColor",
        borderRightColor: "transparent",
        borderLeftColor: "transparent",
        borderBottomColor: "transparent",
        borderTopWidth: "2px",
      },
    });
    expect(rowHasNativeGeneratingSpinner(fakeRow([ring]))).toBe(true);
    expect(rowHasNativeStatusChrome(fakeRow([ring]))).toBe(true);
  });

  test("unlabeled 16px ring inside pinned container still hides GG++", () => {
    const ring = fakeEl({
      visible: true,
      kind: "ring",
      box: { left: 188, right: 204, width: 16, height: 16 },
      closest: (sel: string) => (sel.includes("Pinned chat") || sel.includes("Pin") ? {} : null),
      style: {
        visibility: "visible",
        display: "block",
        opacity: "1",
        animationName: "rotate",
        borderRadius: "50%",
        borderTopColor: "currentColor",
        borderRightColor: "transparent",
        borderLeftColor: "transparent",
        borderBottomColor: "transparent",
        borderTopWidth: "2px",
      },
    });
    expect(rowHasNativeGeneratingSpinner(fakeRow([ring]))).toBe(true);
    expect(rowHasNativeStatusChrome(fakeRow([ring]))).toBe(true);
  });

  test("pin-only trailing control is not a native spinner", () => {
    const pin = fakeEl({
      visible: true,
      kind: "ring",
      box: { left: 188, right: 204, width: 16, height: 16 },
      closest: (sel: string) => (sel.includes("Pinned chat") || sel.includes("Pin") ? {} : null),
      attrs: { "aria-label": "Pinned chat" },
      style: {
        visibility: "visible",
        display: "block",
        opacity: "1",
        animationName: "none",
        borderRadius: "0px",
        borderTopColor: "",
        borderRightColor: "",
        borderLeftColor: "",
        borderBottomColor: "",
        borderTopWidth: "0px",
      },
    });
    expect(rowHasNativeGeneratingSpinner(fakeRow([pin]))).toBe(false);
    expect(rowHasNativeFlag(fakeRow([pin]))).toBe(false);
    expect(rowHasNativeStatusChrome(fakeRow([pin]))).toBe(false);
  });

  test("unlabeled gem-icon sibling of pin hides GG++", () => {
    const pin = fakeEl({
      visible: true,
      kind: "pin-host",
      className: "gem-conversation-actions-menu-button conversation-pin-icon ng-star-inserted",
      tagName: "GEM-ICON",
      attrs: { "aria-label": "Pinned chat" },
      box: { left: 208, right: 232, width: 24, height: 24 },
    });
    const spin = fakeEl({
      visible: true,
      kind: "gem-icon",
      className: "ng-star-inserted",
      tagName: "GEM-ICON",
      closest: () => null,
      box: { left: 176, right: 200, width: 24, height: 24 },
    });
    const trail = {
      _kind: "trail",
      children: [spin, pin],
    };
    expect(rowHasNativeGeneratingSpinner(fakeRow([trail]))).toBe(true);
    expect(rowHasNativeStatusChrome(fakeRow([trail]))).toBe(true);
  });

  test("pin-only hovered trailing content keeps GG++", () => {
    const pin = fakeEl({
      visible: true,
      kind: "pin-host",
      className: "gem-conversation-actions-menu-button conversation-pin-icon ng-star-inserted",
      tagName: "GEM-ICON",
      attrs: { "aria-label": "Pinned chat" },
      box: { left: 208, right: 232, width: 24, height: 24 },
    });
    const trail = {
      _kind: "trail",
      children: [pin],
    };
    expect(rowHasNativeGeneratingSpinner(fakeRow([trail]))).toBe(false);
    expect(rowHasNativeStatusChrome(fakeRow([trail]))).toBe(false);
  });

  test("no native chrome keeps GG++ live mark", () => {
    const titleDot = fakeEl({
      visible: true,
      kind: "ring",
      box: { left: 12, right: 20, width: 8, height: 8 },
      closest: () => null,
      style: { animationName: "none", borderRadius: "50%" },
    });
    expect(rowHasNativeGeneratingSpinner(fakeRow([titleDot]))).toBe(false);
    expect(rowHasNativeStatusChrome(fakeRow([titleDot]))).toBe(false);
  });
});

describe("native flag hides GG++ status", () => {
  test("selector includes Gemini flag hosts", () => {
    expect(NATIVE_SIDEBAR_FLAG_SEL).toContain("data-mat-icon-name='flag'");
    expect(NATIVE_SIDEBAR_FLAG_SEL).toContain("红旗");
  });

  test("true for a named mat-icon flag", () => {
    const flag = fakeEl({ visible: true, attrs: { "data-mat-icon-name": "flag" }, kind: "flag" });
    const row = fakeRow([flag]);
    expect(rowHasNativeFlag(row)).toBe(true);
    expect(rowHasNativeStatusChrome(row)).toBe(true);
  });

  test("true for a trailing unlabeled flag SVG", () => {
    const svg = fakeEl({
      visible: true,
      kind: "svg",
      box: { left: 200, right: 220, width: 20, height: 20 },
      children: [{ getAttribute: (n: string) => (n === "d" ? "M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" : null) }],
    });
    expect(rowHasNativeFlag(fakeRow([svg]))).toBe(true);
  });

  test("false for the pin icon", () => {
    const pin = fakeEl({
      visible: true,
      kind: "flag",
      closest: (s: string) => (s.includes("Pin") || s.includes("置顶") ? {} : null),
      attrs: { "aria-label": "Pinned chat" },
    });
    expect(rowHasNativeFlag(fakeRow([pin]))).toBe(false);
    expect(rowHasNativeStatusChrome(fakeRow([pin]))).toBe(false);
  });

  test("native spinner also counts as status chrome", () => {
    const spinner = fakeEl({ visible: true, kind: "spinner" });
    expect(rowHasNativeStatusChrome(fakeRow([spinner]))).toBe(true);
  });
});


function mini(tag: string, className = "", attrs: Record<string, string> = {}) {
  const kids: any[] = [];
  const node: any = {
    tagName: tag.toUpperCase(),
    className,
    classList: { contains: (c: string) => ` ${className} `.includes(` ${c} `) },
    children: kids,
    parentElement: null,
    get nextElementSibling() {
      const p = node.parentElement;
      if (!p) return null;
      const i = p.children.indexOf(node);
      return i >= 0 ? p.children[i + 1] ?? null : null;
    },
    get previousElementSibling() {
      const p = node.parentElement;
      if (!p) return null;
      const i = p.children.indexOf(node);
      return i > 0 ? p.children[i - 1] ?? null : null;
    },
    getAttribute: (name: string) => attrs[name] ?? null,
    querySelector(sel: string) {
      const match = (el: any) => {
        if (sel.startsWith(".")) return ` ${el.className} `.includes(` ${sel.slice(1)} `);
        return el.tagName === sel.toUpperCase();
      };
      const walk = (el: any): any => {
        for (const child of el.children) {
          if (match(child)) return child;
          const hit = walk(child);
          if (hit) return hit;
        }
        return null;
      };
      return walk(node);
    },
    append(...els: any[]) {
      for (const el of els) {
        if (el.parentElement) {
          const arr = el.parentElement.children as any[];
          const i = arr.indexOf(el);
          if (i >= 0) arr.splice(i, 1);
        }
        el.parentElement = node;
        kids.push(el);
      }
    },
    insertBefore(el: any, before: any) {
      if (el.parentElement) {
        const arr = el.parentElement.children as any[];
        const i = arr.indexOf(el);
        if (i >= 0) arr.splice(i, 1);
      }
      el.parentElement = node;
      const i = before ? kids.indexOf(before) : -1;
      kids.splice(i >= 0 ? i : kids.length, 0, el);
    },
    before(el: any) {
      node.parentElement.insertBefore(el, node);
    },
  };
  return node;
}

describe("placeStatusMark", () => {
  test("uses remy-goal-status-badge instead of prefixing the title", () => {
    const row = mini("div");
    const title = mini("div", "title-text");
    const badge = mini("remy-goal-status-badge");
    const pin = mini("span", "conversation-pin-icon");
    row.append(title, badge, pin);
    const mark = mini("span", "ggpp-cls");
    placeStatusMark(row as unknown as Element, mark as unknown as HTMLElement);
    expect(mark.parentElement).toBe(badge);
    expect(title.previousElementSibling).toBe(null);
  });

  test("falls back to hovered-trailing-content before the pin", () => {
    const row = mini("div");
    const title = mini("div", "title-text");
    const trail = mini("div", "hovered-trailing-content");
    const pin = mini("span", "conversation-pin-icon", { "aria-label": "Pinned chat" });
    trail.append(pin);
    row.append(title, trail);
    const mark = mini("span", "ggpp-cls");
    placeStatusMark(row as unknown as Element, mark as unknown as HTMLElement);
    expect(mark.parentElement).toBe(trail);
    expect(mark.nextElementSibling).toBe(pin);
    expect(title.previousElementSibling).toBe(null);
  });
});
