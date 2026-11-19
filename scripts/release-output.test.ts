import { describe, expect, test } from "bun:test";
import { normalizeGeneratedSourceComments, prepareRelease, runtimeTokenDigest } from "./release-output.mjs";
describe("release-only comment packaging", () => {
  test("removes generated standalone origin comments, not normal comments", () => {
    const src = '// ../../BUILD_TEMP/core/index.js\n// normal explanation\nconst n = "unchanged";\n';
    const r = normalizeGeneratedSourceComments(src);
    expect(r.removedStandaloneSourceComments).toBe(1);
    expect(r.code).toBe('// normal explanation\nconst n = "unchanged";\n');
    expect(runtimeTokenDigest(src)).toEqual(runtimeTokenDigest(r.code));
  });
  test("does not alter strings or multiline template content resembling comments", () => {
    const src = 'const s = "// ../../BUILD_TEMP/core/a.js";\nconst t = `start\n// ../../BUILD_TEMP/core/in-string.js\nend`;\n';
    expect(normalizeGeneratedSourceComments(src).code).toBe(src);
  });
  test("keeps legal and non-source comments", () => {
    const src = '/*! Copyright; permission notice */\n// relative path discussion\nlet x = 1;\n';
    expect(normalizeGeneratedSourceComments(src).code).toBe(src);
  });
  test("strict tokens detect runtime literal changes", () => {
    expect(runtimeTokenDigest('const x="one";').sha256).not.toBe(runtimeTokenDigest('const x="two";').sha256);
  });
  test("adds full notice after metadata without altering runtime", () => {
    const src = '// ==UserScript==\n// @name test\n// ==/UserScript==\nconst x = /a+/;\n';
    const r = prepareRelease(src, 'Permission notice\n', 'GPL full fixture\n');
    expect(r.code).toContain('Permission notice');
    expect(r.report.runtimeTokensIdentical).toBe(true);
    expect(runtimeTokenDigest(r.code)).toEqual(runtimeTokenDigest(src));
  });
  test("fails closed for invalid JavaScript or unsafe license delimiter", () => {
    expect(() => normalizeGeneratedSourceComments('const = ;')).toThrow();
    expect(() => prepareRelease('// ==/UserScript==\nlet x=1;', 'bad */', 'GPL')).toThrow();
  });
});
