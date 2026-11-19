/**
 * Desensitized usage diagnostics — whitelist fields only.
 * Never carry tokens, bodies, WIZ, cookies, accounts, full URLs, or raw exceptions.
 */

export type UsageBridgeMode = "inject" | "exportFunction" | "same-world" | "none";

/** Fixed error codes only — no free-text exception strings in UI. */
export type UsageDiagErrorCode =
  | "none"
  | "ok"
  | "timeout"
  | "no-token"
  | "parse-miss"
  | "empty"
  | "account-mismatch"
  | "stale-generation"
  | "generation-bump"
  | "hidden"
  | "busy"
  | "bridge-not-ready"
  | "unknown";

export type UsageDiagSource = "none" | "rpc" | "capture" | "dom";

export type UsageDiagResult = "none" | "ok" | "fail";

/** Public snapshot safe to render in settings. */
export type UsageDiagnostics = {
  bridgeReady: boolean;
  bridgeMode: UsageBridgeMode;
  lastAttemptAt: number | null;
  lastResult: UsageDiagResult;
  rpcid: string | null;
  source: UsageDiagSource;
  dailyParsed: boolean;
  weeklyParsed: boolean;
  errorCode: UsageDiagErrorCode;
  /** Whether our chat-bar button node is in the DOM right now. */
  chatBarButtonPresent: boolean;
  /** Manual + auto refresh attempts this page session (not secrets). */
  attemptCount: number;
};

export function emptyUsageDiagnostics(): UsageDiagnostics {
  return {
    bridgeReady: false,
    bridgeMode: "none",
    lastAttemptAt: null,
    lastResult: "none",
    rpcid: null,
    source: "none",
    dailyParsed: false,
    weeklyParsed: false,
    errorCode: "none",
    chatBarButtonPresent: false,
    attemptCount: 0,
  };
}

const KNOWN_CODES: ReadonlySet<string> = new Set([
  "none",
  "ok",
  "timeout",
  "no-token",
  "parse-miss",
  "empty",
  "account-mismatch",
  "stale-generation",
  "generation-bump",
  "hidden",
  "busy",
  "bridge-not-ready",
  "unknown",
]);

/** Map internal replay/refresh errors to fixed codes — never pass raw Error.message through. */
export function mapUsageErrorCode(error: string | undefined | null): UsageDiagErrorCode {
  if (error == null || error === "") return "none";
  const e = String(error);
  // Exact codes we emit ourselves (including success "ok").
  if (KNOWN_CODES.has(e)) return e as UsageDiagErrorCode;
  // Prefix / known substrings from our own code paths only.
  if (e.endsWith(":timeout")) return "timeout";
  if (e.includes("no-token")) return "no-token";
  return "unknown";
}

export function mapDiagSource(tag: string | undefined | null): UsageDiagSource {
  if (!tag) return "none";
  if (tag === "capture" || tag.startsWith("capture")) return "capture";
  if (tag === "dom" || tag.startsWith("dom")) return "dom";
  if (tag === "replay" || tag.startsWith("rpc") || tag.startsWith("replay")) return "rpc";
  return "none";
}

/** Build a whitelist-only object (drops any accidental extra keys). */
export function sanitizeUsageDiagnostics(input: Partial<UsageDiagnostics> & Record<string, unknown>): UsageDiagnostics {
  const base = emptyUsageDiagnostics();
  const mode = input.bridgeMode;
  const bridgeMode: UsageBridgeMode =
    mode === "inject" || mode === "exportFunction" || mode === "same-world" || mode === "none" ? mode : "none";
  const lastResult: UsageDiagResult =
    input.lastResult === "ok" || input.lastResult === "fail" || input.lastResult === "none" ? input.lastResult : "none";
  const source = mapDiagSource(typeof input.source === "string" ? input.source : "none");
  const errorCode = mapUsageErrorCode(typeof input.errorCode === "string" ? input.errorCode : "none");
  const rpcid = typeof input.rpcid === "string" && /^[A-Za-z0-9_-]{1,32}$/.test(input.rpcid) ? input.rpcid : null;
  return {
    bridgeReady: !!input.bridgeReady,
    bridgeMode,
    lastAttemptAt: typeof input.lastAttemptAt === "number" && Number.isFinite(input.lastAttemptAt) ? input.lastAttemptAt : null,
    lastResult,
    rpcid,
    source,
    dailyParsed: !!input.dailyParsed,
    weeklyParsed: !!input.weeklyParsed,
    errorCode: errorCode === "none" && lastResult === "ok" ? "ok" : errorCode,
    chatBarButtonPresent: !!input.chatBarButtonPresent,
    attemptCount: typeof input.attemptCount === "number" && input.attemptCount >= 0 ? Math.floor(input.attemptCount) : 0,
  };
}

/** Rows for settings UI — labels are fixed Chinese/English, values never free-text secrets. */
export function usageDiagDisplayRows(d: UsageDiagnostics): { key: string; label: string; value: string }[] {
  const s = sanitizeUsageDiagnostics(d);
  return [
    { key: "bridgeReady", label: "bridgeReady", value: s.bridgeReady ? "true" : "false" },
    { key: "bridgeMode", label: "bridgeMode", value: s.bridgeMode },
    {
      key: "lastAttemptAt",
      label: "lastAttemptAt",
      value: s.lastAttemptAt == null ? "never" : String(s.lastAttemptAt),
    },
    { key: "lastResult", label: "lastResult", value: s.lastResult },
    { key: "rpcid", label: "rpcid", value: s.rpcid ?? "—" },
    { key: "source", label: "source", value: s.source },
    { key: "dailyParsed", label: "dailyParsed", value: s.dailyParsed ? "true" : "false" },
    { key: "weeklyParsed", label: "weeklyParsed", value: s.weeklyParsed ? "true" : "false" },
    { key: "errorCode", label: "errorCode", value: s.errorCode },
    { key: "chatBarButtonPresent", label: "chatBarButtonPresent", value: s.chatBarButtonPresent ? "true" : "false" },
    { key: "attemptCount", label: "attemptCount", value: String(s.attemptCount) },
  ];
}
