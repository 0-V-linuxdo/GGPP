/**
 * Read-only composer appearance diagnostics for UI sampling.
 * No DOM mutation, no network, no URL/location, no chat text / input values.
 * CSS values that may embed urls or escapes are whole-field redacted.
 *
 * Stable core fields: errorCode, hasInputGradient, layers.
 * Additive: buttons (voice / submit / stop / buttonsWrapper layout).
 */

export const CSS_REDACTED = "[redacted]" as const;

export type ComposerAppearanceErrorCode =
  | "ok"
  | "no-document"
  | "no-composer"
  | "computed-style-failed"
  | "unknown";

export type ComposerLayerId =
  | "inputContainer"
  | "before"
  | "after"
  | "inputAreaContainer"
  | "inputAreaV2"
  | "inputArea";

export const COMPOSER_LAYER_IDS: readonly ComposerLayerId[] = [
  "inputContainer",
  "before",
  "after",
  "inputAreaContainer",
  "inputAreaV2",
  "inputArea",
] as const;

/** Fixed role keys only — never page attribute strings. */
export type ComposerButtonRole = "voice" | "submit" | "stop" | "buttonsWrapper";

export const COMPOSER_BUTTON_ROLES: readonly ComposerButtonRole[] = [
  "voice",
  "submit",
  "stop",
  "buttonsWrapper",
] as const;

/**
 * Selectors align with sites/gemini/plugins/gemini/index.ts SEL; probes expose sanitized geometry only
 * (chat/home/generating). Resolved under input-container in resolveButton().
 */
const SEL_VOICE_CONTAINER = ".mic-button-container";
const SEL_VOICE_CONTROL = "speech-dictation-mic-button";
const SEL_SEND_CONTAINER = "[data-test-id='send-button-container']";
const SEL_STOP_MARK = ".stop";
const SEL_BUTTONS_WRAPPER = ".input-buttons-wrapper-bottom";

/** Per-layer snapshot — only fixed keys; never className / messages. */
export type ComposerLayerSnapshot = {
  present: boolean;
  backgroundColor: string | null;
  backgroundImage: string | null;
  /** Optional shorthand; same sanitizer as image/shadow fields when present. */
  background: string | null;
  boxShadow: string | null;
  filter: string | null;
  opacity: string | null;
  borderRadius: string | null;
};

/** Layout-only button snapshot — no labels / text / attributes from the page. */
export type ComposerButtonSnapshot = {
  present: boolean;
  visible: boolean;
  /** Allowlisted display keyword or [redacted]. */
  display: string | null;
  width: number | null;
  height: number | null;
  top: number | null;
  left: number | null;
};

export type ComposerAppearanceDiagnostics = {
  errorCode: ComposerAppearanceErrorCode;
  hasInputGradient: boolean;
  layers: Record<ComposerLayerId, ComposerLayerSnapshot>;
  /** Additive layout probe for voice/submit/stop gap analysis. */
  buttons: Record<ComposerButtonRole, ComposerButtonSnapshot>;
};

/** Test / UI injection — production call uses real document. */
export type ComposerAppearanceDeps = {
  getDocument?: () => Document | null | undefined;
  getComputedStyle?: (elt: Element, pseudoElt?: string | null) => CSSStyleDeclaration;
};

const MAX_CSS_VALUE_LEN = 384;

const SAFE_TOKEN = /^(?:none|inset|at|to|from|left|right|top|bottom|center|closest-side|closest-corner|farthest-side|farthest-corner|circle|ellipse|in|srgb|display-p3|rec2020|a98-rgb|prophoto-rgb|xyz|xyz-d50|xyz-d65|transparent|currentcolor|[-+]?(?:\d+\.?\d*|\.\d+)(?:%|px|em|rem|vh|vw|vmin|vmax|pt|pc|cm|mm|in|deg|rad|grad|turn|s|ms|fr)?)$/i;

const SAFE_DISPLAY = new Set([
  "none",
  "block",
  "inline",
  "inline-block",
  "flex",
  "inline-flex",
  "grid",
  "inline-grid",
  "contents",
  "flow-root",
  "table",
  "table-cell",
  "list-item",
]);

function emptyLayer(present = false): ComposerLayerSnapshot {
  return {
    present,
    backgroundColor: null,
    backgroundImage: null,
    background: null,
    boxShadow: null,
    filter: null,
    opacity: null,
    borderRadius: null,
  };
}

function emptyLayers(): Record<ComposerLayerId, ComposerLayerSnapshot> {
  return {
    inputContainer: emptyLayer(),
    before: emptyLayer(),
    after: emptyLayer(),
    inputAreaContainer: emptyLayer(),
    inputAreaV2: emptyLayer(),
    inputArea: emptyLayer(),
  };
}

function emptyButton(): ComposerButtonSnapshot {
  return {
    present: false,
    visible: false,
    display: null,
    width: null,
    height: null,
    top: null,
    left: null,
  };
}

function emptyButtons(): Record<ComposerButtonRole, ComposerButtonSnapshot> {
  return {
    voice: emptyButton(),
    submit: emptyButton(),
    stop: emptyButton(),
    buttonsWrapper: emptyButton(),
  };
}

export function emptyComposerAppearanceDiagnostics(
  errorCode: ComposerAppearanceErrorCode = "ok",
): ComposerAppearanceDiagnostics {
  return {
    errorCode,
    hasInputGradient: false,
    layers: emptyLayers(),
    buttons: emptyButtons(),
  };
}

/**
 * Strict whole-field sanitizer for CSS that may embed urls / escapes / junk.
 * Returns the original string only when it is a short, allowlisted visual value;
 * otherwise fixed `[redacted]`. Never returns substrings of untrusted input.
 */
export function sanitizeCssVisualValue(raw: unknown): string | null {
  if (raw == null) return null;
  if (typeof raw !== "string") return CSS_REDACTED;
  const s = raw.trim();
  if (!s) return null;
  if (s.length > MAX_CSS_VALUE_LEN) return CSS_REDACTED;
  if (s.includes("\\") || /["']/.test(s) || /\burl\s*\(/i.test(s)) return CSS_REDACTED;
  if (/[@<>]|data:|javascript:/i.test(s)) return CSS_REDACTED;
  if (!/^[\w\s.,%+\-#()/]+$/i.test(s)) return CSS_REDACTED;

  const SAFE_FN_NAMES = new Set(
    [
      "rgb", "rgba", "hsl", "hsla", "hwb", "lab", "lch", "oklab", "oklch", "color", "color-mix", "light-dark",
      "linear-gradient", "radial-gradient", "conic-gradient",
      "repeating-linear-gradient", "repeating-radial-gradient", "repeating-conic-gradient",
      "blur", "brightness", "contrast", "grayscale", "hue-rotate", "invert", "opacity", "saturate", "sepia",
      "drop-shadow",
      "matrix", "matrix3d", "translate", "translate3d", "translatex", "translatey", "translatez",
      "scale", "scale3d", "scalex", "scaley", "scalez",
      "rotate", "rotate3d", "rotatex", "rotatey", "rotatez", "skew", "skewx", "skewy", "perspective",
      "cubic-bezier", "steps", "calc", "min", "max", "clamp", "abs", "sign", "mod", "rem", "round", "hypot",
      "sqrt", "pow", "exp", "log",
    ].map((x) => x.toLowerCase()),
  );

  let i = 0;
  const n = s.length;
  while (i < n) {
    while (i < n && /[\s,]/.test(s[i]!)) i++;
    if (i >= n) break;
    if (s[i] === "(" || s[i] === ")") {
      i++;
      continue;
    }
    const fn = /^([A-Za-z_][\w-]*)\s*\(/.exec(s.slice(i));
    if (fn) {
      if (!SAFE_FN_NAMES.has(fn[1]!.toLowerCase())) return CSS_REDACTED;
      i += fn[0]!.length;
      continue;
    }
    const tm = /^[^\s,()]+/.exec(s.slice(i));
    if (!tm) return CSS_REDACTED;
    const tok = tm[0]!;
    if (/^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(tok)) {
      i += tok.length;
      continue;
    }
    if (!SAFE_TOKEN.test(tok)) return CSS_REDACTED;
    i += tok.length;
  }
  return s;
}

function sanitizeDisplay(raw: unknown): string | null {
  if (raw == null) return null;
  if (typeof raw !== "string") return CSS_REDACTED;
  const s = raw.trim().toLowerCase();
  if (!s) return null;
  if (SAFE_DISPLAY.has(s)) return s;
  return CSS_REDACTED;
}

function finiteOrNull(n: unknown): number | null {
  return typeof n === "number" && Number.isFinite(n) ? Math.round(n * 100) / 100 : null;
}

function readProp(cs: CSSStyleDeclaration, name: string): string | null {
  try {
    const v = cs.getPropertyValue?.(name) ?? (cs as unknown as Record<string, string>)[name];
    if (v == null) return null;
    return String(v);
  } catch {
    return null;
  }
}

function snapshotFromStyle(cs: CSSStyleDeclaration): Omit<ComposerLayerSnapshot, "present"> {
  const backgroundColor = sanitizeCssVisualValue(readProp(cs, "background-color") ?? (cs as any).backgroundColor);
  const backgroundImage = sanitizeCssVisualValue(readProp(cs, "background-image") ?? (cs as any).backgroundImage);
  const background = sanitizeCssVisualValue(readProp(cs, "background") ?? (cs as any).background);
  const boxShadow = sanitizeCssVisualValue(readProp(cs, "box-shadow") ?? (cs as any).boxShadow);
  const filter = sanitizeCssVisualValue(readProp(cs, "filter") ?? (cs as any).filter);
  const opacity = sanitizeCssVisualValue(readProp(cs, "opacity") ?? (cs as any).opacity);
  const borderRadius = sanitizeCssVisualValue(readProp(cs, "border-radius") ?? (cs as any).borderRadius);
  return { backgroundColor, backgroundImage, background, boxShadow, filter, opacity, borderRadius };
}

function isCssVisible(display: string | null, visibilityRaw: string | null, opacityRaw: string | null): boolean {
  if (display === "none") return false;
  const vis = (visibilityRaw || "").trim().toLowerCase();
  if (vis === "hidden" || vis === "collapse") return false;
  const op = parseFloat(opacityRaw || "1");
  if (Number.isFinite(op) && op <= 0) return false;
  return true;
}

function snapshotButton(el: Element, gcs: NonNullable<ComposerAppearanceDeps["getComputedStyle"]>): ComposerButtonSnapshot {
  const snap = emptyButton();
  snap.present = true;
  try {
    const cs = gcs(el, null);
    const display = sanitizeDisplay(readProp(cs, "display") ?? (cs as any).display);
    const visibility = readProp(cs, "visibility") ?? (cs as any).visibility;
    const opacity = readProp(cs, "opacity") ?? (cs as any).opacity;
    snap.display = display;
    snap.visible = isCssVisible(display, typeof visibility === "string" ? visibility : null, typeof opacity === "string" ? opacity : null);
  } catch {
    snap.display = null;
    snap.visible = false;
  }
  try {
    const r = (el as HTMLElement).getBoundingClientRect?.();
    if (r) {
      snap.width = finiteOrNull(r.width);
      snap.height = finiteOrNull(r.height);
      snap.top = finiteOrNull(r.top);
      snap.left = finiteOrNull(r.left);
    }
  } catch {
    // leave nulls
  }
  return snap;
}

function mapError(_e: unknown): ComposerAppearanceErrorCode {
  return "computed-style-failed";
}

/**
 * Explicit UI-triggered sample. Pure read of fixed composer layers + button layout.
 * Does not inject styles, mutate DOM, or register listeners.
 */
export function collectComposerAppearanceDiagnostics(
  deps: ComposerAppearanceDeps = {},
): ComposerAppearanceDiagnostics {
  const out = emptyComposerAppearanceDiagnostics("ok");
  try {
    const doc = deps.getDocument ? deps.getDocument() : typeof document !== "undefined" ? document : null;
    if (!doc || typeof doc.querySelector !== "function") {
      out.errorCode = "no-document";
      return out;
    }

    const gcs =
      deps.getComputedStyle ??
      (typeof getComputedStyle === "function"
        ? (elt: Element, pseudo?: string | null) => getComputedStyle(elt, pseudo ?? undefined)
        : null);
    if (!gcs) {
      out.errorCode = "no-document";
      return out;
    }

    let box: Element | null = null;
    try {
      box = doc.querySelector("input-container");
    } catch {
      out.errorCode = "unknown";
      return out;
    }
    if (!box) {
      out.errorCode = "no-composer";
      return out;
    }

    try {
      out.hasInputGradient = !!box.classList?.contains?.("input-gradient");
    } catch {
      out.hasInputGradient = false;
    }

    const resolve = (id: ComposerLayerId): { el: Element | null; pseudo: string | null } => {
      switch (id) {
        case "inputContainer":
          return { el: box, pseudo: null };
        case "before":
          return { el: box, pseudo: "::before" };
        case "after":
          return { el: box, pseudo: "::after" };
        case "inputAreaContainer":
          return { el: box.querySelector?.(".input-area-container") ?? null, pseudo: null };
        case "inputAreaV2":
          return { el: box.querySelector?.("input-area-v2") ?? null, pseudo: null };
        case "inputArea":
          return {
            el:
              box.querySelector?.("input-area-v2 .input-area") ??
              box.querySelector?.(".input-area") ??
              null,
            pseudo: null,
          };
      }
    };

    let anyStyleFailed = false;
    for (const id of COMPOSER_LAYER_IDS) {
      const { el, pseudo } = resolve(id);
      if (!el) {
        out.layers[id] = emptyLayer(false);
        continue;
      }
      try {
        const cs = gcs(el, pseudo);
        out.layers[id] = { present: true, ...snapshotFromStyle(cs) };
      } catch {
        anyStyleFailed = true;
        out.layers[id] = emptyLayer(true);
      }
    }

    const resolveButton = (role: ComposerButtonRole): Element | null => {
      try {
        switch (role) {
          case "voice":
            return box.querySelector?.(SEL_VOICE_CONTAINER) ?? box.querySelector?.(SEL_VOICE_CONTROL) ?? null;
          case "buttonsWrapper":
            return box.querySelector?.(SEL_BUTTONS_WRAPPER) ?? null;
          case "stop": {
            const mark = box.querySelector?.(SEL_SEND_CONTAINER + " " + SEL_STOP_MARK) ?? null;
            if (mark) return mark;
            const wrap = box.querySelector?.(SEL_SEND_CONTAINER) ?? null;
            if (wrap?.querySelector?.(SEL_STOP_MARK)) return wrap;
            return null;
          }
          case "submit": {
            const wrap = box.querySelector?.(SEL_SEND_CONTAINER) ?? null;
            if (!wrap) return null;
            if (wrap.querySelector?.(SEL_STOP_MARK)) return null;
            return wrap;
          }
        }
      } catch {
        return null;
      }
    };

    for (const role of COMPOSER_BUTTON_ROLES) {
      const el = resolveButton(role);
      if (!el) {
        out.buttons[role] = emptyButton();
        continue;
      }
      try {
        out.buttons[role] = snapshotButton(el, gcs);
      } catch {
        anyStyleFailed = true;
        out.buttons[role] = { ...emptyButton(), present: true, visible: false };
      }
    }

    if (anyStyleFailed) out.errorCode = "computed-style-failed";
    return out;
  } catch (e) {
    return emptyComposerAppearanceDiagnostics(mapError(e));
  }
}
