/** Import legacy GG++ settings (ggpp:settings) into Userscript++ plugins.* shape once. */
import { getU } from "./runtime";

const LEGACY_GM = "ggpp:settings";
const LEGACY_LS = "ggpp:settings";
const FLAG = "ggpp:migrated-to-uspp";

export function migrateGgSettings() {
  const U = getU();
  try {
    if (localStorage.getItem(FLAG) === "1") return;
  } catch {}

  let raw: any = null;
  try {
    const gm = (globalThis as any).GM;
    // Sync path unavailable; try localStorage mirror / website storage used by older builds.
  } catch {}
  try {
    const s = localStorage.getItem(LEGACY_LS);
    if (s) raw = JSON.parse(s);
  } catch {}

  // Also try reading GM asynchronously later via U.importSettings if we got a bag.
  if (!raw || typeof raw !== "object") {
    // Fire-and-forget GM read
    const gm = (globalThis as any).GM;
    if (gm?.getValue) {
      void gm.getValue(LEGACY_GM).then((v: any) => {
        if (v == null) return;
        try {
          const bag = typeof v === "string" ? JSON.parse(v) : v;
          applyLegacy(bag);
          try {
            localStorage.setItem(FLAG, "1");
          } catch {}
        } catch {}
      });
    }
    return;
  }
  applyLegacy(raw);
  try {
    localStorage.setItem(FLAG, "1");
  } catch {}
}

function applyLegacy(bag: Record<string, any>) {
  const U = getU();
  const plugins: Record<string, any> = {};
  for (const [id, entry] of Object.entries(bag)) {
    if (!entry || typeof entry !== "object") continue;
    const out: Record<string, any> = {};
    if (typeof (entry as any).enabled === "boolean") out.enabled = (entry as any).enabled;
    const values = (entry as any).values;
    if (values && typeof values === "object") Object.assign(out, values);
    if (Object.keys(out).length) plugins[id] = out;
  }
  if (!Object.keys(plugins).length) return;
  try {
    U.importSettings?.({ plugins }, { merge: true });
  } catch {
    // Fallback: write into PlainSettings-like store if present
    try {
      for (const [id, entry] of Object.entries(plugins)) {
        const p = U.plugins?.[id];
        if (!p) continue;
        if (typeof entry.enabled === "boolean") U.setPluginEnabled?.(id, entry.enabled);
        if (p.settings?.store) {
          for (const [k, v] of Object.entries(entry)) {
            if (k === "enabled") continue;
            p.settings.store[k] = v;
          }
        }
      }
    } catch {}
  }
}


const RETIRE_CHATLIST_FLAG = "ggpp:retired-chatListStatus-v1";

/** Gemini now draws its own sidebar generating spinner; drop the duplicate plugin once. */
export function retireRedundantPlugins() {
  try {
    if (localStorage.getItem(RETIRE_CHATLIST_FLAG) === "1") return;
  } catch {}
  const U = getU();
  try {
    U.importSettings?.({ plugins: { chatListStatus: { enabled: false } } }, { merge: true });
  } catch {}
  try {
    U.setPluginEnabled?.("chatListStatus", false);
  } catch {}
  try {
    localStorage.setItem(RETIRE_CHATLIST_FLAG, "1");
  } catch {}
}
