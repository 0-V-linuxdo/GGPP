/**
 * Shared GG++ runtime on top of Userscript++: event bus, services, and a
 * Kernel-shaped facade so settings/diagnostics keep working.
 */
import type { PluginContext, PluginDef, SettingsSchema } from "../../src/kernel/types";
import { createLogger } from "../../src/kernel/logger";

export type UsppLike = any;

let Uref: UsppLike | null = null;
let facade: KernelFacade | null = null;

const services = new Map<string, { api: unknown; owner: string }>();
const listeners = new Map<string, Set<(p: any) => void>>();

/** GG++ PluginDef.settings schemas, keyed by plugin id (USPP plugin name). */
const ggSchemas = new Map<string, SettingsSchema>();

/** Register original GG++ settings schema so KernelFacade can keep type:"list". */
export function registerGgSchema(def: PluginDef<any>) {
  if (def?.id && def.settings) ggSchemas.set(def.id, def.settings as SettingsSchema);
}

/** USPP stores list settings as newline strings; GG++ plugins expect string[]. */
export function coerceListSetting(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v ?? ""));
  if (value == null) return [];
  if (typeof value === "string") {
    if (!value) return [];
    return value.split(/\r?\n/).map((s) => s);
  }
  return [String(value)];
}

/** Persist a list setting the way convertSettings(USPP STRING) expects. */
export function serializeListSetting(value: unknown): string {
  if (Array.isArray(value)) return value.map((v) => String(v ?? "")).join("\n");
  if (value == null) return "";
  return String(value);
}

function isListKey(pluginId: string, key: string, defSettings?: SettingsSchema): boolean {
  const schema = defSettings ?? ggSchemas.get(pluginId);
  return schema?.[key]?.type === "list";
}

/**
 * Wait until document.body exists. USPP StartAt.Init can run while readyState is
 * still "loading" (before DOMContentLoaded), so required UI must not assume body.
 */
export function whenDocumentBody(fn: (body: HTMLElement) => void | (() => void)): () => void {
  let clean: void | (() => void);
  let cancelled = false;
  const run = (body: HTMLElement) => {
    if (cancelled) return;
    try {
      clean = fn(body);
    } catch (e) {
      console.error("[GG++] whenDocumentBody callback failed", e);
    }
  };
  if (document.body) {
    run(document.body);
    return () => {
      cancelled = true;
      if (typeof clean === "function") clean();
    };
  }
  const onReady = () => {
    document.removeEventListener("DOMContentLoaded", onReady);
    if (document.body) run(document.body);
  };
  document.addEventListener("DOMContentLoaded", onReady);
  return () => {
    cancelled = true;
    document.removeEventListener("DOMContentLoaded", onReady);
    if (typeof clean === "function") clean();
  };
}

export function bindApi(U: UsppLike) {
  if (Uref === U) return;
  Uref = U;
  facade = new KernelFacade(U);
  services.set("kernel", { api: facade, owner: "kernel" });
}

export function getU(): UsppLike {
  if (!Uref) throw new Error("GG++ runtime: U not bound yet");
  return Uref;
}

export function getKernelFacade(): KernelFacade | null {
  return facade;
}

function emit(event: string, payload: unknown) {
  for (const fn of listeners.get(event) ?? []) {
    try {
      fn(payload);
    } catch (e) {
      console.error("[GG++] listener failed", event, e);
    }
  }
}

function on(event: string, fn: (p: any) => void) {
  let set = listeners.get(event);
  if (!set) listeners.set(event, (set = new Set()));
  set.add(fn);
  return () => set!.delete(fn);
}

export interface PluginInfo {
  def: PluginDef;
  state: "stopped" | "running" | "error";
  enabled: boolean;
  implicit: boolean;
  error?: string;
  neededBy: string[];
}

export class KernelFacade {
  constructor(readonly U: UsppLike) {}

  get version(): string {
    return String(this.U.scriptVersion ?? this.U.version ?? "0.0.0");
  }

  private ggDef(p: any): PluginDef {
    const name = p.name;
    const schema = ggSchemas.get(name);
    return {
      id: name,
      name: p.ggDisplayName || p.name,
      description: p.description || "",
      tags: p.ggTags || p.tags || [],
      authors: p.authors,
      icon: p.ggIcon,
      enabledByDefault: p.enabledByDefault,
      required: p.required,
      hidden: p.hidden,
      requiresRestart: p.requiresRestart,
      dependencies: p.dependencies,
      settings: p.settings?.def
        ? Object.fromEntries(
            Object.entries(p.settings.def).map(([k, s]: [string, any]) => {
              const ggType = schema?.[k]?.type;
              const isList = ggType === "list" || !!(s as any).ggList;
              let type: string =
                s.type === this.U.OptionType.BOOLEAN
                  ? "boolean"
                  : s.type === this.U.OptionType.NUMBER || s.type === this.U.OptionType.SLIDER
                    ? "number"
                    : s.type === this.U.OptionType.SELECT
                      ? "select"
                      : "string";
              if (isList) type = "list";
              const defVal = isList
                ? coerceListSetting(schema?.[k]?.default ?? s.default)
                : s.default;
              return [
                k,
                {
                  type,
                  label: (schema?.[k] as any)?.label || s.description || k,
                  description: s.description,
                  default: defVal,
                  min: s.min,
                  max: s.max,
                  step: s.step,
                  slider: s.type === this.U.OptionType.SLIDER,
                  unit: s.units,
                  options: s.options,
                  restartNeeded: s.restartNeeded,
                  placeholder: (s as any).placeholder ?? (schema?.[k] as any)?.placeholder,
                  multiline: !!(s as any).multiline,
                },
              ];
            }),
          )
        : schema
          ? { ...schema }
          : undefined,
      liveSettings: !!p.ggLiveSettings,
      start: () => {},
    } as PluginDef;
  }

  plugins(): PluginInfo[] {
    const all = Object.values(this.U.plugins || {}) as any[];
    return all
      .filter((p) => p && p.name && p.name !== "Settings")
      .map((p) => {
        const phase = this.U.pluginPhase?.(p.name) ?? (p.started ? "running" : "idle");
        const neededBy = all
          .filter((o) => Array.isArray(o.dependencies) && o.dependencies.includes(p.name) && this.U.isPluginEnabled?.(o.name))
          .map((o) => o.name);
        return {
          def: this.ggDef(p),
          state: phase === "running" || phase === "starting" ? "running" : phase === "failed" || phase === "tripped" ? "error" : "stopped",
          enabled: !!this.U.isPluginEnabled?.(p.name),
          implicit: false,
          error: p.startError ? String(p.startError?.message || p.startError) : undefined,
          neededBy,
        };
      });
  }

  plugin(id: string) {
    return this.plugins().find((p) => p.def.id === id);
  }

  isEnabled(id: string) {
    return !!this.U.isPluginEnabled?.(id);
  }

  isRunning(id: string) {
    const phase = this.U.pluginPhase?.(id);
    return phase === "running" || phase === "starting";
  }

  values(id: string): Record<string, unknown> {
    const p = this.U.plugins?.[id];
    const store = p?.settings?.store;
    if (!store || typeof store !== "object") return {};
    const out: Record<string, unknown> = { ...store };
    const schema = ggSchemas.get(id);
    if (schema) {
      for (const [k, s] of Object.entries(schema)) {
        if (s.type === "list") out[k] = coerceListSetting(out[k]);
      }
    } else if (p?.settings?.def) {
      for (const [k, s] of Object.entries(p.settings.def) as [string, any][]) {
        if (s?.ggList) out[k] = coerceListSetting(out[k]);
      }
    }
    return out;
  }

  setEnabled(id: string, enabled: boolean) {
    this.U.setPluginEnabled?.(id, enabled);
    emit("kernel:changed", id);
    return Promise.resolve();
  }

  setSetting(id: string, key: string, value: unknown) {
    const p = this.U.plugins?.[id];
    if (p?.settings?.store) {
      const write = isListKey(id, key) || !!(p.settings.def?.[key] as any)?.ggList
        ? serializeListSetting(value)
        : value;
      p.settings.store[key] = write;
    }
    emit(`settings:${id}`, this.values(id));
    emit("kernel:changed", id);
  }

  resetSettings(id: string) {
    const p = this.U.plugins?.[id];
    const def = p?.settings?.def;
    if (p?.settings?.store && def) {
      for (const [k, s] of Object.entries(def) as [string, any][]) {
        const d =
          s.type === this.U.OptionType.SELECT ? s.options?.find((o: any) => o.default)?.value : s.default;
        p.settings.store[k] = d;
      }
    }
    emit(`settings:${id}`, this.values(id));
    emit("kernel:changed", id);
  }

  service<T>(name: string): T | undefined {
    return services.get(name)?.api as T | undefined;
  }

  on(event: string, fn: (p: any) => void) {
    return on(event, fn);
  }

  emit(event: string, payload?: unknown) {
    emit(event, payload);
  }
}

export function createGgContext(
  U: UsppLike,
  usppCtx: any,
  def: PluginDef<any>,
  settings: any,
): PluginContext {
  const log = createLogger(def.id);
  const store = settings?.store;
  registerGgSchema(def);

  const readSetting = (prop: string) => {
    const raw = store ? store[prop] : def.settings?.[prop]?.default;
    if (def.settings?.[prop]?.type === "list") return coerceListSetting(raw);
    return raw;
  };

  const writeSetting = (prop: string, value: unknown) => {
    const v = def.settings?.[prop]?.type === "list" ? serializeListSetting(value) : value;
    if (store) store[prop] = v;
  };

  const settingsProxy = new Proxy({} as Record<string, unknown>, {
    get(_t, prop: string) {
      return readSetting(prop);
    },
    set(_t, prop: string, value) {
      writeSetting(prop, value);
      return true;
    },
    ownKeys() {
      return Reflect.ownKeys(store ?? def.settings ?? {});
    },
    getOwnPropertyDescriptor(_t, prop) {
      return { configurable: true, enumerable: true, value: readSetting(prop as string) };
    },
  });

  const ctx: PluginContext = {
    id: def.id,
    settings: settingsProxy as any,
    setSetting(key, value) {
      if (store) writeSetting(key, value);
      else getKernelFacade()?.setSetting(def.id, key, value);
    },
    signal: usppCtx.signal,
    cleanup(fn) {
      usppCtx.register(fn);
    },
    css(text: string) {
      const el = document.createElement("style");
      el.setAttribute("data-ggpp-style", def.id);
      el.textContent = text;
      (document.documentElement || document.head).appendChild(el);
      usppCtx.register(() => el.remove());
      return el;
    },
    use<T = any>(service: string): T {
      const api = services.get(service)?.api;
      if (api === undefined) throw new Error(`Service "${service}" is not available`);
      return api as T;
    },
    tryUse<T = any>(service: string): T | undefined {
      return services.get(service)?.api as T | undefined;
    },
    provide(service: string, api: unknown) {
      services.set(service, { api, owner: def.id });
      usppCtx.register(() => {
        const cur = services.get(service);
        if (cur?.owner === def.id) services.delete(service);
      });
    },
    on(event: string, fn: (payload: any) => void) {
      const off = on(event, fn);
      usppCtx.register(off);
    },
    emit(event: string, payload?: unknown) {
      emit(event, payload);
    },
    data: {
      async get<T>(key: string, fallback: T): Promise<T> {
        try {
          const v = await usppCtx.data.get(key);
          return (v === undefined || v === null ? fallback : v) as T;
        } catch {
          return fallback;
        }
      },
      async set(key: string, value: unknown) {
        await usppCtx.data.set(key, value);
        // Match old Kernel storage.onExternalChange → "data:changed" so plugins
        // (UsageDisplay cross-tab sync, settingsFlyout menuPlugins, …) still work.
        emit("data:changed", { key: `${def.id}:${key}`, value });
      },
      global: {
        async get<T>(key: string, fallback: T): Promise<T> {
          try {
            const g = usppCtx.data?.global;
            if (!g?.get) return fallback;
            const v = await g.get(key, fallback);
            return (v === undefined || v === null ? fallback : v) as T;
          } catch {
            return fallback;
          }
        },
        async set(key: string, value: unknown) {
          const g = usppCtx.data?.global;
          if (g?.set) await g.set(key, value);
          emit("data:changed", { key: `${def.id}:${key}`, value });
        },
      },
    },
    setInterval(fn, ms) {
      usppCtx.setInterval(fn, ms);
    },
    setTimeout(fn, ms) {
      usppCtx.setTimeout(fn, ms);
    },
    log,
  };
  return ctx;
}
