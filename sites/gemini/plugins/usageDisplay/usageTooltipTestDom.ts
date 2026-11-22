/**
 * Minimal injectable DOM for usageTooltipController behavioral tests.
 * Not a product dependency — no happy-dom/jsdom package.
 */

type Listener = { fn: EventListenerOrEventListenerObject; capture: boolean };

function callListener(fn: EventListenerOrEventListenerObject, ev: Event) {
  if (typeof fn === "function") fn(ev);
  else fn.handleEvent(ev);
}

export class MiniNode {
  parentNode: MiniElement | null = null;
  nodeType = 0;
  childNodes: MiniNode[] = [];
}

export class MiniText extends MiniNode {
  nodeType = 3;
  nodeValue: string | null;
  constructor(value: string) {
    super();
    this.nodeValue = value;
  }
}

export class MiniElement extends MiniNode {
  nodeType = 1;
  tagName: string;
  localName: string;
  id = "";
  className = "";
  hidden = false;
  style: { cssText: string; pointerEvents?: string; position?: string; top?: string; left?: string; visibility?: string } = {
    cssText: "",
  };
  attrs = new Map<string, string>();
  listeners = new Map<string, Listener[]>();
  isConnected = false;
  ownerDocument: MiniDocument | null = null;
  /** Test-controlled box. */
  box = { top: 0, left: 0, width: 36, height: 36, bottom: 36, right: 36, x: 0, y: 0, toJSON() {} };

  constructor(tag: string) {
    super();
    this.localName = tag.toLowerCase();
    this.tagName = this.localName.toUpperCase();
  }

  getAttribute(name: string) {
    return this.attrs.has(name) ? this.attrs.get(name)! : null;
  }
  setAttribute(name: string, value: string) {
    this.attrs.set(name, value);
    if (name === "id") this.id = value;
    if (name === "class") this.className = value;
  }
  removeAttribute(name: string) {
    this.attrs.delete(name);
    if (name === "id") this.id = "";
    if (name === "class") this.className = "";
  }

  matches(sel: string): boolean {
    return matchSel(this, sel);
  }

  closest(sel: string): MiniElement | null {
    let n: MiniElement | null = this;
    while (n) {
      if (n.matches(sel)) return n;
      n = n.parentNode instanceof MiniElement ? n.parentNode : null;
    }
    return null;
  }

  contains(other: MiniNode | Node | null): boolean {
    if (!other) return false;
    if (other === (this as unknown as object)) return true;
    let n: MiniNode | null = other as MiniNode;
    while (n) {
      if (n === this) return true;
      n = n.parentNode;
    }
    return false;
  }

  get firstChild(): MiniNode | null {
    return this.childNodes[0] ?? null;
  }

  get textContent(): string {
    return this.childNodes.map((c) => (c instanceof MiniText ? c.nodeValue ?? "" : (c as MiniElement).textContent)).join("");
  }
  set textContent(v: string) {
    this.childNodes = [];
    if (v) this.appendChild(new MiniText(v));
  }

  get children(): MiniElement[] {
    return this.childNodes.filter((c): c is MiniElement => c instanceof MiniElement);
  }

  appendChild<T extends MiniNode>(child: T): T {
    if (child.parentNode) child.parentNode.removeChild(child);
    child.parentNode = this;
    this.childNodes.push(child);
    if (child instanceof MiniElement) {
      child.ownerDocument = this.ownerDocument;
      markConnected(child, this.isConnected);
    }
    this.ownerDocument?._notifyMutation(this);
    return child;
  }

  removeChild<T extends MiniNode>(child: T): T {
    const i = this.childNodes.indexOf(child);
    if (i >= 0) this.childNodes.splice(i, 1);
    child.parentNode = null;
    if (child instanceof MiniElement) markConnected(child, false);
    this.ownerDocument?._notifyMutation(this);
    return child;
  }

  replaceChildren(...nodes: MiniNode[]) {
    for (const c of [...this.childNodes]) this.removeChild(c);
    for (const n of nodes) this.appendChild(n);
  }

  remove() {
    this.parentNode?.removeChild(this);
  }

  querySelector(sel: string): MiniElement | null {
    return this.querySelectorAll(sel)[0] ?? null;
  }

  querySelectorAll(sel: string): MiniElement[] {
    const out: MiniElement[] = [];
    const walk = (el: MiniElement) => {
      for (const c of el.children) {
        if (c.matches(sel)) out.push(c);
        walk(c);
      }
    };
    walk(this);
    return out;
  }

  getBoundingClientRect() {
    return { ...this.box, toJSON() {} };
  }

  addEventListener(type: string, fn: EventListenerOrEventListenerObject, opts?: boolean | { capture?: boolean }) {
    const capture = typeof opts === "boolean" ? opts : !!opts?.capture;
    const list = this.listeners.get(type) ?? [];
    list.push({ fn, capture });
    this.listeners.set(type, list);
  }

  removeEventListener(type: string, fn: EventListenerOrEventListenerObject, opts?: boolean | { capture?: boolean }) {
    const capture = typeof opts === "boolean" ? opts : !!opts?.capture;
    const list = this.listeners.get(type) ?? [];
    this.listeners.set(
      type,
      list.filter((l) => l.fn !== fn || l.capture !== capture),
    );
  }

  /** Dispatch with capture→target→bubble; enter/leave skip bubble. */
  dispatchEvent(ev: MiniEvent): boolean {
    const path = ancestorPath(this);
    ev._setTarget(this);
    const noBubble = ev.type === "pointerenter" || ev.type === "pointerleave" || ev.type === "mouseenter" || ev.type === "mouseleave";
    for (const el of path) {
      ev._setCurrentTarget(el);
      for (const l of el.listeners.get(ev.type) ?? []) {
        if (l.capture) callListener(l.fn, ev as unknown as Event);
      }
    }
    ev._setCurrentTarget(this);
    for (const l of this.listeners.get(ev.type) ?? []) {
      if (!l.capture) callListener(l.fn, ev as unknown as Event);
    }
    if (!noBubble) {
      for (const el of [...path].reverse()) {
        if (el === this) continue;
        ev._setCurrentTarget(el);
        for (const l of el.listeners.get(ev.type) ?? []) {
          if (!l.capture) callListener(l.fn, ev as unknown as Event);
        }
      }
    }
    return !ev.defaultPrevented;
  }
}

function markConnected(el: MiniElement, connected: boolean) {
  el.isConnected = connected;
  for (const c of el.children) markConnected(c, connected);
}

function ancestorPath(el: MiniElement): MiniElement[] {
  const path: MiniElement[] = [];
  let n: MiniElement | null = el;
  while (n) {
    path.push(n);
    n = n.parentNode instanceof MiniElement ? n.parentNode : null;
  }
  return path.reverse();
}

function matchSel(el: MiniElement, sel: string): boolean {
  const s = sel.trim();
  if (s.startsWith(".")) return el.className.split(/\s+/).includes(s.slice(1));
  const attr = /^\[([^=\]]+)="([^"]*)"\]$/.exec(s);
  if (attr) return el.getAttribute(attr[1]) === attr[2];
  const attrExist = /^\[([^=\]]+)\]$/.exec(s);
  if (attrExist) return el.getAttribute(attrExist[1]) != null;
  if (/^[a-z][\w-]*$/i.test(s)) return el.localName === s.toLowerCase();
  // compound: button.class or button[attr]
  const m = /^([a-z][\w-]*)(\.[\w-]+|\[.*\])$/i.exec(s);
  if (m) return el.localName === m[1].toLowerCase() && matchSel(el, m[2]);
  // button[data-ggpp-button="usageDisplay"]
  const m2 = /^([a-z][\w-]*)(\[.*\])$/i.exec(s);
  if (m2) return el.localName === m2[1].toLowerCase() && matchSel(el, m2[2]);
  return false;
}

export class MiniEvent {
  type: string;
  bubbles: boolean;
  cancelable: boolean;
  defaultPrevented = false;
  target: MiniElement | null = null;
  currentTarget: MiniElement | null = null;
  relatedTarget: MiniElement | null = null;
  key = "";
  constructor(type: string, init: { bubbles?: boolean; cancelable?: boolean; relatedTarget?: MiniElement | null; key?: string } = {}) {
    this.type = type;
    this.bubbles = !!init.bubbles;
    this.cancelable = !!init.cancelable;
    this.relatedTarget = init.relatedTarget ?? null;
    this.key = init.key ?? "";
  }
  _setTarget(t: MiniElement) {
    this.target = t;
  }
  _setCurrentTarget(t: MiniElement) {
    this.currentTarget = t;
  }
  preventDefault() {
    this.defaultPrevented = true;
  }
  stopPropagation() {}
}

export class MiniMutationObserver {
  cb: MutationCallback;
  targets = new Set<MiniElement>();
  constructor(cb: MutationCallback) {
    this.cb = cb;
  }
  observe(target: MiniElement, _opts?: MutationObserverInit) {
    this.targets.add(target);
    target.ownerDocument?._observers.add(this);
  }
  disconnect() {
    this.targets.clear();
  }
  _fire(target: MiniElement) {
    if (!this.targets.has(target) && ![...this.targets].some((t) => t.contains(target))) return;
    const rec = {
      type: "childList",
      target: target as unknown as Node,
      addedNodes: [] as unknown as NodeList,
      removedNodes: [] as unknown as NodeList,
      previousSibling: null,
      nextSibling: null,
      attributeName: null,
      attributeNamespace: null,
      oldValue: null,
    } as MutationRecord;
    this.cb([rec], this as unknown as MutationObserver);
  }
}

export class MiniDocument {
  body: MiniElement;
  _observers = new Set<MiniMutationObserver>();
  defaultView: MiniWindow;

  constructor() {
    this.body = new MiniElement("body");
    this.body.ownerDocument = this;
    this.body.isConnected = true;
    this.defaultView = null as unknown as MiniWindow;
  }

  createElement(tag: string) {
    const el = new MiniElement(tag);
    el.ownerDocument = this;
    return el as unknown as HTMLElement;
  }

  createTextNode(data: string) {
    return new MiniText(data) as unknown as Text;
  }

  querySelector(sel: string) {
    if (this.body.matches(sel)) return this.body as unknown as Element;
    return this.body.querySelector(sel) as unknown as Element | null;
  }

  querySelectorAll(sel: string) {
    const list = this.body.querySelectorAll(sel);
    if (this.body.matches(sel)) return [this.body, ...list] as unknown as NodeListOf<Element>;
    return list as unknown as NodeListOf<Element>;
  }

  _notifyMutation(parent: MiniElement) {
    for (const ob of this._observers) ob._fire(parent);
  }
}

export class MiniWindow {
  document: MiniDocument;
  innerWidth = 1000;
  innerHeight = 800;
  listeners = new Map<string, Listener[]>();
  timers = new Map<number, () => void>();
  nextTimer = 1;

  constructor(doc: MiniDocument) {
    this.document = doc;
    doc.defaultView = this;
  }

  setTimeout(fn: () => void, ms: number) {
    const id = this.nextTimer++;
    this.timers.set(id, fn);
    if (ms <= 0) {
      // run sync for tests that use 0 delay via real clock — but controller uses injected clock usually
      queueMicrotask(() => {
        if (this.timers.has(id)) {
          this.timers.delete(id);
          fn();
        }
      });
    }
    return id;
  }

  clearTimeout(id: number) {
    this.timers.delete(id);
  }

  /** Flush all pending timers (test helper). */
  flushTimers() {
    for (const [id, fn] of [...this.timers]) {
      this.timers.delete(id);
      fn();
    }
  }

  addEventListener(type: string, fn: EventListenerOrEventListenerObject, opts?: boolean | { capture?: boolean }) {
    const capture = typeof opts === "boolean" ? opts : !!opts?.capture;
    const list = this.listeners.get(type) ?? [];
    list.push({ fn, capture });
    this.listeners.set(type, list);
  }

  removeEventListener(type: string, fn: EventListenerOrEventListenerObject, opts?: boolean | { capture?: boolean }) {
    const capture = typeof opts === "boolean" ? opts : !!opts?.capture;
    const list = this.listeners.get(type) ?? [];
    this.listeners.set(
      type,
      list.filter((l) => l.fn !== fn || l.capture !== capture),
    );
  }

  dispatchKey(key: string) {
    const ev = new MiniEvent("keydown", { bubbles: true, key });
    (ev as unknown as KeyboardEvent);
    // patch key onto event for handler
    Object.defineProperty(ev, "key", { value: key });
    for (const l of this.listeners.get("keydown") ?? []) {
      if (l.capture) callListener(l.fn, ev as unknown as Event);
    }
    for (const l of this.listeners.get("keydown") ?? []) {
      if (!l.capture) callListener(l.fn, ev as unknown as Event);
    }
  }

  dispatchScroll() {
    for (const l of this.listeners.get("scroll") ?? []) callListener(l.fn, new MiniEvent("scroll") as unknown as Event);
  }
}

export function createMiniDom() {
  const document = new MiniDocument();
  const window = new MiniWindow(document);
  const MutationObserver = MiniMutationObserver as unknown as typeof globalThis.MutationObserver;
  return { document, window, MutationObserver, MiniEvent, MiniElement };
}

export function makeBarWithButton(doc: MiniDocument, opts?: { title?: string; label?: string }) {
  const bar = doc.createElement("div") as unknown as MiniElement;
  bar.setAttribute("class", "ggpp-chatbar");
  const btn = doc.createElement("button") as unknown as MiniElement;
  btn.setAttribute("data-ggpp-button", "usageDisplay");
  btn.setAttribute("title", opts?.title ?? "用量\n今日 +0%\n5小时已用 2%");
  btn.setAttribute("aria-label", opts?.label ?? opts?.title ?? "用量\n今日 +0%\n5小时已用 2%");
  btn.box = { top: 100, left: 100, width: 40, height: 36, bottom: 136, right: 140, x: 100, y: 100, toJSON() {} };
  bar.appendChild(btn);
  doc.body.appendChild(bar);
  return { bar, btn };
}
