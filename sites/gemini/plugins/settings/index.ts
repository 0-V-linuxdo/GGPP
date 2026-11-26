import type { Kernel, PluginInfo } from "../../shims/kernel";
import { definePlugin, TAGS, type Tag } from "../../shims/types";
import { h, icon, isEditable } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import type { GeminiApi } from "../gemini";
import type { MenusApi } from "../menus";
import type { UiApi } from "../ui";
import { placeSidenavSettingsEntry } from "./placeSidenavSettingsEntry";
import { settingField } from "./fields";
import {
  formatRuntimeFingerprint,
  readRuntimeFingerprint,
} from "./runtimeFingerprint";
import css from "./settings.css";

/**
 * The settings screen. It is a plugin like any other: it reads the plugin
 * list from the kernel service, and other plugins add their own tabs
 * (Themes, Quick CSS, ...) through the "settingsUI" service.
 */

export interface SettingsTab {
  id: string;
  label: string;
  icon: string[];
  order?: number;
  hint?: string;
  render(container: HTMLElement, signal: AbortSignal): void;
}

export interface SettingsUiApi {
  open(tab?: string, pluginId?: string): void;
  close(): void;
  registerTab(tab: SettingsTab): () => void;
  openPluginDialog(id: string): void;
  /** Settings tabs in display order. */
  tabs(): { id: string; label: string; icon: string[] }[];
  /** Visible plugins that have something to configure, by name. */
  configurable(): PluginInfo[];
}

type Category = "Favorites" | "Recent" | "All" | Tag;
type Filter = "all" | "enabled" | "disabled";

const RECENT_DAYS = 7;
const NEW_DAYS = 2;
const DAY = 86_400_000;

export default definePlugin({
  id: "settings",
  name: "Settings",
  description: "The GG++ settings screen: plugins, themes and custom CSS.",
  tags: [],
  required: true,
  dependencies: ["ui", "gemini", "menus"],
  icon: I.settings,
  liveSettings: true,
  settings: {
    shortcut: {
      type: "boolean",
      label: "Keyboard shortcut",
      description: "Open GG++ settings with Ctrl/⌘ + Shift + , (comma).",
      default: true,
    },
  },
  async start(ctx) {
    const kernel = ctx.use<Kernel>("kernel");
    const ui = ctx.use<UiApi>("ui");
    ctx.css(css);

    const tabs = new Map<string, SettingsTab>();
    const settingsUIApi = {} as SettingsUiApi;
    ctx.provide("settingsUI", settingsUIApi);
    settingsUIApi.registerTab = (tab) => {
      tabs.set(tab.id, tab);
      kernel.emit("settings:tabs-changed", tab.id);
      return () => {
        tabs.delete(tab.id);
        kernel.emit("settings:tabs-changed", tab.id);
      };
    };
    let favorites = await ctx.data.get<string[]>("favorites", []);
    let pins = await ctx.data.get<string[]>("pins", []);
    const firstSeen = await ctx.data.get<Record<string, number>>("firstSeen", {});
    const fresh = Object.keys(firstSeen).length === 0;
    let seenChanged = false;
    for (const p of kernel.plugins()) {
      if (p.def.required || p.def.hidden || firstSeen[p.def.id]) continue;
      firstSeen[p.def.id] = Date.now();
      seenChanged = true;
    }
    if (seenChanged) void ctx.data.set("firstSeen", firstSeen);

    /** Plugins whose enabled state differs from page load and need a reload to apply. */
    const bootState = new Map(kernel.plugins().map((p) => [p.def.id, p.enabled]));
    const pendingReload = new Set<string>();
    let reloadPrompted = false;

    let open: { close(): void; select(tab: string): void } | null = null;
    let lastTab = "plugins";

    const visible = () => kernel.plugins().filter((p) => !p.def.hidden);
    const isNew = (p: PluginInfo) =>
      !fresh && !p.def.required && Date.now() - (firstSeen[p.def.id] ?? 0) < NEW_DAYS * DAY;
    const hasVisibleSettings = (p: PluginInfo) => {
      if (kernel.service(`panel:${p.def.id}`)) return true;
      const values = kernel.values(p.def.id);
      return Object.values(p.def.settings ?? {}).some((s) => !s.showIf || s.showIf(values));
    };

    // ---------- reload handling ----------

    async function noteRestart(id: string, permanent = false) {
      const p = kernel.plugin(id);
      if (!p) return;
      if (permanent) pendingReload.add(`${id}:setting`);
      else if (p.enabled === bootState.get(id)) pendingReload.delete(id);
      else pendingReload.add(id);
      ctx.emit("settings:reload-changed", pendingReload.size);
      if (!pendingReload.size || reloadPrompted) return;
      reloadPrompted = true;
      if (
        await ui.confirm({
          title: "Reload required",
          body: "This change only fully applies after the Gemini page is reloaded.",
          confirm: "Reload",
        })
      )
        location.reload();
    }

    // ---------- plugin dialog ----------

    function openPluginDialog(id: string) {
      const p = kernel.plugin(id);
      if (!p) return;
      const schema = p.def.settings ?? {};
      const list = h("div", { class: "ggpp-fields" });
      const render = () => {
        const values = kernel.values(id);
        const fields = Object.entries(schema)
          .filter(([, s]) => !s.showIf || s.showIf(values))
          .map(([key, s]) =>
            settingField(ui, key, s, values[key], (v) => {
              kernel.setSetting(id, key, v);
              if (s.restartNeeded) void noteRestart(id, true);
              // Conditional fields may appear or vanish.
              if (Object.values(schema).some((d) => d.showIf)) queueMicrotask(render);
            }),
          );
        list.replaceChildren(...(fields.length ? fields : [h("p", { class: "ggpp-muted" }, "No configurable settings.")]));
      };
      render();
      const authors = p.def.authors?.length ? p.def.authors.join(", ") : "";
      ui.modal({
        title: p.def.name,
        icon: p.def.icon ?? I.puzzle,
        width: 520,
        className: "ggpp-plugin-dialog",
        content: [
          h("p", { class: "ggpp-muted" }, p.def.description),
          p.error && h("p", { class: "ggpp-error-text" }, `Failed to start: ${p.error}`),
          authors && h("div", { class: "ggpp-section-label" }, "Authors"),
          authors && h("div", { class: "ggpp-muted" }, authors),
          h("div", { class: "ggpp-section-label" }, "Settings"),
          list,
          panel(id),
        ].filter(Boolean) as Node[],
        footer: Object.keys(schema).length
          ? [
              ui.button(
                "Reset",
                async () => {
                  if (
                    !(await ui.confirm({
                      title: "Reset settings",
                      body: "Reset this plugin's settings to defaults? This cannot be undone.",
                      confirm: "Reset",
                      danger: true,
                    }))
                  )
                    return;
                  kernel.resetSettings(id);
                  render();
                },
                "default",
              ),
            ]
          : undefined,
      });
    }

    /** A running plugin may provide "panel:<id>" to embed extra UI in its settings dialog. */
    function panel(id: string) {
      const render = kernel.service<(el: HTMLElement) => void>(`panel:${id}`);
      if (!render) return null;
      const el = h("div", { class: "ggpp-plugin-panel" });
      try {
        render(el);
      } catch (e) {
        ctx.log.error(`panel for ${id} failed`, e);
      }
      return el;
    }

    // ---------- plugins tab ----------

    function pluginsTab(container: HTMLElement, signal: AbortSignal) {
      let category: Category = favorites.length ? "Favorites" : "All";
      let filter: Filter = "all";
      let query = "";

      const banner = h(
        "div",
        { class: "ggpp-banner", hidden: true },
        icon(I.info, 18),
        h("span", null, "Reload the page to apply plugin changes."),
        ui.button("Reload", () => location.reload(), "primary"),
      );
      const strip = h("div", { class: "ggpp-cats", role: "tablist" });
      const search = h("input", {
        class: "ggpp-input ggpp-search",
        type: "search",
        oninput: () => ((query = search.value), renderList()),
      });
      const filterSel = h(
        "select",
        { class: "ggpp-input ggpp-filter", onchange: () => ((filter = filterSel.value as Filter), renderList()) },
        h("option", { value: "all" }, "All"),
        h("option", { value: "enabled" }, "Enabled"),
        h("option", { value: "disabled" }, "Disabled"),
      );
      const listEl = h("div", { class: "ggpp-plugin-scroll" });
      // Local runtime fingerprint (build marker + plugin count + hideBlue only). No URL/title/messages/logs.
      const fpEl = h("div", {
        class: "ggpp-runtime-fp",
        role: "status",
        style: {
          fontSize: "11px",
          lineHeight: "16px",
          color: "var(--ggpp-fg-3)",
          padding: "0 0 8px",
          fontFamily: "var(--ggpp-font)",
          wordBreak: "break-all",
        },
      });
      const syncFingerprint = () => {
        const fp = readRuntimeFingerprint(() => kernel.plugins());
        fpEl.dataset.ggppFpBuild = fp.build;
        fpEl.dataset.ggppFpPluginCount = String(fp.pluginCount);
        fpEl.dataset.ggppFpHasHideBlue = String(fp.hasHideBlueBackground);
        fpEl.dataset.ggppFpHideBlueState = fp.hideBlueBackgroundState;
        fpEl.textContent = formatRuntimeFingerprint(fp);
      };
      container.append(fpEl, banner, strip, h("div", { class: "ggpp-searchbar" }, search, filterSel), listEl);

      const syncBanner = () => (banner.hidden = !(pendingReload.size && reloadPrompted));
      syncBanner();

      function renderStrip() {
        const all = visible();
        const cats: Category[] = [
          "Favorites",
          "Recent",
          "All",
          ...TAGS.filter((t) => all.some((p) => p.def.tags.includes(t))),
        ];
        strip.replaceChildren(
          ...cats.map((c) =>
            h(
              "button",
              {
                class: `ggpp-cat${c === category ? " ggpp-on" : ""}`,
                role: "tab",
                "aria-selected": String(c === category),
                onclick: () => {
                  category = c;
                  renderStrip();
                  renderList();
                },
              },
              c,
            ),
          ),
        );
      }

      const byName = (a: PluginInfo, b: PluginInfo) =>
        a.def.name.localeCompare(b.def.name, undefined, { sensitivity: "base" });
      const passes = (p: PluginInfo) =>
        filter === "all" || (filter === "enabled" ? p.enabled || p.implicit : !(p.enabled || p.implicit));
      const pinFirst = (list: PluginInfo[]) => {
        const pinned = pins.map((id) => list.find((p) => p.def.id === id)).filter((p): p is PluginInfo => !!p);
        return [...pinned, ...list.filter((p) => !pins.includes(p.def.id))];
      };

      function sections(): { title?: string; items: PluginInfo[] }[] {
        const all = visible().sort(byName).filter(passes);
        switch (category) {
          case "Favorites":
            return [{ items: favorites.map((id) => all.find((p) => p.def.id === id)).filter((p): p is PluginInfo => !!p) }];
          case "Recent": {
            const cutoff = Date.now() - RECENT_DAYS * DAY;
            const stamp = (p: PluginInfo) => (p.def.updated ? Date.parse(p.def.updated) : 0);
            return [{ items: all.filter((p) => stamp(p) >= cutoff).sort((a, b) => stamp(b) - stamp(a) || byName(a, b)) }];
          }
          case "All":
            return [
              { items: pinFirst(all.filter((p) => !p.def.required)) },
              { title: "Required", items: all.filter((p) => p.def.required) },
            ];
          default:
            return [{ items: pinFirst(all.filter((p) => p.def.tags.includes(category as Tag))) }];
        }
      }

      function renderList() {
        const secs = sections();
        const count = secs.reduce((n, s) => n + s.items.length, 0);
        search.placeholder = `Search ${count} plugins...`;
        const q = query.trim().toLowerCase();
        const match = (p: PluginInfo) => !q || `${p.def.name} ${p.def.description}`.toLowerCase().includes(q);
        const nodes: Node[] = [];
        for (const s of secs) {
          const items = s.items.filter(match);
          if (!items.length) continue;
          if (s.title) nodes.push(h("div", { class: "ggpp-grid-sep" }, s.title));
          nodes.push(h("div", { class: "ggpp-grid" }, items.map(card)));
        }
        if (!nodes.length) {
          const msg = q
            ? "No plugins match your search."
            : category === "Favorites"
              ? "No favorites yet. Star a plugin to see it here."
              : category === "Recent"
                ? `No plugins updated in the last ${RECENT_DAYS} days.`
                : "No plugins available.";
          nodes.push(h("div", { class: "ggpp-empty" }, msg));
        }
        const top = listEl.scrollTop;
        listEl.replaceChildren(...nodes);
        listEl.scrollTop = top;
      }

      const active = (btn: HTMLElement, on: boolean) => (btn.classList.toggle("ggpp-active", on), btn);

      function card(p: PluginInfo): HTMLElement {
        const id = p.def.id;
        const starred = favorites.includes(id);
        const pinned = pins.includes(id);
        const crashed = p.enabled && p.state !== "running" && !p.def.required;
        const locked = p.def.required || p.neededBy.length > 0;
        const lockReason = p.def.required
          ? "Required for GG++ to work"
          : p.neededBy.length
            ? `Needed by ${p.neededBy.map((n) => kernel.plugin(n)?.def.name ?? n).join(", ")}`
            : "";
        const badge = (paths: string[], title: string, cls = "") =>
          h("span", { class: `ggpp-badge ${cls}`, title }, icon(paths, 14));
        const toggle = (on: boolean) => {
          void kernel.setEnabled(id, on).then(() => {
            if (p.def.requiresRestart) void noteRestart(id);
          });
        };
        return h(
          "article",
          {
            class: `ggpp-card${p.def.required ? " ggpp-required" : ""}${crashed ? " ggpp-crashed" : ""}`,
            dataset: { plugin: id },
          },
          h(
            "div",
            { class: "ggpp-card-head" },
            h("span", { class: "ggpp-card-icon" }, icon(p.def.icon ?? I.puzzle, 16)),
            h("span", { class: "ggpp-card-name", title: p.def.name }, p.def.name),
            crashed && badge(I.ban, `This plugin failed to start${p.error ? `: ${p.error}` : ""}`, "ggpp-badge-err"),
            p.def.required && badge(I.info, "This plugin is required for GG++ to work"),
            p.def.requiresRestart && badge(I.reset, "Needs a page reload to fully apply"),
            isNew(p) && h("span", { class: "ggpp-pill" }, "New"),
            h("span", { class: "ggpp-spacer" }),
            active(
              ui.iconButton(I.star, starred ? "Remove from favorites" : "Add to favorites", () => {
                favorites = starred ? favorites.filter((f) => f !== id) : [id, ...favorites];
                void ctx.data.set("favorites", favorites);
                renderList();
              }),
              starred,
            ),
            !p.def.required &&
              active(
                ui.iconButton(I.pin, pinned ? "Unpin from top" : "Pin to top", () => {
                  pins = pinned ? pins.filter((f) => f !== id) : [id, ...pins];
                  void ctx.data.set("pins", pins);
                  renderList();
                }),
                pinned,
              ),
            hasVisibleSettings(p) && ui.iconButton(I.settings, "Settings", () => openPluginDialog(id)),
            h("span", { title: lockReason }, ui.switch(p.enabled || p.implicit, toggle, locked)),
          ),
          h("p", { class: "ggpp-card-desc", title: p.def.description }, p.def.description),
          p.def.authors?.length && h("footer", { class: "ggpp-card-foot" }, p.def.authors.join(", ")),
        );
      }

      const refresh = () => {
        syncFingerprint();
        renderStrip();
        renderList();
        syncBanner();
      };
      const offChange = kernel.on("kernel:changed", refresh);
      const offReload = kernel.on("settings:reload-changed", syncBanner);
      signal.addEventListener("abort", () => (offChange(), offReload()));
      refresh();
      setTimeout(() => search.focus());
    }

    // ---------- shell ----------

    const allTabs = () =>
      [{ id: "plugins", label: "Plugins", icon: I.puzzle, order: 0, hint: "Toggle features. Click the gear to configure.", render: pluginsTab }, ...tabs.values()].sort(
        (a, b) => (a.order ?? 50) - (b.order ?? 50),
      );

    function openSettings(tabId = lastTab, pluginId?: string) {
      if (open) {
        open.select(tabId);
        if (pluginId) openPluginDialog(pluginId);
        return;
      }
      const nav = h("nav", { class: "ggpp-nav" });
      const pane = h("section", { class: "ggpp-pane" });
      let paneAbort: AbortController | null = null;


      const select = (id: string) => {
        const tab = allTabs().find((t) => t.id === id) ?? allTabs()[0];
        lastTab = tab.id;
        paneAbort?.abort();
        paneAbort = new AbortController();
        for (const b of nav.querySelectorAll<HTMLElement>(".ggpp-nav-item")) b.classList.toggle("ggpp-on", b.dataset.tab === tab.id);
        const body = h("div", { class: "ggpp-pane-body" });
        pane.replaceChildren(
          h("header", { class: "ggpp-pane-head" }, h("h3", null, tab.label), tab.hint && h("span", { class: "ggpp-hint", title: tab.hint }, icon(I.info, 16))),
          body,
        );
        try {
          tab.render(body, paneAbort.signal);
        } catch (e) {
          ctx.log.error(`tab ${tab.id} failed`, e);
          body.replaceChildren(h("p", { class: "ggpp-error-text" }, `This tab failed to load: ${e}`));
        }
      };

      const renderNav = () => {
        nav.replaceChildren(
          ...allTabs().map((t) =>
            h(
              "button",
              { class: "ggpp-nav-item", dataset: { tab: t.id }, onclick: () => select(t.id) },
              icon(t.icon, 18),
              h("span", null, t.label),
            ),
          ),
          h("div", { class: "ggpp-version" }, `GG++ ${kernel.version}`, h("br"), __GGPP_TARGET__),
        );
      };
      renderNav();
      const offTabs = kernel.on("settings:tabs-changed", () => {
        renderNav();
        select(lastTab);
      });

      const modal = ui.modal({
        title: "GG++",
        icon: I.ggpp,
        width: 960,
        className: "ggpp-settings",
        content: h("div", { class: "ggpp-shell" }, nav, pane),
        onClose: () => {
          paneAbort?.abort();
          offTabs();
          open = null;
        },
      });
      open = { close: modal.close, select };
      select(tabId);
      if (pluginId) openPluginDialog(pluginId);
    }

    Object.assign(settingsUIApi, {
      open: openSettings,
      close: () => open?.close(),
      openPluginDialog,
      tabs: () => allTabs().map(({ id, label, icon }) => ({ id, label, icon })),
      configurable: () =>
        visible()
          .filter((p) => !p.def.required && hasVisibleSettings(p))
          .sort((a, b) => a.def.name.localeCompare(b.def.name, undefined, { sensitivity: "base" })),
      registerTab(tab) {
        tabs.set(tab.id, tab);
        kernel.emit("settings:tabs-changed", tab.id);
        return () => {
          tabs.delete(tab.id);
          kernel.emit("settings:tabs-changed", tab.id);
        };
      },
    } satisfies SettingsUiApi);
    ctx.cleanup(() => open?.close());

    ctx.cleanup(
      ctx.use<MenusApi>("menus").register({
        id: "ggpp-settings",
        location: "settings",
        label: "GG++",
        icon: I.ggpp,
        order: -100,
        // SettingsFlyout puts its own GG++ entry, with a submenu, in this place.
        when: () => !kernel.service("settingsFlyout"),
        onSelect: () => openSettings(),
      }),
    );

    // Icon-only launcher immediately left of Gemini's sidenav gear (beside W / Pro).
    // Do not use the USPP floating pill — that sits in the bottom-right CTTF chrome.
    const gemini = ctx.use<GeminiApi>("gemini");
    const entry = h(
      "button",
      {
        class: "ggpp-sidenav-settings",
        type: "button",
        title: "GG++",
        "aria-label": "GG++ settings",
        onpointerdown: (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
        },
        onclick: (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          openSettings();
        },
      },
      icon(I.ggpp, 18),
    );
    ctx.cleanup(
      gemini.watch(gemini.SEL.accountFooter, (footer) => {
        const place = () => placeSidenavSettingsEntry(entry, footer);
        place();
        const mo = new MutationObserver(place);
        mo.observe(footer, { childList: true, subtree: true });
        return () => mo.disconnect();
      }),
    );
    ctx.cleanup(() => entry.remove());

    ctx.on("ggpp:open-settings", (p?: { tab?: string; plugin?: string }) => openSettings(p?.tab, p?.plugin));

    window.addEventListener(
      "keydown",
      (e) => {
        if (!ctx.settings.shortcut) return;
        if (!(e.ctrlKey || e.metaKey) || !e.shiftKey || (e.key !== "," && e.code !== "Comma")) return;
        if (isEditable(e.target) && !(e.target as HTMLElement).closest?.("rich-textarea")) return;
        e.preventDefault();
        e.stopPropagation();
        if (open) open.close();
        else openSettings();
      },
      { capture: true, signal: ctx.signal },
    );
  },
});
