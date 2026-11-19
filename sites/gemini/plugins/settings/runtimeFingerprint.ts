/**
 * Local-only runtime fingerprint for the Plugins settings pane.
 * Reads a single kernel.plugins() snapshot (caller supplies the array / getter).
 * Never touches URL, title, messages, logs, network, or persistence.
 */

/** Fixed build label for this hideBlue investigation pack — not a content hash. */
export const RUNTIME_FINGERPRINT_BUILD = "GGPP-HB-20261118-R1";

const HIDE_BLUE_ID = "hideBlueBackground";

/** Allowed plugin.state values shown in the fingerprint; absent plugin → missing. */
export const FINGERPRINT_STATES = ["running", "stopped", "error", "missing"] as const;
export type FingerprintPluginState = (typeof FINGERPRINT_STATES)[number];

export type RuntimeFingerprint = {
  build: string;
  pluginCount: number;
  hasHideBlueBackground: boolean;
  hideBlueBackgroundState: FingerprintPluginState;
};

/** Minimal slice — only id + state; ignores every other PluginInfo field. */
export type FingerprintPluginSlice = {
  def: { id: string };
  state: string;
};

const STATE_SET = new Set<string>(["running", "stopped", "error"]);

function mapState(raw: string | undefined): FingerprintPluginState {
  if (raw && STATE_SET.has(raw)) return raw as FingerprintPluginState;
  // Present but unexpected phase string → still not "missing"
  return "stopped";
}

/**
 * Pure: one pass over `plugins`. Does not call any getters on foreign objects.
 */
export function buildRuntimeFingerprint(
  plugins: readonly FingerprintPluginSlice[],
  build: string = RUNTIME_FINGERPRINT_BUILD,
): RuntimeFingerprint {
  let has = false;
  let state: FingerprintPluginState = "missing";
  for (const p of plugins) {
    if (p?.def?.id !== HIDE_BLUE_ID) continue;
    has = true;
    state = mapState(p.state);
    break;
  }
  return {
    build,
    pluginCount: plugins.length,
    hasHideBlueBackground: has,
    hideBlueBackgroundState: state,
  };
}

/**
 * Evaluate `pluginsOnce` exactly once, then build the fingerprint.
 */
export function readRuntimeFingerprint(
  pluginsOnce: () => readonly FingerprintPluginSlice[],
  build: string = RUNTIME_FINGERPRINT_BUILD,
): RuntimeFingerprint {
  return buildRuntimeFingerprint(pluginsOnce(), build);
}

/** Four-field DOM text only — never a plugin name dump. */
export function formatRuntimeFingerprint(fp: RuntimeFingerprint): string {
  return `${fp.build} · count:${fp.pluginCount} · hideBlue:${fp.hasHideBlueBackground} · state:${fp.hideBlueBackgroundState}`;
}
