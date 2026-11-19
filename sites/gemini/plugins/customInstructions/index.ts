import { definePlugin } from "../../shims/types";
import { h, icon, uid } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import type { ChatBarApi } from "../chatBar";
import type { GeminiApi } from "../gemini";
import type { MenusApi } from "../menus";
import type { UiApi } from "../ui";

/**
 * Named instruction presets you assign to conversations. When you send a
 * message in an assigned chat, the preset is put in front of it.
 */

interface Preset {
  id: string;
  name: string;
  prompt: string;
}

const LIMIT = 4000;

export default definePlugin({
  id: "customInstructions",
  name: "CustomInstructions",
  description: "Instruction presets you assign per conversation; the preset is sent in front of your messages there.",
  tags: ["Chats", "Composer"],
  icon: I.scroll,
  updated: "2026-10-14",
  dependencies: ["gemini", "menus", "ui", "chatBar"],
  settings: {
    scope: {
      type: "select",
      label: "Send preset with",
      default: "first",
      options: [
        { value: "first", label: "The first message of the chat" },
        { value: "every", label: "Every message" },
      ],
    },
  },
  async start(ctx) {
    const gemini = ctx.use<GeminiApi>("gemini");
    const ui = ctx.use<UiApi>("ui");
    let presets = await ctx.data.get<Preset[]>("presets", []);
    let assigned = await ctx.data.get<Record<string, string>>("assigned", {});
    const save = () => Promise.all([ctx.data.set("presets", presets), ctx.data.set("assigned", assigned)]);

    /** Key "new" holds the preset for the next new chat; it moves to the real id once Gemini assigns one. */
    const keyFor = () => gemini.route().conversationId ?? "new";
    const presetFor = (key: string) => presets.find((p) => p.id === assigned[key]);

    ctx.on("gemini:route", ({ route, prev }) => {
      if (prev.conversationId === null && route.conversationId && assigned.new) {
        assigned[route.conversationId] = assigned.new;
        delete assigned.new;
        void save();
      }
    });

    let bypass = false;
    function intercept(e: Event) {
      if (bypass) return false;
      const preset = presetFor(keyFor());
      if (!preset?.prompt.trim()) return false;
      if (ctx.settings.scope === "first" && gemini.messages().some((m) => m.role === "user")) return false;
      const text = gemini.editorText().trim();
      if (!text || text.startsWith(preset.prompt.trim())) return false;
      e.preventDefault();
      e.stopImmediatePropagation();
      gemini.setEditorText(`${preset.prompt.trim()}\n\n---\n\n${text}`);
      // Let Gemini's editor model catch up, then send for real.
      setTimeout(() => {
        bypass = true;
        gemini.send();
        bypass = false;
      }, 60);
      return true;
    }

    document.addEventListener(
      "keydown",
      (e) => {
        if (e.key !== "Enter" || e.shiftKey || e.altKey || e.isComposing || !gemini.editor()?.contains(e.target as Node)) return;
        intercept(e);
      },
      { capture: true, signal: ctx.signal },
    );
    document.addEventListener(
      "click",
      (e) => {
        const btn = (e.target as HTMLElement).closest?.("[data-test-id='send-button-container'] button");
        if (btn && !btn.closest(".stop")) intercept(e);
      },
      { capture: true, signal: ctx.signal },
    );

    // ---------- assigning ----------

    function chooser(key: string) {
      const list = h("div", { style: { display: "flex", flexDirection: "column", gap: "4px" } });
      const draw = () =>
        list.replaceChildren(
          ...[{ id: "", name: "None" } as Preset, ...presets].map((p) =>
            h(
              "button",
              {
                class: "ggpp-menu-item",
                type: "button",
                onclick: () => {
                  if (p.id) assigned[key] = p.id;
                  else delete assigned[key];
                  void save();
                  bar.refresh();
                  m.close();
                  ui.toast({ title: p.id ? `Instructions: ${p.name}` : "Instructions removed", icon: I.scroll, duration: 2500 });
                },
              },
              h("span", { style: { flex: "1" } }, p.name || "Untitled"),
              (assigned[key] ?? "") === p.id && icon(I.check, 16),
            ),
          ),
        );
      draw();
      const m = ui.modal({
        title: "Instructions for this chat",
        icon: I.scroll,
        width: 380,
        content: presets.length ? list : h("p", { class: "ggpp-muted" }, "No presets yet. Create one in GG++ settings → CustomInstructions."),
      });
    }

    const menus = ctx.use<MenusApi>("menus");
    ctx.cleanup(
      menus.register({
        id: "customInstructions",
        location: "conversation",
        label: (c) => {
          const p = presetFor(c.conversationId ?? keyFor());
          return p ? `Instructions: ${p.name}` : "Instructions…";
        },
        icon: I.scroll,
        when: () => presets.length > 0,
        onSelect: (c) => chooser(c.conversationId ?? keyFor()),
      }),
    );

    const bar = ctx.use<ChatBarApi>("chatBar");
    ctx.cleanup(
      bar.register({
        id: "customInstructions",
        icon: I.scroll,
        title: "Instructions for this chat",
        order: 10,
        active: () => !!presetFor(keyFor()),
        onClick: () => chooser(keyFor()),
      }),
    );
    ctx.on("gemini:route", () => bar.refresh());

    // ---------- preset editor ----------

    ctx.provide("panel:customInstructions", (el: HTMLElement) => {
      const draw = () => {
        el.replaceChildren(
          h("div", { class: "ggpp-section-label" }, "Presets"),
          ...presets.map((p) => {
            const name = h("input", { class: "ggpp-input", value: p.name, placeholder: "Preset name" });
            const body = h("textarea", { class: "ggpp-input", rows: 5, value: p.prompt, placeholder: "How should Gemini behave?" });
            const count = h("div", { class: "ggpp-field-desc" });
            const sync = () => {
              count.textContent = `${body.value.length}/${LIMIT}`;
              count.style.color = body.value.length > LIMIT ? "var(--ggpp-danger)" : "";
            };
            sync();
            name.addEventListener("change", () => ((p.name = name.value), void save()));
            body.addEventListener("input", sync);
            body.addEventListener("change", () => ((p.prompt = body.value), void save()));
            return h(
              "div",
              { class: "ggpp-card", style: { padding: "10px", gap: "6px", minHeight: "0" } },
              h(
                "div",
                { style: { display: "flex", gap: "6px", alignItems: "center" } },
                name,
                ui.iconButton(I.trash, "Delete", () => {
                  presets = presets.filter((x) => x !== p);
                  for (const k of Object.keys(assigned)) if (assigned[k] === p.id) delete assigned[k];
                  void save();
                  draw();
                }),
              ),
              body,
              count,
            );
          }),
          ui.button(
            h("span", { style: { display: "inline-flex", gap: "6px", alignItems: "center" } }, icon(I.plus, 16), "New preset"),
            () => {
              presets.push({ id: uid("preset"), name: "", prompt: "" });
              void save();
              draw();
            },
            "ghost",
          ),
          h(
            "p",
            { class: "ggpp-field-desc" },
            "Assign a preset with the scroll button in the message box, or from a conversation's ⋮ menu → Instructions…",
          ),
        );
      };
      draw();
    });
  },
});
