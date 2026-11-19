/**
 * Independent regression tests for Userscript++ migration startup adapt:
 * - list settings stored as newline STRING but GG++ plugins expect string[]
 * - save array → persist string → read back array
 * - StartAt.Init may run before document.body exists (and the ready path)
 * - whenDocumentBody cancel/destroy before and after mount
 *
 * Does not build dist/userscript or touch acceptance evidence / other-thread files.
 */
import { expect, test, describe } from "bun:test";
import {
  coerceListSetting,
  serializeListSetting,
  whenDocumentBody,
  registerGgSchema,
  createGgContext,
  bindApi,
  getKernelFacade,
} from "./runtime";

describe("coerceListSetting / serializeListSetting", () => {
  test("empty string (USPP default for []) becomes [] — old bug: ''.map throws", () => {
    const raw = ""; // convertSettings joins [] → ""
    expect(() => (raw as any).map((x: string) => x)).toThrow();
    expect(coerceListSetting(raw)).toEqual([]);
    expect(coerceListSetting(raw).map((p) => p.trim()).filter(Boolean)).toEqual([]);
  });

  test("newline-joined default phrases become string[]", () => {
    const raw = ["Stay hungry, stay foolish.", "The best way to predict the future is to invent it."].join("\n");
    expect(coerceListSetting(raw)).toEqual([
      "Stay hungry, stay foolish.",
      "The best way to predict the future is to invent it.",
    ]);
  });

  test("arrays pass through (legacy migrate may write arrays)", () => {
    expect(coerceListSetting(["a", "b"])).toEqual(["a", "b"]);
  });

  test("null/undefined → []", () => {
    expect(coerceListSetting(null)).toEqual([]);
    expect(coerceListSetting(undefined)).toEqual([]);
  });

  test("serializeListSetting round-trips arrays to newline strings", () => {
    expect(serializeListSetting(["x", "y"])).toBe("x\ny");
    expect(serializeListSetting([])).toBe("");
    expect(serializeListSetting("already")).toBe("already");
  });

  test("skillBlocker empty blocked default path does not throw", () => {
    const blocked = coerceListSetting(""); // enabledByDefault plugin with default []
    const names = new Set(blocked.map((n) => n.trim().toLowerCase()).filter(Boolean));
    expect(names.size).toBe(0);
  });

  test("CRLF and trailing newline edges", () => {
    expect(coerceListSetting("a\r\nb\r\n")).toEqual(["a", "b", ""]);
    expect(coerceListSetting("solo\n")).toEqual(["solo", ""]);
    // non-string/non-array → single-element string[]
    expect(coerceListSetting(42)).toEqual(["42"]);
    expect(serializeListSetting(null)).toBe("");
    expect(serializeListSetting(undefined)).toBe("");
  });

  test("save array then read back as array (persist string in store)", () => {
    const stored = serializeListSetting(["alpha", "beta"]);
    expect(stored).toBe("alpha\nbeta");
    expect(typeof stored).toBe("string");
    expect(coerceListSetting(stored)).toEqual(["alpha", "beta"]);
    // empty list persists as "" and reads as []
    expect(coerceListSetting(serializeListSetting([]))).toEqual([]);
  });
});

describe("whenDocumentBody", () => {
  test("runs immediately when body already exists", () => {
    if (typeof document === "undefined") return;
    if (!document.body) {
      const b = document.createElement("body");
      document.documentElement.appendChild(b);
    }
    let seen: HTMLElement | null = null;
    const off = whenDocumentBody((body) => {
      seen = body;
    });
    expect(seen as HTMLElement | null).toBe(document.body as HTMLElement | null);
    off();
  });

  test("defers until DOMContentLoaded when body is missing (Init race)", () => {
    if (typeof document === "undefined" || typeof Event === "undefined") return;
    const original = document.body;
    if (!original) return;
    let expose = false;
    const desc = Object.getOwnPropertyDescriptor(document, "body");
    Object.defineProperty(document, "body", {
      configurable: true,
      enumerable: true,
      get() {
        return expose ? original : null;
      },
    });

    let mounted = false;
    const off = whenDocumentBody((_body) => {
      mounted = true;
    });
    expect(mounted).toBe(false);

    expose = true;
    document.dispatchEvent(new Event("DOMContentLoaded"));
    expect(mounted).toBe(true);
    off();

    if (desc) Object.defineProperty(document, "body", desc);
    else {
      Object.defineProperty(document, "body", {
        configurable: true,
        enumerable: true,
        get: () => original,
      });
    }
  });

  test("cancel before body arrives never mounts (destroy path)", () => {
    if (typeof document === "undefined" || typeof Event === "undefined") return;
    const original = document.body;
    if (!original) return;
    let expose = false;
    const desc = Object.getOwnPropertyDescriptor(document, "body");
    Object.defineProperty(document, "body", {
      configurable: true,
      enumerable: true,
      get() {
        return expose ? original : null;
      },
    });

    let mounted = false;
    const off = whenDocumentBody(() => {
      mounted = true;
    });
    off(); // simulate plugin stop / ctx.cleanup before DOMContentLoaded
    expose = true;
    document.dispatchEvent(new Event("DOMContentLoaded"));
    expect(mounted).toBe(false);

    if (desc) Object.defineProperty(document, "body", desc);
    else {
      Object.defineProperty(document, "body", {
        configurable: true,
        enumerable: true,
        get: () => original,
      });
    }
  });

  test("cancel after mount runs inner cleanup (mo/root destroy)", () => {
    if (typeof document === "undefined") return;
    if (!document.body) {
      document.documentElement.appendChild(document.createElement("body"));
    }
    let cleaned = false;
    const off = whenDocumentBody((_body) => {
      return () => {
        cleaned = true;
      };
    });
    expect(cleaned).toBe(false);
    off();
    expect(cleaned).toBe(true);
  });
});

describe("createGgContext list proxy", () => {
  test("settings.phrases reads USPP string store as string[]", () => {
    const store = { phrases: "one\ntwo\n" };
    const settings = { store, def: { phrases: { type: 0, ggList: true, default: "one\ntwo\n" } } };
    const U: any = {
      OptionType: { BOOLEAN: 3, NUMBER: 1, SELECT: 4, SLIDER: 5, STRING: 0 },
      plugins: {
        customGreeting: {
          name: "customGreeting",
          settings,
          started: true,
          ggDisplayName: "CustomGreeting",
          ggLiveSettings: false,
        },
      },
      version: "0.2.0",
      isPluginEnabled: () => true,
      pluginPhase: () => "running",
    };
    bindApi(U);
    const def = {
      id: "customGreeting",
      name: "CustomGreeting",
      description: "",
      settings: {
        phrases: {
          type: "list" as const,
          label: "Phrases",
          default: ["one", "two"],
        },
      },
      start() {},
    };
    registerGgSchema(def as any);
    const usppCtx = {
      signal: typeof AbortController !== "undefined" ? new AbortController().signal : ({} as AbortSignal),
      register: (_fn: () => void) => {},
      data: { get: async () => undefined, set: async () => {} },
      setInterval() {},
      setTimeout() {},
    };
    const ctx = createGgContext(U, usppCtx, def as any, settings);
    const phrases = ctx.settings.phrases as unknown as string[];
    expect(Array.isArray(phrases)).toBe(true);
    expect(phrases).toEqual(["one", "two", ""]);
    ctx.setSetting("phrases", ["a", "b"] as any);
    expect(store.phrases).toBe("a\nb");

    const facade = getKernelFacade()!;
    expect(facade.values("customGreeting").phrases as string[]).toEqual(["a", "b"]);
    const again = facade.plugin("customGreeting");
    expect(again?.def.settings?.phrases?.type).toBe("list");
  });

  test("KernelFacade setSetting then values round-trip list persistence", () => {
    const store: Record<string, unknown> = { blocked: "" };
    const settings = { store, def: { blocked: { type: 0, ggList: true, default: "" } } };
    const U: any = {
      OptionType: { BOOLEAN: 3, NUMBER: 1, SELECT: 4, SLIDER: 5, STRING: 0 },
      plugins: {
        skillBlocker: { name: "skillBlocker", settings, started: true, ggDisplayName: "SkillBlocker" },
      },
      version: "0.2.0",
      isPluginEnabled: () => true,
      pluginPhase: () => "running",
    };
    bindApi(U);
    registerGgSchema({
      id: "skillBlocker",
      name: "SkillBlocker",
      description: "",
      settings: { blocked: { type: "list", label: "Names", default: [] as string[] } },
      start() {},
    } as any);
    const facade = getKernelFacade()!;
    facade.setSetting("skillBlocker", "blocked", ["GemA", "GemB"]);
    expect(store.blocked).toBe("GemA\nGemB");
    expect(facade.values("skillBlocker").blocked).toEqual(["GemA", "GemB"]);
    // legacy migrate may leave an array in store — values still coerces
    store.blocked = ["legacy", "array"];
    expect(facade.values("skillBlocker").blocked).toEqual(["legacy", "array"]);
  });
});
