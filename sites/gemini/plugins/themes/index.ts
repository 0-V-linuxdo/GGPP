import { definePlugin } from "../../shims/types";
import { cssEditor } from "../../../../src/lib/cssEditor";
import { h, icon, uid } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import { fetchText } from "../../../../src/lib/net";
import type { SettingsUiApi } from "../settings";
import type { UiApi } from "../ui";

interface Theme {
  id: string;
  name: string;
  author: string;
  description: string;
  enabled: boolean;
  /** Online themes. */
  url?: string;
  /** Local themes. */
  css?: string;
}

function meta(css: string) {
  const block = css.match(/^\s*\/\*\*?([\s\S]*?)\*\//)?.[1] ?? "";
  const tag = (t: string) => block.match(new RegExp(`@${t}\\s+(.+)`))?.[1]?.trim() ?? "";
  return { name: tag("name"), author: tag("author"), description: tag("description") };
}

export default definePlugin({
  id: "themes",
  name: "Themes",
  description: "Load CSS themes from a URL or keep local ones. Adds the Themes tab.",
  tags: ["Appearance"],
  icon: I.palette,
  enabledByDefault: true,
  updated: "2026-10-14",
  dependencies: ["settings", "ui"],
  async start(ctx) {
    const ui = ctx.use<UiApi>("ui");
    let themes = await ctx.data.get<Theme[]>("themes", []);
    const styles = new Map<string, HTMLStyleElement>();
    const save = () => ctx.data.set("themes", themes);

    async function apply(t: Theme) {
      let style = styles.get(t.id);
      if (!t.enabled) {
        if (style) style.textContent = "";
        return;
      }
      if (!style) {
        style = ctx.css("");
        style.dataset.ggppTheme = t.id;
        styles.set(t.id, style);
      }
      if (t.css !== undefined) style.textContent = t.css;
      else if (t.url) {
        try {
          const css = await fetchText(t.url);
          if (themes.find((x) => x.id === t.id)?.enabled) style.textContent = css;
        } catch (e) {
          ctx.log.warn(`Failed to load theme "${t.name}"`, e);
        }
      }
    }
    themes.forEach((t) => void apply(t));
    ctx.cleanup(() => styles.clear());

    function remove(t: Theme) {
      styles.get(t.id)?.remove();
      styles.delete(t.id);
      themes = themes.filter((x) => x.id !== t.id);
      void save();
    }

    function onlineDialog(done: () => void) {
      const input = h("input", { class: "ggpp-input", placeholder: "https://raw.githubusercontent.com/...", type: "url" });
      const err = h("p", { class: "ggpp-error-text" });
      const go = ui.button("Import", () => void submit(), "primary");
      const sync = () => (go.disabled = !input.value.trim());
      input.addEventListener("input", () => ((err.textContent = ""), sync()));
      input.addEventListener("keydown", (e) => e.key === "Enter" && void submit());
      sync();
      const m = ui.modal({
        title: "Add online theme",
        width: 460,
        content: [h("label", { class: "ggpp-label" }, "URL"), input, err],
        footer: [ui.button("Cancel", () => m.close(), "ghost"), go],
      });
      setTimeout(() => input.focus());
      async function submit() {
        const url = input.value.trim();
        let u: URL;
        try {
          u = new URL(url);
          if (u.protocol !== "https:") throw 0;
        } catch {
          err.textContent = "Enter a valid https URL.";
          return;
        }
        if (!/\.css$/i.test(u.pathname)) return void (err.textContent = "URL must point to a .css file.");
        if (themes.some((t) => t.url === url)) return void (err.textContent = "This theme is already added.");
        go.disabled = true;
        go.textContent = "Importing...";
        try {
          const css = await fetchText(url);
          if (!css.trim()) throw new Error("Theme file is empty.");
          if (themes.some((t) => t.url === url)) throw new Error("This theme is already added.");
          const m2 = meta(css);
          const fallback = decodeURIComponent(u.pathname.split("/").pop() ?? url).replace(/\.css$/i, "").replace(/[-_]+/g, " ");
          themes.push({ id: uid("theme"), url, name: m2.name || fallback, author: m2.author, description: m2.description, enabled: false });
          await save();
          m.close();
          done();
        } catch (e) {
          err.textContent = e instanceof Error ? e.message : String(e);
          go.textContent = "Import";
          sync();
        }
      }
    }

    function localDialog(done: () => void, existing?: Theme) {
      const name = h("input", { class: "ggpp-input", placeholder: "My Theme", value: existing?.name ?? "" });
      let css = existing?.css ?? "";
      const editor = cssEditor(css, (v) => ((css = v), sync()));
      editor.rows = 14;
      const go = ui.button(existing ? "Save" : "Create", () => submit(), "primary");
      const sync = () => (go.disabled = !name.value.trim() || !css.trim());
      name.addEventListener("input", sync);
      sync();
      const m = ui.modal({
        title: existing ? "Edit local theme" : "New local theme",
        width: 640,
        content: [h("label", { class: "ggpp-label" }, "Name"), name, h("label", { class: "ggpp-label" }, "CSS"), editor],
        footer: [ui.button("Cancel", () => m.close(), "ghost"), go],
      });
      function submit() {
        const m2 = meta(css);
        if (existing) Object.assign(existing, { name: name.value.trim(), css, description: m2.description });
        else themes.push({ id: uid("local"), name: name.value.trim(), author: m2.author || "Local", description: m2.description, enabled: false, css });
        void save();
        if (existing) void apply(existing);
        m.close();
        done();
      }
    }

    ctx.cleanup(
      ctx.use<SettingsUiApi>("settingsUI").registerTab({
        id: "themes",
        label: "Themes",
        icon: I.palette,
        order: 10,
        render(body) {
          const list = h("div", { class: "ggpp-theme-list" });
          let query = "";
          let filter = "all";
          const search = h("input", { class: "ggpp-input ggpp-search", type: "search", oninput: () => ((query = search.value), render()) });
          const sel = h(
            "select",
            { class: "ggpp-input ggpp-filter", onchange: () => ((filter = sel.value), render()) },
            ["All", "Enabled", "Disabled", "Online", "Local"].map((o) => h("option", { value: o.toLowerCase() }, o)),
          );
          const bar = h("div", { class: "ggpp-searchbar" }, search, sel);
          const section = (title: string, desc: string, onManage: () => void) =>
            h(
              "div",
              { class: "ggpp-field ggpp-field-inline ggpp-theme-section" },
              h("div", { class: "ggpp-field-head" }, h("div", { class: "ggpp-field-label" }, title), h("div", { class: "ggpp-field-desc" }, desc)),
              ui.button("Add", onManage),
            );
          body.append(
            section("Online themes", "Load a theme from a URL. It is fetched again on every page load, so updates apply automatically.", () => onlineDialog(render)),
            section("Local themes", "CSS stored only on this device, for private tweaks or drafts.", () => localDialog(render)),
            bar,
            list,
          );

          function render() {
            bar.hidden = !themes.length;
            search.placeholder = `Search ${themes.length} themes...`;
            const q = query.trim().toLowerCase();
            const shown = themes.filter(
              (t) =>
                (filter === "all" ||
                  (filter === "enabled" && t.enabled) ||
                  (filter === "disabled" && !t.enabled) ||
                  (filter === "online" && !!t.url) ||
                  (filter === "local" && !t.url)) &&
                (!q || `${t.name} ${t.description} ${t.author}`.toLowerCase().includes(q)),
            );
            if (!themes.length) return void list.replaceChildren();
            if (!shown.length) return void list.replaceChildren(h("div", { class: "ggpp-empty" }, "No themes match your search."));
            list.replaceChildren(
              h(
                "div",
                { class: "ggpp-grid" },
                shown.map((t) =>
                  h(
                    "article",
                    { class: "ggpp-card" },
                    h(
                      "div",
                      { class: "ggpp-card-head" },
                      h("span", { class: "ggpp-card-icon" }, icon(I.palette, 16)),
                      h("span", { class: "ggpp-card-name", title: t.url ?? t.name }, t.name || t.url),
                      h("span", { class: "ggpp-spacer" }),
                      t.url
                        ? ui.iconButton(I.copy, "Copy URL", () => void navigator.clipboard.writeText(t.url!))
                        : ui.iconButton(I.edit, "Edit", () => localDialog(render, t)),
                      ui.iconButton(I.trash, "Remove", async () => {
                        if (await ui.confirm({ title: "Remove theme", body: `Remove "${t.name}"?`, confirm: "Remove", danger: true })) {
                          remove(t);
                          render();
                        }
                      }),
                      ui.switch(t.enabled, (v) => {
                        t.enabled = v;
                        void save();
                        void apply(t);
                      }),
                    ),
                    h("p", { class: "ggpp-card-desc" }, t.description),
                    h("footer", { class: "ggpp-card-foot" }, `${t.url ? "Online" : "Local"}${t.author ? ` · ${t.author}` : ""}`),
                  ),
                ),
              ),
            );
          }
          render();
        },
      }),
    );
  },
});
