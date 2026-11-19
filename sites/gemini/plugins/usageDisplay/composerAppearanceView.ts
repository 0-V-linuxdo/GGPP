/**
 * Second-pass whitelist for rendering composerAppearanceDiagnostics in usage UI.
 * Does not call RPC. Never dumps raw JSON. Peer helper owns collection.
 */

import {
  COMPOSER_BUTTON_ROLES,
  COMPOSER_LAYER_IDS,
  CSS_REDACTED,
  sanitizeCssVisualValue,
  type ComposerButtonRole,
  type ComposerLayerId,
} from "../../composerAppearanceDiagnostics";

export { COMPOSER_BUTTON_ROLES };

/** Fixed CSS `display` keywords allowed in the settings panel. */
const DISPLAY_ALLOW = new Set([
  "none",
  "inline",
  "block",
  "inline-block",
  "flex",
  "inline-flex",
  "grid",
  "inline-grid",
  "contents",
  "flow-root",
  "table",
  "table-row",
  "table-cell",
  "list-item",
  "run-in",
]);

const LAYER_STYLE_KEYS = [
  "backgroundColor",
  "backgroundImage",
  "background",
  "boxShadow",
  "filter",
  "opacity",
  "borderRadius",
] as const;

export type ComposerButtonView = {
  present: boolean;
  visible: boolean;
  display: string;
  width: number | null;
  height: number | null;
  top: number | null;
  left: number | null;
};

export type ComposerLayerView = {
  present: boolean;
} & Partial<Record<(typeof LAYER_STYLE_KEYS)[number], string>>;

export type ComposerAppearanceView = {
  errorCode: string;
  hasInputGradient: boolean;
  layers: Record<ComposerLayerId, ComposerLayerView>;
  buttons: Record<ComposerButtonRole, ComposerButtonView>;
};

function finiteOrNull(v: unknown): number | null {
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

/** display → allowlisted keyword or [redacted]; never free text / aria / urls. */
export function sanitizeDisplayForView(raw: unknown): string {
  if (raw == null) return CSS_REDACTED;
  if (typeof raw !== "string") return CSS_REDACTED;
  const s = raw.trim().toLowerCase();
  if (!s) return CSS_REDACTED;
  if (s === CSS_REDACTED.toLowerCase() || s === "[redacted]") return CSS_REDACTED;
  // Only the first token (e.g. "flex" from "flex"); reject multi-token free text.
  const tok = s.split(/\s+/)[0] ?? "";
  if (DISPLAY_ALLOW.has(tok)) return tok;
  return CSS_REDACTED;
}

/** Whitelist a single button snapshot; drop malicious extras / non-finite metrics. */
export function sanitizeComposerButtonForView(raw: unknown): ComposerButtonView {
  const o = raw && typeof raw === "object" && !Array.isArray(raw) ? (raw as Record<string, unknown>) : {};
  return {
    present: o.present === true,
    visible: o.visible === true,
    display: sanitizeDisplayForView(o.display),
    width: finiteOrNull(o.width),
    height: finiteOrNull(o.height),
    top: finiteOrNull(o.top),
    left: finiteOrNull(o.left),
  };
}

/**
 * Layer CSS via peer `sanitizeCssVisualValue` (strict token/fn whitelist).
 * Unknown / url / data: / free text → [redacted] or omitted when null.
 */
function sanitizeLayerForView(raw: unknown): ComposerLayerView {
  const o = raw && typeof raw === "object" && !Array.isArray(raw) ? (raw as Record<string, unknown>) : {};
  const out: ComposerLayerView = { present: o.present === true };
  for (const key of LAYER_STYLE_KEYS) {
    const cleaned = sanitizeCssVisualValue(o[key]);
    if (cleaned == null) continue;
    out[key] = cleaned;
  }
  return out;
}

/** Exported for tests — same whitelist path the panel uses for layer styles. */
export function sanitizeLayerCssForView(raw: unknown): string | null {
  return sanitizeCssVisualValue(raw);
}

const ERROR_ALLOW = new Set(["ok", "no-document", "no-composer", "computed-style-failed", "unknown"]);

/**
 * Build a UI-safe view model from helper output (or hostile stand-ins).
 * Only fixed keys; buttons limited to COMPOSER_BUTTON_ROLES.
 */
export function sanitizeComposerAppearanceForView(raw: unknown): ComposerAppearanceView {
  const o = raw && typeof raw === "object" && !Array.isArray(raw) ? (raw as Record<string, unknown>) : {};
  const err = typeof o.errorCode === "string" && ERROR_ALLOW.has(o.errorCode) ? o.errorCode : "unknown";
  const layersIn = o.layers && typeof o.layers === "object" && !Array.isArray(o.layers) ? (o.layers as Record<string, unknown>) : {};
  const buttonsIn =
    o.buttons && typeof o.buttons === "object" && !Array.isArray(o.buttons) ? (o.buttons as Record<string, unknown>) : {};

  const layers = {} as Record<ComposerLayerId, ComposerLayerView>;
  for (const id of COMPOSER_LAYER_IDS) {
    layers[id] = sanitizeLayerForView(layersIn[id]);
  }

  const buttons = {} as Record<ComposerButtonRole, ComposerButtonView>;
  for (const role of COMPOSER_BUTTON_ROLES) {
    buttons[role] = sanitizeComposerButtonForView(buttonsIn[role]);
  }

  return {
    errorCode: err,
    hasInputGradient: o.hasInputGradient === true,
    layers,
    buttons,
  };
}

/** Flat rows for a button role — fixed field order. */
export function composerButtonViewRows(b: ComposerButtonView): { key: string; value: string }[] {
  return [
    { key: "present", value: b.present ? "true" : "false" },
    { key: "visible", value: b.visible ? "true" : "false" },
    { key: "display", value: b.display },
    { key: "width", value: b.width == null ? "null" : String(b.width) },
    { key: "height", value: b.height == null ? "null" : String(b.height) },
    { key: "top", value: b.top == null ? "null" : String(b.top) },
    { key: "left", value: b.left == null ? "null" : String(b.left) },
  ];
}
