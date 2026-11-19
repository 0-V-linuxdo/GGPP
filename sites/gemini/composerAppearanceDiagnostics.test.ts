/**
 * Unit tests for collectComposerAppearanceDiagnostics — fake DOM / deps only.
 * No browser, no network, no acceptance file writes.
 */
import { expect, test, describe } from "bun:test";
import {
  CSS_REDACTED,
  COMPOSER_LAYER_IDS,
  COMPOSER_BUTTON_ROLES,
  collectComposerAppearanceDiagnostics,
  emptyComposerAppearanceDiagnostics,
  sanitizeCssVisualValue,
  type ComposerAppearanceDeps,
  type ComposerLayerId,
} from "./composerAppearanceDiagnostics";

type StyleMap = Record<string, string>;

function styleDecl(map: StyleMap): CSSStyleDeclaration {
  return {
    getPropertyValue(name: string) {
      const key = name.trim().toLowerCase();
      if (key in map) return map[key]!;
      const camel = key.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
      return map[camel] ?? map[key] ?? "";
    },
  } as unknown as CSSStyleDeclaration;
}

type FakeNode = {
  name: string;
  classList?: { contains: (c: string) => boolean };
  children?: FakeNode[];
  styles?: StyleMap;
  before?: StyleMap;
  after?: StyleMap;
  rect?: { width: number; height: number; top: number; left: number };
  testId?: string;
  querySelector?: (sel: string) => FakeNode | null;
  getBoundingClientRect?: () => { width: number; height: number; top: number; left: number; bottom: number; right: number; x: number; y: number; toJSON: () => object };
};

function matches(node: FakeNode, sel: string): boolean {
  const s = sel.trim();
  // :has / :is / :not — minimal support for our fixed selectors
  if (s.startsWith(":is(") && s.endsWith(")")) {
    const inner = s.slice(4, -1);
    return splitTopLevel(inner).some((p) => matches(node, p.trim()));
  }
  if (s.includes(":not(")) {
    const base = s.replace(/:not\(([^)]*)\)/g, "").trim();
    const notm = /:not\(([^)]*)\)/.exec(s);
    if (base && !matches(node, base)) return false;
    if (notm && matchesHasOrSimple(node, notm[1]!.trim())) return false;
    return !!base || !!(notm && !matchesHasOrSimple(node, notm[1]!.trim()));
  }
  if (s.includes(":has(")) {
    const base = s.replace(/:has\(([^)]*)\)/g, "").trim();
    const hasm = /:has\(([^)]*)\)/.exec(s);
    if (base && !matches(node, base)) return false;
    if (hasm && !descendantMatches(node, hasm[1]!.trim())) return false;
    return true;
  }
  return matchesSimple(node, s);
}

function matchesHasOrSimple(node: FakeNode, sel: string): boolean {
  if (sel.startsWith(".") || sel.includes("[") || !sel.includes(" ")) return descendantMatches(node, sel) || matchesSimple(node, sel);
  return descendantMatches(node, sel);
}

function matchesSimple(node: FakeNode, sel: string): boolean {
  const s = sel.trim();
  if (!s) return false;
  if (s.startsWith(".")) return !!node.classList?.contains(s.slice(1));
  const test = /\[data-test-id=['"]([^'"]+)['"]\]/.exec(s);
  if (test) {
    const tag = s.replace(/\[data-test-id=['"][^'"]+['"]\]/, "").replace(/:.*$/, "").trim();
    if (tag && node.name !== tag && !tag.startsWith(".")) return false;
    return node.testId === test[1];
  }
  if (s.includes(".")) {
    const bits = s.split(".").filter(Boolean);
    // ".send-button.stop" or "gem-icon-button.send-button.stop"
    let tag = "";
    let classes = bits;
    if (!s.startsWith(".")) {
      tag = bits[0] || "";
      classes = bits.slice(1);
    }
    if (tag && node.name !== tag) return false;
    return classes.length > 0 && classes.every((c) => !!node.classList?.contains(c));
  }
  return node.name === s;
}

function descendantMatches(root: FakeNode, sel: string): boolean {
  const st = [...(root.children || [])];
  while (st.length) {
    const n = st.shift()!;
    if (matchesSimple(n, sel) || matches(n, sel)) return true;
    if (n.children) st.push(...n.children);
  }
  return false;
}

function splitTopLevel(inner: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let cur = "";
  for (const ch of inner) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === "," && depth === 0) {
      out.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  if (cur.trim()) out.push(cur);
  return out;
}

/** Split descendant combinator on spaces outside (). */
function splitSelector(sel: string): string[] {
  const parts: string[] = [];
  let cur = "";
  let depth = 0;
  for (const ch of sel.trim()) {
    if (ch === "(") depth++;
    if (ch === ")") depth = Math.max(0, depth - 1);
    if (/\s/.test(ch) && depth === 0) {
      if (cur.trim()) parts.push(cur.trim());
      cur = "";
      continue;
    }
    cur += ch;
  }
  if (cur.trim()) parts.push(cur.trim());
  return parts;
}

function queryFrom(root: FakeNode, sel: string): FakeNode | null {
  const parts = splitSelector(sel);
  let heads: FakeNode[] = [];
  {
    const part = parts[0]!;
    const st = [...(root.children || [])];
    while (st.length) {
      const n = st.shift()!;
      if (matches(n, part)) heads.push(n);
      if (n.children) st.push(...n.children);
    }
  }
  for (let pi = 1; pi < parts.length; pi++) {
    const part = parts[pi]!;
    const next: FakeNode[] = [];
    for (const h of heads) {
      const st = [...(h.children || [])];
      while (st.length) {
        const n = st.shift()!;
        if (matches(n, part)) next.push(n);
        if (n.children) st.push(...n.children);
      }
    }
    heads = next;
    if (!heads.length) return null;
  }
  return heads[0] ?? null;
}

function attachQuery(node: FakeNode): FakeNode {
  const el = node as FakeNode;
  el.querySelector = (sel: string) => {
    const hit = queryFrom(node, sel);
    return hit ? attachQuery(hit) : null;
  };
  el.getBoundingClientRect = () => {
    const r = node.rect || { width: 0, height: 0, top: 0, left: 0 };
    return { ...r, bottom: r.top + r.height, right: r.left + r.width, x: r.left, y: r.top, toJSON: () => r };
  };
  if (node.children) node.children.forEach(attachQuery);
  return el;
}

function makeDoc(box: FakeNode | null) {
  const rooted = box ? attachQuery(box) : null;
  return {
    querySelector(sel: string) {
      if (sel === "input-container") return rooted as unknown as Element;
      if (!rooted) return null;
      return rooted.querySelector!(sel) as unknown as Element;
    },
  } as unknown as Document;
}

function makeDeps(opts: {
  doc?: Document | null;
  box?: FakeNode | null;
  throwOn?: string | true;
}): ComposerAppearanceDeps {
  const box = opts.box === undefined ? null : opts.box;
  const doc = opts.doc !== undefined ? opts.doc : makeDoc(box);
  const styleFor = (el: FakeNode, pseudo: string | null | undefined): StyleMap => {
    if (pseudo === "::before") return el.before || {};
    if (pseudo === "::after") return el.after || {};
    return el.styles || {};
  };
  return {
    getDocument: () => doc,
    getComputedStyle: (elt: Element, pseudo?: string | null) => {
      if (opts.throwOn === true) throw new Error("SECRET path /Users/private/leak.css");
      const node = elt as unknown as FakeNode;
      if (typeof opts.throwOn === "string" && (opts.throwOn === pseudo || opts.throwOn === node.name)) {
        throw new Error("do-not-leak-" + opts.throwOn);
      }
      return styleDecl(styleFor(node, pseudo ?? null));
    },
  };
}

const baseVisual = {
  "background-color": "rgba(0, 0, 0, 0)",
  "background-image": "none",
  background: "none",
  "box-shadow": "none",
  filter: "none",
  opacity: "1",
  "border-radius": "0px",
  display: "flex",
  visibility: "visible",
};

function sampleComposer(opts: {
  gradient?: boolean;
  withVoice?: boolean;
  withSubmit?: boolean;
  withStop?: boolean;
  voiceDisplay?: string;
}): FakeNode {
  const buttons: FakeNode[] = [];
  if (opts.withVoice !== false) {
    buttons.push({
      name: "div",
      classList: { contains: (c) => c === "mic-button-container" || c === "persistent-mic" },
      styles: { ...baseVisual, display: opts.voiceDisplay || "flex" },
      rect: { width: 40, height: 40, top: 10, left: 100 },
      children: [
        {
          name: "speech-dictation-mic-button",
          classList: { contains: (c) => c === "speech-dictation-mic-button" },
          styles: { ...baseVisual, display: opts.voiceDisplay || "inline-flex" },
          rect: { width: 40, height: 40, top: 10, left: 100 },
        },
      ],
    });
  }
  if (opts.withStop) {
    buttons.push({
      name: "div",
      testId: "send-button-container",
      classList: { contains: (c) => c === "send-button-container" || c === "visible" },
      styles: { ...baseVisual },
      rect: { width: 40, height: 40, top: 10, left: 150 },
      children: [
        {
          name: "gem-icon-button",
          classList: { contains: (c) => c === "send-button" || c === "stop" },
          styles: { ...baseVisual },
          rect: { width: 40, height: 40, top: 10, left: 150 },
        },
      ],
    });
  } else if (opts.withSubmit) {
    buttons.push({
      name: "div",
      testId: "send-button-container",
      classList: { contains: (c) => c === "send-button-container" || c === "visible" },
      styles: { ...baseVisual },
      rect: { width: 40, height: 40, top: 10, left: 150 },
      children: [
        {
          name: "gem-icon-button",
          classList: { contains: (c) => c === "send-button" },
          styles: { ...baseVisual },
          rect: { width: 40, height: 40, top: 10, left: 150 },
        },
      ],
    });
  }

  return {
    name: "input-container",
    classList: { contains: (c) => c === "input-gradient" && !!opts.gradient },
    styles: {
      ...baseVisual,
      "background-image": "linear-gradient(90deg, rgb(72, 147, 252), rgb(189, 153, 254))",
      background: "linear-gradient(90deg, rgb(72, 147, 252), rgb(189, 153, 254))",
    },
    before: { ...baseVisual, "background-image": "linear-gradient(rgb(1, 2, 3), rgb(4, 5, 6))" },
    after: { ...baseVisual },
    children: [
      {
        name: "div",
        classList: { contains: (c) => c === "input-area-container" },
        styles: { ...baseVisual, "background-color": "rgb(32, 33, 36)" },
        children: [
          {
            name: "input-area-v2",
            styles: { ...baseVisual, "box-shadow": "0 2px 8px rgba(0, 0, 0, 0.2)", "border-radius": "28px" },
            children: [
              {
                name: "div",
                classList: { contains: (c) => c === "input-area" },
                styles: { ...baseVisual, "background-color": "rgb(48, 49, 52)", "border-radius": "28px" },
                children: [
                  {
                    name: "div",
                    classList: { contains: (c) => c === "trailing-actions-wrapper" },
                    styles: { ...baseVisual },
                    children: [
                      {
                        name: "div",
                        classList: { contains: (c) => c === "input-buttons-wrapper-bottom" || c === "persistent-mic" },
                        styles: { ...baseVisual, display: "flex" },
                        rect: { width: opts.withVoice === false && !opts.withSubmit && !opts.withStop ? 0 : 96, height: 48, top: 8, left: 90 },
                        children: buttons,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}

describe("sanitizeCssVisualValue (strict whole-field redact)", () => {
  test("keeps plain colors and gradients", () => {
    expect(sanitizeCssVisualValue("rgb(1, 2, 3)")).toBe("rgb(1, 2, 3)");
    expect(sanitizeCssVisualValue("#abc")).toBe("#abc");
    expect(sanitizeCssVisualValue("linear-gradient(90deg, rgb(1, 2, 3), rgb(4, 5, 6))")).toContain("linear-gradient");
    expect(sanitizeCssVisualValue("none")).toBe("none");
    expect(sanitizeCssVisualValue("drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))")).toContain("drop-shadow");
  });

  test("redacts any url( form — quotes, escapes, multi-url, data:", () => {
    const bad = [
      `url(https://evil.example/a.png)`,
      `url("https://evil.example/x.png")`,
      `url('https://evil.example/x.png')`,
      `url(https://evil.example/a.png), url(https://evil.example/b.png)`,
      `linear-gradient(red, blue), url(https://evil.example/x.png)`,
      `URL(HTTPS://EVIL.EXAMPLE/X)`,
      `url( data:image/png;base64,AAAA )`,
      `u\\72l(https://evil.example/x)`,
      `url("https://evil.example/x.png\\" )", none)`,
      `image-set(url(https://evil.example/a.png) 1x)`,
    ];
    for (const v of bad) expect(sanitizeCssVisualValue(v)).toBe(CSS_REDACTED);
  });

  test("redacts CSS escapes, quotes, unexpected tokens, overlong", () => {
    expect(sanitizeCssVisualValue(`blue\\20url(https://x)`)).toBe(CSS_REDACTED);
    expect(sanitizeCssVisualValue(`"quoted"`)).toBe(CSS_REDACTED);
    expect(sanitizeCssVisualValue(`expression(alert(1))`)).toBe(CSS_REDACTED);
    expect(sanitizeCssVisualValue(`var(--secret-bg)`)).toBe(CSS_REDACTED);
    expect(sanitizeCssVisualValue("x".repeat(500))).toBe(CSS_REDACTED);
  });

  test("null/empty", () => {
    expect(sanitizeCssVisualValue(null)).toBeNull();
    expect(sanitizeCssVisualValue("")).toBeNull();
  });
});

describe("collectComposerAppearanceDiagnostics", () => {
  test("no document → no-document; stable core + buttons keys", () => {
    const d = collectComposerAppearanceDiagnostics({ getDocument: () => null });
    expect(d.errorCode).toBe("no-document");
    expect(d.hasInputGradient).toBe(false);
    for (const id of COMPOSER_LAYER_IDS) expect(d.layers[id].present).toBe(false);
    for (const r of COMPOSER_BUTTON_ROLES) expect(d.buttons[r].present).toBe(false);
    expect(Object.keys(d).sort()).toEqual(["buttons", "errorCode", "hasInputGradient", "layers"].sort());
    const json = JSON.stringify(d);
    expect(json).not.toContain("https://");
    expect(json).not.toContain("className");
  });

  test("missing input-container → no-composer", () => {
    const d = collectComposerAppearanceDiagnostics(makeDeps({ box: null }));
    expect(d.errorCode).toBe("no-composer");
  });

  test("maps layers + hasInputGradient; no class dump", () => {
    const d = collectComposerAppearanceDiagnostics(makeDeps({ box: sampleComposer({ gradient: true, withVoice: true }) }));
    expect(d.errorCode).toBe("ok");
    expect(d.hasInputGradient).toBe(true);
    for (const id of COMPOSER_LAYER_IDS) expect(d.layers[id].present).toBe(true);
    expect(JSON.stringify(d)).not.toContain("ng-tns");
  });

  test("missing child layers → present false", () => {
    const box: FakeNode = {
      name: "input-container",
      classList: { contains: () => false },
      styles: { ...baseVisual },
      before: { ...baseVisual },
      after: { ...baseVisual },
      children: [],
    };
    const d = collectComposerAppearanceDiagnostics(makeDeps({ box }));
    expect(d.layers.inputContainer.present).toBe(true);
    expect(d.layers.inputArea.present).toBe(false);
    expect(d.buttons.voice.present).toBe(false);
    expect(d.buttons.submit.present).toBe(false);
  });

  test("url computed values whole-field redacted", () => {
    const box = sampleComposer({ gradient: true, withVoice: true });
    box.styles!["background-image"] = `url("https://secret.example/user/avatar.png"), linear-gradient(red, blue)`;
    const d = collectComposerAppearanceDiagnostics(makeDeps({ box }));
    expect(d.layers.inputContainer.backgroundImage).toBe(CSS_REDACTED);
    expect(JSON.stringify(d)).not.toContain("secret.example");
  });

  test("getComputedStyle failure → fixed code, never Error.message", () => {
    const d = collectComposerAppearanceDiagnostics(makeDeps({ box: sampleComposer({ gradient: true }), throwOn: true }));
    expect(d.errorCode).toBe("computed-style-failed");
    expect(JSON.stringify(d)).not.toContain("SECRET");
  });

  test("read-only: no tree mutation", () => {
    const box = sampleComposer({ gradient: true, withVoice: true, withSubmit: true });
    const before = JSON.stringify(box);
    collectComposerAppearanceDiagnostics(makeDeps({ box }));
    expect(JSON.stringify(box)).toBe(before);
  });

  test("buttons: empty/idle — voice present, submit/stop absent (DOM-evidenced state)", () => {
    const d = collectComposerAppearanceDiagnostics(makeDeps({ box: sampleComposer({ withVoice: true }) }));
    expect(d.buttons.voice.present).toBe(true);
    expect(d.buttons.voice.visible).toBe(true);
    expect(d.buttons.voice.width).toBe(40);
    expect(d.buttons.submit.present).toBe(false);
    expect(d.buttons.stop.present).toBe(false);
    expect(d.buttons.buttonsWrapper.present).toBe(true);
    expect(JSON.stringify(d.buttons)).not.toMatch(/aria-label|Dictate|Stop response|innerHTML/i);
  });

  test("buttons: submit present without stop; stop role when .send-button.stop", () => {
    const submit = collectComposerAppearanceDiagnostics(makeDeps({ box: sampleComposer({ withVoice: true, withSubmit: true }) }));
    expect(submit.buttons.submit.present).toBe(true);
    expect(submit.buttons.stop.present).toBe(false);

    const stop = collectComposerAppearanceDiagnostics(makeDeps({ box: sampleComposer({ withVoice: true, withStop: true }) }));
    expect(stop.buttons.stop.present).toBe(true);
    // submit selector excludes :has(.stop)
    expect(stop.buttons.submit.present).toBe(false);
  });

  test("buttons: voice display:none → present true, visible false (noDictation-like)", () => {
    const d = collectComposerAppearanceDiagnostics(
      makeDeps({ box: sampleComposer({ withVoice: true, withSubmit: true, voiceDisplay: "none" }) }),
    );
    expect(d.buttons.voice.present).toBe(true);
    expect(d.buttons.voice.visible).toBe(false);
    expect(d.buttons.voice.display).toBe("none");
    expect(d.buttons.submit.present).toBe(true);
    expect(d.buttons.submit.visible).toBe(true);
  });

  test("empty helper shape includes buttons without breaking core keys", () => {
    const e = emptyComposerAppearanceDiagnostics("ok");
    expect(Object.keys(e).sort()).toEqual(["buttons", "errorCode", "hasInputGradient", "layers"].sort());
    expect(Object.keys(e.layers).sort()).toEqual([...COMPOSER_LAYER_IDS].sort());
    expect(Object.keys(e.buttons).sort()).toEqual([...COMPOSER_BUTTON_ROLES].sort());
  });
});
