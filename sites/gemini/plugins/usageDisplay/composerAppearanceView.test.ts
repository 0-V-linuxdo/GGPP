import { expect, test } from "bun:test";
import { CSS_REDACTED } from "../../composerAppearanceDiagnostics";
import {
  composerButtonViewRows,
  sanitizeComposerAppearanceForView,
  sanitizeComposerButtonForView,
  sanitizeDisplayForView,
  sanitizeLayerCssForView,
} from "./composerAppearanceView";

test("sanitizeDisplayForView allows fixed keywords only", () => {
  expect(sanitizeDisplayForView("flex")).toBe("flex");
  expect(sanitizeDisplayForView("NONE")).toBe("none");
  expect(sanitizeDisplayForView("inline-flex")).toBe("inline-flex");
  expect(sanitizeDisplayForView("flex important")).toBe("flex");
  expect(sanitizeDisplayForView("url(https://x)")).toBe(CSS_REDACTED);
  expect(sanitizeDisplayForView("Speak")).toBe(CSS_REDACTED);
  expect(sanitizeDisplayForView(null)).toBe(CSS_REDACTED);
});

test("sanitizeComposerButtonForView keeps fixed keys; nulls non-finite; drops extras", () => {
  const v = sanitizeComposerButtonForView({
    present: true,
    visible: false,
    display: "flex",
    width: 40,
    height: 24.5,
    top: 0,
    left: 12,
    label: "Send",
    ariaLabel: "Send message",
    href: "https://evil",
    secret: 1,
  });
  expect(v).toEqual({
    present: true,
    visible: false,
    display: "flex",
    width: 40,
    height: 24.5,
    top: 0,
    left: 12,
  });
  expect((v as any).label).toBeUndefined();
  expect((v as any).href).toBeUndefined();

  const bad = sanitizeComposerButtonForView({
    present: "yes",
    visible: 1,
    display: { x: 1 },
    width: Number.NaN,
    height: Number.POSITIVE_INFINITY,
    top: "10",
    left: undefined,
  });
  expect(bad.present).toBe(false);
  expect(bad.visible).toBe(false);
  expect(bad.display).toBe(CSS_REDACTED);
  expect(bad.width).toBeNull();
  expect(bad.height).toBeNull();
  expect(bad.top).toBeNull();
  expect(bad.left).toBeNull();
});

test("sanitizeComposerAppearanceForView includes buttons whitelist and ignores hostile roles", () => {
  const view = sanitizeComposerAppearanceForView({
    errorCode: "ok",
    hasInputGradient: true,
    layers: { inputContainer: { present: true, backgroundColor: "rgb(1,2,3)", className: "x" } },
    buttons: {
      voice: { present: true, visible: true, display: "block", width: 10, height: 10, top: 1, left: 2 },
      submit: { present: false, visible: false, display: "none", width: null, height: null, top: null, left: null },
      stop: { present: true, visible: false, display: "flex", width: 8, height: 8, top: 0, left: 0 },
      buttonsWrapper: { present: true, visible: true, display: "flex", width: 100, height: 40, top: 5, left: 5 },
      evilExtra: { present: true, label: "nope" },
    },
    token: "SECRET",
  });
  expect(view.errorCode).toBe("ok");
  expect(view.hasInputGradient).toBe(true);
  expect(view.layers.inputContainer.present).toBe(true);
  expect(view.layers.inputContainer.backgroundColor).toBe("rgb(1,2,3)");
  expect((view.layers.inputContainer as any).className).toBeUndefined();
  expect(Object.keys(view.buttons).sort()).toEqual(["buttonsWrapper", "stop", "submit", "voice"]);
  expect((view.buttons as any).evilExtra).toBeUndefined();
  expect((view as any).token).toBeUndefined();
  expect(view.buttons.voice.width).toBe(10);
  expect(view.buttons.submit.display).toBe("none");
});

test("composerButtonViewRows is fixed field order with string values only", () => {
  const rows = composerButtonViewRows({
    present: true,
    visible: false,
    display: "flex",
    width: 1,
    height: null,
    top: 2,
    left: null,
  });
  expect(rows.map((r) => r.key)).toEqual(["present", "visible", "display", "width", "height", "top", "left"]);
  expect(rows.find((r) => r.key === "height")!.value).toBe("null");
  expect(rows.every((r) => typeof r.value === "string")).toBe(true);
});


test("layer CSS uses strict whitelist — rejects url variants, data:, free text", () => {
  expect(sanitizeLayerCssForView("rgb(1, 2, 3)")).toBe("rgb(1, 2, 3)");
  expect(sanitizeLayerCssForView("none")).toBe("none");
  expect(sanitizeLayerCssForView("url(//private/path)")).toBe(CSS_REDACTED);
  expect(sanitizeLayerCssForView("url ( //private/path )")).toBe(CSS_REDACTED);
  expect(sanitizeLayerCssForView("URL(https://x.example/a.png)")).toBe(CSS_REDACTED);
  expect(sanitizeLayerCssForView("data:text/plain,hi")).toBe(CSS_REDACTED);
  expect(sanitizeLayerCssForView("Hello world")).toBe(CSS_REDACTED);
  expect(sanitizeLayerCssForView("Speak")).toBe(CSS_REDACTED);
  // Named colors are NOT whitelist tokens — only rgb/hex/safe keywords (peer rule).
  expect(sanitizeLayerCssForView("linear-gradient(red, blue)")).toBe(CSS_REDACTED);
  expect(sanitizeLayerCssForView("linear-gradient(90deg, rgb(1, 2, 3), rgb(4, 5, 6))")).toBe(
    "linear-gradient(90deg, rgb(1, 2, 3), rgb(4, 5, 6))",
  );
});

test("sanitizeComposerAppearanceForView redacts hostile layer CSS instead of passing through", () => {
  const view = sanitizeComposerAppearanceForView({
    errorCode: "ok",
    hasInputGradient: false,
    layers: {
      inputContainer: {
        present: true,
        backgroundImage: "url ( //evil/x )",
        boxShadow: "Speak now",
        opacity: "0.5",
      },
    },
    buttons: {},
  });
  expect(view.layers.inputContainer.backgroundImage).toBe(CSS_REDACTED);
  expect(view.layers.inputContainer.boxShadow).toBe(CSS_REDACTED);
  expect(view.layers.inputContainer.opacity).toBe("0.5");
});
