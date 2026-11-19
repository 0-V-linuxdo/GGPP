/* global unsafeWindow, exportFunction */
declare const unsafeWindow: Window | undefined;
declare const exportFunction: undefined | ((fn: any, targetScope: any, options?: any) => any);

/**
 * Prefer page window (Voyager / USPP W=unsafeWindow). Sandbox window.fetch is not Gemini's.
 * On Firefox, assigning sandbox functions onto unsafeWindow may fail compartments —
 * wrap with exportFunction when available. CustomEvent.detail must stay a string
 * (structured-clone / string primitives); object details can throw Permission denied.
 */
export function resolveNetHookWindow(): any {
  try {
    if (typeof unsafeWindow !== "undefined" && unsafeWindow) return unsafeWindow as any;
  } catch {}
  try {
    if (typeof window !== "undefined" && window) return window as any;
  } catch {}
  return globalThis as any;
}

function toPageFn(page: any, fn: any): any {
  try {
    if (typeof exportFunction === "function" && page && page !== (typeof window !== "undefined" ? window : null)) {
      return exportFunction(fn, page);
    }
  } catch {}
  return fn;
}

/** Page-world reply-stream hook (formerly static/extension/netHook.js). */
export function installNetHook() {
  const w = resolveNetHookWindow();
  if (w.__ggppNetHook) return;
  try {
    Object.defineProperty(w, "__ggppNetHook", { value: true });
  } catch {
    try {
      w.__ggppNetHook = true;
    } catch {
      return;
    }
  }

  const REPLY = /\/processSession\b|StreamGenerate/i;
  const WATCH = /gemini\.google\.com|clients6\.google\.com|googleapis\.com/i;
  const CONV = /(?<![a-z0-9_])c_([0-9a-f]{12,})/gi;
  let seq = 0;

  const emit = (detail: unknown) => {
    const payload = JSON.stringify(detail);
    try {
      window.dispatchEvent(new CustomEvent("ggpp:net", { detail: payload }));
    } catch {}
    try {
      if (w !== window) w.dispatchEvent(new CustomEvent("ggpp:net", { detail: payload }));
    } catch {}
    // Cross-world fallback (content ↔ page), same idea as usageObserver postMessage.
    try {
      window.postMessage({ source: "ggpp-net", detail: payload }, location.origin);
    } catch {}
  };
  const idsIn = (text: string) => [...new Set([...String(text).matchAll(CONV)].map((m) => m[1]))];
  const short = (url: string) => {
    try {
      const u = new URL(url, location.href);
      return `${u.host}${u.pathname}`;
    } catch {
      return String(url).slice(0, 80);
    }
  };
  const bodyText = (body: any) => {
    try {
      if (typeof body === "string") return body;
      if (body instanceof URLSearchParams) return body.toString();
      if (typeof FormData !== "undefined" && body instanceof FormData) return String(body.get("f.req") ?? "");
      if (body instanceof ArrayBuffer || ArrayBuffer.isView(body)) return new TextDecoder().decode(body as ArrayBuffer);
    } catch {}
    return "";
  };
  const convOfBody = (body: any) => {
    let raw = bodyText(body);
    if (raw.includes("f.req=")) {
      try {
        raw = decodeURIComponent(new URLSearchParams(raw).get("f.req") ?? "");
      } catch {}
    }
    return idsIn(raw)[0] ?? null;
  };

  const log: any[] = [];
  const entry = (kind: string, url: string) => {
    const e = { kind, url: short(url), start: Date.now(), end: 0, chunks: 0, bytes: 0, ids: [] as string[] };
    log.push(e);
    if (log.length > 60) log.shift();
    return e;
  };
  window.addEventListener("ggpp:net-log-request", () =>
    emit({
      phase: "log",
      entries: log.map(
        (e) =>
          `${e.kind} ${e.url} ${e.end ? `${e.end - e.start}ms` : `open ${Date.now() - e.start}ms`} chunks=${e.chunks} bytes=${e.bytes}${e.ids.length ? ` ids=${e.ids.join(",")}` : ""}`,
      ),
    }),
  );

  const onReplyStart = (url: string, body: any) => {
    const requestId = `r${++seq}`;
    emit({ phase: "start", requestId, conversationId: convOfBody(body), url: short(url) });
    return requestId;
  };
  const onReplyEnd = (requestId: string, error = false) => emit({ phase: "end", requestId, error });

  const wrapFetch = () => {
    const orig = w.fetch;
    if (typeof orig !== "function") return;
    w.fetch = toPageFn(w, async function (input: any, init?: any) {
      const url = String(input?.url ?? input);
      const method = (init?.method || "GET").toUpperCase();
      const watched = WATCH.test(url);
      const reply = REPLY.test(url) && method !== "GET";
      const e = watched ? entry("fetch", url) : null;
      let requestId: string | null = null;
      if (reply) requestId = onReplyStart(url, init?.body);
      try {
        const res = await orig.apply(this, arguments as any);
        if (e) {
          e.end = Date.now();
          try {
            const clone = res.clone();
            const reader = clone.body?.getReader?.();
            if (reader) {
              (async () => {
                try {
                  for (;;) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    e.chunks++;
                    e.bytes += value?.byteLength || 0;
                    const text = value ? new TextDecoder().decode(value) : "";
                    const ids = idsIn(text);
                    if (ids.length) {
                      e.ids = [...new Set([...e.ids, ...ids])];
                      emit({ phase: "chunk", ids, bytes: e.bytes, url: e.url });
                    }
                  }
                } catch {}
              })();
            }
          } catch {}
        }
        if (requestId) onReplyEnd(requestId, !res.ok);
        return res;
      } catch (err) {
        if (e) e.end = Date.now();
        if (requestId) onReplyEnd(requestId, true);
        throw err;
      }
    });
  };

  const wrapXhr = () => {
    const XO = w.XMLHttpRequest;
    if (!XO) return;
    const open = XO.prototype.open;
    const send = XO.prototype.send;
    XO.prototype.open = toPageFn(w, function (method: string, url: string) {
      (this as any).__ggpp = { method: String(method || "GET").toUpperCase(), url: String(url) };
      return open.apply(this, arguments as any);
    });
    XO.prototype.send = toPageFn(w, function (body: any) {
      const meta = (this as any).__ggpp || {};
      const watched = WATCH.test(meta.url || "");
      const reply = REPLY.test(meta.url || "") && meta.method !== "GET";
      const e = watched ? entry("xhr", meta.url) : null;
      let requestId: string | null = null;
      if (reply) requestId = onReplyStart(meta.url, body);
      this.addEventListener("loadend", () => {
        if (e) e.end = Date.now();
        if (requestId) onReplyEnd(requestId, (this as any).status >= 400);
      });
      if (e) {
        this.addEventListener("progress", (ev: any) => {
          e.bytes = ev.loaded || e.bytes;
          e.chunks++;
        });
      }
      return send.apply(this, arguments as any);
    });
  };

  wrapFetch();
  wrapXhr();
}
