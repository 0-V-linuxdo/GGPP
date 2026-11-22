/**
 * usageDisplay-owned tooltip controller (not wired from index yet).
 * Visual CSS / delays / gaps MUST be supplied by the caller — no Gemini look guesses.
 * No network / observer module imports. No Angular Material / CDK private APIs.
 */

import { positionUsageTooltip, type UsageTipPlacement } from "./usageTooltipGeometry";

/** Minimal attribute surface for a11y patch/restore tests (no full DOM required). */
export type UsageTipAttrTarget = {
  getAttribute(name: string): string | null;
  setAttribute(name: string, value: string): void;
  removeAttribute(name: string): void;
};

export type UsageTipA11yBackup = {
  priorTitle: string | null;
  priorAriaLabel: string | null;
  priorDescribedBy: string | null;
};

/** Suppress UA title; short aria-label; append unique describedby id (no duplicate of tip body into label). */
export function applyUsageTipTriggerA11y(
  el: UsageTipAttrTarget,
  opts: { shortAriaLabel: string; descId: string },
  backup?: UsageTipA11yBackup,
): UsageTipA11yBackup {
  const prior: UsageTipA11yBackup = backup ?? {
    priorTitle: el.getAttribute("title"),
    priorAriaLabel: el.getAttribute("aria-label"),
    priorDescribedBy: el.getAttribute("aria-describedby"),
  };
  el.setAttribute("title", "");
  el.setAttribute("aria-label", opts.shortAriaLabel);
  const existing = (el.getAttribute("aria-describedby") || "")
    .split(/\s+/)
    .filter((id) => id && id !== opts.descId);
  el.setAttribute("aria-describedby", [...existing, opts.descId].join(" "));
  return prior;
}

export function restoreUsageTipTriggerA11y(el: UsageTipAttrTarget, prior: UsageTipA11yBackup, descId: string): void {
  if (prior.priorTitle == null) el.removeAttribute("title");
  else el.setAttribute("title", prior.priorTitle);
  if (prior.priorAriaLabel == null) el.removeAttribute("aria-label");
  else el.setAttribute("aria-label", prior.priorAriaLabel);
  if (prior.priorDescribedBy == null) {
    const parts = (el.getAttribute("aria-describedby") || "").split(/\s+/).filter((id) => id && id !== descId);
    if (parts.length) el.setAttribute("aria-describedby", parts.join(" "));
    else el.removeAttribute("aria-describedby");
  } else el.setAttribute("aria-describedby", prior.priorDescribedBy);
}


export type UsageTooltipClock = {
  setTimeout(fn: () => void, ms: number): unknown;
  clearTimeout(id: unknown): void;
};

export type UsageTooltipControllerConfig = {
  /** Short accessible name for the trigger (not the full tip body). */
  shortAriaLabel: string;
  /** Latest tip body text (plain text only). */
  getMessage: () => string;
  /** Required: full CSS text applied to the tip panel (caller owns visuals). */
  panelCssText: string;
  /** Required: gap trigger→tip (px). */
  gapPx: number;
  /** Required: viewport edge margin (px). */
  viewportMarginPx: number;
  /** Required: show delay (ms). */
  showDelayMs: number;
  /** Required: hide delay (ms). */
  hideDelayMs: number;
  preferredPlacement: UsageTipPlacement;
  /**
   * If true, pointer may move onto the tip without closing (WCAG hoverable/persistent).
   * If false, tip is non-interactive (pointer-events: none) — closer to many native tips.
   */
  interactive: boolean;
  /** Button matcher inside .ggpp-chatbar. Default: usageDisplay slot. */
  triggerSelector?: string;
  /** Chat bar root selector. Default: .ggpp-chatbar */
  barSelector?: string;
  /** scroll: hide tip; resize: reposition while visible. */
  onScroll?: "hide" | "reposition";
  onResize?: "hide" | "reposition";
  /** Test / non-window environments. */
  document?: Document;
  window?: Window & typeof globalThis;
  clock?: UsageTooltipClock;
  /** Injectable for tests (defaults to global MutationObserver). */
  MutationObserver?: typeof MutationObserver;
  idPrefix?: string;
};

type TriggerState = {
  el: HTMLButtonElement;
  /** Restored on detach / when suppressing cleared. */
  priorTitle: string | null;
  priorAriaLabel: string | null;
  priorDescribedBy: string | null;
};

const DEFAULT_TRIGGER = '[data-ggpp-button="usageDisplay"]';
const DEFAULT_BAR = ".ggpp-chatbar";

function isElementNode(el: EventTarget | null): el is Element {
  return !!el && typeof (el as Element).nodeType === "number" && (el as Element).nodeType === 1;
}

function isButtonElement(el: Element): el is HTMLButtonElement {
  const tag = (el.tagName || el.localName || "").toUpperCase();
  return tag === "BUTTON";
}

function isTrigger(el: EventTarget | null, selector: string): el is HTMLButtonElement {
  return isElementNode(el) && isButtonElement(el) && el.matches(selector);
}

function closestTrigger(el: EventTarget | null, bar: Element, selector: string): HTMLButtonElement | null {
  if (!isElementNode(el)) return null;
  if (!bar.contains(el)) return null;
  const t = el.closest(selector);
  if (!t || !isButtonElement(t)) return null;
  return t;
}

/**
 * Attach a delegated tooltip to usage buttons inside `.ggpp-chatbar` only.
 * Does not enable itself from index — callers must `attach` after supplying visual config.
 */
export function createUsageTooltipController(config: UsageTooltipControllerConfig) {
  const docMaybe = config.document ?? (typeof document !== "undefined" ? document : null);
  const winMaybe = config.window ?? (typeof window !== "undefined" ? window : null);
  if (!docMaybe || !winMaybe) {
    return {
      attach() {},
      detach() {},
      syncBars() {},
      isVisible() {
        return false;
      },
      getTipElement() {
        return null as HTMLElement | null;
      },
      getDescId() {
        return "";
      },
    };
  }
  const doc: Document = docMaybe;
  const win: Window & typeof globalThis = winMaybe;

  const clock: UsageTooltipClock = config.clock ?? {
    setTimeout: (fn, ms) => win.setTimeout(fn, ms),
    clearTimeout: (id) => win.clearTimeout(id as number),
  };

  const triggerSelector = config.triggerSelector ?? DEFAULT_TRIGGER;
  const barSelector = config.barSelector ?? DEFAULT_BAR;
  const scrollMode = config.onScroll ?? "hide";
  const resizeMode = config.onResize ?? "reposition";
  const idPrefix = config.idPrefix ?? "ggpp-ud-tip";

  const tipId = `${idPrefix}-${Math.random().toString(36).slice(2, 10)}`;
  const descId = `${tipId}-desc`;

  let attached = false;
  let tipEl: HTMLElement | null = null;
  let descEl: HTMLElement | null = null;
  let showTimer: unknown = null;
  let hideTimer: unknown = null;
  let visible = false;
  let hoverInside = false;
  let focusInside = false;
  /** After Escape: block show until pointer truly left AND focus left. */
  let escapeLatch = false;
  let activeTrigger: TriggerState | null = null;
  const patched = new WeakMap<HTMLButtonElement, TriggerState>();
  let mo: MutationObserver | null = null;
  const bars = new Set<Element>();

  const clearShow = () => {
    if (showTimer != null) clock.clearTimeout(showTimer);
    showTimer = null;
  };
  const clearHide = () => {
    if (hideTimer != null) clock.clearTimeout(hideTimer);
    hideTimer = null;
  };

  function ensureNodes() {
    if (!tipEl) {
      tipEl = doc.createElement("div");
      tipEl.id = tipId;
      tipEl.setAttribute("role", "tooltip");
      tipEl.style.cssText = config.panelCssText;
      if (!config.interactive) tipEl.style.pointerEvents = "none";
      tipEl.hidden = true;
      // Plain text only — never innerHTML.
      tipEl.appendChild(doc.createTextNode(""));
      doc.body.appendChild(tipEl);
    }
    if (!descEl) {
      // Visually-hidden description for aria-describedby (Material AriaDescriber pattern, no Material classes).
      descEl = doc.createElement("div");
      descEl.id = descId;
      descEl.style.cssText =
        "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;";
      descEl.appendChild(doc.createTextNode(""));
      doc.body.appendChild(descEl);
    }
  }

  function setTipText(msg: string) {
    ensureNodes();
    const ensureText = (host: HTMLElement) => {
      let n = host.firstChild;
      if (!n || n.nodeType !== 3) {
        host.textContent = "";
        n = doc.createTextNode("");
        host.appendChild(n);
      }
      (n as Text).nodeValue = msg;
    };
    ensureText(tipEl!);
    ensureText(descEl!);
  }

  function patchTrigger(btn: HTMLButtonElement) {
    let st = patched.get(btn);
    if (!st) {
      const prior = applyUsageTipTriggerA11y(btn, { shortAriaLabel: config.shortAriaLabel, descId });
      st = { el: btn, ...prior };
      patched.set(btn, st);
      return;
    }
    applyUsageTipTriggerA11y(btn, { shortAriaLabel: config.shortAriaLabel, descId }, st);
  }

  function restoreTrigger(st: TriggerState) {
    restoreUsageTipTriggerA11y(st.el, st, descId);
  }

  function scanBar(bar: Element) {
    bar.querySelectorAll<HTMLButtonElement>(triggerSelector).forEach(patchTrigger);
  }

  function placeTip(btn: HTMLButtonElement) {
    ensureNodes();
    const r = btn.getBoundingClientRect();
    const tr = tipEl!.getBoundingClientRect();
    // If hidden, width/height may be 0 — measure off-screen briefly.
    let tw = tr.width;
    let th = tr.height;
    if (tw < 1 || th < 1) {
      tipEl!.hidden = false;
      tipEl!.style.visibility = "hidden";
      const m = tipEl!.getBoundingClientRect();
      tw = m.width;
      th = m.height;
      tipEl!.style.visibility = "";
      tipEl!.hidden = true;
    }
    const pos = positionUsageTooltip({
      anchor: { top: r.top, left: r.left, width: r.width, height: r.height },
      tip: { width: tw || 1, height: th || 1 },
      viewport: { width: win.innerWidth, height: win.innerHeight },
      gapPx: config.gapPx,
      viewportMarginPx: config.viewportMarginPx,
      preferred: config.preferredPlacement,
    });
    tipEl!.style.position = "fixed";
    tipEl!.style.top = `${pos.top}px`;
    tipEl!.style.left = `${pos.left}px`;
  }

  function showNow(btn: HTMLButtonElement) {
    if (escapeLatch) return;
    clearHide();
    ensureNodes();
    patchTrigger(btn);
    activeTrigger = patched.get(btn) ?? null;
    const msg = config.getMessage() || "";
    setTipText(msg);
    placeTip(btn);
    tipEl!.hidden = false;
    visible = true;
  }

  function hideNow() {
    clearShow();
    clearHide();
    visible = false;
    if (tipEl) tipEl.hidden = true;
    activeTrigger = null;
  }

  function requestShow(btn: HTMLButtonElement) {
    if (escapeLatch) return;
    clearHide();
    if (visible && activeTrigger?.el === btn) {
      placeTip(btn);
      return;
    }
    clearShow();
    if (config.showDelayMs <= 0) {
      showNow(btn);
      return;
    }
    showTimer = clock.setTimeout(() => {
      showTimer = null;
      if (escapeLatch) return;
      if (!hoverInside && !focusInside) return;
      showNow(btn);
    }, config.showDelayMs);
  }

  function requestHide() {
    clearShow();
    if (!visible && showTimer == null) return;
    if (hoverInside || focusInside) return;
    clearHide();
    if (config.hideDelayMs <= 0) {
      hideNow();
      return;
    }
    hideTimer = clock.setTimeout(() => {
      hideTimer = null;
      if (hoverInside || focusInside) return;
      hideNow();
    }, config.hideDelayMs);
  }

  function onPointerEnter(e: Event) {
    const bar = (e.currentTarget as Element) ?? null;
    if (!bar) return;
    const btn = closestTrigger(e.target, bar, triggerSelector);
    if (!btn) return;
    hoverInside = true;
    if (escapeLatch && focusInside) {
      // Still latched until leave+blur cycle completes.
      return;
    }
    if (escapeLatch) return;
    requestShow(btn);
  }

  function onPointerLeave(e: Event) {
    const bar = e.currentTarget as Element;
    const related = (e as PointerEvent).relatedTarget as Node | null;
    if (config.interactive && tipEl && related && tipEl.contains(related)) {
      hoverInside = true;
      return;
    }
    // Leaving to elsewhere inside same trigger counts as still hovering.
    if (related && closestTrigger(related, bar, triggerSelector)) {
      hoverInside = true;
      return;
    }
    hoverInside = false;
    if (escapeLatch && !focusInside) escapeLatch = false;
    requestHide();
  }

  function onFocusIn(e: Event) {
    const bar = e.currentTarget as Element;
    const btn = closestTrigger(e.target, bar, triggerSelector);
    if (!btn) return;
    focusInside = true;
    if (escapeLatch) return;
    requestShow(btn);
  }

  function onFocusOut(e: Event) {
    const bar = e.currentTarget as Element;
    const related = (e as FocusEvent).relatedTarget as Node | null;
    if (related && closestTrigger(related, bar, triggerSelector)) {
      focusInside = true;
      return;
    }
    if (config.interactive && tipEl && related && tipEl.contains(related)) {
      focusInside = true;
      return;
    }
    focusInside = false;
    if (escapeLatch && !hoverInside) escapeLatch = false;
    requestHide();
  }

  function onTipPointerEnter() {
    if (!config.interactive) return;
    hoverInside = true;
    clearHide();
  }

  function onTipPointerLeave(e: PointerEvent) {
    if (!config.interactive) return;
    const related = e.relatedTarget as Node | null;
    if (related && activeTrigger && activeTrigger.el.contains(related)) {
      hoverInside = true;
      return;
    }
    hoverInside = false;
    requestHide();
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key !== "Escape") return;
    if (!visible && showTimer == null) return;
    e.stopPropagation();
    escapeLatch = true;
    hoverInside = false;
    // Keep focusInside as-is; latch blocks show until blur+leave clear it.
    hideNow();
  }

  function onScroll() {
    if (!visible) return;
    if (scrollMode === "hide") hideNow();
    else if (activeTrigger) placeTip(activeTrigger.el);
  }

  function onResize() {
    if (!visible) return;
    if (resizeMode === "hide") hideNow();
    else if (activeTrigger) placeTip(activeTrigger.el);
  }

  function bindBar(bar: Element) {
    if (bars.has(bar)) {
      scanBar(bar);
      return;
    }
    bars.add(bar);
    // pointerenter/leave do not bubble; capture:true still sees child targets on the path.
    // Prefer this over pointerover (bubbles, noisier) so we only react to enter/leave edges.
    bar.addEventListener("pointerenter", onPointerEnter, true);
    bar.addEventListener("pointerleave", onPointerLeave, true);
    bar.addEventListener("focusin", onFocusIn, true);
    bar.addEventListener("focusout", onFocusOut, true);
    scanBar(bar);
  }

  function unbindBar(bar: Element) {
    bar.removeEventListener("pointerenter", onPointerEnter, true);
    bar.removeEventListener("pointerleave", onPointerLeave, true);
    bar.removeEventListener("focusin", onFocusIn, true);
    bar.removeEventListener("focusout", onFocusOut, true);
    bars.delete(bar);
  }

  function onMutations(muts: MutationRecord[]) {
    for (const m of muts) {
      if (m.type !== "childList") continue;
      // Only .ggpp-chatbar regions we already bound — never document-wide logic beyond that.
      let bar: Element | null = null;
      if (isElementNode(m.target)) {
        if (bars.has(m.target)) bar = m.target;
        else bar = m.target.closest(barSelector);
      }
      if (bar && bars.has(bar)) scanBar(bar);
    }
  }

  function observeBar(bar: Element) {
    if (!mo) return;
    mo.observe(bar, { childList: true, subtree: true });
  }

  /**
   * Re-scan DOM for `.ggpp-chatbar` (call after chatBar mounts a new bar).
   * Drops listeners for bars no longer connected — SPA bar replacement requires the caller
   * to invoke this (controller does not watch document-wide for new bars).
   */
  function syncBars() {
    if (!attached) return;
    for (const bar of [...bars]) {
      if (!(bar as HTMLElement).isConnected) unbindBar(bar);
    }
    doc.querySelectorAll(barSelector).forEach((b) => {
      bindBar(b);
      observeBar(b);
    });
  }

  function attach() {
    if (attached) return;
    attached = true;
    ensureNodes();
    if (config.interactive && tipEl) {
      tipEl.addEventListener("pointerenter", onTipPointerEnter);
      tipEl.addEventListener("pointerleave", onTipPointerLeave as EventListener);
    }
    const MO = config.MutationObserver ?? globalThis.MutationObserver;
    mo = new MO(onMutations);
    syncBars();
    win.addEventListener("keydown", onKeyDown, true);
    win.addEventListener("scroll", onScroll, true);
    win.addEventListener("resize", onResize);
  }

  function detach() {
    if (!attached) return;
    attached = false;
    clearShow();
    clearHide();
    hideNow();
    escapeLatch = false;
    hoverInside = false;
    focusInside = false;
    win.removeEventListener("keydown", onKeyDown, true);
    win.removeEventListener("scroll", onScroll, true);
    win.removeEventListener("resize", onResize);
    mo?.disconnect();
    mo = null;
    for (const bar of [...bars]) unbindBar(bar);
    // Restore every patched trigger we can still reach.
    doc.querySelectorAll<HTMLButtonElement>(triggerSelector).forEach((btn) => {
      const st = patched.get(btn);
      if (st) restoreTrigger(st);
    });
    if (tipEl) {
      tipEl.removeEventListener("pointerenter", onTipPointerEnter);
      tipEl.removeEventListener("pointerleave", onTipPointerLeave as EventListener);
      tipEl.remove();
      tipEl = null;
    }
    if (descEl) {
      descEl.remove();
      descEl = null;
    }
  }

  return {
    attach,
    detach,
    syncBars,
    isVisible: () => visible,
    getTipElement: () => tipEl,
    getDescId: () => descId,
    /** Test helpers */
    _requestShow: (btn: HTMLButtonElement) => requestShow(btn),
    _requestHide: () => requestHide(),
    _setHover: (v: boolean) => {
      hoverInside = v;
    },
    _setFocus: (v: boolean) => {
      focusInside = v;
    },
    _escapeLatch: () => escapeLatch,
    _clearEscapeLatch: () => {
      escapeLatch = false;
    },
  };
}

export type UsageTooltipController = ReturnType<typeof createUsageTooltipController>;
