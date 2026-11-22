/**
 * Pure interaction state for usage tooltip (no DOM / network).
 * Hover+focus are OR-ed; Escape latches until both leave; delays are caller-supplied.
 */

export type UsageTooltipPhase = "hidden" | "pendingShow" | "visible" | "pendingHide";

export type UsageTooltipState = {
  phase: UsageTooltipPhase;
  hover: boolean;
  focus: boolean;
  /** Block show until both hover and focus have been false after Escape. */
  escapeLatch: boolean;
  showTimerActive: boolean;
  hideTimerActive: boolean;
};

export function createInitialUsageTooltipState(): UsageTooltipState {
  return {
    phase: "hidden",
    hover: false,
    focus: false,
    escapeLatch: false,
    showTimerActive: false,
    hideTimerActive: false,
  };
}

function engaged(s: UsageTooltipState): boolean {
  return s.hover || s.focus;
}

export type UsageTooltipStateEvent =
  | { type: "hoverEnter" }
  | { type: "hoverLeave" }
  | { type: "focusEnter" }
  | { type: "focusLeave" }
  | { type: "escape" }
  | { type: "showTimerFired" }
  | { type: "hideTimerFired" }
  | { type: "forceHide" };

export type UsageTooltipStateEffect =
  | { op: "clearShowTimer" }
  | { op: "clearHideTimer" }
  | { op: "armShowTimer" }
  | { op: "armHideTimer" }
  | { op: "show" }
  | { op: "hide" };

/**
 * Reduce interaction state. Caller interprets effects with its delays (0 = immediate show/hide).
 * When showDelayMs/hideDelayMs are 0, the reducer emits show/hide directly instead of arming timers.
 */
export function reduceUsageTooltipState(
  s: UsageTooltipState,
  ev: UsageTooltipStateEvent,
  delays: { showDelayMs: number; hideDelayMs: number },
): { state: UsageTooltipState; effects: UsageTooltipStateEffect[] } {
  const effects: UsageTooltipStateEffect[] = [];
  let next: UsageTooltipState = { ...s };

  const clearShow = () => {
    if (next.showTimerActive) effects.push({ op: "clearShowTimer" });
    next = { ...next, showTimerActive: false };
  };
  const clearHide = () => {
    if (next.hideTimerActive) effects.push({ op: "clearHideTimer" });
    next = { ...next, hideTimerActive: false };
  };

  const tryClearLatch = () => {
    if (next.escapeLatch && !next.hover && !next.focus) {
      next = { ...next, escapeLatch: false };
    }
  };

  const requestShow = () => {
    if (next.escapeLatch) return;
    clearHide();
    if (next.phase === "visible") return;
    clearShow();
    if (delays.showDelayMs <= 0) {
      next = { ...next, phase: "visible", showTimerActive: false };
      effects.push({ op: "show" });
    } else {
      next = { ...next, phase: "pendingShow", showTimerActive: true };
      effects.push({ op: "armShowTimer" });
    }
  };

  const requestHide = () => {
    clearShow();
    if (engaged(next)) return;
    if (next.phase === "hidden" && !next.hideTimerActive) return;
    clearHide();
    if (delays.hideDelayMs <= 0) {
      next = { ...next, phase: "hidden", hideTimerActive: false };
      effects.push({ op: "hide" });
    } else {
      next = { ...next, phase: "pendingHide", hideTimerActive: true };
      effects.push({ op: "armHideTimer" });
    }
  };

  switch (ev.type) {
    case "hoverEnter":
      next = { ...next, hover: true };
      requestShow();
      break;
    case "hoverLeave":
      next = { ...next, hover: false };
      tryClearLatch();
      requestHide();
      break;
    case "focusEnter":
      next = { ...next, focus: true };
      requestShow();
      break;
    case "focusLeave":
      next = { ...next, focus: false };
      tryClearLatch();
      requestHide();
      break;
    case "escape":
      next = { ...next, escapeLatch: true, hover: false };
      // Keep focus flag as-is so latch stays until real blur; still hide immediately.
      clearShow();
      clearHide();
      next = { ...next, phase: "hidden", showTimerActive: false, hideTimerActive: false };
      effects.push({ op: "hide" });
      break;
    case "showTimerFired":
      next = { ...next, showTimerActive: false };
      if (next.escapeLatch || !engaged(next)) {
        next = { ...next, phase: "hidden" };
        break;
      }
      next = { ...next, phase: "visible" };
      effects.push({ op: "show" });
      break;
    case "hideTimerFired":
      next = { ...next, hideTimerActive: false };
      if (engaged(next)) {
        next = { ...next, phase: "visible" };
        break;
      }
      next = { ...next, phase: "hidden" };
      effects.push({ op: "hide" });
      break;
    case "forceHide":
      clearShow();
      clearHide();
      next = { ...next, phase: "hidden", showTimerActive: false, hideTimerActive: false };
      effects.push({ op: "hide" });
      break;
  }

  return { state: next, effects };
}
