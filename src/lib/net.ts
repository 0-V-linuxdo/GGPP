declare const browser: any;
declare const GM: any;

/** Cross-origin GET for text (theme CSS). Goes through the extension background or the userscript manager. */
export async function fetchText(url: string, withSession = false, timeoutMs = 30000): Promise<string> {
  if (__GGPP_TARGET__ === "extension") {
    const r = await browser.runtime.sendMessage({ type: "ggpp:fetch", url, withSession, timeoutMs });
    if (!r?.ok) throw new Error(r?.error ?? `Failed to fetch (${r?.status ?? "?"}).`);
    return r.text;
  }
  if (typeof GM !== "undefined" && GM.xmlHttpRequest) {
    return new Promise((resolve, reject) =>
      GM.xmlHttpRequest({
        method: "GET",
        url,
        timeout: 30000,
        onload: (r: any) => (r.status >= 200 && r.status < 300 ? resolve(r.responseText) : reject(new Error(`Failed to fetch (${r.status}).`))),
        onerror: () => reject(new Error("Network error.")),
        ontimeout: () => reject(new Error("Timed out.")),
      }),
    );
  }
  const r = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!r.ok) throw new Error(`Failed to fetch (${r.status}).`);
  return r.text();
}
