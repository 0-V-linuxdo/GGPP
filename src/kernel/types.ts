export type Tag =
  | "Composer"
  | "Messages"
  | "Chats"
  | "Media"
  | "Navigation"
  | "Notifications"
  | "Appearance"
  | "Declutter"
  | "Privacy"
  | "Developer";

/** Fixed order of category tabs in the plugin browser. */
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

interface SettingBase<T> {
  label: string;
  description?: string;
  default: T;
  /** Changing it only takes full effect after a page reload. */
  restartNeeded?: boolean;
  /** Hide this field unless the predicate returns true for the current values. */
  showIf?: (values: Record<string, unknown>) => boolean;
}

export interface BooleanSetting extends SettingBase<boolean> {
  type: "boolean";
}

export interface NumberSetting extends SettingBase<number> {
  type: "number";
  min?: number;
  max?: number;
  step?: number;
  slider?: boolean;
  unit?: string;
}

export interface SelectSetting extends SettingBase<string> {
  type: "select";
  options: { value: string; label: string }[];
}

export interface StringSetting extends SettingBase<string> {
  type: "string";
  placeholder?: string;
  multiline?: boolean;
}

export interface ColorSetting extends SettingBase<string> {
  type: "color";
}

export interface ListSetting extends SettingBase<string[]> {
  type: "list";
  placeholder?: string;
}

export type SettingDef =
  | BooleanSetting
  | NumberSetting
  | SelectSetting
  | StringSetting
  | ColorSetting
  | ListSetting;

export type SettingsSchema = Record<string, SettingDef>;

export type SettingValues<S extends SettingsSchema> = {
  // Widened, so `default: false` still allows setting true.
  [K in keyof S]: S[K] extends BooleanSetting ? boolean : S[K] extends NumberSetting ? number : S[K] extends ListSetting ? string[] : string;
};

export interface PluginContext<S extends SettingsSchema = SettingsSchema> {
  readonly id: string;
  /** Current values; always fresh. */
  readonly settings: SettingValues<S>;
  setSetting<K extends keyof S & string>(key: K, value: SettingValues<S>[K]): void;
  /** Abort signal that fires when the plugin stops. Pass to addEventListener. */
  readonly signal: AbortSignal;
  /** Register a function to run when the plugin stops. */
  cleanup(fn: () => void): void;
  /** Inject a stylesheet that is removed when the plugin stops. */
  css(text: string): HTMLStyleElement;
  /** Get another plugin's service. Throws if absent. */
  use<T = any>(service: string): T;
  /** Optional variant of use(). */
  tryUse<T = any>(service: string): T | undefined;
  /** Expose a service for other plugins; withdrawn when the plugin stops. */
  provide(service: string, api: unknown): void;
  on(event: string, fn: (payload: any) => void): void;
  emit(event: string, payload?: unknown): void;
  /** Persistent per-plugin data (survives reloads, separate from settings). */
  data: {
    get<T>(key: string, fallback: T): Promise<T>;
    set(key: string, value: unknown): Promise<void>;
    /** Optional USPP-style global store (shared across plugins). */
    global?: {
      get<T>(key: string, fallback: T): Promise<T>;
      set(key: string, value: unknown): Promise<void>;
    };
  };
  setInterval(fn: () => void, ms: number): void;
  setTimeout(fn: () => void, ms: number): void;
  log: Logger;
}

export interface Logger {
  info(...a: unknown[]): void;
  warn(...a: unknown[]): void;
  error(...a: unknown[]): void;
  debug(...a: unknown[]): void;
}

export interface PluginDef<S extends SettingsSchema = SettingsSchema> {
  id: string;
  name: string;
  description: string;
  tags: Tag[];
  authors?: string[];
  /** Icon as one or more SVG path strings on a 24x24 grid (stroke style). */
  icon?: string[];
  enabledByDefault?: boolean;
  /** Cannot be turned off. */
  required?: boolean;
  /** Not listed in the plugin browser. */
  hidden?: boolean;
  /** Turning it on or off only takes full effect after a page reload. */
  requiresRestart?: boolean;
  /** Plugin ids that must be running before this one starts. */
  dependencies?: string[];
  settings?: S;
  /** When true the plugin reacts to setting changes itself; otherwise it is restarted. */
  liveSettings?: boolean;
  /** Date (YYYY-MM-DD) of the last behavioral change; drives the "Recent" filter. */
  updated?: string;
  start(ctx: PluginContext<S>): void | Promise<void>;
  stop?(ctx: PluginContext<S>): void;
}

export function definePlugin<S extends SettingsSchema>(def: PluginDef<S>): PluginDef<S> {
  return def;
}

export interface StorageBackend {
  get<T>(key: string): Promise<T | undefined>;
  set(key: string, value: unknown): Promise<void>;
  remove(key: string): Promise<void>;
  onExternalChange?(fn: (key: string, value: unknown) => void): void;
}

export type PluginState = "stopped" | "running" | "error";
