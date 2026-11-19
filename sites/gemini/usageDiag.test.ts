import { expect, test } from "bun:test";
import {
  emptyUsageDiagnostics,
  mapUsageErrorCode,
  sanitizeUsageDiagnostics,
  usageDiagDisplayRows,
} from "./usageDiag";

test("empty diagnostics are safe defaults (no live claim)", () => {
  const d = emptyUsageDiagnostics();
  expect(d.bridgeReady).toBe(false);
  expect(d.lastResult).toBe("none");
  expect(d.dailyParsed).toBe(false);
  expect(d.errorCode).toBe("none");
});

test("mapUsageErrorCode maps ok and fixed codes (not unknown)", () => {
  expect(mapUsageErrorCode("ok")).toBe("ok");
  expect(mapUsageErrorCode("none")).toBe("none");
  expect(mapUsageErrorCode("timeout")).toBe("timeout");
  expect(mapUsageErrorCode("no-token")).toBe("no-token");
  expect(mapUsageErrorCode("parse-miss")).toBe("parse-miss");
  expect(mapUsageErrorCode("hidden")).toBe("hidden");
  expect(mapUsageErrorCode("busy")).toBe("busy");
  expect(mapUsageErrorCode("Permission denied to access property foo")).toBe("unknown");
  expect(mapUsageErrorCode("at=SECRET&SNlM0e=x")).toBe("unknown");
  expect(mapUsageErrorCode(null)).toBe("none");
});

test("sanitizeUsageDiagnostics preserves errorCode ok when lastResult ok", () => {
  const s = sanitizeUsageDiagnostics({
    lastResult: "ok",
    errorCode: "ok",
    dailyParsed: true,
    source: "rpc",
    rpcid: "jSf9Qc",
  });
  expect(s.errorCode).toBe("ok");
  expect(s.lastResult).toBe("ok");
  expect(s.dailyParsed).toBe(true);
});

test("sanitizeUsageDiagnostics drops non-whitelist / bad rpcid", () => {
  const s = sanitizeUsageDiagnostics({
    bridgeReady: true,
    bridgeMode: "inject",
    lastResult: "ok",
    rpcid: "jSf9Qc",
    source: "rpc:settings-refresh",
    dailyParsed: true,
    weeklyParsed: false,
    errorCode: "ok",
    chatBarButtonPresent: true,
    attemptCount: 2,
    token: "SECRET",
    body: "wrb.fr...",
  } as any);
  expect(s.rpcid).toBe("jSf9Qc");
  expect(s.source).toBe("rpc");
  expect((s as any).token).toBeUndefined();
  expect(sanitizeUsageDiagnostics({ rpcid: "https://evil" } as any).rpcid).toBeNull();
});

test("usageDiagDisplayRows is a fixed whitelist of labels", () => {
  const rows = usageDiagDisplayRows(
    sanitizeUsageDiagnostics({ lastResult: "fail", errorCode: "timeout", attemptCount: 1 }),
  );
  expect(rows.map((r) => r.key)).toContain("errorCode");
  expect(rows.find((r) => r.key === "errorCode")!.value).toBe("timeout");
  expect(rows.every((r) => !/at=|SNlM0e|cookie|Authorization/i.test(r.value))).toBe(true);
});

test("failed parse stays unverified booleans", () => {
  const s = sanitizeUsageDiagnostics({
    lastResult: "fail",
    errorCode: "parse-miss",
    dailyParsed: false,
    weeklyParsed: false,
    source: "rpc",
  });
  expect(s.dailyParsed).toBe(false);
  expect(s.weeklyParsed).toBe(false);
});
