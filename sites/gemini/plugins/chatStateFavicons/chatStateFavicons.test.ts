import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ICON_LINK_SEL, computeFaviconState, faviconHref, svgFor } from "./index";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../../../..");
const src = readFileSync(resolve(HERE, "index.ts"), "utf8");
const js = readFileSync(resolve(ROOT, "userscript/GGPP.user.js"), "utf8");

describe("computeFaviconState", () => {
  test("generating wins over draft and leftover done", () => {
    expect(
      computeFaviconState({
        generating: true,
        draft: true,
        hasDraft: true,
        interrupted: false,
        lastError: false,
        justFinished: true,
      }),
    ).toEqual({ state: "rotate", justFinished: false });
  });

  test("justFinished stays done until the editor has text or a new reply starts", () => {
    expect(
      computeFaviconState({
        generating: false,
        draft: false,
        hasDraft: false,
        interrupted: false,
        lastError: false,
        justFinished: true,
      }),
    ).toEqual({ state: "done", justFinished: true });
  });

  test("draft after a finished reply becomes ready", () => {
    expect(
      computeFaviconState({
        generating: false,
        draft: true,
        hasDraft: true,
        interrupted: false,
        lastError: false,
        justFinished: true,
      }),
    ).toEqual({ state: "ready", justFinished: false });
  });

  test("error and interrupt beat idle", () => {
    expect(
      computeFaviconState({
        generating: false,
        draft: false,
        hasDraft: false,
        interrupted: false,
        lastError: true,
        justFinished: false,
      }).state,
    ).toBe("error");
    expect(
      computeFaviconState({
        generating: false,
        draft: false,
        hasDraft: false,
        interrupted: true,
        lastError: false,
        justFinished: true,
      }).state,
    ).toBe("idle");
  });
});

describe("favicon drawing", () => {
  test("idle original restores Gemini by returning null", () => {
    expect(svgFor("original", "idle")).toBeNull();
    expect(faviconHref("original", "idle")).toBeNull();
  });

  test("badge idle has no status disc, rotate does, without SMIL", () => {
    const idle = svgFor("badge", "idle")!;
    const rotate = svgFor("badge", "rotate", 90)!;
    expect(idle).toContain('width="32"');
    expect(idle).not.toContain("<circle");
    expect(rotate).toContain("<circle");
    expect(rotate).toContain("rotate(90 51 49)");
    expect(rotate).not.toContain("animateTransform");
    expect(src).not.toContain("animateTransform");
  });

  test("state hrefs differ so Firefox can retarget the tab icon", () => {
    const idle = faviconHref("badge", "idle");
    const rotate = faviconHref("badge", "rotate", 45);
    const done = faviconHref("badge", "done");
    expect(idle).toMatch(/^data:image\/(png|svg\+xml)/);
    expect(rotate).toMatch(/^data:image\/(png|svg\+xml)/);
    expect(idle).not.toBe(rotate);
    expect(rotate).not.toBe(done);
  });
});

describe("favicon apply contract", () => {
  test("source recreates a PNG link and strips apple-touch icons", () => {
    expect(ICON_LINK_SEL).toContain("apple-touch-icon");
    expect(ICON_LINK_SEL).toContain("mask-icon");
    expect(src).toContain('document.createElement("canvas")');
    expect(src).toContain('toDataURL("image/png")');
    expect(src).toContain("link?.remove()");
    expect(src).toContain('dataset.ggpp = "favicon"');
    expect(src).toContain("apply(state, true)");
    expect(src).toContain("angle = (angle + 45) % 360");
  });

  test("hand-spliced userscript follows the same Nightly-safe path", () => {
    expect(js).toContain("function computeFaviconState");
    expect(js).toContain("function faviconHref");
    expect(js).toContain("apple-touch-icon");
    expect(js).toContain('toDataURL("image/png")');
    expect(js).toContain('dataset.ggpp = "favicon"');
    expect(js).not.toContain("animateTransform");
    expect(js).toContain("angle = (angle + 45) % 360");
  });
});
