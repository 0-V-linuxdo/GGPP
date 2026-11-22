/**
 * Imports product helpers from ./index (same module as inject wiring).
 * Box lacks shims/dom — run on Mac after gated copy (see PATCH.md).
 */
import { describe, expect, test } from "bun:test";
import { insertModelStarButton, pickModelStarHost, releaseStarButton, type StarHostLike } from "./index";

/** Test-only: baseline comma list (not a product export). */
const LEGACY_MODEL_HOST_SELECTOR_LIST =
  ".actions-container-v2, .buttons-container-v2, .response-actions";

type Insert = { id: string; via: "append" | "before" };
type Node = { id: string; classes: string[]; children: Node[]; btn?: FakeBtn; inserted: Insert[] };
type FakeBtn = { id: string; removed: boolean; remove(): void };

function walk(n: Node, visit: (n: Node) => void) {
  visit(n);
  for (const c of n.children) walk(c, visit);
}

function qs(root: Node, selectorList: string): Node | null {
  const want = selectorList.split(",").map((s) => [...s.trim().matchAll(/\.([a-zA-Z0-9_-]+)/g)].map((m) => m[1]!));
  let found: Node | null = null;
  walk(root, (n) => {
    if (found || n === root) return;
    if (want.some((classes) => classes.length > 0 && classes.every((c) => n.classes.includes(c)))) found = n;
  });
  return found;
}

function parentOf(root: Node, child: Node): Node | undefined {
  for (const c of root.children) {
    if (c === child) return root;
    const p = parentOf(c, child);
    if (p) return p;
  }
  return undefined;
}

function asHost(root: Node, parent?: Node): StarHostLike & { append(c: FakeBtn): void; before(c: FakeBtn): void; classes: string[]; _node: Node } {
  return {
    _node: root,
    get classes() {
      return root.classes;
    },
    querySelector(sel: string) {
      const n = qs(root, sel);
      return n ? asHost(n, parentOf(root, n) ?? parent) : null;
    },
    get firstElementChild() {
      return root.children[0] ? asHost(root.children[0]!, root) : null;
    },
    append(c: FakeBtn) {
      root.inserted.push({ id: c.id, via: "append" });
      root.btn = c;
    },
    before(c: FakeBtn) {
      if (!parent) throw new Error("before() without parent");
      parent.inserted.push({ id: c.id, via: "before" });
      parent.btn = c;
    },
  };
}

function node(id: string, classes: string[], children: Node[] = []): Node {
  return { id, classes, children, inserted: [] };
}

function nestButtonsInsideActions(): Node {
  return node("message-actions", [], [
    node("div", ["actions-container-v2"], [node("div", ["buttons-container-v2"], [node("gem-icon-button", ["thumb-up-button"])])]),
  ]);
}

/** Live Gemini: inner buttons row ends with a flex-grow spacer. */
function nestButtonsWithSpacer(): Node {
  return node("message-actions", [], [
    node("div", ["actions-container-v2"], [
      node("div", ["buttons-container-v2"], [node("gem-icon-button", ["thumb-up-button"]), node("div", ["spacer"])]),
    ]),
  ]);
}

/** Fallback mixed order A: response-actions first in document order. */
function fallbackResponseThenActions(): Node {
  return node("message-actions", [], [node("div", ["response-actions"]), node("div", ["actions-container-v2"])]);
}

/** Fallback mixed order B: actions-container-v2 first in document order. */
function fallbackActionsThenResponse(): Node {
  return node("message-actions", [], [node("div", ["actions-container-v2"]), node("div", ["response-actions"])]);
}

function makeBtn(id: string): FakeBtn {
  return {
    id,
    removed: false,
    remove() {
      this.removed = true;
    },
  };
}

/** Same sequence as product model watch body (no mount* wrapper). */
function modelWatchBody(row: ReturnType<typeof asHost>, msg: object, buttons: Map<object, FakeBtn>, id: string) {
  const host = pickModelStarHost(row) as ReturnType<typeof asHost>;
  const btn = makeBtn(id);
  buttons.set(msg, btn);
  insertModelStarButton(host, btn);
  return () => releaseStarButton(buttons, msg, btn);
}

function runTick(
  seen: Map<object, (() => void) | void>,
  inject: { el: object; run: () => (() => void) | void }[],
  disconnected: object[],
) {
  for (const item of inject) {
    if (seen.has(item.el)) continue;
    seen.set(item.el, item.run());
  }
  const disc = new Set(disconnected);
  for (const [el, dispose] of [...seen]) {
    if (!disc.has(el)) continue;
    seen.delete(el);
    dispose?.();
  }
}

describe("pickModelStarHost", () => {
  test("nested → buttons-container-v2", () => {
    const host = pickModelStarHost(asHost(nestButtonsInsideActions()));
    expect((host as ReturnType<typeof asHost>).classes).toContain("buttons-container-v2");
  });

  test("legacy comma list on nest → outer actions (document order)", () => {
    const legacy = asHost(nestButtonsInsideActions()).querySelector(LEGACY_MODEL_HOST_SELECTOR_LIST)!;
    expect((legacy as ReturnType<typeof asHost>).classes).toContain("actions-container-v2");
  });

  test("comma flip still outer under nest", () => {
    const row = asHost(nestButtonsInsideActions());
    const a = row.querySelector(".buttons-container-v2, .actions-container-v2");
    const b = row.querySelector(".actions-container-v2, .buttons-container-v2");
    expect((a as ReturnType<typeof asHost>).classes).toEqual((b as ReturnType<typeof asHost>).classes);
    expect((a as ReturnType<typeof asHost>).classes).toContain("actions-container-v2");
  });

  test("fallback mixed: response before actions → response-actions", () => {
    const host = pickModelStarHost(asHost(fallbackResponseThenActions()));
    expect((host as ReturnType<typeof asHost>).classes).toContain("response-actions");
  });

  test("fallback mixed: actions before response → actions-container-v2", () => {
    const host = pickModelStarHost(asHost(fallbackActionsThenResponse()));
    expect((host as ReturnType<typeof asHost>).classes).toContain("actions-container-v2");
  });

  test("only response-actions", () => {
    const host = pickModelStarHost(asHost(node("message-actions", [], [node("div", ["response-actions"])])));
    expect((host as ReturnType<typeof asHost>).classes).toContain("response-actions");
  });

  test("only actions-container-v2", () => {
    const host = pickModelStarHost(asHost(node("message-actions", [], [node("div", ["actions-container-v2"])])));
    expect((host as ReturnType<typeof asHost>).classes).toContain("actions-container-v2");
  });

  test("empty → row", () => {
    const row = asHost(node("message-actions", [], []));
    expect((pickModelStarHost(row) as ReturnType<typeof asHost>)._node.id).toBe("message-actions");
  });

  test("no class hosts → firstElementChild", () => {
    const row = asHost(node("message-actions", [], [node("div", ["unrelated-wrap"])]));
    const host = pickModelStarHost(row) as ReturnType<typeof asHost>;
    expect(host.classes).toContain("unrelated-wrap");
    expect(host._node.id).toBe("div");
  });
});

describe("model watch body + releaseStarButton", () => {
  test("append lands on inner buttons host", () => {
    const row = asHost(nestButtonsInsideActions());
    const msg = {};
    const buttons = new Map<object, FakeBtn>();
    const dispose = modelWatchBody(row, msg, buttons, "s1");
    const inner = qs(row._node, ".buttons-container-v2")!;
    expect(inner.btn?.id).toBe("s1");
    expect(inner.inserted).toEqual([{ id: "s1", via: "append" }]);
    dispose();
    expect(buttons.has(msg)).toBe(false);
  });

  test("spacer → before on inner buttons host", () => {
    const row = asHost(nestButtonsWithSpacer());
    const msg = {};
    const buttons = new Map<object, FakeBtn>();
    const host = pickModelStarHost(row) as ReturnType<typeof asHost>;
    expect(host.classes).toContain("buttons-container-v2");
    expect(host.classes).not.toContain("spacer");
    modelWatchBody(row, msg, buttons, "s1");
    const inner = qs(row._node, ".buttons-container-v2")!;
    const spacer = qs(row._node, ".spacer")!;
    expect(inner.inserted).toEqual([{ id: "s1", via: "before" }]);
    expect(inner.btn?.id).toBe("s1");
    expect(spacer.inserted).toEqual([]);
    expect(spacer.btn).toBeUndefined();
  });

  test("outer actions host still inserts before descendant spacer", () => {
    const tree = nestButtonsWithSpacer();
    const outer = qs(tree, ".actions-container-v2")!;
    const host = asHost(outer);
    const btn = makeBtn("s1");
    insertModelStarButton(host, btn);
    const inner = qs(tree, ".buttons-container-v2")!;
    const spacer = qs(tree, ".spacer")!;
    expect(inner.inserted).toEqual([{ id: "s1", via: "before" }]);
    expect(inner.btn?.id).toBe("s1");
    expect(outer.inserted).toEqual([]);
    expect(outer.btn).toBeUndefined();
    expect(spacer.inserted).toEqual([]);
    expect(spacer.btn).toBeUndefined();
  });

  test("same-tick new set then old dispose keeps new mapping", () => {
    const msg = {};
    const buttons = new Map<object, FakeBtn>();
    const rowA = asHost(nestButtonsInsideActions());
    const rowB = asHost(nestButtonsInsideActions());
    const seen = new Map<object, (() => void) | void>();
    runTick(seen, [{ el: rowA, run: () => modelWatchBody(rowA, msg, buttons, "A") }], []);
    const btnA = buttons.get(msg)!;
    runTick(seen, [{ el: rowB, run: () => modelWatchBody(rowB, msg, buttons, "B") }], [rowA]);
    expect(btnA.removed).toBe(true);
    expect(buttons.get(msg)?.id).toBe("B");
    expect(buttons.get(msg)?.removed).toBe(false);
  });

  test("unregister-style cleanup clears owned entries", () => {
    const m1 = {};
    const m2 = {};
    const buttons = new Map<object, FakeBtn>();
    const d1 = modelWatchBody(asHost(nestButtonsInsideActions()), m1, buttons, "1");
    const d2 = modelWatchBody(asHost(nestButtonsInsideActions()), m2, buttons, "2");
    d1();
    d2();
    expect(buttons.size).toBe(0);
  });

  test("release does not delete when map points at newer btn", () => {
    const msg = {};
    const buttons = new Map<object, FakeBtn>();
    const oldBtn = makeBtn("old");
    const newBtn = makeBtn("new");
    buttons.set(msg, newBtn);
    releaseStarButton(buttons, msg, oldBtn);
    expect(oldBtn.removed).toBe(true);
    expect(buttons.get(msg)).toBe(newBtn);
  });
});

describe("user dispose wiring (no user inject refactor)", () => {
  test("early-return + ownership release only", () => {
    const msg = {};
    const buttons = new Map<object, FakeBtn>();
    const appends: string[] = [];
    const create = (id: string) => {
      const b = makeBtn(id);
      buttons.set(msg, b);
      return b;
    };
    // Mirrors product user watch: has → return; else append + releaseStarButton dispose
    const run = (label: string) => {
      if (buttons.has(msg)) return;
      const btn = create(label);
      appends.push(label);
      return () => releaseStarButton(buttons, msg, btn);
    };
    const dA = run("A");
    const dB = run("B");
    expect(appends).toEqual(["A"]);
    expect(dB).toBeUndefined();
    const btnB = makeBtn("B2");
    buttons.set(msg, btnB);
    dA!();
    expect(buttons.get(msg)).toBe(btnB);
  });
});

describe("product source markers", () => {
  test("index wires pick/release; no LEGACY export; toggle present; no MutationObserver", async () => {
    const { readFileSync } = await import("node:fs");
    const { dirname, join } = await import("node:path");
    const { fileURLToPath } = await import("node:url");
    const src = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "index.ts"), "utf8");
    expect(src).toContain("pickModelStarHost(row)");
    expect(src).toContain("releaseStarButton(buttons, msg, btn)");
    expect(src).not.toContain("LEGACY_MODEL_HOST_SELECTOR_LIST");
    expect(src).not.toContain("mountModelStarButton");
    expect(src).toMatch(/function toggle\(el: HTMLElement\)/);
    expect(src).not.toMatch(/MutationObserver/);
    // fallback keeps document-order pair, not response-before-actions priority
    expect(src).toContain('querySelector(".actions-container-v2, .response-actions")');
    expect(src).not.toMatch(/querySelector\("\.response-actions"\)\s*\?\?\s*row\.querySelector\("\.actions-container-v2"\)/);
    expect(src).toContain("insertModelStarButton");
    expect(src).toContain("spacer.before");
    expect(src).toContain(".spacer");
  });
});
