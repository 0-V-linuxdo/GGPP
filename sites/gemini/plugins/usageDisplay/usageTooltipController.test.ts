import { expect, test, describe, beforeEach } from "bun:test";
import {
  applyUsageTipTriggerA11y,
  restoreUsageTipTriggerA11y,
  createUsageTooltipController,
  type UsageTipAttrTarget,
} from "./usageTooltipController";
import {
  createMiniDom,
  makeBarWithButton,
  MiniEvent,
  MiniElement,
  MiniMutationObserver,
  type MiniDocument,
  type MiniWindow,
} from "./usageTooltipTestDom";

/** Honest note: string/source contracts are NOT behavioral coverage of attach/hover/cleanup. */

function attrBag(init: Record<string, string | null> = {}): UsageTipAttrTarget & { map: Map<string, string> } {
  const map = new Map<string, string>();
  for (const [k, v] of Object.entries(init)) {
    if (v != null) map.set(k, v);
  }
  return {
    map,
    getAttribute(name: string) {
      return map.has(name) ? map.get(name)! : null;
    },
    setAttribute(name: string, value: string) {
      map.set(name, value);
    },
    removeAttribute(name: string) {
      map.delete(name);
    },
  };
}

describe("applyUsageTipTriggerA11y (unit, no full controller)", () => {
  test("title empty + short label + unique describedby", () => {
    const el = attrBag({
      title: "用量\nline2",
      "aria-label": "用量\nline2",
      "aria-describedby": "keep-me",
    });
    applyUsageTipTriggerA11y(el, { shortAriaLabel: "用量", descId: "desc-x" });
    expect(el.getAttribute("title")).toBe("");
    expect(el.getAttribute("aria-label")).toBe("用量");
    expect(el.getAttribute("aria-describedby")).toBe("keep-me desc-x");
  });

  test("restore prior attributes", () => {
    const el = attrBag({ title: "T", "aria-label": "L" });
    const prior = applyUsageTipTriggerA11y(el, { shortAriaLabel: "短", descId: "d" });
    restoreUsageTipTriggerA11y(el, prior, "d");
    expect(el.getAttribute("title")).toBe("T");
    expect(el.getAttribute("aria-label")).toBe("L");
  });
});

describe("createUsageTooltipController — behavioral (mini DOM)", () => {
  let document: MiniDocument;
  let window: MiniWindow;
  let clock: {
    timers: Map<number, () => void>;
    setTimeout: (fn: () => void, ms: number) => number;
    clearTimeout: (id: unknown) => void;
  };

  beforeEach(() => {
    const mini = createMiniDom();
    document = mini.document;
    window = mini.window;
    let next = 1;
    const timers = new Map<number, () => void>();
    clock = {
      timers,
      setTimeout(fn, _ms) {
        const id = next++;
        timers.set(id, fn);
        return id;
      },
      clearTimeout(id) {
        timers.delete(id as number);
      },
    };
  });

  function makeCtrl(interactive = false, delays?: { showDelayMs?: number; hideDelayMs?: number }) {
    return createUsageTooltipController({
      shortAriaLabel: "用量",
      getMessage: () => "用量\n今日 +0%（本机记录增量）\n5小时已用 2%",
      panelCssText: "/* test caller-supplied */ background:#000;color:#fff;",
      gapPx: 8,
      viewportMarginPx: 8,
      showDelayMs: delays?.showDelayMs ?? 0,
      hideDelayMs: delays?.hideDelayMs ?? 0,
      preferredPlacement: "below",
      interactive,
      document: document as unknown as Document,
      window: window as unknown as Window & typeof globalThis,
      clock,
      MutationObserver: MiniMutationObserver as unknown as typeof MutationObserver,
      idPrefix: "test-tip",
    });
  }

  test("attach patches existing button: empty title, short aria-label, unique describedby", () => {
    const { btn } = makeBarWithButton(document);
    const ctrl = makeCtrl();
    ctrl.attach();
    expect(btn.getAttribute("title")).toBe("");
    expect(btn.getAttribute("aria-label")).toBe("用量");
    expect(btn.getAttribute("aria-label")!.includes("\n")).toBe(false);
    expect(btn.getAttribute("aria-describedby")).toBe(ctrl.getDescId());
    expect(ctrl.getTipElement()?.getAttribute("role")).toBe("tooltip");
    expect(ctrl.getTipElement()?.childNodes[0]?.nodeType).toBe(3);
  });

  test("pointerenter (capture path) shows tip; Escape hides; re-enter after leave works", () => {
    const { btn } = makeBarWithButton(document);
    const ctrl = makeCtrl();
    ctrl.attach();
    btn.dispatchEvent(new MiniEvent("pointerenter"));
    expect(ctrl.isVisible()).toBe(true);
    expect(ctrl.getTipElement()?.hidden).toBe(false);
    expect((ctrl.getTipElement()?.firstChild as { nodeValue: string | null }).nodeValue).toContain("本机记录增量");
    window.dispatchKey("Escape");
    expect(ctrl.isVisible()).toBe(false);
    btn.dispatchEvent(new MiniEvent("pointerleave", { relatedTarget: document.body }));
    btn.dispatchEvent(new MiniEvent("pointerenter"));
    expect(ctrl.isVisible()).toBe(true);
  });

  test("focusin shows; focusout relatedTarget=tip (interactive) does not hide", () => {
    const { btn } = makeBarWithButton(document);
    const ctrl = makeCtrl(true);
    ctrl.attach();
    const tip = ctrl.getTipElement() as unknown as MiniElement;
    tip.box = { top: 150, left: 100, width: 200, height: 60, bottom: 210, right: 300, x: 100, y: 150, toJSON() {} };
    btn.dispatchEvent(new MiniEvent("focusin"));
    expect(ctrl.isVisible()).toBe(true);
    btn.dispatchEvent(new MiniEvent("focusout", { relatedTarget: tip }));
    expect(ctrl.isVisible()).toBe(true);
    btn.dispatchEvent(new MiniEvent("focusout", { relatedTarget: document.body }));
    tip.dispatchEvent(new MiniEvent("pointerleave", { relatedTarget: document.body }));
    expect(ctrl.isVisible()).toBe(false);
  });

  test("pointerleave while focused does not hide (hover+focus merge)", () => {
    const { btn } = makeBarWithButton(document);
    const ctrl = makeCtrl();
    ctrl.attach();
    btn.dispatchEvent(new MiniEvent("focusin"));
    btn.dispatchEvent(new MiniEvent("pointerenter"));
    btn.dispatchEvent(new MiniEvent("pointerleave", { relatedTarget: document.body }));
    expect(ctrl.isVisible()).toBe(true);
    btn.dispatchEvent(new MiniEvent("focusout", { relatedTarget: document.body }));
    expect(ctrl.isVisible()).toBe(false);
  });

  test("bar replaceChildren new button patched via MutationObserver + still shows", () => {
    const { bar } = makeBarWithButton(document);
    const ctrl = makeCtrl();
    ctrl.attach();
    const btn2 = document.createElement("button") as unknown as MiniElement;
    btn2.setAttribute("data-ggpp-button", "usageDisplay");
    btn2.setAttribute("title", "NEW\nLINES");
    btn2.setAttribute("aria-label", "NEW\nLINES");
    btn2.box = { top: 100, left: 100, width: 40, height: 36, bottom: 136, right: 140, x: 100, y: 100, toJSON() {} };
    bar.replaceChildren(btn2);
    expect(btn2.getAttribute("title")).toBe("");
    expect(btn2.getAttribute("aria-label")).toBe("用量");
    expect(btn2.getAttribute("aria-describedby")).toBe(ctrl.getDescId());
    btn2.dispatchEvent(new MiniEvent("pointerenter"));
    expect(ctrl.isVisible()).toBe(true);
  });

  test("detach restores attrs, removes tip, clears hide timer, listeners dead", () => {
    const { btn } = makeBarWithButton(document, { title: "ORIG\nT", label: "ORIG\nT" });
    const ctrl = makeCtrl();
    ctrl.attach();
    expect(btn.getAttribute("title")).toBe("");
    ctrl.detach();
    expect(btn.getAttribute("title")).toBe("ORIG\nT");
    expect(btn.getAttribute("aria-label")).toBe("ORIG\nT");
    expect(document.body.querySelector('[role="tooltip"]')).toBeNull();
    expect(ctrl.getTipElement()).toBeNull();

    const ctrl2 = makeCtrl(false, { hideDelayMs: 50 });
    const { btn: b2 } = makeBarWithButton(document);
    ctrl2.attach();
    b2.dispatchEvent(new MiniEvent("pointerenter"));
    expect(ctrl2.isVisible()).toBe(true);
    b2.dispatchEvent(new MiniEvent("pointerleave", { relatedTarget: document.body }));
    expect(clock.timers.size).toBeGreaterThan(0);
    ctrl2.detach();
    expect(clock.timers.size).toBe(0);
    expect(ctrl2.isVisible()).toBe(false);
    b2.dispatchEvent(new MiniEvent("pointerenter"));
    expect(ctrl2.isVisible()).toBe(false);
  });

  test("SPA whole-bar replace: without syncBars new bar unpatched; syncBars fixes", () => {
    const { bar, btn } = makeBarWithButton(document);
    const ctrl = makeCtrl();
    ctrl.attach();
    btn.dispatchEvent(new MiniEvent("pointerenter"));
    expect(ctrl.isVisible()).toBe(true);
    bar.remove();
    const { btn: btn2 } = makeBarWithButton(document, { title: "x\ny", label: "x\ny" });
    expect(btn2.getAttribute("title")).toBe("x\ny");
    btn2.dispatchEvent(new MiniEvent("pointerenter"));
    expect(btn2.getAttribute("aria-label")).toBe("x\ny");
    ctrl.syncBars();
    expect(btn2.getAttribute("title")).toBe("");
    expect(btn2.getAttribute("aria-label")).toBe("用量");
    btn2.dispatchEvent(new MiniEvent("pointerenter"));
    expect(ctrl.isVisible()).toBe(true);
  });

  test("index wired to usageTooltipController", async () => {
    const index = await Bun.file(new URL("./index.ts", import.meta.url)).text();
    expect(index.includes("usageTooltipController")).toBe(true);
    expect(index.includes("createUsageTooltipController")).toBe(true);
  });
});
