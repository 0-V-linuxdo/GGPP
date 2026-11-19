/**
 * Install as sites/gemini/plugins/noDictation/noDictation.test.ts.
 * Definition-level unit test: isolates the real index.ts from adapters/icons in a child.
 * Does NOT exercise the real definePlugin adapter, kernel stop, DOM, or browser layout.
 * Cleanup is a fake host's responsibility; no jsdom/package change is needed here.
 */
import { beforeAll, describe, expect, test } from "bun:test";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const target = process.env.NO_DICTATION_INDEX ?? fileURLToPath(new URL("./index.ts", import.meta.url));
const driver = String.raw`
import { mock } from "bun:test";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
const target = process.env.NO_DICTATION_INDEX;
const here = dirname(target);
const registered = [];
// Mock in this disposable process, never in the parent bun test module registry.
mock.module(resolve(here, "../../shims/types"), () => ({
  definePlugin(definition) { registered.push(definition); return definition; },
}));
mock.module(resolve(here, "../../../../src/lib/icons"), () => ({
  I: new Proxy({}, { get: (_, name) => String(name) }),
}));
const mod = await import(pathToFileURL(target).href);
const definition = mod.default;
const unrelated = {};
const active = new Set([unrelated]);
const cssCalls = [];
const ctxReads = [];
const counts = [];
const starts = [];
for (let cycle = 0; cycle < 2; cycle++) {
  const cleanup = [];
  const ctx = new Proxy({
    css(text) {
      cssCalls.push(text);
      const token = { text };
      active.add(token);
      cleanup.push(() => active.delete(token));
      return token;
    },
  }, { get(object, name) { ctxReads.push(String(name)); return Reflect.get(object, name); } });
  starts.push(definition.start(ctx) === undefined);
  counts.push({ active: active.size, cleanup: cleanup.length });
  for (const fn of cleanup.reverse()) fn();
  counts.push({ active: active.size, unrelated: active.has(unrelated) });
}
console.log(JSON.stringify({
  registeredCount: registered.length,
  sameDefinition: registered[0] === definition,
  id: definition.id,
  enabledByDefault: definition.enabledByDefault,
  hasOwnStop: Object.hasOwn(definition, "stop"),
  css: mod.NO_DICTATION_CSS,
  cssCalls, ctxReads, starts, counts,
}));
`;
let result: any;
beforeAll(() => {
  const child = Bun.spawnSync({
    cmd: [process.execPath, "--eval", driver],
    cwd: dirname(resolve(target)),
    env: { ...process.env, NO_DICTATION_INDEX: resolve(target) },
    stdout: "pipe",
    stderr: "pipe",
  });
  expect(new TextDecoder().decode(child.stderr)).toBe("");
  expect(child.exitCode).toBe(0);
  result = JSON.parse(new TextDecoder().decode(child.stdout));
});

describe("noDictation definition contract (isolated adapter)", () => {
  test("registers the actual plugin definition, enabled by default", () => {
    expect(result.registeredCount).toBe(1);
    expect(result.sameDefinition).toBe(true);
    expect(result.id).toBe("noDictation");
    expect(result.enabledByDefault).toBe(true);
  });

  test("CSS contains exactly the unchanged mic rule and one guarded min-width rule", () => {
    expect(result.css).toBe(
      "input-container :is(speech-dictation-mic-button, .mic-button-container) { display: none !important; }\n" +
      "input-container .input-buttons-wrapper-bottom:has(> .mic-button-container:only-child) { min-width: 0 !important; }",
    );
  });

  test("actual start registers the CSS once per enable and uses no other ctx API", () => {
    expect(result.cssCalls).toEqual([result.css, result.css]);
    expect(result.ctxReads).toEqual(["css", "css"]);
    expect(result.starts).toEqual([true, true]);
  });

  test("fake-host cleanup removes only this registration on both cycles", () => {
    expect(result.hasOwnStop).toBe(false);
    expect(result.counts).toEqual([
      { active: 2, cleanup: 1 }, { active: 1, unrelated: true },
      { active: 2, cleanup: 1 }, { active: 1, unrelated: true },
    ]);
  });
});
