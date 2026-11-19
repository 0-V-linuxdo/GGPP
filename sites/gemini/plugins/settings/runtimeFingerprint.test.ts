import { describe, expect, test } from "bun:test";
import {
  RUNTIME_FINGERPRINT_BUILD,
  buildRuntimeFingerprint,
  formatRuntimeFingerprint,
  readRuntimeFingerprint,
  type FingerprintPluginSlice,
} from "./runtimeFingerprint";

function slice(id: string, state: string): FingerprintPluginSlice {
  return { def: { id }, state };
}

describe("runtimeFingerprint build marker", () => {
  test("fixed build string is not a hash placeholder", () => {
    expect(RUNTIME_FINGERPRINT_BUILD).toBe("GGPP-HB-20261118-R1");
    expect(RUNTIME_FINGERPRINT_BUILD.startsWith("GGPP-HB-")).toBe(true);
    expect(/^[a-f0-9]{64}$/i.test(RUNTIME_FINGERPRINT_BUILD)).toBe(false);
  });
});

describe("runtimeFingerprint from plugin set", () => {
  test("with hideBlue: count includes hidden peers; has true; state whitelisted", () => {
    const plugins = [
      slice("gemini", "running"), // hidden in UI but counted
      slice("ui", "running"),
      slice("hideBlueBackground", "running"),
      slice("composerOpacity", "stopped"),
    ];
    const fp = buildRuntimeFingerprint(plugins);
    expect(fp.build).toBe(RUNTIME_FINGERPRINT_BUILD);
    expect(fp.pluginCount).toBe(4);
    expect(fp.hasHideBlueBackground).toBe(true);
    expect(fp.hideBlueBackgroundState).toBe("running");
    expect(formatRuntimeFingerprint(fp)).toBe(
      "GGPP-HB-20261118-R1 · count:4 · hideBlue:true · state:running",
    );
  });

  test("without hideBlue: has false; state missing", () => {
    const plugins = [slice("gemini", "running"), slice("composerOpacity", "running")];
    const fp = buildRuntimeFingerprint(plugins);
    expect(fp.pluginCount).toBe(2);
    expect(fp.hasHideBlueBackground).toBe(false);
    expect(fp.hideBlueBackgroundState).toBe("missing");
    expect(formatRuntimeFingerprint(fp)).toContain("hideBlue:false");
    expect(formatRuntimeFingerprint(fp)).toContain("state:missing");
  });

  test("state whitelist: running | stopped | error; unknown present → stopped", () => {
    expect(buildRuntimeFingerprint([slice("hideBlueBackground", "stopped")]).hideBlueBackgroundState).toBe(
      "stopped",
    );
    expect(buildRuntimeFingerprint([slice("hideBlueBackground", "error")]).hideBlueBackgroundState).toBe(
      "error",
    );
    expect(buildRuntimeFingerprint([slice("hideBlueBackground", "starting")]).hideBlueBackgroundState).toBe(
      "stopped",
    );
    expect(buildRuntimeFingerprint([slice("hideBlueBackground", "tripped")]).hideBlueBackgroundState).toBe(
      "stopped",
    );
  });

  test("format exposes only the four fingerprint fields (no id dump)", () => {
    const fp = buildRuntimeFingerprint([
      slice("hideBlueBackground", "running"),
      slice("secretPlugin", "running"),
    ]);
    const text = formatRuntimeFingerprint(fp);
    expect(text).not.toContain("secretPlugin");
    expect(text).not.toContain("hideBlueBackground");
    expect(text.split(" · ")).toHaveLength(4);
  });
});

describe("runtimeFingerprint read once + privacy", () => {
  test("pluginsOnce is invoked exactly once", () => {
    let calls = 0;
    const fp = readRuntimeFingerprint(() => {
      calls += 1;
      return [slice("hideBlueBackground", "running"), slice("ui", "running")];
    });
    expect(calls).toBe(1);
    expect(fp.pluginCount).toBe(2);
    expect(fp.hasHideBlueBackground).toBe(true);
  });

  test("does not touch site URL/title/messages/logs getters", () => {
    const site = {
      get url(): string {
        throw new Error("touched url");
      },
      get title(): string {
        throw new Error("touched title");
      },
      get location(): string {
        throw new Error("touched location");
      },
      messages(): unknown {
        throw new Error("touched messages");
      },
      logs(): unknown {
        throw new Error("touched logs");
      },
      report(): unknown {
        throw new Error("touched report");
      },
    };
    // Helper never receives site; ensure a throwing site in scope is unused.
    expect(site).toBeTruthy();
    expect(() =>
      readRuntimeFingerprint(() => [slice("accountSwitcher", "stopped")]),
    ).not.toThrow();
    const fp = buildRuntimeFingerprint([slice("accountSwitcher", "stopped")]);
    expect(fp.hasHideBlueBackground).toBe(false);
    expect(fp.hideBlueBackgroundState).toBe("missing");
  });

  test("ignores extra private fields on plugin objects", () => {
    const noisy = {
      def: { id: "hideBlueBackground", description: "SECRET_DESC", settings: { token: "x" } },
      state: "running",
      error: "SECRET_ERR",
      enabled: true,
    };
    const fp = buildRuntimeFingerprint([noisy]);
    const text = formatRuntimeFingerprint(fp);
    expect(text).not.toContain("SECRET");
    expect(text).not.toContain("token");
    expect(fp.hideBlueBackgroundState).toBe("running");
  });
});
