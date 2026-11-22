import { definePlugin } from "../../shims/types";
import { h, icon } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import type { MenusApi } from "../menus";
import type { SettingsUiApi } from "../settings";
import type { MenuEntry, UiApi } from "../ui";

/**
 * Turns the GG++ entry in Gemini's Settings menu into a flyout: open settings, jump straight to a
 * settings tab, or open one plugin's settings. Gemini's own settings pages are already listed in
 * that menu, so they are not repeated here.
 */

export default definePlugin({
  id: "settingsFlyout",
  name: "SettingsFlyout",
  description: "Hover GG++ in Gemini's Settings menu for shortcuts to each settings tab and to chosen plugins' settings.",
  tags: ["Navigation"],
  icon: I.settings,
  enabledByDefault: true,
  updated: "2026-10-21",
  dependencies: ["settings", "menus", "ui"],
  liveSettings: true,
  settings: {
    showOpenSettings: { type: "boolean", label: "Open Settings", description: "Show an item that opens GG++ settings on the last tab you used.", default: true },
    tabShortcuts: { type: "boolean", label: "Tab shortcuts", description: "Show one item per settings tab (Plugins, Themes, Quick CSS…).", default: true },
    pluginShortcuts: { type: "boolean", label: "Plugin settings", description: "Show a submenu that opens a plugin's settings directly. Pick the plugins below.", default: true },
  },
  async start(ctx) {
    let settingsUI = ctx.tryUse<SettingsUiApi>("settingsUI");
    while (!settingsUI || typeof settingsUI.open !== "function") {
      if (ctx.signal.aborted) throw new Error('Service "settingsUI" is not available');
      await new Promise<void>((resolve) => ctx.setTimeout(resolve, 0));
      settingsUI = ctx.tryUse<SettingsUiApi>("settingsUI");
    }
    const ui = ctx.use<UiApi>("ui");
    /** Explicit choices; a plugin not listed is shown when it has settings. */
    let chosen = await ctx.data.get<Record<string, boolean>>("menuPlugins", {});
    const inMenu = () => settingsUI.configurable().filter((p) => chosen[p.def.id] ?? true);

    function entries(): MenuEntry[] {
      const s = ctx.settings;
      const tabs: MenuEntry[] = s.tabShortcuts ? settingsUI.tabs().map((t) => ({ label: t.label, icon: t.icon, onClick: () => settingsUI.open(t.id) })) : [];
      const plugins = s.pluginShortcuts ? inMenu() : [];
      const out: MenuEntry[] = [];
      // Never leave the flyout empty.
      if (s.showOpenSettings || (!tabs.length && !plugins.length)) out.push({ label: "Open Settings", icon: I.settings, onClick: () => settingsUI.open() });
      if (tabs.length) {
        if (out.length) out.push({ separator: true });
        out.push(...tabs);
      }
      if (plugins.length) {
        if (out.length) out.push({ separator: true });
        out.push({
          label: "Plugin settings",
          icon: I.puzzle,
          submenu: () => inMenu().map((p) => ({ label: p.def.name, icon: p.def.icon ?? I.puzzle, onClick: () => settingsUI.open("plugins", p.def.id) })),
        });
      }
      return out;
    }

    ctx.provide("settingsFlyout", { entries });
    ctx.cleanup(
      ctx.use<MenusApi>("menus").register({
        id: "ggpp-settings-flyout",
        location: "settings",
        label: "GG++",
        icon: I.ggpp,
        order: -100,
        submenu: entries,
        onSelect: () => settingsUI.open(),
      }),
    );

    // Which plugins the "Plugin settings" submenu lists.
    ctx.provide("panel:settingsFlyout", (el: HTMLElement) => {
      el.replaceChildren(
        h("div", { class: "ggpp-section-label" }, "Plugins in the menu"),
        ...settingsUI.configurable().map((p) =>
          h(
            "div",
            { class: "ggpp-field ggpp-field-inline" },
            h("div", { class: "ggpp-field-head" }, h("div", { class: "ggpp-field-label" }, icon(p.def.icon ?? I.puzzle, 16), " ", p.def.name)),
            ui.switch(chosen[p.def.id] ?? true, (on) => {
              chosen = { ...chosen, [p.def.id]: on };
              void ctx.data.set("menuPlugins", chosen);
            }),
          ),
        ),
      );
    });
    ctx.on("data:changed", ({ key, value }: { key: string; value: Record<string, boolean> }) => {
      if (key === "settingsFlyout:menuPlugins" && value && typeof value === "object") chosen = value;
    });
  },
});
