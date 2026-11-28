import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const migrate = readFileSync(resolve(HERE, "migrate.ts"), "utf8");
const site = readFileSync(resolve(HERE, "index.ts"), "utf8");

test("0.2.22 declutter default-off does not clobber existing profiles", () => {
  expect(migrate).toContain('ggpp:preserved-pre-0222-declutter-v2');
  expect(migrate).toContain('Only setPluginEnabled');
  expect(migrate).not.toMatch(/preserveLegacyDeclutterDefaults[\s\S]*importSettings/);

  expect(migrate).toContain("preserveLegacyDeclutterDefaults");
  expect(migrate).toContain("hadExistingGgProfile");
  for (const id of ["cleaner", "noStarters", "noShareLink", "noDictation", "noSidebarIdentity", "composerOpacity", "skillBlocker"]) {
    expect(migrate).toContain(`"${id}"`);
  }
  expect(migrate).toContain('typeof storedPluginEnabled(U, id) === "boolean"');
  expect(site).toContain("const existingGgProfile = hadExistingGgProfile()");
  expect(site).toContain("retireRedundantPlugins()");
  expect(site).toContain("preserveLegacyDeclutterDefaults(existingGgProfile)");
  const start = site.indexOf("const existingGgProfile");
  const retire = site.indexOf("retireRedundantPlugins()");
  const preserve = site.indexOf("preserveLegacyDeclutterDefaults(existingGgProfile)");
  expect(start).toBeGreaterThan(0);
  expect(retire).toBeGreaterThan(start);
  expect(preserve).toBeGreaterThan(retire);
});
