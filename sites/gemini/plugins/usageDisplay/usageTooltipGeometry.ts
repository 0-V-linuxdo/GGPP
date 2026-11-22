/**
 * Pure geometry for usageDisplay tooltip — no DOM, no visual tokens.
 * Callers supply gap/margin/preferred placement (no Gemini defaults baked in).
 */

export type UsageTipRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export type UsageTipViewport = {
  width: number;
  height: number;
};

export type UsageTipPlacement = "above" | "below" | "before" | "after";

export type UsageTipPositionInput = {
  anchor: UsageTipRect;
  tip: { width: number; height: number };
  viewport: UsageTipViewport;
  /** Distance between anchor edge and tip edge (px). Required from caller. */
  gapPx: number;
  /** Minimum distance from viewport edges (px). Required from caller. */
  viewportMarginPx: number;
  preferred: UsageTipPlacement;
};

export type UsageTipPositionResult = {
  top: number;
  left: number;
  placement: UsageTipPlacement;
};

function place(anchor: UsageTipRect, tip: { width: number; height: number }, gap: number, p: UsageTipPlacement): { top: number; left: number } {
  const ax = anchor.left + anchor.width / 2;
  const ay = anchor.top + anchor.height / 2;
  switch (p) {
    case "above":
      return { top: anchor.top - gap - tip.height, left: ax - tip.width / 2 };
    case "below":
      return { top: anchor.top + anchor.height + gap, left: ax - tip.width / 2 };
    case "before":
      return { top: ay - tip.height / 2, left: anchor.left - gap - tip.width };
    case "after":
      return { top: ay - tip.height / 2, left: anchor.left + anchor.width + gap };
  }
}

function fits(pos: { top: number; left: number }, tip: { width: number; height: number }, vp: UsageTipViewport, margin: number): boolean {
  return (
    pos.top >= margin &&
    pos.left >= margin &&
    pos.top + tip.height <= vp.height - margin &&
    pos.left + tip.width <= vp.width - margin
  );
}

function clamp(pos: { top: number; left: number }, tip: { width: number; height: number }, vp: UsageTipViewport, margin: number): { top: number; left: number } {
  // If tip is larger than the viewport, pin to the margin edge (may still overflow opposite edge).
  return {
    top: Math.max(margin, Math.min(pos.top, vp.height - margin - tip.height)),
    left: Math.max(margin, Math.min(pos.left, vp.width - margin - tip.width)),
  };
}

const FLIP: Record<UsageTipPlacement, UsageTipPlacement[]> = {
  above: ["above", "below", "after", "before"],
  below: ["below", "above", "after", "before"],
  before: ["before", "after", "above", "below"],
  after: ["after", "before", "above", "below"],
};

/** Prefer preferred placement; flip through alternatives; finally clamp into viewport. */
export function positionUsageTooltip(input: UsageTipPositionInput): UsageTipPositionResult {
  const { anchor, tip, viewport, gapPx, viewportMarginPx, preferred } = input;
  const order = FLIP[preferred];
  for (const p of order) {
    const raw = place(anchor, tip, gapPx, p);
    if (fits(raw, tip, viewport, viewportMarginPx)) {
      return { ...raw, placement: p };
    }
  }
  const fallback = place(anchor, tip, gapPx, preferred);
  const c = clamp(fallback, tip, viewport, viewportMarginPx);
  return { ...c, placement: preferred };
}
