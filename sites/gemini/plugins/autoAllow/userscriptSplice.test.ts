import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../../..");

test("hand-spliced userscript includes AutoAllow 0.2.7 and sidebar retirement", () => {
  const js = readFileSync(resolve(ROOT, "userscript/GGPP.user.js"), "utf8");
  expect(js).toMatch(/@version\s+0\.2\.7/);
  expect(js).toContain('id: "autoAllow"');
  expect(js).toMatch(/id: "chatListStatus"[\s\S]{0,500}enabledByDefault: false/);
  expect(js).toContain("retireRedundantPlugins");
});
