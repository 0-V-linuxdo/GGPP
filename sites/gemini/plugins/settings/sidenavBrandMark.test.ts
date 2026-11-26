import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { GGPP_BRAND_PATH } from "../../../../src/lib/brandMark";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../../../../");

test("brand path matches userscript @icon SVG", () => {
  const svg = readFileSync(join(ROOT, "static/icons/userscript.svg"), "utf8");
  const d = /\sd="([^"]+)"/.exec(svg)?.[1];
  expect(d).toBe(GGPP_BRAND_PATH);
});

test("sidenav launcher in userscript uses the @icon sparkle, not I.ggpp", () => {
  const js = readFileSync(join(ROOT, "userscript/GGPP.user.js"), "utf8");
  const i = js.indexOf('class: "ggpp-sidenav-settings"');
  expect(i).toBeGreaterThan(0);
  const snippet = js.slice(i, i + 900);
  expect(snippet).toContain("brandMark(");
  expect(snippet).not.toContain("icon(I3.ggpp");
  expect(js).toContain(GGPP_BRAND_PATH);
  expect(js).toMatch(/@version\s+0\.2\.5/);
});
