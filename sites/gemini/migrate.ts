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


const RESTORE_CHATLIST_FLAG = "ggpp:restored-chatListStatus-v2";

/** Native Gemini sidebar spinner is unreliable; put ChatListStatus back on once. */
export function retireRedundantPlugins() {
  try {
    if (localStorage.getItem(RESTORE_CHATLIST_FLAG) === "1") return;
  } catch {}
  const U = getU();
  try {
    U.importSettings?.({ plugins: { chatListStatus: { enabled: true } } }, { merge: true });
  } catch {}
  try {
    U.setPluginEnabled?.("chatListStatus", true);
  } catch {}
  try {
    localStorage.setItem(RESTORE_CHATLIST_FLAG, "1");
  } catch {}
}


export const PRESERVE_DECLUTTER_FLAG = "ggpp:preserved-pre-0222-declutter-v1";

/** Plugins that were enabledByDefault before 0.2.22. New installs stay off. */
export const PRE_0222_DEFAULT_ON = [
  "cleaner",
  "noStarters",
  "noShareLink",
  "noDictation",
  "noSidebarIdentity",
  "composerOpacity",
  "skillBlocker",
] as const;

/** True if this browser already ran GG++ before this page load. */
export function hadExistingGgProfile(): boolean {
  try {
    if (localStorage.getItem(FLAG) === "1") return true;
    if (localStorage.getItem(RESTORE_CHATLIST_FLAG) === "1") return true;
  } catch {}
  return false;
}

function storedPluginEnabled(U: ReturnType<typeof getU>, id: string): boolean | undefined {
  try {
    const v = U.exportSettings?.()?.settings?.plugins?.[id]?.enabled;
    if (typeof v === "boolean") return v;
  } catch {}
  return undefined;
}

/**
 * 0.2.22 flipped enabledByDefault to false. Unset enabled flags then followed
 * the new default and changed existing machines. Restore the old on-state once
 * for profiles that already existed; leave explicit on/off and fresh installs.
 */
export function preserveLegacyDeclutterDefaults(existingProfile: boolean) {
  try {
    if (localStorage.getItem(PRESERVE_DECLUTTER_FLAG) === "1") return;
  } catch {}
  if (existingProfile) {
    const U = getU();
    const plugins: Record<string, { enabled: true }> = {};
    for (const id of PRE_0222_DEFAULT_ON) {
      if (typeof storedPluginEnabled(U, id) === "boolean") continue;
      plugins[id] = { enabled: true };
    }
    if (Object.keys(plugins).length) {
      try {
        U.importSettings?.({ plugins }, { merge: true });
      } catch {}
      for (const id of Object.keys(plugins)) {
        try {
          U.setPluginEnabled?.(id, true);
        } catch {}
      }
    }
  }
  try {
    localStorage.setItem(PRESERVE_DECLUTTER_FLAG, "1");
  } catch {}
}
