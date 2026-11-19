import { definePlugin } from "../../shims/types";
import { h, icon } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import type { GeminiApi } from "../gemini";
import type { UiApi } from "../ui";

/**
 * Side panel improvements: section header actions on hover, a new-chat plus on
 * the chats header, default section states, click-empty-space to toggle, and
 * bulk select + delete of chats.
 */

const SECTION = (key: string) => `expandable-section[storagekey='${key}']`;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function waitFor<T extends Element>(find: () => T | null | undefined, ms = 3000): Promise<T | null> {
  const end = Date.now() + ms;
  for (;;) {
    const el = find();
    if (el) return el;
    if (Date.now() > end) return null;
    await sleep(80);
  }
}

export default definePlugin({
  id: "betterSidebar",
  name: "BetterSidebar",
  description: "Side panel tweaks: hover-only header actions, a new-chat plus, default section states, and bulk delete of chats.",
  tags: ["Navigation", "Chats"],
  icon: I.sidebar,
  enabledByDefault: true,
  updated: "2026-10-14",
  dependencies: ["gemini", "ui"],
  settings: {
    titleRowHover: { type: "boolean", label: "Header actions on hover", description: "Show section header buttons (filter, add) only when hovering that section.", default: true },
    chatsPlus: { type: "boolean", label: "New chat plus", description: "Add a + to the chats header that starts a new chat.", default: true },
    notebooksDefaultCollapsed: { type: "boolean", label: "Collapse Notebooks", description: "Start with the Notebooks section collapsed on page load.", default: true },
    chatsDefaultExpanded: { type: "boolean", label: "Expand chats", description: "Start with the chats section expanded on page load.", default: false },
    clickToToggle: { type: "boolean", label: "Click to toggle", description: "Click empty space in the side panel to collapse or expand it.", default: false },
    batchSelect: { type: "boolean", label: "Bulk delete", description: "Checkboxes on chats for selecting several and deleting them together. Ctrl/⌘-click a chat to select it.", default: true },
  },
  start(ctx) {
    const gemini = ctx.use<GeminiApi>("gemini");
    const ui = ctx.use<UiApi>("ui");
    const s = ctx.settings;

    ctx.css(`
      ${
        s.titleRowHover
          ? `@media (min-width: 48rem) {
        side-navigation-content .expandable-section-header-actions { opacity: 0; transition: opacity .15s; }
        side-navigation-content expandable-section:is(:hover, :focus-within) .expandable-section-header-actions,
        side-navigation-content .expandable-section-header-actions:has([aria-expanded='true']) { opacity: 1; }
      }
      @media (prefers-reduced-motion: reduce) { side-navigation-content .expandable-section-header-actions { transition: none; } }`
          : ""
      }
      .ggpp-sb-plus { all: unset; display: inline-grid; place-items: center; width: 24px; height: 24px; border-radius: 50%; cursor: pointer; color: inherit; }
      .ggpp-sb-plus:hover { background: rgb(127 127 127 / 16%); }
      .ggpp-sb-check {
        position: absolute; left: 4px; top: 50%; transform: translateY(-50%); z-index: 2; width: 16px; height: 16px; margin: 0;
        accent-color: var(--ggpp-accent); cursor: pointer; opacity: 0;
      }
      gem-nav-list-item[data-test-id='conversation'] { position: relative; }
      gem-nav-list-item[data-test-id='conversation']:hover .ggpp-sb-check, .ggpp-sb-check:checked, .ggpp-sb-selecting .ggpp-sb-check { opacity: 1; }
      gem-nav-list-item.ggpp-sb-selected > a { background: color-mix(in srgb, var(--ggpp-accent) 14%, transparent) !important; }
      .ggpp-sb-bar {
        display: flex; align-items: center; gap: 6px; margin: 4px 8px; padding: 6px 6px 6px 12px; border-radius: 18px;
        background: var(--ggpp-surface-2); color: var(--ggpp-fg); font: 500 12px/16px var(--ggpp-font);
      }
      .ggpp-sb-bar span { flex: 1; }
      .ggpp-sb-bar .ggpp-btn { height: 28px; padding: 0 12px; font-size: 12px; }
    `);

    // ---------- default section states ----------
    const once = (key: string, want: boolean) => {
      const end = Date.now() + 10_000;
      const tick = () => {
        const btn = gemini.q(`${SECTION(key)} [data-test-id='expandable-section-toggle']`);
        if (btn) {
          if ((btn.getAttribute("aria-expanded") === "true") !== want) btn.click();
          return;
        }
        if (Date.now() < end) ctx.setTimeout(tick, 300);
      };
      tick();
    };
    if (s.notebooksDefaultCollapsed) once("notebooks", false);
    if (s.chatsDefaultExpanded) once("chats", true);

    // ---------- chats plus ----------
    if (s.chatsPlus) {
      ctx.cleanup(
        gemini.watch(`${SECTION("chats")} .expandable-section-header-actions`, (actions) => {
          const btn = h(
            "button",
            {
              class: "ggpp-sb-plus",
              type: "button",
              title: "New chat",
              "aria-label": "New chat",
              onclick: (e: Event) => {
                e.stopPropagation();
                gemini.navigate(gemini.newChatUrl());
              },
            },
            icon(I.plus, 16),
          );
          actions.prepend(btn);
          return () => btn.remove();
        }),
      );
    }

    // ---------- click empty space to toggle ----------
    if (s.clickToToggle) {
      document.addEventListener(
        "click",
        (e) => {
          const t = e.target as HTMLElement;
          const nav = t.closest?.(gemini.SEL.sidenav);
          if (!nav || t.closest("a, button, input, textarea, [role='button'], [role='menuitem'], sidenav-mavatar-footer, .ggpp-sb-bar")) return;
          if (getSelection()?.toString()) return;
          gemini.toggleSidenav();
        },
        { signal: ctx.signal },
      );
    }

    // ---------- bulk select ----------
    if (!s.batchSelect) return;
    const selected = new Set<string>();
    let bar: HTMLElement | null = null;

    const rowId = (row: Element) => row.querySelector<HTMLAnchorElement>(gemini.SEL.conversationLink)?.href.match(/\/([0-9a-f]{8,})(?:[/?#]|$)/i)?.[1] ?? null;
    const rowFor = (id: string) => gemini.qa(gemini.SEL.conversationRow).find((r) => rowId(r) === id) ?? null;

    function sync() {
      for (const row of gemini.qa(gemini.SEL.conversationRow)) {
        const id = rowId(row);
        const on = !!id && selected.has(id);
        row.classList.toggle("ggpp-sb-selected", on);
        const box = row.querySelector<HTMLInputElement>(".ggpp-sb-check");
        if (box) box.checked = on;
      }
      gemini.sidenav()?.classList.toggle("ggpp-sb-selecting", selected.size > 0);
      if (!selected.size) {
        bar?.remove();
        bar = null;
        return;
      }
      if (!bar) {
        bar = h(
          "div",
          { class: "ggpp-sb-bar", role: "toolbar" },
          h("span"),
          ui.button("Cancel", () => (selected.clear(), sync()), "ghost"),
          ui.button("Delete", () => void remove(), "danger"),
        );
      }
      bar.querySelector("span")!.textContent = `Selected · ${selected.size}`;
      const header = gemini.q(`${SECTION("chats")} .expandable-section-header-row`);
      if (header && bar.nextElementSibling !== header) header.before(bar);
    }

    function toggle(id: string) {
      if (selected.has(id)) selected.delete(id);
      else selected.add(id);
      sync();
    }

    async function remove() {
      const ids = [...selected];
      const n = ids.length;
      if (
        !(await ui.confirm({
          title: "Delete conversations",
          body: `Are you sure you want to delete ${n} conversation${n === 1 ? "" : "s"}? This cannot be undone.`,
          confirm: "Delete",
          danger: true,
        }))
      )
        return;
      selected.clear();
      sync();
      if (ids.includes(gemini.route().conversationId ?? "")) gemini.navigate(gemini.newChatUrl());
      let failed = 0;
      // Gemini has no bulk API here, so drive each row's own Delete, one at a time.
      for (const id of ids) {
        try {
          const row = await waitFor(() => rowFor(id));
          const menuBtn = row?.querySelector<HTMLElement>(`${gemini.SEL.rowMenuButton} button, ${gemini.SEL.rowMenuButton}`);
          if (!menuBtn) throw new Error("row menu not found");
          menuBtn.click();
          const del = await waitFor(() => document.querySelector<HTMLElement>("gem-menu-item[data-test-id='delete-button'], [role='menuitem'][data-test-id='delete-button']"));
          if (!del) throw new Error("delete item not found");
          del.click();
          const confirm = await waitFor(() => document.querySelector<HTMLElement>("[data-test-id='confirm-button']"));
          if (!confirm) throw new Error("confirm button not found");
          confirm.click();
          await waitFor(() => (rowFor(id) ? null : document.body), 4000);
        } catch (e) {
          failed++;
          ctx.log.warn(`could not delete ${id}`, e);
          document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
          await sleep(300);
        }
      }
      ui.toast({ title: failed ? `Deleted ${n - failed} of ${n}` : `Deleted ${n} conversation${n === 1 ? "" : "s"}`, icon: failed ? I.x : I.trash });
    }

    ctx.cleanup(
      gemini.watch(gemini.SEL.conversationRow, (row) => {
        const box = h("input", {
          type: "checkbox",
          class: "ggpp-sb-check",
          "aria-label": "Select conversation",
          onclick: (e: Event) => {
            e.stopPropagation();
            const id = rowId(row);
            if (id) toggle(id);
          },
        });
        row.append(box);
        sync();
        return () => box.remove();
      }),
    );
    document.addEventListener(
      "click",
      (e) => {
        if (!(e.ctrlKey || e.metaKey)) return;
        const row = (e.target as HTMLElement).closest?.(gemini.SEL.conversationRow);
        const id = row && rowId(row);
        if (!id) return;
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      },
      { capture: true, signal: ctx.signal },
    );
    ctx.cleanup(() => {
      selected.clear();
      bar?.remove();
      gemini.qa(".ggpp-sb-selected").forEach((r) => r.classList.remove("ggpp-sb-selected"));
      gemini.sidenav()?.classList.remove("ggpp-sb-selecting");
    });
  },
});
