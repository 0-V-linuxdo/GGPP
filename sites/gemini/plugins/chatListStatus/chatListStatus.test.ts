import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  NATIVE_SIDEBAR_FLAG_SEL,
  NATIVE_SIDEBAR_SPINNER_SEL,
  rowHasNativeFlag,
  rowHasNativeGeneratingSpinner,
  rowHasNativeStatusChrome,
} from "./index";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../../../..");

describe("chatListStatus restore", () => {
  test("plugin is on by default and hides when native spinner or flag is visible", () => {
    const src = readFileSync(resolve(HERE, "index.ts"), "utf8");
    expect(src).toMatch(/enabledByDefault:\s*true/);
    expect(src).not.toMatch(/Off by default: Gemini already shows a spinner/);
    expect(src).toContain("rowHasNativeStatusChrome(row)");
    expect(src).toContain("rowHasNativeFlag");
    expect(src).toContain("title.before(mark)");
    expect(src).not.toContain("right: 36px");
    expect(src).not.toMatch(/if \(s === "live" && row\.querySelector\(/);
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
  box?: { left: number; right: number; width: number; height: number };
  children?: Array<{ getAttribute: (n: string) => string | null }>;
}) {
  const visible = opts.visible !== false;
  const size = visible ? 16 : 0;
  const box = opts.box ?? { left: 200, right: 216, width: size, height: size };
  return {
    isConnected: true,
    getBoundingClientRect: () => ({ width: box.width, height: box.height, left: box.left, right: box.right, top: 0, bottom: box.height }),
    closest: opts.closest ?? ((s: string) => (opts.sel && s.includes(opts.sel) ? {} : null)),
    getAttribute: (n: string) => opts.attrs?.[n] ?? null,
    textContent: opts.attrs?.text ?? "",
    outerHTML: opts.html ?? "",
    querySelectorAll: (s: string) => (s.includes("path") ? opts.children ?? [] : []),
  };
}

function fakeRow(nodes: unknown[], hostBox = { left: 0, right: 260, width: 260, height: 40 }) {
  return {
    querySelectorAll: (sel: string) => {
      const all = nodes as any[];
      if (sel.includes("progress") || sel.includes("circular-progress")) {
        return all.filter((n) => n._kind === "spinner");
      }
      if (sel.includes("flag") || sel.includes("红旗") || sel.includes("旗帜")) {
        return all.filter((n) => n._kind === "flag");
      }
      if (sel.includes("svg") || sel.includes("mat-icon") || sel.includes("google-symbols")) {
        return all.filter((n) => n._kind === "flag" || n._kind === "svg");
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
  });

  test("false when the row has no native spinner", () => {
    expect(rowHasNativeGeneratingSpinner(fakeRow([]))).toBe(false);
  });

  test("false for a zero-size progressbar (native spinner missing)", () => {
    const hidden = Object.assign(fakeEl({ visible: false }), { _kind: "spinner" });
    expect(rowHasNativeGeneratingSpinner(fakeRow([hidden]))).toBe(false);
  });

  test("true only when a native spinner has layout size", () => {
    const hidden = Object.assign(fakeEl({ visible: false }), { _kind: "spinner" });
    const shown = Object.assign(fakeEl({ visible: true }), { _kind: "spinner" });
    expect(rowHasNativeGeneratingSpinner(fakeRow([hidden, shown]))).toBe(true);
  });
});

describe("native flag hides GG++ status", () => {
  test("selector includes Gemini flag hosts", () => {
    expect(NATIVE_SIDEBAR_FLAG_SEL).toContain("data-mat-icon-name='flag'");
    expect(NATIVE_SIDEBAR_FLAG_SEL).toContain("红旗");
  });

  test("true for a named mat-icon flag", () => {
    const flag = Object.assign(
      fakeEl({ visible: true, attrs: { "data-mat-icon-name": "flag" } }),
      { _kind: "flag" },
    );
    const row = fakeRow([flag]);
    expect(rowHasNativeFlag(row)).toBe(true);
    expect(rowHasNativeStatusChrome(row)).toBe(true);
  });

  test("true for a trailing unlabeled flag SVG", () => {
    const svg = Object.assign(
      fakeEl({
        visible: true,
        box: { left: 200, right: 220, width: 20, height: 20 },
        children: [{ getAttribute: (n: string) => (n === "d" ? "M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" : null) }],
      }),
      { _kind: "svg" },
    );
    expect(rowHasNativeFlag(fakeRow([svg]))).toBe(true);
  });

  test("false for the pin icon", () => {
    const pin = Object.assign(
      fakeEl({
        visible: true,
        closest: (s: string) => (s.includes("pin") || s.includes("置顶") ? {} : null),
        attrs: { "aria-label": "Pinned chat" },
      }),
      { _kind: "flag" },
    );
    expect(rowHasNativeFlag(fakeRow([pin]))).toBe(false);
    expect(rowHasNativeStatusChrome(fakeRow([pin]))).toBe(false);
  });

  test("native spinner also counts as status chrome", () => {
    const spinner = Object.assign(fakeEl({ visible: true }), { _kind: "spinner" });
    expect(rowHasNativeStatusChrome(fakeRow([spinner]))).toBe(true);
  });
});
