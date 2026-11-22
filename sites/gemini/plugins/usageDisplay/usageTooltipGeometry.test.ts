import { expect, test, describe } from "bun:test";
import { positionUsageTooltip } from "./usageTooltipGeometry";

const vp = { width: 1000, height: 800 };

describe("positionUsageTooltip clamp/flip", () => {
  test("preferred below when space allows", () => {
    const r = positionUsageTooltip({
      anchor: { top: 100, left: 100, width: 40, height: 36 },
      tip: { width: 200, height: 80 },
      viewport: vp,
      gapPx: 8,
      viewportMarginPx: 8,
      preferred: "below",
    });
    expect(r.placement).toBe("below");
    expect(r.top).toBe(100 + 36 + 8);
    expect(r.left).toBe(100 + 20 - 100); // center - half tip
  });

  test("flips above when below would overflow", () => {
    const r = positionUsageTooltip({
      anchor: { top: 750, left: 100, width: 40, height: 36 },
      tip: { width: 200, height: 80 },
      viewport: vp,
      gapPx: 8,
      viewportMarginPx: 8,
      preferred: "below",
    });
    expect(r.placement).toBe("above");
    expect(r.top).toBe(750 - 8 - 80);
  });

  test("clamps into viewport when all placements overflow", () => {
    const r = positionUsageTooltip({
      anchor: { top: 10, left: 10, width: 980, height: 780 },
      tip: { width: 400, height: 300 },
      viewport: { width: 400, height: 300 },
      gapPx: 4,
      viewportMarginPx: 8,
      preferred: "below",
    });
    expect(r.top).toBe(8);
    expect(r.left).toBe(8);
  });
});
