import { expect, test, beforeEach } from "bun:test";
import {
  getUsageDiagnostics,
  noteUsageDiagAttempt,
  noteUsageDiagResult,
  noteUsageDiagSkip,
  resetUsageDiagForTest,
  replayUsage,
} from "./usageObserver";

beforeEach(() => {
  resetUsageDiagForTest();
});

test("success then new attempt clears parsed/source (no stale success illusion)", () => {
  const a1 = noteUsageDiagAttempt("jSf9Qc");
  expect(noteUsageDiagResult({
    attemptId: a1,
    ok: true,
    source: "rpc",
    rpcid: "jSf9Qc",
    dailyParsed: true,
    weeklyParsed: true,
  })).toBe(true);
  let d = getUsageDiagnostics();
  expect(d.lastResult).toBe("ok");
  expect(d.dailyParsed).toBe(true);
  expect(d.source).toBe("rpc");
  expect(d.errorCode).toBe("ok");

  const a2 = noteUsageDiagAttempt("jSf9Qc");
  d = getUsageDiagnostics();
  expect(d.lastResult).toBe("none");
  expect(d.dailyParsed).toBe(false);
  expect(d.weeklyParsed).toBe(false);
  expect(d.source).toBe("none");
  expect(d.attemptCount).toBe(2);
  expect(a2).toBeGreaterThan(a1);
});

test("hidden/busy skip clears prior success and sets fail codes", () => {
  const a1 = noteUsageDiagAttempt("jSf9Qc");
  noteUsageDiagResult({
    attemptId: a1,
    ok: true,
    source: "rpc",
    dailyParsed: true,
    weeklyParsed: true,
  });
  noteUsageDiagSkip("busy");
  let d = getUsageDiagnostics();
  expect(d.lastResult).toBe("fail");
  expect(d.errorCode).toBe("busy");
  expect(d.dailyParsed).toBe(false);
  expect(d.weeklyParsed).toBe(false);
  expect(d.source).toBe("none");

  noteUsageDiagSkip("hidden");
  d = getUsageDiagnostics();
  expect(d.errorCode).toBe("hidden");
  expect(d.dailyParsed).toBe(false);
});

test("timeout finalize via noteUsageDiagResult sets fail (not left as none)", () => {
  const a1 = noteUsageDiagAttempt("jSf9Qc");
  expect(getUsageDiagnostics().lastResult).toBe("none");
  noteUsageDiagResult({ attemptId: a1, ok: false, source: "rpc", error: "timeout" });
  const d = getUsageDiagnostics();
  expect(d.lastResult).toBe("fail");
  expect(d.errorCode).toBe("timeout");
  expect(d.dailyParsed).toBe(false);
});

test("late result after finalize does not overwrite; late after newer attempt ignored", () => {
  const a1 = noteUsageDiagAttempt("jSf9Qc");
  noteUsageDiagResult({ attemptId: a1, ok: false, source: "rpc", error: "timeout" });
  // Late success for same attempt — must not apply
  expect(
    noteUsageDiagResult({
      attemptId: a1,
      ok: true,
      source: "rpc",
      dailyParsed: true,
      weeklyParsed: true,
    }),
  ).toBe(false);
  expect(getUsageDiagnostics().errorCode).toBe("timeout");
  expect(getUsageDiagnostics().dailyParsed).toBe(false);

  const a2 = noteUsageDiagAttempt("jSf9Qc");
  // Late success still carrying a1 — ignored
  expect(
    noteUsageDiagResult({
      attemptId: a1,
      ok: true,
      source: "rpc",
      dailyParsed: true,
      weeklyParsed: true,
    }),
  ).toBe(false);
  expect(getUsageDiagnostics().lastResult).toBe("none");
  expect(getUsageDiagnostics().dailyParsed).toBe(false);

  noteUsageDiagResult({ attemptId: a2, ok: false, source: "rpc", error: "parse-miss" });
  expect(getUsageDiagnostics().errorCode).toBe("parse-miss");
});

test("getUsageDiagnostics alone does not bump attemptCount", () => {
  const n = getUsageDiagnostics().attemptCount;
  getUsageDiagnostics();
  getUsageDiagnostics({ chatBarButtonPresent: true });
  expect(getUsageDiagnostics().attemptCount).toBe(n);
});

test("replayUsage timeout path records fail via finish (postMessage mode)", async () => {
  // Non-DOM: postMessage/location may fail fast → unknown; DOM with no reply → timeout.
  // Either way finish() must settle as fail with cleared parsed (not lastResult=none).
  const res = await replayUsage(undefined, 40);
  const failCodes = ["timeout", "unknown", "bridge-not-ready"] as const;
  expect(res.error != null && (failCodes as readonly string[]).includes(res.error)).toBe(true);
  expect(res.metrics).toBeNull();
  const d = getUsageDiagnostics();
  expect(d.lastResult).toBe("fail");
  expect((failCodes as readonly string[]).includes(d.errorCode)).toBe(true);
  expect(d.dailyParsed).toBe(false);
  expect(d.weeklyParsed).toBe(false);
  // Late after settle must not revive success (typed correct shape; rejected by attempt closed)
  expect(
    noteUsageDiagResult({
      ok: true,
      source: "rpc",
      rpcid: "jSf9Qc",
      dailyParsed: true,
      weeklyParsed: true,
    }),
  ).toBe(false);
  const d2 = getUsageDiagnostics();
  expect(d2.lastResult).toBe("fail");
  expect(d2.dailyParsed).toBe(false);
  expect(d2.weeklyParsed).toBe(false);
});
