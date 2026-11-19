import { definePlugin } from "../../shims/types";
import { cssEditor } from "../../../../src/lib/cssEditor";
import { h } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import type { SettingsUiApi } from "../settings";
import type { UiApi } from "../ui";

export default definePlugin({
  id: "quickCss",
  name: "QuickCSS",
  description: "Write CSS that applies to Gemini instantly as you type. Adds the Quick CSS tab.",
  tags: ["Appearance"],
  icon: I.code,
  enabledByDefault: true,
  updated: "2026-10-14",
  dependencies: ["settings", "ui"],
  async start(ctx) {
    const ui = ctx.use<UiApi>("ui");
    let css = await ctx.data.get("css", "");
    let on = await ctx.data.get("enabled", true);
    const style = ctx.css("");
    const apply = () => (style.textContent = on ? css : "");
    apply();

    ctx.cleanup(
      ctx.use<SettingsUiApi>("settingsUI").registerTab({
        id: "quickcss",
        label: "Quick CSS",
        icon: I.code,
        order: 20,
        render(body) {
          const editor = cssEditor(css, (v) => {
            css = v;
            apply();
            void ctx.data.set("css", css);
          });
          editor.disabled = !on;
          body.append(
            h(
              "div",
              { class: "ggpp-field ggpp-field-inline" },
              h(
                "div",
                { class: "ggpp-field-head" },
                h("div", { class: "ggpp-field-label" }, "Enable Quick CSS"),
                h("div", { class: "ggpp-field-desc" }, "Applies instantly as you type. Stored only on this device. Turn off to keep the code without applying it."),
              ),
              ui.switch(on, (v) => {
                on = v;
                editor.disabled = !v;
                apply();
                void ctx.data.set("enabled", v);
              }),
            ),
            editor,
          );
        },
      }),
    );
  },
});
