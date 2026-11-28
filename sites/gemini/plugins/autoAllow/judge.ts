/** Conservative permission judges.  Anything that is not clearly safe is left for the user. */

export type ToolPermission = {
  toolName: string;
  script: string;
  text?: string;
};

export type Verdict = "allow" | "deny" | "unsure";
export type AutoAllowAction = "allow" | "deny" | "skip";

const DESTRUCTIVE = /(?:\brm\s+-[a-z]*r[a-z]*\b|\brmdir\s+\/s\b|\bremove-item\b[^\n]*-recurse\b|\bdel\s+\/s\b|\bformat\s+[a-z]:|\bmkfs\b|\bdd\s+if=.*\bof=|\bshutdown\b|\breboot\b|\bkillall\b|\btaskkill\b|\bgit\s+reset\s+--hard\b|\bdrop\s+(?:database|table)\b|\bdelete\s+from\b)/i;
const EXFILTRATION = /(?:document\s*\.\s*cookie|\bbody\s*:[^\n;]{0,200}\b(?:document\.cookie|localStorage(?:\.getItem)?|sessionStorage|indexedDB|api[_-]?key|access[_-]?token|authorization|secret)\b)/i;
const SHELL_DOWNLOAD = /\b(?:curl|wget)\b[^\n|]*\|\s*(?:sh|bash|zsh|cmd|powershell)\b/i;
const READ_ONLY_SCRIPT = /^(?=[\s\S]{1,12000}$)(?=.*\b(?:fetch|JSON\.parse|querySelector(?:All)?|document\.title|location\.href|return)\b)(?![\s\S]*\b(?:click|submit|dispatchEvent|append(?:Child)?|remove(?:Child)?|replaceWith|innerHTML\s*=|textContent\s*=|value\s*=|location\s*=|history\.(?:push|replace)|fetch\s*\([^)]*,\s*\{[^}]*\bmethod\s*:\s*["'](?:POST|PUT|PATCH|DELETE)["'])\b)[\s\S]*$/i;
const RELATIVE_READ = /['"`]\/(?:v1\/(?:bizdata\/(?:view\/query|load)|form\/load|schema)|Automatic\/OnAction)\b/;
const ABSOLUTE_URL = /https?:\/\//i;
const SCRIPT_MUTATION = /(?:localStorage\.setItem|sessionStorage\.setItem|indexedDB|\.click\s*\(|\.submit\s*\(|\beval\s*\(|innerHTML\s*=|document\.cookie\s*=)/i;

function parseJson(script: string): Record<string, unknown> | null {
  try {
    const value = JSON.parse(script);
    return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

function decodeEscapes(script: string): string {
  return String(script ?? "")
    .replace(/\\u003e/gi, ">")
    .replace(/\\u003c/gi, "<")
    .replace(/\\u0026/gi, "&");
}

function unescapeJsonString(value: string): string {
  return decodeEscapes(
    value
      .replace(/\\n/g, "\n")
      .replace(/\\r/g, "\r")
      .replace(/\\t/g, "\t")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\"),
  );
}

/** Unwrap Gemini `{"function":"..."}` payloads, including truncated previews. */
export function unwrapEvaluateScript(script: string, depth = 0): string {
  const decoded = decodeEscapes(String(script ?? ""));
  if (depth > 3) return decoded;
  const trimmed = decoded.trim();
  try {
    const parsed = JSON.parse(trimmed);
    if (parsed && typeof parsed === "object" && typeof (parsed as { function?: unknown }).function === "string") {
      return unwrapEvaluateScript(String((parsed as { function: string }).function), depth + 1);
    }
    if (typeof parsed === "string") return unwrapEvaluateScript(parsed, depth + 1);
  } catch {}
  const wrapped = /^\{\s*"function"\s*:\s*"([\s\S]*)/.exec(trimmed);
  if (wrapped) return unwrapEvaluateScript(unescapeJsonString(wrapped[1]), depth + 1);
  return decoded;
}

function isH3yunReadHelper(script: string): boolean {
  if (!/\bfetch\s*\(/.test(script)) return false;
  const hasPostForm = /\bpostForm\b/.test(script);
  const hasStringify =
    /JSON\.stringify\s*\(\s*(?:b|obj)\s*\)/.test(script) ||
    /body\s*:\s*JSON\.stringify/.test(script);
  if (!hasPostForm && !hasStringify) return false;
  const truncated = /\.{3}/.test(script);
  const hasIdentity = /\bgv2map\b/.test(script) || /localStorage\.getItem/.test(script);
  const hasRelative = /\/v1\b|\/Form\/OnAction\b|\/Automatic\/OnAction\b/.test(script);
  if (truncated && (hasPostForm || hasStringify)) return true;
  if (hasIdentity && (hasRelative || truncated)) return true;
  if (hasRelative && (hasPostForm || hasStringify)) return true;
  return false;
}

function isSafeEvaluateScript(script: string): boolean {
  const source = unwrapEvaluateScript(script);
  if (READ_ONLY_SCRIPT.test(source)) return true;
  if (ABSOLUTE_URL.test(source) || SCRIPT_MUTATION.test(source)) return false;
  if (/['"`]\/v1\/(?:bizdata\/(?:view\/query|load)|form\/load|schema)\b/.test(source)) return true;
  if (/['"`]\/Automatic\/OnAction\b/.test(source) && /LoadTriggers/.test(source)) return true;
  if (RELATIVE_READ.test(source) && /LoadTriggers/.test(source)) return true;
  if (isH3yunReadHelper(source)) return true;
  return false;
}

/**
 * Only a small, explainable set of read-only actions gets an automatic allow.
 * This deliberately favours false negatives: "unsure" means leave Gemini's card alone.
 */
export function judgeRules(permission: ToolPermission): Verdict {
  const tool = String(permission.toolName || "").trim();
  const script = String(permission.script || "").trim();
  const source = unwrapEvaluateScript(script);
  const haystack = `${tool}\n${script}\n${source}\n${permission.text || ""}`;
  if (!tool || !script) return "unsure";
  if (DESTRUCTIVE.test(haystack) || EXFILTRATION.test(haystack) || SHELL_DOWNLOAD.test(haystack)) return "deny";
  if (/^(?:list_network_requests|get_network_request|list_pages|list_tabs)$/i.test(tool)) return "allow";
  if (/^click$/i.test(tool)) {
    const args = parseJson(script);
    if (!args) return "unsure";
    const keys = Object.keys(args);
    return keys.length && keys.every((key) => /^(?:pageId|uid|element|ref)$/i.test(key)) ? "allow" : "unsure";
  }
  if (/^(?:list_files|read_file|search_files|inspect)$/i.test(tool) && script.length < 4000) return "allow";
  if (/^evaluate_script$/i.test(tool)) return isSafeEvaluateScript(script) ? "allow" : "unsure";
  return "unsure";
}

/** alwaysAllow clicks unsure cards; deny still wins. */
export function decideAutoAllow(verdict: Verdict, alwaysAllow = false): AutoAllowAction {
  if (verdict === "deny") return "deny";
  if (verdict === "allow" || alwaysAllow) return "allow";
  return "skip";
}

function apiPrompt(permission: ToolPermission): string {
  return [
    "You are a safety gate for a computer-use permission request.",
    "Return exactly one line: ALLOW or DENY. No punctuation, explanation, or markdown.",
    "Choose DENY for destructive actions, credential/cookie/token collection, data exfiltration, or uncertain intent.",
    "Choose ALLOW only for clearly harmless read-only work.",
    `Tool: ${permission.toolName}`,
    "Script/content:",
    permission.script.slice(0, 12000),
  ].join("\n");
}

/** Gemini API judge. The key is used only in the request URL and is never logged. */
export async function judgeApi(permission: ToolPermission, apiKey: string, model = "gemini-2.5-flash"): Promise<Verdict> {
  const key = apiKey.trim();
  if (!key) return "unsure";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model || "gemini-2.5-flash")}:generateContent?key=${encodeURIComponent(key)}`;
  const body = JSON.stringify({ contents: [{ role: "user", parts: [{ text: apiPrompt(permission) }] }], generationConfig: { temperature: 0, maxOutputTokens: 4 } });
  try {
    const text = await new Promise<string>((resolve, reject) => {
      const request = (globalThis as any).GM?.xmlHttpRequest;
      if (typeof request !== "function") return reject(new Error("GM.xmlHttpRequest unavailable"));
      request({
        method: "POST",
        url,
        data: body,
        headers: { "Content-Type": "application/json" },
        timeout: 15000,
        onload: (r: any) => (r.status >= 200 && r.status < 300 ? resolve(r.responseText) : reject(new Error(`HTTP ${r.status}`))),
        onerror: () => reject(new Error("Network error")),
        ontimeout: () => reject(new Error("Timed out")),
      });
    });
    const answer = JSON.parse(text)?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text || "").join("").trim();
    return answer === "ALLOW" ? "allow" : answer === "DENY" ? "deny" : "unsure";
  } catch {
    return "unsure";
  }
}

const TEMP_ENTRY = "temp-chat-button gem-icon-button.temp-chat-entry button, temp-chat-button button[aria-label='Temporary chat']";

/**
 * Best-effort web judge handoff. Gemini does not expose a stable response API to a
 * userscript, so this intentionally only prepares a Temporary chat and returns unsure.
 */
export function openTemporaryWebJudge(permission: ToolPermission): Verdict {
  try {
    const tab = window.open("/app", "_blank");
    if (!tab) return "unsure";
    const prompt = `${apiPrompt(permission)}\n\nReply with exactly ALLOW or DENY.`;
    const prepare = () => {
      try {
        const button = tab.document.querySelector<HTMLElement>(TEMP_ENTRY);
        button?.click();
        const editor = tab.document.querySelector<HTMLElement>("[contenteditable='true']");
        if (editor) {
          editor.focus();
          editor.textContent = prompt;
          editor.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: prompt }));
        }
      } catch {}
    };
    tab.addEventListener("load", () => setTimeout(prepare, 700), { once: true });
    setTimeout(prepare, 1200);
  } catch {}
  return "unsure";
}
