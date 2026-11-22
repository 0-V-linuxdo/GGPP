import { expect, test, describe } from "bun:test";
import { placeComposerChatBar } from "./placeComposerChatBar";

type Attrs = Record<string, string>;

class FakeEl {
  tagName: string;
  className = "";
  attrs: Attrs = {};
  parent: FakeEl | null = null;
  kids: FakeEl[] = [];
  _root = false;

  constructor(tag: string, init?: { className?: string; attrs?: Attrs }) {
    this.tagName = tag.toUpperCase();
    if (init?.className) this.className = init.className;
    if (init?.attrs) this.attrs = { ...init.attrs };
  }

  get parentElement(): FakeEl | null {
    return this.parent;
  }
  get firstElementChild(): FakeEl | null {
    return this.kids[0] ?? null;
  }
  get previousElementSibling(): FakeEl | null {
    if (!this.parent) return null;
    const i = this.parent.kids.indexOf(this);
    return i > 0 ? this.parent.kids[i - 1] : null;
  }
  get isConnected(): boolean {
    let n: FakeEl | null = this;
    while (n) {
      if (n._root) return true;
      n = n.parent;
    }
    return false;
  }

  getAttribute(name: string) {
    if (name === "class") return this.className || null;
    return this.attrs[name] ?? null;
  }
  contains(other: FakeEl | null) {
    if (!other) return false;
    if (other === this) return true;
    return this.kids.some((k) => k.contains(other));
  }
  matches(sel: string): boolean {
    const s = sel.trim();
    if (s.startsWith(".")) return this.className.split(/\s+/).includes(s.slice(1));
    const star = /^\[class\*='([^']+)'\]$/.exec(s);
    if (star) return this.className.includes(star[1]);
    const eq = /^\[([^=\]]+)='([^']*)'\]$/.exec(s);
    if (eq) return (this.attrs[eq[1]] ?? null) === eq[2];
    if (/^[a-z][\w-]*$/i.test(s)) return this.tagName === s.toUpperCase();
    const tagClass = /^([a-z][\w-]*)\.([\w-]+)$/i.exec(s);
    if (tagClass) return this.tagName === tagClass[1].toUpperCase() && this.className.split(/\s+/).includes(tagClass[2]);
    const tagAttr = /^([a-z][\w-]*)(\[[^\]]+\])$/i.exec(s);
    if (tagAttr) return this.tagName === tagAttr[1].toUpperCase() && this.matches(tagAttr[2]);
    return false;
  }
  closest(sel: string): FakeEl | null {
    let n: FakeEl | null = this;
    while (n) {
      if (n.matches(sel)) return n;
      n = n.parent;
    }
    return null;
  }
  querySelector(sel: string): FakeEl | null {
    for (const k of this.kids) {
      if (k.matches(sel)) return k;
      const hit = k.querySelector(sel);
      if (hit) return hit;
    }
    return null;
  }
  _adopt(node: FakeEl) {
    node.parent?.removeChild(node);
    node.parent = this;
  }
  appendChild(node: FakeEl) {
    this._adopt(node);
    this.kids.push(node);
    return node;
  }
  append(node: FakeEl) {
    this.appendChild(node);
  }
  prepend(node: FakeEl) {
    this._adopt(node);
    this.kids.unshift(node);
  }
  before(node: FakeEl) {
    if (!this.parent) return;
    node.parent?.removeChild(node);
    const i = this.parent.kids.indexOf(this);
    this.parent.kids.splice(i, 0, node);
    node.parent = this.parent;
  }
  removeChild(node: FakeEl) {
    const i = this.kids.indexOf(node);
    if (i >= 0) this.kids.splice(i, 1);
    node.parent = null;
  }
}

function el(tag: string, init?: { className?: string; attrs?: Attrs; kids?: FakeEl[] }) {
  const n = new FakeEl(tag, init);
  for (const k of init?.kids ?? []) n.appendChild(k);
  return n;
}

function connected(n: FakeEl) {
  n._root = true;
  return n;
}

describe("placeComposerChatBar", () => {
  test("puts the bar before an in-composer model picker", () => {
    const host = el("bard-mode-switcher", {
      kids: [el("button", { attrs: { "data-test-id": "bard-mode-menu-button" } })],
    });
    const composer = connected(el("input-container", { kids: [host] }));
    const bar = el("div", { className: "ggpp-chatbar" });
    placeComposerChatBar(bar as unknown as HTMLElement, composer as unknown as HTMLElement);
    expect(host.previousElementSibling).toBe(bar);
    expect(bar.parent).toBe(composer);
  });

  test("recovers into .trailing-actions-wrapper when the picker is not in the composer", () => {
    const trailing = el("div", { className: "trailing-actions-wrapper", kids: [el("button")] });
    const composer = connected(el("input-container", { kids: [trailing] }));
    const bar = el("div", { className: "ggpp-chatbar" });
    placeComposerChatBar(bar as unknown as HTMLElement, composer as unknown as HTMLElement);
    expect(trailing.kids[0]).toBe(bar);
    expect(bar.parent).toBe(trailing);
  });

  test("fuzzy trailing-actions class still hosts the bar", () => {
    const trailing = el("div", { className: "foo-trailing-actions-bar" });
    const composer = connected(el("input-container", { kids: [trailing] }));
    const bar = el("div", { className: "ggpp-chatbar" });
    placeComposerChatBar(bar as unknown as HTMLElement, composer as unknown as HTMLElement);
    expect(trailing.kids[0]).toBe(bar);
  });

  test("send-button parent is used when trailing wrapper is missing", () => {
    const send = el("button");
    const box = el("div", { attrs: { "data-test-id": "send-button-container" }, kids: [send] });
    const composer = connected(el("input-container", { kids: [box] }));
    const bar = el("div", { className: "ggpp-chatbar" });
    placeComposerChatBar(bar as unknown as HTMLElement, composer as unknown as HTMLElement);
    expect(box.kids[0]).toBe(bar);
  });

  test("appends to composer when no trailing host exists, then moves when trailing appears", () => {
    const composer = connected(el("input-container"));
    const bar = el("div", { className: "ggpp-chatbar" });
    placeComposerChatBar(bar as unknown as HTMLElement, composer as unknown as HTMLElement);
    expect(bar.parent).toBe(composer);

    const trailing = el("div", { className: "trailing-actions-wrapper" });
    composer.appendChild(trailing);
    placeComposerChatBar(bar as unknown as HTMLElement, composer as unknown as HTMLElement);
    expect(bar.parent).toBe(trailing);
    expect(trailing.kids[0]).toBe(bar);
  });
});
