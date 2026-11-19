// Release-only packaging: remove generated source-origin comments, never runtime tokens.
import ts from "typescript";
import { createHash } from "node:crypto";
const digest = s => createHash("sha256").update(s).digest("hex");
function parse(code) {
  const sf = ts.createSourceFile("GGPP.user.js", code, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
  if (sf.parseDiagnostics.length) throw new Error(`Release JavaScript parse error (${sf.parseDiagnostics.length})`);
  return sf;
}
export function runtimeTokenDigest(code) {
  const sf = parse(code), out = [];
  function walk(n) {
    if (n.kind >= ts.SyntaxKind.FirstJSDocNode && n.kind <= ts.SyntaxKind.LastJSDocNode) return;
    const kids = n.getChildren(sf);
    if (kids.length) { for (const c of kids) walk(c); return; }
    if (n.kind !== ts.SyntaxKind.EndOfFileToken && n.kind !== ts.SyntaxKind.SyntaxList) out.push([n.kind, n.getText(sf)]);
  }
  walk(sf);
  return { sha256: digest(JSON.stringify(out)), tokens: out.length };
}
export function normalizeGeneratedSourceComments(code) {
  const sf = parse(code), ranges = new Map();
  const origin = /^\/\/[\t ]+(?:(?:\.\.?[/\\])+|[/\\]|(?:src|sites|node_modules)[/\\]).+\.(?:[cm]?[jt]sx?|css)[\t ]*$/;
  function add(list) {
    for (const r of list ?? []) {
      if (r.kind !== ts.SyntaxKind.SingleLineCommentTrivia || !origin.test(code.slice(r.pos, r.end))) continue;
      const start = code.lastIndexOf("\n", r.pos - 1) + 1;
      let end = code.indexOf("\n", r.end); if (end < 0) end = code.length; else end++;
      if (!/^[\t ]*$/.test(code.slice(start, r.pos)) || !/^[\r\n]*$/.test(code.slice(r.end, end))) continue;
      ranges.set(start, end);
    }
  }
  function walk(n) {
    add(ts.getLeadingCommentRanges(code, n.pos));
    add(ts.getTrailingCommentRanges(code, n.end));
    ts.forEachChild(n, walk);
  }
  walk(sf);
  let normalized = code;
  for (const [start, end] of [...ranges].sort((a,b) => b[0]-a[0])) normalized = normalized.slice(0,start)+normalized.slice(end);
  const before = runtimeTokenDigest(code), after = runtimeTokenDigest(normalized);
  if (before.sha256 !== after.sha256 || before.tokens !== after.tokens) throw new Error("Source-comment normalization changed runtime tokens");
  return { code: normalized, removedStandaloneSourceComments: ranges.size, runtime: before };
}
export function prepareRelease(code, notices, gpl) {
  if (notices.includes("*/") || gpl.includes("*/")) throw new Error("License text contains comment terminator");
  const normalized = normalizeGeneratedSourceComments(code);
  const end = "// ==/UserScript==\n", i = normalized.code.indexOf(end);
  if (i < 0 || normalized.code.indexOf(end, i+end.length) >= 0) throw new Error("Expected one userscript metadata boundary");
  const at = i + end.length;
  const banner = `/*!\n${notices.trimEnd()}\n\n---\nGNU GPL version 3 (verbatim license text)\n\n${gpl.trimEnd()}\n*/\n`;
  const result = normalized.code.slice(0,at) + banner + normalized.code.slice(at);
  const after = runtimeTokenDigest(result);
  if (after.sha256 !== normalized.runtime.sha256 || after.tokens !== normalized.runtime.tokens) throw new Error("Legal notice packaging changed runtime tokens");
  return { code: result, report: { removedStandaloneSourceComments: normalized.removedStandaloneSourceComments, runtimeBefore: normalized.runtime, runtimeAfter: after, runtimeTokensIdentical: true, addedLegalNoticeBytes: Buffer.byteLength(banner) } };
}
