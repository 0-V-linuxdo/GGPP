import { expect, test, describe } from "bun:test";
import {
  createInitialUsageTooltipState,
  reduceUsageTooltipState,
  type UsageTooltipState,
} from "./usageTooltipState";

function run(
  s: UsageTooltipState,
  ev: Parameters<typeof reduceUsageTooltipState>[1],
  delays = { showDelayMs: 0, hideDelayMs: 0 },
) {
  return reduceUsageTooltipState(s, ev, delays);
}

describe("usageTooltipState — hover/focus merge", () => {
  test("hover shows; leave while focused keeps visible", () => {
    let s = createInitialUsageTooltipState();
    let r = run(s, { type: "focusEnter" });
    expect(r.effects.some((e) => e.op === "show")).toBe(true);
    s = r.state;
    r = run(s, { type: "hoverEnter" });
    s = r.state;
    r = run(s, { type: "hoverLeave" });
    expect(r.state.phase).toBe("visible");
    expect(r.effects.some((e) => e.op === "hide")).toBe(false);
  });

  test("leave both → hide", () => {
    let s = createInitialUsageTooltipState();
    s = run(s, { type: "hoverEnter" }).state;
    s = run(s, { type: "focusEnter" }).state;
    s = run(s, { type: "hoverLeave" }).state;
    const r = run(s, { type: "focusLeave" });
    expect(r.state.phase).toBe("hidden");
    expect(r.effects.some((e) => e.op === "hide")).toBe(true);
  });
});

describe("usageTooltipState — Escape latch", () => {
  test("Escape hides and blocks show until fully left", () => {
    let s = createInitialUsageTooltipState();
    s = run(s, { type: "hoverEnter" }).state;
    s = run(s, { type: "focusEnter" }).state;
    let r = run(s, { type: "escape" });
    expect(r.state.phase).toBe("hidden");
    expect(r.state.escapeLatch).toBe(true);
    s = r.state;
    // Still focused (escape cleared hover flag only) — hoverEnter must not show.
    r = run(s, { type: "hoverEnter" });
    expect(r.state.escapeLatch).toBe(true);
    expect(r.effects.some((e) => e.op === "show")).toBe(false);
    s = r.state;
    // Leave focus+hover to clear latch
    s = run(s, { type: "hoverLeave" }).state;
    r = run(s, { type: "focusLeave" });
    expect(r.state.escapeLatch).toBe(false);
    s = r.state;
    r = run(s, { type: "hoverEnter" });
    expect(r.effects.some((e) => e.op === "show")).toBe(true);
  });
});

describe("usageTooltipState — delayed show/hide", () => {
  test("showDelay arms timer; fires only if still engaged", () => {
    let s = createInitialUsageTooltipState();
    let r = reduceUsageTooltipState(s, { type: "hoverEnter" }, { showDelayMs: 100, hideDelayMs: 0 });
    expect(r.effects.some((e) => e.op === "armShowTimer")).toBe(true);
    expect(r.state.phase).toBe("pendingShow");
    s = r.state;
    s = reduceUsageTooltipState(s, { type: "hoverLeave" }, { showDelayMs: 100, hideDelayMs: 0 }).state;
    r = reduceUsageTooltipState(s, { type: "showTimerFired" }, { showDelayMs: 100, hideDelayMs: 0 });
    expect(r.effects.some((e) => e.op === "show")).toBe(false);
    expect(r.state.phase).toBe("hidden");
  });

  test("hideDelay cancelled if re-hover before fire", () => {
    let s = createInitialUsageTooltipState();
    s = reduceUsageTooltipState(s, { type: "hoverEnter" }, { showDelayMs: 0, hideDelayMs: 50 }).state;
    let r = reduceUsageTooltipState(s, { type: "hoverLeave" }, { showDelayMs: 0, hideDelayMs: 50 });
    expect(r.effects.some((e) => e.op === "armHideTimer")).toBe(true);
    s = r.state;
    r = reduceUsageTooltipState(s, { type: "hoverEnter" }, { showDelayMs: 0, hideDelayMs: 50 });
    expect(r.effects.some((e) => e.op === "clearHideTimer")).toBe(true);
    expect(r.state.phase).toBe("visible");
  });
});
