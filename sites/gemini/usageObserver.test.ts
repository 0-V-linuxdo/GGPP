import { expect, test } from "bun:test";
import {
  accountKeyFromPath,
  DEFAULT_USAGE_RECIPE,
  extractWrbPayloads,
  normalizeRecipeArgs,
  parseUsageBatchexecute,
  usageSourcePath,
} from "./usageObserver";

function usagePayload(dailyFrac: number, weeklyFrac: number) {
  const dailyRow = [null, dailyFrac, 1, [[1_700_000_000]]];
  const weeklyRow = [null, weeklyFrac, 2, [[1_700_086_400]]];
  return JSON.stringify([null, [dailyRow, weeklyRow]]);
}

function wrb(rpcid: string, payloadObj: string) {
  return `[["wrb.fr",${JSON.stringify(rpcid)},${JSON.stringify(payloadObj)}]]`;
}

test("parses daily + weekly percent and reset epochs from wrb.fr body", () => {
  const body = `)]}'\n${wrb(DEFAULT_USAGE_RECIPE.rpcid, usagePayload(0.42, 0.17))}`;
  const m = parseUsageBatchexecute(body);
  expect(m).not.toBeNull();
  expect(m!.rpcid).toBe(DEFAULT_USAGE_RECIPE.rpcid);
  expect(m!.daily?.percent).toBe(42);
  expect(m!.daily?.resetEpoch).toBe(1_700_000_000);
  expect(m!.weekly?.percent).toBe(17);
  expect(m!.weekly?.resetEpoch).toBe(1_700_086_400);
});

test("returns null for unrelated batchexecute bodies (no invented usage)", () => {
  const payload = JSON.stringify([null, ["hello"]]);
  const body = `)]}'\n${wrb("OtherRpc", payload)}`;
  expect(parseUsageBatchexecute(body)).toBeNull();
});

test("rejects metric rows outside Voyager e3 bounds (no local estimates)", () => {
  const badFrac = [null, 2.5, 1, [[1_700_000_000]]];
  const badEpoch = [null, 0.1, 1, [[100]]];
  const payload = JSON.stringify([null, [badFrac, badEpoch]]);
  const body = `)]}'\n${wrb(DEFAULT_USAGE_RECIPE.rpcid, payload)}`;
  expect(parseUsageBatchexecute(body)).toBeNull();
});

test("extractWrbPayloads finds multiple wrb.fr chunks (Voyager Xq)", () => {
  const p1 = JSON.stringify([null, [[null, 0.1, 1, [[1_700_000_000]]]]]);
  const p2 = JSON.stringify([null, [[null, 0.2, 2, [[1_700_086_400]]]]]);
  const body = `${wrb("Aaa", p1)}\n${wrb("Bbb", p2)}`;
  const got = extractWrbPayloads(body);
  expect(got.map((g) => g.rpcid)).toEqual(["Aaa", "Bbb"]);
});

test("XSSI prefix )]}' does not block wrb.fr extraction", () => {
  const body = `)]}'\n\n${wrb(DEFAULT_USAGE_RECIPE.rpcid, usagePayload(0.05, 0.01))}`;
  const m = parseUsageBatchexecute(body, { expectRpcid: DEFAULT_USAGE_RECIPE.rpcid });
  expect(m?.daily?.percent).toBe(5);
  expect(m?.weekly?.percent).toBe(1);
});

test("length-framed batchexecute chunks still yield wrb.fr (anti-XSSI framing)", () => {
  // Google often prefixes each chunk with a decimal byte length line.
  const chunk = wrb(DEFAULT_USAGE_RECIPE.rpcid, usagePayload(0.33, 0.12));
  const body = `)]}'\n${chunk.length}\n${chunk}\n18\n[["wrb.fr","noop","[]"]]\n`;
  const m = parseUsageBatchexecute(body, { expectRpcid: DEFAULT_USAGE_RECIPE.rpcid });
  expect(m?.rpcid).toBe("jSf9Qc");
  expect(m?.daily?.percent).toBe(33);
});

test("expectRpcid ignores usage-shaped rows from a different RPC (no mis-parse on default jSf9Qc replay)", () => {
  const decoy = wrb("NotUsage", usagePayload(0.99, 0.98));
  const real = wrb(DEFAULT_USAGE_RECIPE.rpcid, usagePayload(0.11, 0.22));
  // Decoy appears first — without expectRpcid would win; with expectRpcid must pick jSf9Qc.
  const body = `)]}'\n${decoy}\n${real}`;
  const open = parseUsageBatchexecute(body);
  expect(open?.rpcid).toBe("NotUsage");
  const filtered = parseUsageBatchexecute(body, { expectRpcid: DEFAULT_USAGE_RECIPE.rpcid });
  expect(filtered?.rpcid).toBe("jSf9Qc");
  expect(filtered?.daily?.percent).toBe(11);
  expect(parseUsageBatchexecute(decoy, { expectRpcid: DEFAULT_USAGE_RECIPE.rpcid })).toBeNull();
});

test("accountKeyFromPath matches Voyager HL (path slot only, not Firefox container)", () => {
  expect(accountKeyFromPath("/app")).toBe("default");
  expect(accountKeyFromPath("/usage")).toBe("default");
  expect(accountKeyFromPath("/u/0/app")).toBe("u/0");
  expect(accountKeyFromPath("/u/3/usage")).toBe("u/3");
  expect(accountKeyFromPath("/u/12/app/c_abc")).toBe("u/12");
});

test("usageSourcePath matches Voyager sX", () => {
  expect(usageSourcePath("/app")).toBe("/usage");
  expect(usageSourcePath("/u/3/app")).toBe("/u/3/usage");
  expect(usageSourcePath("/u/0/usage")).toBe("/u/0/usage");
});

test("normalizeRecipeArgs keeps Voyager string form", () => {
  expect(normalizeRecipeArgs("[]")).toBe("[]");
  expect(normalizeRecipeArgs([])).toBe("[]");
  expect(normalizeRecipeArgs(null)).toBe("[]");
  expect(normalizeRecipeArgs([1, 2])).toBe("[1,2]");
});
