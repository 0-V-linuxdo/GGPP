import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { GGPP_BRAND_PATH, GGPP_ICON_DATA_URI } from "../../../../src/lib/brandMark";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../../../../");

test("brand path matches userscript @icon SVG", () => {
  const svg = readFileSync(join(ROOT, "static/icons/userscript.svg"), "utf8");
  const d = /\sd="([^"]+)"/.exec(svg)?.[1];
  expect(d).toBe(GGPP_BRAND_PATH);
});

test("icon data URI decodes to the official userscript SVG", () => {
  expect(GGPP_ICON_DATA_URI.startsWith("data:image/svg+xml;base64,")).toBe(true);
  const b64 = GGPP_ICON_DATA_URI.split(",", 2)[1];
  const decoded = Buffer.from(b64, "base64").toString("utf8");
  const svg = readFileSync(join(ROOT, "static/icons/userscript.svg"), "utf8");
  expect(decoded).toBe(svg);
});

test("sidenav launcher in userscript uses the @icon img, not I.ggpp", () => {
  const js = readFileSync(join(ROOT, "userscript/GGPP.user.js"), "utf8");
  const i = js.indexOf('class: "ggpp-sidenav-settings"');
  expect(i).toBeGreaterThan(0);
  const snippet = js.slice(i, i + 1200);
  expect(snippet).toContain("brandMark(");
  expect(snippet).not.toContain("icon(I3.ggpp");
  expect(js).toContain(GGPP_BRAND_PATH);
  expect(js).toContain(GGPP_ICON_DATA_URI);
  expect(js).toMatch(/function brandMark\(size = 20\)[\s\S]{0,400}createElement\("img"\)/);
  expect(js).not.toContain("url(#ggppSidenavSpark)");
  expect(js).toMatch(/@version\s+0\.2\.23/);
});
