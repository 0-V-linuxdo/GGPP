import { expect, test, describe } from "bun:test";
import { findSidenavSettingsGear, placeSidenavSettingsEntry } from "./placeSidenavSettingsEntry";

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
  get classList() {
    return { contains: (c: string) => this.className.split(/\s+/).includes(c) };
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
  append(node: FakeEl) {
    this._adopt(node);
    this.kids.push(node);
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
  for (const k of init?.kids ?? []) n.append(k);
  return n;
}

function connected(n: FakeEl) {
  n._root = true;
  return n;
}

function footerWithGear(opts?: { gearClass?: string; label?: string }) {
  const inner = el("button", { attrs: { "aria-label": opts?.label ?? "Settings" } });
  const gear = el("gem-icon-button", {
    className: opts?.gearClass ?? "mavatar-settings-button gem-button",
    kids: [inner],
  });
  const wrap = el("div", { className: "mavatar-settings-button-wrapper", kids: [gear] });
  const right = el("div", { className: "mavatar-footer-right", kids: [wrap] });
  const left = el("a", { className: "mavatar-footer-left" });
  const row = el("div", { className: "mavatar-footer-row", kids: [left, right] });
  const footer = connected(el("sidenav-mavatar-footer", { kids: [row] }));
  return { footer, gear, wrap, inner, right };
}

describe("placeSidenavSettingsEntry", () => {
  test("puts the icon immediately left of the sidenav gear", () => {
    const { footer, gear, wrap } = footerWithGear();
    const btn = el("button", { className: "ggpp-sidenav-settings" });
    placeSidenavSettingsEntry(btn as unknown as HTMLElement, footer as unknown as HTMLElement);
    expect(gear.previousElementSibling).toBe(btn);
    expect(btn.parent).toBe(wrap);
    expect(wrap.kids[1]).toBe(gear);
  });

  test("does not insert inside the native Settings button", () => {
    const { footer, gear, inner } = footerWithGear();
    const btn = el("button", { className: "ggpp-sidenav-settings" });
    placeSidenavSettingsEntry(btn as unknown as HTMLElement, footer as unknown as HTMLElement);
    expect(inner.kids).toEqual([]);
    expect(gear.kids).not.toContain(btn);
    expect(findSidenavSettingsGear(footer as unknown as HTMLElement)).toBe(gear);
  });

  test("moving twice does not duplicate the icon", () => {
    const { footer, wrap, gear } = footerWithGear();
    const btn = el("button", { className: "ggpp-sidenav-settings" });
    placeSidenavSettingsEntry(btn as unknown as HTMLElement, footer as unknown as HTMLElement);
    placeSidenavSettingsEntry(btn as unknown as HTMLElement, footer as unknown as HTMLElement);
    expect(wrap.kids.filter((k) => k === btn)).toHaveLength(1);
    expect(gear.previousElementSibling).toBe(btn);
  });

  test("falls back to the labeled Settings control when the class is missing", () => {
    const { footer, gear } = footerWithGear({ gearClass: "gem-button" });
    const btn = el("button", { className: "ggpp-sidenav-settings" });
    placeSidenavSettingsEntry(btn as unknown as HTMLElement, footer as unknown as HTMLElement);
    expect(gear.previousElementSibling).toBe(btn);
  });

  test("ignores a Settings button that is not in the sidenav footer", () => {
    const cttf = connected(el("div", { className: "cttf", kids: [el("button", { attrs: { "aria-label": "Settings" } })] }));
    const { footer, gear } = footerWithGear();
    const btn = el("button", { className: "ggpp-sidenav-settings" });
    placeSidenavSettingsEntry(btn as unknown as HTMLElement, footer as unknown as HTMLElement);
    expect(cttf.querySelector("button.ggpp-sidenav-settings")).toBe(null);
    expect(gear.previousElementSibling).toBe(btn);
  });

  test("appends to the gear wrapper when the gear is not mounted yet", () => {
    const wrap = el("div", { className: "mavatar-settings-button-wrapper" });
    const right = el("div", { className: "mavatar-footer-right", kids: [wrap] });
    const footer = connected(el("sidenav-mavatar-footer", { kids: [right] }));
    const btn = el("button", { className: "ggpp-sidenav-settings" });
    placeSidenavSettingsEntry(btn as unknown as HTMLElement, footer as unknown as HTMLElement);
    expect(wrap.kids[0]).toBe(btn);
  });
});
