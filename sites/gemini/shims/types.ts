/**
 * GG++ plugin types on Userscript++.
 * Plugins keep `export default definePlugin({...})`; this returns the factory
 * `U => U.definePlugin(adapted)`.
 */
import type {
  PluginContext,
  PluginDef as GgPluginDef,
  SettingsSchema,
  Tag,
} from "../../../src/kernel/types";
import { bindApi, createGgContext, getKernelFacade, registerGgSchema, type UsppLike } from "../runtime";

export type {
  PluginContext,
  SettingsSchema,
  SettingDef,
  Tag,
  Logger,
  StorageBackend,
  PluginState,
  PluginDef,
} from "../../../src/kernel/types";

/** Fixed order of category tabs in the plugin browser (copied to avoid resolve cycles). */
export const TAGS: Tag[] = [
  "Composer",
  "Messages",
  "Chats",
  "Media",
  "Navigation",
  "Notifications",
  "Appearance",
  "Declutter",
  "Privacy",
  "Developer",
];

function convertSettings(U: UsppLike, schema: SettingsSchema | undefined) {
  if (!schema || !Object.keys(schema).length) return undefined;
  const def: Record<string, any> = {};
  for (const [key, s] of Object.entries(schema)) {
    const base: Record<string, any> = {
      description: (s as any).description || (s as any).label || key,
      default: (s as any).default,
    };
    if ((s as any).restartNeeded) base.restartNeeded = true;
    if ((s as any).showIf) {
      base.disabled = (cfg: Record<string, unknown>) => !(s as any).showIf(cfg);
    }
    switch ((s as any).type) {
      case "boolean":
        base.type = U.OptionType.BOOLEAN;
        break;
      case "number":
        base.type = (s as any).slider ? U.OptionType.SLIDER : U.OptionType.NUMBER;
        if ((s as any).min != null) base.min = (s as any).min;
        if ((s as any).max != null) base.max = (s as any).max;
        if ((s as any).step != null) base.step = (s as any).step;
        if ((s as any).unit) base.units = (s as any).unit;
        break;
      case "select":
        base.type = U.OptionType.SELECT;
        base.options = ((s as any).options || []).map((o: any) => ({
          label: o.label,
          value: o.value,
          default: o.value === (s as any).default,
        }));
        break;
      case "list":
        // USPP has no LIST option; store as multiline STRING. ggList marks it for KernelFacade.
        base.type = U.OptionType.STRING;
        base.multiline = true;
        base.ggList = true;
        if ((s as any).placeholder) base.placeholder = (s as any).placeholder;
        base.default = Array.isArray((s as any).default) ? (s as any).default.join("\n") : (s as any).default;
        break;
      case "string":
      default:
        base.type = U.OptionType.STRING;
        if ((s as any).placeholder) base.placeholder = (s as any).placeholder;
        if ((s as any).multiline) base.multiline = true;
        break;
    }
    def[key] = base;
  }
  return U.definePluginSettings(def);
}

function updatedAt(updated?: string): number | undefined {
  if (!updated) return undefined;
  const t = Date.parse(updated.length === 10 ? `${updated}T00:00:00Z` : updated);
  return Number.isFinite(t) ? t : undefined;
}

/** Convert a GG++ PluginDef into a Userscript++ plugin factory. */
export function definePlugin<S extends SettingsSchema>(def: GgPluginDef<S>) {
  return (U: UsppLike) => {
    bindApi(U);
    registerGgSchema(def);
    const settings = convertSettings(U, def.settings as SettingsSchema | undefined);
    const startAt =
      def.required || def.id === "gemini" || def.id === "ui" || def.id === "menus" || def.id === "chatBar" || def.id === "settings"
        ? U.StartAt.Init
        : U.StartAt.SiteReady;

    return U.definePlugin({
      name: def.id,
      description: def.description,
      authors: def.authors?.length ? def.authors : ["GG++"],
      tags: def.tags?.length ? def.tags : undefined,
      enabledByDefault: def.enabledByDefault ?? false,
      required: def.required,
      hidden: def.hidden,
      requiresRestart: def.requiresRestart,
      dependencies: def.dependencies,
      startAt,
      settings,
      updatedAt: updatedAt(def.updated),
      ggDisplayName: def.name,
      ggIcon: def.icon,
      ggLiveSettings: !!def.liveSettings,
      ggTags: def.tags ?? [],
      onSettingsChange: def.liveSettings
        ? () => {
            getKernelFacade()?.emit(`settings:${def.id}`, getKernelFacade()!.values(def.id));
            getKernelFacade()?.emit("kernel:changed", def.id);
          }
        : undefined,
      start(usppCtx: any) {
        const ctx = createGgContext(U, usppCtx, def, settings) as PluginContext<S>;
        return def.start(ctx);
      },
      stop(usppCtx: any) {
        const ctx = createGgContext(U, usppCtx, def, settings) as PluginContext<S>;
        def.stop?.(ctx);
      },
    });
  };
}

export const StartAt = {
  Init: "Init",
  DOMContentLoaded: "DOMContentLoaded",
  SiteReady: "SiteReady",
} as const;
