import { definePlugin } from "../../shims/types";
import { h } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import { preview, truncate } from "../../../../src/lib/text";
import type { GeminiApi } from "../gemini";

/** Ctrl + ` switcher between recently opened chats, with a mini preview of each. */

interface Entry {
  /** Conversation id, or "home" for the new-chat page. */
  key: string;
  title: string;
  user?: string;
  model?: string;
  theme?: "dark" | "light";
  at: number;
}

const ACCENTS = ["#2563eb", "#0ea5e9", "#14b8a6", "#f97316", "#64748b"];
const TRIGGER_CODES = new Set(["Backquote", "IntlBackslash"]);
const TRIGGER_CHARS = new Set(["`", "~", "·", "｀", "～"]);
const BAD_TITLES = /^(gemini|google gemini|new chat|gg\+\+|recent|chats?|history)$/i;

const accent = (key: string) => ACCENTS[[...key].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7) % ACCENTS.length];

export default definePlugin({
  id: "recentTopics",
  name: "RecentTopics",
  description: "Hold Ctrl and press ` to flip between recently opened chats, like Alt-Tab.",
  tags: ["Navigation"],
  icon: I.grid,
  enabledByDefault: true,
  updated: "2026-10-14",
  dependencies: ["gemini"],
  settings: {
    maxRecent: {
      type: "select",
      label: "Chats to show",
      description: "How many recently opened chats to keep.",
      default: "5",
      options: Array.from({ length: 10 }, (_, i) => ({ value: String(i + 3), label: String(i + 3) })),
    },
    includeHome: { type: "boolean", label: "Include new chat", description: "Include the new-chat page in the switcher.", default: true },
  },
  async start(ctx) {
    const gemini = ctx.use<GeminiApi>("gemini");
    const max = Number(ctx.settings.maxRecent);
    let entries = await ctx.data.get<Entry[]>("recent", []);
    // Chats opened in other tabs count as recent too.
    ctx.on("data:changed", ({ key, value }: { key: string; value: Entry[] }) => {
      if (key === "recentTopics:recent" && Array.isArray(value) && !panel) entries = value;
    });
    const save = () => ctx.data.set("recent", entries);

    const keyOf = () => gemini.route().conversationId ?? (gemini.route().isHome ? "home" : null);

    function snapshot(e: Entry) {
      const msgs = gemini.messages();
      const lastUser = msgs.findLastIndex((m) => m.role === "user");
      if (lastUser < 0) return;
      const reply = msgs.slice(lastUser + 1).find((m) => m.role === "model");
      e.user = truncate(msgs[lastUser].text.replace(/\s+/g, " ").trim(), 72);
      const model = reply ? preview(reply.text, 140) : "";
      if (model || !e.model) e.model = model;
      e.theme = gemini.theme();
    }

    function record() {
      const key = keyOf();
      if (!key || (key === "home" && !ctx.settings.includeHome)) return;
      const prev = entries.find((e) => e.key === key);
      const title = key === "home" ? "New chat" : gemini.title();
      const entry: Entry = { ...prev, key, at: Date.now(), title: !BAD_TITLES.test(title) ? title : (prev?.title ?? "Untitled") };
      if (key !== "home") snapshot(entry);
      entries = [entry, ...entries.filter((e) => e.key !== key)].slice(0, max);
      void save();
    }

    let settle: ReturnType<typeof setTimeout> | undefined;
    const visit = () => {
      clearTimeout(settle);
      settle = setTimeout(record, 1200);
    };
    ctx.cleanup(() => clearTimeout(settle));
    ctx.on("gemini:route", visit);
    ctx.on("gemini:response-end", () => !panel && record());
    visit();

    // ---------- switcher ----------

    ctx.css(`
      .ggpp-rt-overlay { position: fixed; inset: 0; z-index: 2147483100; display: grid; place-items: center; font-family: var(--ggpp-font); }
      .ggpp-rt-panel {
        display: flex; gap: 8px; max-width: calc(100vw - 24px); overflow-x: auto; scrollbar-width: none; padding: 12px;
        border: 1px solid var(--ggpp-border-soft); border-radius: 16px; background: var(--ggpp-surface-2); box-shadow: var(--ggpp-shadow);
        animation: ggpp-fade .09s;
      }
      .ggpp-rt-card {
        all: unset; box-sizing: border-box; flex: none; width: clamp(136px, calc((100vw - 68px) / 5), 204px); padding: 8px;
        border: 1px solid transparent; border-radius: 12px; cursor: pointer; color: var(--ggpp-fg);
      }
      .ggpp-rt-card[aria-selected="true"] { border-color: var(--acc); box-shadow: 0 0 0 1px var(--acc); }
      .ggpp-rt-thumb {
        aspect-ratio: 16 / 9; border-radius: 8px; padding: 8px; overflow: hidden; display: flex; flex-direction: column; gap: 6px;
        background: color-mix(in srgb, var(--acc) 14%, var(--ggpp-bg)); font-size: 11px; line-height: 14px;
      }
      .ggpp-rt-u { align-self: flex-end; max-width: 78%; padding: 4px 8px; border-radius: 14px 14px 4px 14px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      .ggpp-rt-m { max-width: 94%; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
      .ggpp-rt-thumb[data-theme="light"] .ggpp-rt-u { background: #e9eef6; color: #1f1f1f; }
      .ggpp-rt-thumb[data-theme="light"] .ggpp-rt-m { color: #444746; }
      .ggpp-rt-thumb[data-theme="dark"] .ggpp-rt-u { background: #333537; color: #fff; }
      .ggpp-rt-thumb[data-theme="dark"] .ggpp-rt-m { color: #c4c7c5; }
      .ggpp-rt-thumb.ggpp-rt-empty { align-items: center; justify-content: center; font-size: 30px; }
      .ggpp-rt-title { margin-top: 6px; font-size: 12px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .ggpp-rt-none { padding: 16px 24px; color: var(--ggpp-fg-2); }
    `);

    let panel: { overlay: HTMLElement; cards: HTMLElement[]; index: number; moved: boolean; origin: [number, number] | null } | null = null;
    let ctrlDown = false;

    function select(i: number) {
      if (!panel || !panel.cards.length) return;
      panel.index = (i + panel.cards.length) % panel.cards.length;
      panel.cards.forEach((c, j) => c.setAttribute("aria-selected", String(j === panel!.index)));
      panel.cards[panel.index].scrollIntoView({ inline: "nearest", block: "nearest" });
    }

    function close(commit: boolean) {
      if (!panel) return;
      const target = commit ? entries[panel.index] : undefined;
      panel.overlay.remove();
      panel = null;
      if (!target || target.key === keyOf()) return;
      const base = gemini.newChatUrl();
      gemini.navigate(target.key === "home" ? base : `${base}/${target.key}`);
    }
    ctx.cleanup(() => close(false));

    function open(backwards: boolean) {
      record();
      const shown = entries.filter((e) => e.key !== "home" || ctx.settings.includeHome);
      entries = shown;
      const cards = shown.map((e, i) =>
        h(
          "button",
          {
            class: "ggpp-rt-card",
            role: "option",
            type: "button",
            style: { "--acc": accent(e.key) },
            "aria-label": e.title,
            onclick: (ev: Event) => {
              ev.stopPropagation();
              select(i);
              close(true);
            },
            onmousemove: (ev: MouseEvent) => {
              if (!panel) return;
              if (!panel.origin) {
                panel.origin = [ev.clientX, ev.clientY];
                return;
              }
              if (!panel.moved && Math.hypot(ev.clientX - panel.origin[0], ev.clientY - panel.origin[1]) < 4) return;
              panel.moved = true;
              if (panel.index !== i) select(i);
            },
          },
          e.user || e.model
            ? h(
                "div",
                { class: "ggpp-rt-thumb", dataset: { theme: e.theme ?? gemini.theme() } },
                e.user && h("div", { class: "ggpp-rt-u" }, e.user),
                e.model && h("div", { class: "ggpp-rt-m" }, e.model),
              )
            : h("div", { class: "ggpp-rt-thumb ggpp-rt-empty", dataset: { theme: gemini.theme() } }, "✦"),
          h("div", { class: "ggpp-rt-title" }, e.key === "home" ? "New chat" : e.title || "Untitled"),
        ),
      );
      const list = h(
        "div",
        { class: "ggpp-rt-panel", role: "listbox", "aria-label": "Recent conversations" },
        cards.length ? cards : h("div", { class: "ggpp-rt-none" }, "Open a few chats, then hold Ctrl+` to switch."),
      );
      const overlay = h("div", { class: "ggpp-rt-overlay" }, list);
      overlay.addEventListener("mousedown", (ev) => !list.contains(ev.target as Node) && close(false));
      document.body.append(overlay);
      panel = { overlay, cards, index: 0, moved: false, origin: null };
      select(backwards ? cards.length - 1 : Math.min(1, cards.length - 1));
    }

    const isTrigger = (e: KeyboardEvent) => TRIGGER_CODES.has(e.code) || TRIGGER_CHARS.has(e.key);

    window.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Control") ctrlDown = true;
        if (panel && e.key === "Escape") {
          e.preventDefault();
          e.stopPropagation();
          close(false);
          return;
        }
        if (panel && e.ctrlKey && e.key === "Tab") {
          e.preventDefault();
          e.stopPropagation();
          select(panel.index + (e.shiftKey ? -1 : 1));
          return;
        }
        if (!isTrigger(e) || !e.ctrlKey || e.altKey || e.metaKey) return;
        e.preventDefault();
        e.stopPropagation();
        if (e.repeat) return;
        if (panel) select(panel.index + (e.shiftKey ? -1 : 1));
        else open(e.shiftKey);
      },
      { capture: true, signal: ctx.signal },
    );
    window.addEventListener(
      "keyup",
      (e) => {
        if (e.key !== "Control") return;
        ctrlDown = false;
        if (panel) close(true);
      },
      { capture: true, signal: ctx.signal },
    );
    // Don't let the backtick leak into the message box while switching.
    window.addEventListener(
      "beforeinput",
      (e) => {
        if ((panel || ctrlDown) && e.data && TRIGGER_CHARS.has(e.data)) e.preventDefault();
      },
      { capture: true, signal: ctx.signal },
    );
    window.addEventListener("blur", () => (ctrlDown = false), { signal: ctx.signal });
    document.addEventListener("visibilitychange", () => document.hidden && close(false), { signal: ctx.signal });
  },
});
