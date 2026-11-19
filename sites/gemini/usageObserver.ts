/**
 * Gemini usage RPC bridge, patterned on Voyager's MAIN-world usage-observer
 * (/tmp/ggpp-voyager-ref/usage-observer.js + bundle t3/vnt/e3/Xq parsers).
 *
 * Userscript sandbox may not see page fetch / WIZ_global_data; Voyager injects
 * into MAIN and bridges with postMessage. We prefer unsafeWindow hooks (same
 * as netHook; CSP-safe) and fall back to a page <script> + postMessage bridge.
 *
 * Real source only: batchexecute response payloads that parse to daily/weekly %.
 * Never invent or estimate usage numbers.
 *
 * Google /u/N slot isolation (Voyager HL / qL): recipe + capture/replay are
 * scoped by path accountKey (`u/N` | `default`). That is NOT Firefox Multi-
 * Account Container isolation — GM storage may be shared across containers in
 * one profile; callers must not treat persisted usage as live truth until this
 * page session verifies via capture/replay/DOM.
 *
 * MAIN bridge: prefer page-compartment <script> inject + postMessage (Voyager).
 * Do not assign sandbox closures onto unsafeWindow.fetch on Firefox without
 * exportFunction — that cross-compartment assign can silently fail.
 */

/* global unsafeWindow */
declare const unsafeWindow: Window | undefined;

import {
  emptyUsageDiagnostics,
  mapDiagSource,
  mapUsageErrorCode,
  sanitizeUsageDiagnostics,
  type UsageDiagnostics,
} from "./usageDiag";

export type UsageRecipe = { rpcid: string; args: string };
export type { UsageDiagnostics } from "./usageDiag";

/** Voyager default recipe (bundle knt). */
export const DEFAULT_USAGE_RECIPE: UsageRecipe = { rpcid: "jSf9Qc", args: "[]" };

const RECIPE_KEY = "ggpp:usageRecipe";
const PAGE_SRC = "ggpp-usage";
const PAGE_CMD = "ggpp-usage-cmd";

export type ParsedUsageMetrics = {
  rpcid?: string;
  daily?: { percent: number; resetEpoch: number };
  weekly?: { percent: number; resetEpoch: number };
};

type CaptureMsg = {
  rpcid: string | null;
  args: string | null;
  body: string;
  accountKey: string;
  sourcePath: string;
  sourceStartedAt: number;
};

type ReplayResult = { id: number; body?: string; error?: string; accountKey?: string };

type UsageListener = (ev: {
  kind: "capture" | "replay" | "generation-complete";
  metrics: ParsedUsageMetrics | null;
  recipe?: UsageRecipe | null;
  raw?: string;
  error?: string;
  accountKey?: string;
}) => void;

const listeners = new Set<UsageListener>();
let replaySeq = 0;
const pendingReplay = new Map<
  number,
  { resolve: (v: ReplayResult) => void; timer: ReturnType<typeof setTimeout>; accountKey: string; generation: number }
>();
let bridgeStartedAt = 0;
/** Bumped on /u/N switch so in-flight capture/replay cannot overwrite the new slot. */
let sessionGeneration = 0;
/** How MAIN hooks were installed — never infer from a bare try/catch assign. */
let bridgeMode: "inject" | "exportFunction" | "same-world" | "none" = "none";
let pageObserverReady = false;
/** Pristine page fetch for replay (must not recurse through our hook). Only set in same-world/exportFunction paths. */
let pageOrigFetch: typeof fetch | null = null;
let pageWindowRef: any = null;

/** Voyager HL: account key from Gemini path. */
export function accountKeyFromPath(pathname = typeof location !== "undefined" ? location.pathname : "/"): string {
  const m = pathname.match(/^\/u\/(\d+)(?:\/|$)/);
  return m ? `u/${m[1]}` : "default";
}

/** Voyager sX: usage source-path for the current account prefix. */
export function usageSourcePath(pathname = typeof location !== "undefined" ? location.pathname : "/"): string {
  const prefix = pathname.match(/^\/u\/\d+(?=\/|$)/)?.[0] ?? "";
  return `${prefix}/usage`;
}

/** Normalize batchexecute args to the string form Voyager stores (e.g. "[]"). */
export function normalizeRecipeArgs(args: unknown): string {
  if (typeof args === "string") return args;
  if (args == null) return DEFAULT_USAGE_RECIPE.args;
  try {
    return JSON.stringify(args);
  } catch {
    return DEFAULT_USAGE_RECIPE.args;
  }
}

function recipeStorageKey(account = accountKeyFromPath()): string {
  return `${RECIPE_KEY}:${account}`;
}

function loadRecipe(account = accountKeyFromPath()): UsageRecipe {
  try {
    const raw = localStorage.getItem(recipeStorageKey(account)) ?? localStorage.getItem(RECIPE_KEY);
    if (raw) {
      const j = JSON.parse(raw);
      if (j && typeof j.rpcid === "string") {
        return { rpcid: j.rpcid, args: normalizeRecipeArgs(j.args) };
      }
    }
  } catch {}
  return { ...DEFAULT_USAGE_RECIPE };
}

function saveRecipe(r: UsageRecipe, account = accountKeyFromPath()) {
  try {
    const normalized = { rpcid: r.rpcid, args: normalizeRecipeArgs(r.args) };
    localStorage.setItem(recipeStorageKey(account), JSON.stringify(normalized));
  } catch {}
}

/** Bracket-match JSON array start (Voyager tue). */
function matchArrayEnd(s: string, from: number): number {
  let depth = 0;
  let inStr = false;
  let esc = false;
  for (let i = from; i < s.length; i++) {
    const c = s[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === "\\") esc = true;
      else if (c === '"') inStr = false;
    } else if (c === '"') inStr = true;
    else if (c === "[") depth++;
    else if (c === "]") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

/** Voyager Xq: extract wrb.fr rpc payloads from batchexecute body. */
export function extractWrbPayloads(body: string): { rpcid: string; payload: unknown }[] {
  const out: { rpcid: string; payload: unknown }[] = [];
  let n = 0;
  while (n < body.length) {
    const r = body.indexOf('[["wrb.fr"', n);
    if (r < 0) break;
    const o = matchArrayEnd(body, r);
    if (o < 0) break;
    try {
      const i = JSON.parse(body.slice(r, o + 1));
      for (const s of i) {
        if (Array.isArray(s) && s[0] === "wrb.fr" && typeof s[1] === "string" && typeof s[2] === "string") {
          try {
            out.push({ rpcid: s[1], payload: JSON.parse(s[2]) });
          } catch {}
        }
      }
    } catch {}
    n = o + 1;
  }
  return out;
}

/** Voyager e3: one metric row [?, percentFrac, period, [[resetEpoch,...], ...]]. */
function parseMetricRow(e: unknown): { metric: { percent: number; resetEpoch: number }; period: number } | null {
  if (!Array.isArray(e) || e.length < 4) return null;
  const t = e[1];
  const n = e[2];
  const r = e[3];
  if (typeof t !== "number" || t < 0 || t > 1.5 || typeof n !== "number" || !Array.isArray(r) || !Array.isArray(r[0])) return null;
  const o = r[0][0];
  if (typeof o !== "number" || o < 16e8) return null;
  return { metric: { percent: Math.round(t * 100), resetEpoch: o }, period: n };
}

/** Voyager vnt. */
function metricsFromPayload(payload: unknown): ParsedUsageMetrics | null {
  if (!Array.isArray(payload)) return null;
  const t = payload.find((i) => Array.isArray(i) && i.some((s) => parseMetricRow(s) !== null));
  if (!t || !Array.isArray(t)) return null;
  const n = t.map(parseMetricRow).filter((i): i is NonNullable<typeof i> => i !== null);
  if (!n.length) return null;
  const daily = n.find((i) => i.period === 1)?.metric ?? undefined;
  const weekly = n.find((i) => i.period === 2)?.metric ?? undefined;
  return daily || weekly ? { daily, weekly } : null;
}

/**
 * Voyager t3. When `expectRpcid` is set (replay of a known recipe such as jSf9Qc),
 * only that wrb.fr row may supply metrics — never the first usage-shaped payload
 * from an unrelated RPC in the same batchexecute body.
 */
export function parseUsageBatchexecute(
  body: string,
  opts?: { expectRpcid?: string },
): ParsedUsageMetrics | null {
  const hits: ParsedUsageMetrics[] = [];
  for (const { rpcid, payload } of extractWrbPayloads(body)) {
    const r = metricsFromPayload(payload);
    if (r && (r.daily || r.weekly)) hits.push({ rpcid, ...r });
  }
  if (!hits.length) return null;
  if (opts?.expectRpcid) {
    return hits.find((h) => h.rpcid === opts.expectRpcid) ?? null;
  }
  return hits[0];
}

function emit(ev: Parameters<UsageListener>[0]) {
  for (const fn of listeners) {
    try {
      fn(ev);
    } catch (e) {
      console.error("[GG++] usage listener failed", e);
    }
  }
}

function getPageWindow(): any {
  try {
    if (typeof unsafeWindow !== "undefined" && unsafeWindow) return unsafeWindow as any;
  } catch {}
  return window as any;
}

/** Resolve which window to hook (exported for tests / netHook parity). */
export function resolveUsageHookWindow(): { page: any; viaUnsafe: boolean } {
  try {
    if (typeof unsafeWindow !== "undefined" && unsafeWindow) {
      return { page: unsafeWindow as any, viaUnsafe: true };
    }
  } catch {}
  try {
    if (typeof window !== "undefined" && window) {
      return { page: window as any, viaUnsafe: false };
    }
  } catch {}
  return { page: globalThis as any, viaUnsafe: false };
}

/** Call when the Gemini /u/N path changes so stale in-flight RPC cannot apply. */
export function bumpUsageGeneration(): number {
  sessionGeneration += 1;
  // Drop pending postMessage replays tied to the previous slot.
  for (const [id, p] of pendingReplay) {
    clearTimeout(p.timer);
    pendingReplay.delete(id);
    p.resolve({ id, error: "generation-bump" });
  }
  return sessionGeneration;
}

export function getUsageBridgeStatus(): {
  mode: typeof bridgeMode;
  pageReady: boolean;
  generation: number;
} {
  // No accountKey in public status — path slot is not a secret but keep diagnostics minimal.
  return {
    mode: bridgeMode,
    pageReady: pageObserverReady,
    generation: sessionGeneration,
  };
}

let usageDiag: UsageDiagnostics = emptyUsageDiagnostics();

function syncBridgeIntoDiag() {
  usageDiag = sanitizeUsageDiagnostics({
    ...usageDiag,
    bridgeReady: pageObserverReady || bridgeMode === "same-world" || bridgeMode === "exportFunction",
    bridgeMode,
  });
}

/** Whitelist-only snapshot for settings UI. Does not trigger RPC. */
export function getUsageDiagnostics(extras?: { chatBarButtonPresent?: boolean }): UsageDiagnostics {
  syncBridgeIntoDiag();
  const snap = sanitizeUsageDiagnostics({
    ...usageDiag,
    chatBarButtonPresent: extras?.chatBarButtonPresent ?? usageDiag.chatBarButtonPresent,
  });
  return snap;
}

/** Monotonic attempt id — late results from an older attempt must not overwrite. */
let diagAttemptId = 0;
/** True while the current attempt has not yet been finalized (result / timeout / skip). */
let diagAttemptOpen = false;

function bridgeLooksReady(): boolean {
  return pageObserverReady || bridgeMode === "same-world" || bridgeMode === "exportFunction" || bridgeMode === "inject";
}

/** Record a skipped refresh (hidden/busy) — no RPC. Clears prior success illusion. */
export function noteUsageDiagSkip(code: "hidden" | "busy"): void {
  syncBridgeIntoDiag();
  // Skip is its own finalized observation (no in-flight RPC).
  diagAttemptId += 1;
  diagAttemptOpen = false;
  usageDiag = sanitizeUsageDiagnostics({
    ...usageDiag,
    lastAttemptAt: Date.now(),
    attemptCount: usageDiag.attemptCount + 1,
    lastResult: "fail",
    errorCode: code,
    source: "none",
    dailyParsed: false,
    weeklyParsed: false,
    // keep rpcid as last known recipe id (non-secret) for operators
  });
}

/** Start of a refresh/replay attempt. Returns attempt id. Clears prior parsed/source success. */
export function noteUsageDiagAttempt(rpcid: string | null): number {
  syncBridgeIntoDiag();
  diagAttemptId += 1;
  diagAttemptOpen = true;
  usageDiag = sanitizeUsageDiagnostics({
    ...usageDiag,
    lastAttemptAt: Date.now(),
    attemptCount: usageDiag.attemptCount + 1,
    rpcid: rpcid,
    lastResult: "none",
    errorCode: bridgeLooksReady() ? "none" : "bridge-not-ready",
    source: "none",
    dailyParsed: false,
    weeklyParsed: false,
  });
  return diagAttemptId;
}

/**
 * Finish attempt with whitelist fields only.
 * Ignores results whose attemptId is stale or already finalized (late RPC after timeout).
 */
export function noteUsageDiagResult(opts: {
  ok: boolean;
  source: string;
  rpcid?: string | null;
  dailyParsed?: boolean;
  weeklyParsed?: boolean;
  error?: string | null;
  /** Defaults to current attempt; pass explicitly from replayUsage. */
  attemptId?: number;
}): boolean {
  const id = opts.attemptId ?? diagAttemptId;
  if (id !== diagAttemptId || !diagAttemptOpen) {
    return false; // superseded or already finalized
  }
  diagAttemptOpen = false;
  syncBridgeIntoDiag();
  const source = mapDiagSource(opts.source);
  const errorCode = opts.ok ? "ok" : mapUsageErrorCode(opts.error);
  usageDiag = sanitizeUsageDiagnostics({
    ...usageDiag,
    lastAttemptAt: usageDiag.lastAttemptAt ?? Date.now(),
    lastResult: opts.ok ? "ok" : "fail",
    rpcid: opts.rpcid ?? usageDiag.rpcid,
    source,
    dailyParsed: !!opts.dailyParsed,
    weeklyParsed: !!opts.weeklyParsed,
    errorCode,
  });
  return true;
}

/** Test helper: reset diag attempt state without touching bridge hooks. */
export function resetUsageDiagForTest(): void {
  usageDiag = emptyUsageDiagnostics();
  diagAttemptId = 0;
  diagAttemptOpen = false;
  syncBridgeIntoDiag();
}

declare const exportFunction: undefined | ((fn: any, targetScope: any, options?: any) => any);

/** Page-world observer source (stringified IIFE). Mirrors Voyager usage-observer.js. Fallback when unsafeWindow unavailable. */
function pageObserverSource(): string {
  return `(() => {
  if (window.__ggppUsageObserverInstalled) return;
  window.__ggppUsageObserverInstalled = true;
  var SRC = ${JSON.stringify(PAGE_SRC)};
  var CMD = ${JSON.stringify(PAGE_CMD)};
  var origFetch = typeof window.fetch === "function" ? window.fetch.bind(window) : null;

  function onUsagePath() {
    return /^\\/(?:u\\/\\d+\\/)?usage(?:\\/|$)/.test(location.pathname);
  }
  function usageSource() {
    var sourcePath = location.pathname;
    var account = sourcePath.match(/^\\/u\\/(\\d+)(?:\\/|$)/);
    return {
      accountKey: account ? "u/" + account[1] : "default",
      sourcePath: sourcePath,
      sourceStartedAt: Date.now(),
    };
  }
  function isGenRequest(url, body) {
    var urlText = String(url || "").toLowerCase();
    if (urlText.indexOf("streamgenerate") > -1) return true;
    if (urlText.indexOf("batchexecute") > -1) return false;
    var hay = (urlText + "\\n" + (typeof body === "string" ? body : "")).toLowerCase();
    return hay.indexOf("bardfrontendservice") > -1 || hay.indexOf("assistant.lamda") > -1;
  }
  function isSessionPromptSend(method, url, body) {
    return (
      String(method || "").toUpperCase() === "POST" &&
      String(url || "").indexOf("/v1/processSession") > -1 &&
      typeof body === "string" &&
      body.length >= 1000
    );
  }
  function rpcOf(url) {
    try {
      var u = new URL(url, location.href);
      return u.searchParams.get("rpcids") || null;
    } catch (e) {
      return null;
    }
  }
  function parseReqTuple(body) {
    try {
      if (typeof body === "string") {
        var m = body.match(/f\\.req=([^&]*)/);
        if (m) {
          var arr = JSON.parse(decodeURIComponent(m[1]));
          return arr && arr[0] && arr[0][0] ? arr[0][0] : null;
        }
      }
    } catch (e) {}
    return null;
  }
  function post(type, payload) {
    try {
      window.postMessage({ source: SRC, type: type, payload: payload }, location.origin);
    } catch (e) {}
  }
  function capture(url, reqBody, respText, source) {
    if (location.pathname !== source.sourcePath) return;
    if (!onUsagePath()) return;
    if (String(url).indexOf("batchexecute") < 0) return;
    var tuple = parseReqTuple(reqBody);
    var args = tuple ? tuple[1] : null;
    if (args != null && typeof args !== "string") {
      try { args = JSON.stringify(args); } catch (e) { args = "[]"; }
    }
    post("capture", {
      rpcid: rpcOf(url),
      args: args,
      body: typeof respText === "string" ? respText : "",
      accountKey: source.accountKey,
      sourcePath: source.sourcePath,
      sourceStartedAt: source.sourceStartedAt,
    });
  }
  function notifyGenComplete() {
    post("generation-complete", {});
  }

  if (origFetch) {
    window.fetch = function (input, init) {
      var url = typeof input === "string" ? input : (input && input.url) || "";
      var body = init && init.body;
      var source = url.indexOf("batchexecute") > -1 && onUsagePath() ? usageSource() : null;
      var p = origFetch.apply(this, arguments);
      if (source) {
        p.then(
          function (r) {
            try {
              if (r && typeof r.clone === "function") {
                r.clone().text().then(function (t) { capture(url, body, t, source); }, function () {});
              }
            } catch (e) {}
            return r;
          },
          function () {},
        );
      } else if (isGenRequest(url, body)) {
        p.then(
          function (r) {
            try {
              if (r && typeof r.clone === "function") {
                r.clone().arrayBuffer().then(notifyGenComplete, notifyGenComplete);
              } else notifyGenComplete();
            } catch (e) {
              notifyGenComplete();
            }
            return r;
          },
          function () {},
        );
      }
      return p;
    };
  }

  if (typeof window.XMLHttpRequest === "function") {
    var OrigXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = function () {
      var xhr = new OrigXHR();
      var reqMethod = "";
      var reqUrl = "";
      var reqBody = null;
      var origOpen = xhr.open;
      xhr.open = function (method, url) {
        reqMethod = method;
        reqUrl = url;
        return origOpen.apply(xhr, arguments);
      };
      var origSend = xhr.send;
      xhr.send = function (body) {
        reqBody = body;
        if (typeof reqUrl === "string" && reqUrl.indexOf("batchexecute") > -1 && onUsagePath()) {
          var source = usageSource();
          xhr.addEventListener(
            "load",
            function () {
              try {
                capture(reqUrl, reqBody, xhr.responseText, source);
              } catch (e) {}
            },
            { once: true },
          );
        } else if (isGenRequest(reqUrl, body)) {
          xhr.addEventListener("loadend", notifyGenComplete, { once: true });
        } else if (isSessionPromptSend(reqMethod, reqUrl, body)) {
          notifyGenComplete();
        }
        return origSend.apply(xhr, arguments);
      };
      return xhr;
    };
    Object.setPrototypeOf(window.XMLHttpRequest, OrigXHR);
    window.XMLHttpRequest.prototype = OrigXHR.prototype;
  }

  window.addEventListener("message", function (ev) {
    if (ev.source !== window) return;
    var d = ev.data;
    if (!d || d.source !== CMD) return;
    if (d.type === "ping") {
      post("ready", {});
      return;
    }
    if (d.type !== "replay" || !d.payload) return;
    var id = d.payload.id;
    try {
      var wiz = window.WIZ_global_data || {};
      var at = wiz.SNlM0e,
        bl = wiz.cfb2h,
        fsid = wiz.FdrFJe;
      if (!at || !origFetch) {
        post("replay-result", { id: id, error: "no-token" });
        return;
      }
      var rpcid = d.payload.rpcid;
      var args = d.payload.args;
      var requestedSourcePath =
        typeof d.payload.sourcePath === "string" && d.payload.sourcePath
          ? d.payload.sourcePath
          : location.pathname || "/usage";
      var freq = JSON.stringify([[[rpcid, args, null, "generic"]]]);
      var reqBody = "f.req=" + encodeURIComponent(freq) + "&at=" + encodeURIComponent(at) + "&";
      var reqid = 100000 + (Math.floor(performance.now()) % 800000);
      var match = requestedSourcePath.match(/^\\/u\\/\\d+(?=\\/|$)/);
      var accountPrefix = match ? match[0] : "";
      var sourcePath = accountPrefix + "/usage";
      var account = accountPrefix.match(/^\\/u\\/(\\d+)/);
      var accountKey = account ? "u/" + account[1] : "default";
      var url =
        location.origin +
        accountPrefix +
        "/_/BardChatUi/data/batchexecute?rpcids=" +
        encodeURIComponent(rpcid) +
        "&source-path=" +
        encodeURIComponent(sourcePath) +
        "&bl=" +
        encodeURIComponent(bl || "") +
        "&f.sid=" +
        encodeURIComponent(fsid || "") +
        "&hl=en&_reqid=" +
        reqid +
        "&rt=c";
      origFetch
        .call(window, url, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
          body: reqBody,
          credentials: "include",
        })
        .then(function (r) {
          return r.text();
        })
        .then(function (t) {
          post("replay-result", { id: id, body: t, accountKey: accountKey });
        })
        .catch(function (e) {
          post("replay-result", { id: id, error: String(e), accountKey: accountKey });
        });
    } catch (e) {
      post("replay-result", { id: id, error: String(e) });
    }
  });

  post("ready", {});
})();`;
}

/** Inject Voyager-style page IIFE (same compartment as Gemini fetch). Returns whether a script node was inserted — not whether CSP allowed it to run; wait for `ready` postMessage. */
function injectPageObserver(): boolean {
  const code = pageObserverSource();
  const parent = document.documentElement || document.head || document.body;
  if (!parent) return false;
  try {
    const s = document.createElement("script");
    s.textContent = code;
    parent.appendChild(s);
    s.remove();
    return true;
  } catch {
    /* CSP may block inline; try blob URL next */
  }
  try {
    const url = URL.createObjectURL(new Blob([code], { type: "text/javascript" }));
    const s = document.createElement("script");
    s.src = url;
    s.onload = () => {
      try {
        URL.revokeObjectURL(url);
      } catch {}
    };
    parent.appendChild(s);
    return true;
  } catch (e) {
    console.warn("[GG++] failed to inject usage observer into page", e);
    return false;
  }
}

function onUsagePath(pathname = location.pathname) {
  return /^\/(?:u\/\d+\/)?usage(?:\/|$)/.test(pathname);
}

function makeUsageSource() {
  const sourcePath = location.pathname;
  return {
    accountKey: accountKeyFromPath(sourcePath),
    sourcePath,
    sourceStartedAt: Date.now(),
  };
}

function isGenRequest(url: any, body: any) {
  const urlText = String(url || "").toLowerCase();
  if (urlText.indexOf("streamgenerate") > -1) return true;
  if (urlText.indexOf("batchexecute") > -1) return false;
  const hay = (urlText + "\n" + (typeof body === "string" ? body : "")).toLowerCase();
  return hay.indexOf("bardfrontendservice") > -1 || hay.indexOf("assistant.lamda") > -1;
}

function isSessionPromptSend(method: any, url: any, body: any) {
  return (
    String(method || "").toUpperCase() === "POST" &&
    String(url || "").indexOf("/v1/processSession") > -1 &&
    typeof body === "string" &&
    body.length >= 1000
  );
}

function rpcOf(url: string) {
  try {
    return new URL(url, location.href).searchParams.get("rpcids");
  } catch {
    return null;
  }
}

function parseReqTuple(body: any) {
  try {
    if (typeof body === "string") {
      const m = body.match(/f\.req=([^&]*)/);
      if (m) {
        const arr = JSON.parse(decodeURIComponent(m[1]));
        return arr && arr[0] && arr[0][0] ? arr[0][0] : null;
      }
    }
  } catch {}
  return null;
}

function handleCapture(payload: CaptureMsg) {
  // Voyager k(): drop captures from another account / stale route / pre-install.
  if (!payload || typeof payload.body !== "string") return;
  if (payload.accountKey !== accountKeyFromPath()) return;
  if (payload.sourcePath !== location.pathname) return;
  if (typeof payload.sourceStartedAt === "number" && bridgeStartedAt && payload.sourceStartedAt < bridgeStartedAt) return;

  const metrics = parseUsageBatchexecute(payload.body || "");
  let recipe: UsageRecipe | null = null;
  if (metrics && (metrics.daily || metrics.weekly)) {
    const rpcid = (typeof payload.rpcid === "string" && payload.rpcid) || metrics.rpcid || DEFAULT_USAGE_RECIPE.rpcid;
    const args = normalizeRecipeArgs(payload.args);
    recipe = { rpcid, args };
    saveRecipe(recipe, payload.accountKey);
  }
  emit({ kind: "capture", metrics, recipe, raw: payload.body, accountKey: payload.accountKey });
  {
    const aid = noteUsageDiagAttempt((typeof payload.rpcid === "string" && payload.rpcid) || metrics?.rpcid || null);
    if (metrics && (metrics.daily || metrics.weekly)) {
      noteUsageDiagResult({
        attemptId: aid,
        ok: true,
        source: "capture",
        rpcid: recipe?.rpcid ?? metrics.rpcid ?? null,
        dailyParsed: !!metrics.daily,
        weeklyParsed: !!metrics.weekly,
      });
    } else {
      noteUsageDiagResult({
        attemptId: aid,
        ok: false,
        source: "capture",
        error: "parse-miss",
        dailyParsed: false,
        weeklyParsed: false,
      });
    }
  }
}

/** Wrap a sandbox function for page-compartment use when Firefox exportFunction exists. */
function toPageFn(page: any, fn: any, required = false): any {
  if (typeof exportFunction === "function") {
    try {
      return exportFunction(fn, page);
    } catch (e) {
      if (required) throw e;
    }
  } else if (required) {
    throw new Error("exportFunction unavailable");
  }
  // Same-world only — callers must not use this for raw unsafeWindow assigns on Firefox.
  return fn;
}

/**
 * Install fetch/XHR hooks on a window reference.
 * Safe when same JS compartment, or when exportFunction rewrites callables for Firefox.
 * Unsafe: assigning raw sandbox closures to unsafeWindow.fetch (may throw or no-op on Fx).
 */
function installDirectPageHooks(page: any, opts?: { requireExport?: boolean }): boolean {
  if (page.__ggppUsageObserverInstalled) return false;
  const needExport = !!opts?.requireExport;
  if (needExport && typeof exportFunction !== "function") return false;

  try {
    Object.defineProperty(page, "__ggppUsageObserverInstalled", { value: true, configurable: true });
  } catch {
    try {
      page.__ggppUsageObserverInstalled = true;
    } catch {
      return false;
    }
  }

  const origFetch = typeof page.fetch === "function" ? page.fetch.bind(page) : null;
  pageOrigFetch = origFetch;
  pageWindowRef = page;

  const captureFromHook = (url: string, reqBody: any, respText: string, source: ReturnType<typeof makeUsageSource>) => {
    if (location.pathname !== source.sourcePath) return;
    if (!onUsagePath()) return;
    if (String(url).indexOf("batchexecute") < 0) return;
    const tuple = parseReqTuple(reqBody);
    handleCapture({
      rpcid: rpcOf(url),
      args: tuple ? normalizeRecipeArgs(tuple[1]) : null,
      body: typeof respText === "string" ? respText : "",
      accountKey: source.accountKey,
      sourcePath: source.sourcePath,
      sourceStartedAt: source.sourceStartedAt,
    });
  };

  if (origFetch) {
    const hookedFetch = function (input: any, init?: any) {
      const url = typeof input === "string" ? input : (input && input.url) || "";
      const body = init && init.body;
      const source = url.indexOf("batchexecute") > -1 && onUsagePath() ? makeUsageSource() : null;
      const p = origFetch.apply(page, arguments as any);
      if (source) {
        p.then(
          (r: any) => {
            try {
              if (r && typeof r.clone === "function") {
                r.clone()
                  .text()
                  .then((t: string) => captureFromHook(url, body, t, source), () => {});
              }
            } catch {}
            return r;
          },
          () => {},
        );
      } else if (isGenRequest(url, body)) {
        p.then(
          (r: any) => {
            try {
              if (r && typeof r.clone === "function") {
                r.clone().arrayBuffer().then(
                  () => emit({ kind: "generation-complete", metrics: null }),
                  () => emit({ kind: "generation-complete", metrics: null }),
                );
              } else emit({ kind: "generation-complete", metrics: null });
            } catch {
              emit({ kind: "generation-complete", metrics: null });
            }
            return r;
          },
          () => {},
        );
      }
      return p;
    };
    page.fetch = toPageFn(page, hookedFetch, needExport);
  }

  if (typeof page.XMLHttpRequest === "function") {
    const OrigXHR = page.XMLHttpRequest;
    const HookedXHR = function (this: any) {
      const xhr = new OrigXHR();
      let reqMethod = "";
      let reqUrl = "";
      let reqBody: any = null;
      const origOpen = xhr.open;
      xhr.open = function (method: string, url: string) {
        reqMethod = method;
        reqUrl = url;
        return origOpen.apply(xhr, arguments as any);
      };
      const origSend = xhr.send;
      xhr.send = function (body: any) {
        reqBody = body;
        if (typeof reqUrl === "string" && reqUrl.indexOf("batchexecute") > -1 && onUsagePath()) {
          const source = makeUsageSource();
          xhr.addEventListener(
            "load",
            () => {
              try {
                captureFromHook(reqUrl, reqBody, xhr.responseText, source);
              } catch {}
            },
            { once: true },
          );
        } else if (isGenRequest(reqUrl, body)) {
          xhr.addEventListener("loadend", () => emit({ kind: "generation-complete", metrics: null }), { once: true });
        } else if (isSessionPromptSend(reqMethod, reqUrl, body)) {
          emit({ kind: "generation-complete", metrics: null });
        }
        return origSend.apply(xhr, arguments as any);
      };
      return xhr;
    };
    page.XMLHttpRequest = toPageFn(page, HookedXHR, needExport);
    try {
      Object.setPrototypeOf(page.XMLHttpRequest, OrigXHR);
      page.XMLHttpRequest.prototype = OrigXHR.prototype;
    } catch {}
  }

  return true;
}

async function replayViaPageWindow(
  recipe: UsageRecipe,
  accountKey: string,
): Promise<{ body?: string; error?: string }> {
  if (accountKey && accountKeyFromPath() !== accountKey) return { error: "account-mismatch" };
  const page = pageWindowRef || getPageWindow();
  const orig = pageOrigFetch || (typeof page.fetch === "function" ? page.fetch.bind(page) : null);
  const wiz = page.WIZ_global_data || {};
  const at = wiz.SNlM0e;
  const bl = wiz.cfb2h;
  const fsid = wiz.FdrFJe;
  if (!at || !orig) return { error: "no-token" };

  const rpcid = recipe.rpcid;
  const args = normalizeRecipeArgs(recipe.args);
  const requestedSourcePath = location.pathname || "/usage";
  const freq = JSON.stringify([[[rpcid, args, null, "generic"]]]);
  const reqBody = "f.req=" + encodeURIComponent(freq) + "&at=" + encodeURIComponent(at) + "&";
  const reqid = 100000 + (Math.floor(performance.now()) % 800000);
  const match = requestedSourcePath.match(/^\/u\/\d+(?=\/|$)/);
  const accountPrefix = match ? match[0] : "";
  const sourcePath = accountPrefix + "/usage";
  const url =
    location.origin +
    accountPrefix +
    "/_/BardChatUi/data/batchexecute?rpcids=" +
    encodeURIComponent(rpcid) +
    "&source-path=" +
    encodeURIComponent(sourcePath) +
    "&bl=" +
    encodeURIComponent(bl || "") +
    "&f.sid=" +
    encodeURIComponent(fsid || "") +
    "&hl=en&_reqid=" +
    reqid +
    "&rt=c";

  try {
    const r = await orig.call(page, url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: reqBody,
      credentials: "include",
    });
    const t = await r.text();
    return { body: t };
  } catch (e) {
    return { error: String(e) };
  }
}

export function installUsageObserver() {
  const w = window as any;
  if (w.__ggppUsageBridge) return;
  w.__ggppUsageBridge = true;
  bridgeStartedAt = Date.now();
  pageObserverReady = false;
  bridgeMode = "none";

  const { page, viaUnsafe } = resolveUsageHookWindow();
  const sameWorld = !viaUnsafe || page === (window as any);

  window.addEventListener("message", (ev) => {
    // postMessage is the reliable cross-compartment channel (structured-cloneable payloads only).
    if (ev.source !== window && ev.source !== pageWindowRef && ev.source !== page) return;
    const d = ev.data as any;
    if (!d || d.source !== PAGE_SRC) return;
    if (d.type === "ready") {
      pageObserverReady = true;
      if (bridgeMode === "none") bridgeMode = "inject";
      syncBridgeIntoDiag();
      syncBridgeIntoDiag();
      return;
    }
    if (d.type === "capture" && d.payload) handleCapture(d.payload as CaptureMsg);
    else if (d.type === "generation-complete") emit({ kind: "generation-complete", metrics: null });
    else if (d.type === "replay-result" && d.payload) {
      const r = d.payload as ReplayResult;
      const p = pendingReplay.get(r.id);
      if (!p) return;
      if (p.generation !== sessionGeneration) {
        clearTimeout(p.timer);
        pendingReplay.delete(r.id);
        p.resolve({ ...r, error: "stale-generation" });
        return;
      }
      // Voyager R(): ignore results for another Google /u/N slot.
      if (r.accountKey && r.accountKey !== p.accountKey) return;
      if (p.accountKey !== accountKeyFromPath()) {
        clearTimeout(p.timer);
        pendingReplay.delete(r.id);
        p.resolve({ ...r, error: r.error || "account-mismatch" });
        return;
      }
      clearTimeout(p.timer);
      pendingReplay.delete(r.id);
      p.resolve(r);
    }
  });

  // 1) Same JS world (page inject-into / no sandbox): direct hooks are safe.
  if (sameWorld) {
    try {
      if (installDirectPageHooks(page)) {
        bridgeMode = "same-world";
        pageObserverReady = true;
      syncBridgeIntoDiag();
      }
    } catch (e) {
      console.warn("[GG++] same-world usage hooks failed", e);
    }
  }

  // 2) Sandboxed userscript (typical Violentmonkey): Voyager page <script> + postMessage.
  //    Hooks run in the page compartment — no sandbox→page function assign.
  //    Insertion success ≠ execution success; `ready` postMessage sets pageObserverReady.
  //    Never treat raw `unsafeWindow.fetch = sandboxFn` as success (Firefox Permission denied / no-op).
  if (bridgeMode === "none") {
    pageOrigFetch = null;
    pageWindowRef = null;
    if (injectPageObserver()) {
      bridgeMode = "inject";
    }
  }

  // 3) Last resort on Firefox if inject path unavailable and exportFunction exists.
  //    NOT preferred — compartment wrapping is manager-specific; left unverified in browser.
  if (bridgeMode === "none" && viaUnsafe && typeof exportFunction === "function") {
    try {
      if (installDirectPageHooks(page, { requireExport: true })) {
        bridgeMode = "exportFunction";
        pageObserverReady = true;
      syncBridgeIntoDiag();
      }
    } catch (e) {
      console.warn("[GG++] exportFunction usage hooks failed", e);
      pageOrigFetch = null;
      pageWindowRef = null;
    }
  }

  try {
    window.postMessage({ source: PAGE_CMD, type: "ping" }, location.origin);
  } catch {}
}

export function onUsageEvent(fn: UsageListener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getUsageRecipe(account = accountKeyFromPath()): UsageRecipe {
  return loadRecipe(account);
}

/** Ask MAIN world to replay the usage batchexecute with page WIZ tokens. Auth fields never leave the page compartment in inject mode. */
export function replayUsage(
  recipe?: UsageRecipe,
  timeoutMs = 12000,
): Promise<{ body?: string; error?: string; metrics: ParsedUsageMetrics | null }> {
  const accountKey = accountKeyFromPath();
  const r = recipe || loadRecipe(accountKey);
  const id = ++replaySeq;
  const generation = sessionGeneration;
  const expectRpcid = r.rpcid;
  const attemptId = noteUsageDiagAttempt(expectRpcid);

  /** All completion paths (ok / error / timeout) go through here exactly once for diagnostics. */
  let settled = false;
  const finish = (res: { body?: string; error?: string }) => {
    if (settled) {
      // Late response after timeout/settlement — do not alter this attempt's diagnostics.
      return { error: res.error || "late", metrics: null as ParsedUsageMetrics | null, body: res.body };
    }
    settled = true;

    if (generation !== sessionGeneration) {
      noteUsageDiagResult({ attemptId, ok: false, source: "rpc", rpcid: expectRpcid, error: "stale-generation" });
      return { error: "stale-generation", metrics: null as ParsedUsageMetrics | null };
    }
    if (accountKeyFromPath() !== accountKey) {
      noteUsageDiagResult({ attemptId, ok: false, source: "rpc", rpcid: expectRpcid, error: "account-mismatch" });
      return { error: "account-mismatch", metrics: null };
    }
    if (res.error || !res.body) {
      const code = mapUsageErrorCode(res.error || "empty");
      noteUsageDiagResult({ attemptId, ok: false, source: "rpc", rpcid: expectRpcid, error: code });
      return { error: res.error || "empty", metrics: null, body: res.body };
    }
    const metrics = parseUsageBatchexecute(res.body, { expectRpcid });
    if (metrics && (metrics.daily || metrics.weekly)) saveRecipe(r, accountKey);
    const ok = !!(metrics && (metrics.daily || metrics.weekly));
    noteUsageDiagResult({
      attemptId,
      ok,
      source: "rpc",
      rpcid: expectRpcid,
      dailyParsed: !!metrics?.daily,
      weeklyParsed: !!metrics?.weekly,
      error: ok ? "ok" : "parse-miss",
    });
    emit({
      kind: "replay",
      metrics,
      recipe: r,
      raw: res.body,
      error: metrics ? undefined : "parse-miss",
      accountKey,
    });
    return { body: res.body, metrics, error: metrics ? undefined : "parse-miss" };
  };

  // Direct page fetch only when hooks were installed in-compartment / via exportFunction.
  if (pageOrigFetch && pageWindowRef && (bridgeMode === "same-world" || bridgeMode === "exportFunction")) {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        resolve(finish({ error: "timeout" }));
      }, timeoutMs);
      void replayViaPageWindow(r, accountKey).then((res) => {
        clearTimeout(timer);
        resolve(finish(res));
      });
    });
  }

  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      pendingReplay.delete(id);
      resolve(finish({ error: "timeout" }));
    }, timeoutMs);
    pendingReplay.set(id, {
      timer,
      accountKey,
      generation,
      resolve: (res) => {
        clearTimeout(timer);
        resolve(finish(res));
      },
    });
    try {
      window.postMessage(
        {
          source: PAGE_CMD,
          type: "replay",
          payload: {
            id,
            rpcid: r.rpcid,
            args: normalizeRecipeArgs(r.args),
            sourcePath: location.pathname,
          },
        },
        location.origin,
      );
    } catch {
      clearTimeout(timer);
      pendingReplay.delete(id);
      resolve(finish({ error: "unknown" }));
    }
  });
}
