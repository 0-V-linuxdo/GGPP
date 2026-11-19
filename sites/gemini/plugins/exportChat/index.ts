import { definePlugin } from "../../shims/types";
import { download, h } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import { toMarkdown } from "../../../../src/lib/markdown";
import type { GeminiApi } from "../gemini";
import type { MenusApi } from "../menus";
import type { UiApi } from "../ui";

/** Export the open conversation as JSON, Markdown, plain text or HTML, from the conversation menu. */

interface Turn {
  role: "user" | "model";
  text: string;
  markdown: string;
  thinking?: string;
  images: string[];
}

type Format = "json" | "md" | "txt" | "html";
const MIME: Record<Format, string> = { json: "application/json", md: "text/markdown", txt: "text/plain", html: "text/html" };

const fileName = (title: string) =>
  title.replace(/[<>:"/\\|?*\x00-\x1f]/g, "").trim().replace(/\s+/g, "-") || "chat";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const safeUrl = (u: string) => /^(https?:|mailto:)/i.test(u);

export default definePlugin({
  id: "exportChat",
  name: "ExportChat",
  description: "Export the open conversation as JSON, Markdown, plain text or HTML from the conversation menu.",
  tags: ["Chats"],
  icon: I.download,
  updated: "2026-10-14",
  dependencies: ["gemini", "menus", "ui"],
  settings: {
    includeThinking: { type: "boolean", label: "Include thinking", description: "Include the thinking steps when Gemini shows them.", default: true },
  },
  start(ctx) {
    const gemini = ctx.use<GeminiApi>("gemini");
    const ui = ctx.use<UiApi>("ui");

    function collect(): Turn[] {
      return gemini.messages().map((m) => {
        if (m.role === "user") return { role: "user", text: m.text, markdown: m.text, images: [...m.el.querySelectorAll<HTMLImageElement>("img")].map((i) => i.src).filter(safeUrl) };
        const body = m.el.querySelector(gemini.SEL.modelText);
        const thoughts = m.el.querySelector<HTMLElement>(gemini.SEL.thoughts);
        return {
          role: "model",
          text: m.text,
          markdown: body ? toMarkdown(body) : m.text,
          thinking: ctx.settings.includeThinking ? thoughts?.innerText.trim() || undefined : undefined,
          images: [...(body?.querySelectorAll<HTMLImageElement>("img") ?? [])].map((i) => i.src).filter(safeUrl),
        };
      });
    }

    function render(format: Format, title: string, turns: Turn[]): string {
      const who = (t: Turn) => (t.role === "user" ? "You" : "Gemini");
      const model = gemini.q(gemini.SEL.modeButton)?.innerText.trim();
      switch (format) {
        case "json":
          return JSON.stringify(
            { conversationId: gemini.route().conversationId, title, model, url: location.href, exportedAt: new Date().toISOString(), messages: turns },
            null,
            2,
          );
        case "md":
          return [
            `# ${title}`,
            "",
            ...turns.flatMap((t) => [
              `## ${who(t)}`,
              "",
              ...(t.thinking ? ["<details><summary>Thinking</summary>", "", t.thinking, "", "</details>", ""] : []),
              t.markdown,
              "",
              ...t.images.map((u) => `![image](${u})`),
              "---",
              "",
            ]),
          ].join("\n");
        case "txt":
          return [
            title,
            "=".repeat(title.length),
            "",
            ...turns.flatMap((t) => [who(t), "", ...(t.thinking ? ["[Thinking]", t.thinking, ""] : []), t.text, "", ...t.images.map((u) => `  ${u}`), "-".repeat(40), ""]),
          ].join("\n");
        case "html":
          return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${esc(title)}</title><style>
body{font-family:system-ui,sans-serif;max-width:50rem;margin:0 auto;padding:0 1rem;background:#131314;color:#e3e3e3;line-height:1.55}
.m{margin:1.5rem 0;padding:1rem;border-radius:.75rem;border:1px solid #2a2a2a}.user{background:#1e1f20}.model{background:#131314}
.who{font-weight:600;color:#aaa;margin-bottom:.5rem}details{padding:.5rem;background:#1a1a1a;border-left:3px solid #444;color:#999;font-size:.9rem;margin-bottom:.5rem}
a{color:#a8c7fa}img{max-width:100%}pre{white-space:pre-wrap}
</style></head><body><h1>${esc(title)}</h1>${turns
            .map(
              (t) =>
                `<div class="m ${t.role}"><div class="who">${who(t)}</div>${t.thinking ? `<details><summary>Thinking</summary><pre>${esc(t.thinking)}</pre></details>` : ""}<div>${esc(t.text).replace(/\n/g, "<br>")}</div>${t.images.map((u) => `<img src="${esc(u)}" alt="">`).join("")}</div>`,
            )
            .join("")}</body></html>`;
        default: {
          const never: never = format;
          return never;
        }
      }
    }

    function exportAs(format: Format) {
      const turns = collect();
      if (!turns.length) {
        ui.toast({ title: "Nothing to export", body: "Open a conversation first." });
        return;
      }
      const title = gemini.title() || "Untitled Chat";
      download(`${fileName(title)}.${format}`, render(format, title, turns), MIME[format]);
    }

    function dialog() {
      const m = ui.modal({
        title: "Export conversation",
        icon: I.download,
        width: 420,
        content: [
          h("p", { class: "ggpp-muted" }, "Exports the messages currently loaded on the page. Scroll to the top first to include older turns."),
          h(
            "div",
            { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" } },
            (
              [
                ["md", "Markdown"],
                ["json", "JSON"],
                ["txt", "Plain text"],
                ["html", "HTML"],
              ] as [Format, string][]
            ).map(([f, label]) => ui.button(label, () => (exportAs(f), m.close()))),
          ),
        ],
      });
    }

    const menus = ctx.use<MenusApi>("menus");
    ctx.cleanup(
      menus.register({
        id: "exportChat",
        location: "conversation",
        label: "Export…",
        icon: I.download,
        // Only the open conversation is on the page to export.
        when: (c) => !gemini.isGenerating() && (!c.conversationId || c.conversationId === gemini.route().conversationId),
        onSelect: dialog,
      }),
    );
  },
});
