import { definePlugin } from "../../shims/types";
import { h, icon, nextFrame } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import type { GeminiApi } from "../gemini";
import type { MenuEntry, UiApi } from "../ui";

/**
 * Adds plugin items to Gemini's own pop-up menus (Angular Material overlays).
 * It notes which button opened a menu, classifies the menu, and appends the
 * registered items styled like Gemini's.
 */

export type MenuLocation = "conversation" | "message" | "settings" | "model" | "other";

export interface MenuContext {
  location: MenuLocation;
  trigger: HTMLElement;
  /** Conversation id for "conversation" menus, when it can be read. */
  conversationId?: string | null;
  /** The model-response element for "message" menus. */
  message?: HTMLElement;
}

export interface MenuItem {
  id: string;
  location: MenuLocation;
  label: string | ((c: MenuContext) => string);
  icon?: string[];
  order?: number;
  /** Return false to hide the item for this menu. */
  when?: (c: MenuContext) => boolean;
  /** Called when the item is chosen. Ignored when the item has a submenu. */
  onSelect?(c: MenuContext): void;
  /** Entries of a flyout that opens beside the item on hover or click. */
  submenu?(c: MenuContext): MenuEntry[];
}

export interface MenusApi {
  register(item: MenuItem): () => void;
}

function classify(trigger: HTMLElement, sel: GeminiApi["SEL"]): MenuContext {
  const label = `${trigger.getAttribute("aria-label") ?? ""} ${trigger.getAttribute("mattooltip") ?? ""} ${trigger.dataset.testId ?? ""}`;
  const iconName = trigger.querySelector("mat-icon")?.getAttribute("fonticon") ?? trigger.querySelector("mat-icon")?.textContent?.trim() ?? "";
  if (trigger.closest(sel.modelResponse)) {
    return { location: "message", trigger, message: trigger.closest<HTMLElement>(sel.modelResponse)! };
  }
  const row = trigger.closest<HTMLElement>(sel.conversationRow);
  if (row) {
    const href = row.querySelector<HTMLAnchorElement>(sel.conversationLink)?.href ?? "";
    return { location: "conversation", trigger, conversationId: href.match(/\/([0-9a-f]{8,})(?:[/?#]|$)/i)?.[1] ?? null };
  }
  if (trigger.closest(sel.conversationMenuButton) || /conversation actions/i.test(label)) {
    return { location: "conversation", trigger, conversationId: location.pathname.match(/\/([0-9a-f]{8,})(?:[/?#]|$)/i)?.[1] ?? null };
  }
  if (trigger.matches("[data-test-id='bard-mode-menu-button']") || trigger.closest("bard-mode-switcher")) {
    return { location: "model", trigger };
  }
  if (iconName === "settings" || /settings|设置|設定/i.test(label)) return { location: "settings", trigger };
  return { location: "other", trigger };
}

export default definePlugin({
  id: "menus",
  name: "Menu Items",
  description: "Lets plugins add entries to Gemini's conversation, response and settings menus.",
  tags: [],
  required: true,
  hidden: true,
  dependencies: ["gemini", "ui"],
  start(ctx) {
    const gemini = ctx.use<GeminiApi>("gemini");
    const ui = ctx.use<UiApi>("ui");
    /** Closes the flyout opened from a native menu, if any. */
    let closeSub: (() => void) | null = null;
    const dropSub = () => {
      const close = closeSub;
      closeSub = null;
      close?.();
    };
    ctx.cleanup(dropSub);
    const items = new Map<string, MenuItem>();
    let lastTrigger: HTMLElement | null = null;

    const PANEL = "gem-menu, .mat-mdc-menu-panel, [role='menu']";
    const ITEM = "gem-menu-item, [role^='menuitem']";
    const inMenu = (el: Element) => !!el.closest(`${PANEL}, .cdk-overlay-container`);

    const remember = (e: Event) => {
      const t = (e.target as HTMLElement | null)?.closest?.<HTMLElement>("button, [role='button'], a, gem-icon-button");
      if (t && !inMenu(t)) lastTrigger = t;
    };
    for (const ev of ["pointerdown", "click", "keydown"]) document.addEventListener(ev, remember, { capture: true, signal: ctx.signal });

    function closeMenu(panel: HTMLElement) {
      const esc = () => new KeyboardEvent("keydown", { key: "Escape", code: "Escape", keyCode: 27, bubbles: true });
      panel.dispatchEvent(esc());
      document.querySelector<HTMLElement>(".cdk-overlay-backdrop")?.click();
      document.dispatchEvent(esc());
    }

    /** Native-looking item: a clone of a neighbour (keeps Gemini's scoped styles) with our icon and label. */
    function makeItem(template: HTMLElement | undefined, item: MenuItem, c: MenuContext, panel: HTMLElement): HTMLElement {
      const label = typeof item.label === "function" ? item.label(c) : item.label;
      const svgIcon = icon(item.icon ?? I.puzzle, 20);
      let el: HTMLElement;
      if (template) {
        el = template.cloneNode(true) as HTMLElement;
        for (const n of [el, ...el.querySelectorAll<HTMLElement>("*")]) {
          for (const attr of ["data-test-id", "href", "id", "value", "leadingicon", "aria-describedby", "jslog", "target"]) n.removeAttribute(attr);
        }
        el.classList.remove("mat-mdc-menu-item-highlighted", "cdk-focused", "cdk-mouse-focused", "cdk-keyboard-focused");
        el.setAttribute("data-active", "false");
        el.querySelectorAll(".trailing-container > *, .gem-menu-item-trailing-icon").forEach((n) => n.remove());
        const iconBox = el.querySelector("gem-icon");
        if (iconBox) iconBox.replaceChildren(h("span", { class: "ggpp-native-icon" }, svgIcon));
        else el.prepend(h("span", { class: "ggpp-native-icon ggpp-native-icon-pad" }, svgIcon));
        el.querySelectorAll("mat-icon").forEach((n) => n.remove());
        // Most specific label node first; querySelector with a list would return the outer wrapper.
        const text = [".label span", ".label", ".gem-menu-item-label", ".mat-mdc-menu-item-text"].map((sel) => el.querySelector(sel)).find(Boolean) ?? el;
        text.textContent = label;
      } else {
        el = h("button", { class: "mat-mdc-menu-item mat-focus-indicator", type: "button" }, h("span", { class: "ggpp-native-icon" }, svgIcon), h("span", null, label));
      }
      el.classList.add("ggpp-native-item");
      el.setAttribute("role", "menuitem");
      el.dataset.ggppItem = item.id;
      if (item.submenu) {
        el.setAttribute("aria-haspopup", "menu");
        el.append(h("span", { class: "ggpp-native-more" }, icon(I.chevronRight, 18)));
        // Choosing an entry deep in the flyout also closes Gemini's menu.
        const wrap = (entries: MenuEntry[]): MenuEntry[] =>
          entries.map((en) => {
            if ("submenu" in en && en.submenu) {
              const inner = en.submenu;
              return { ...en, submenu: () => wrap(inner()) };
            }
            if ("onClick" in en && en.onClick) {
              const run = en.onClick;
              return {
                ...en,
                onClick: () => {
                  closeSub = null;
                  closeMenu(panel);
                  try {
                    run();
                  } catch (err) {
                    ctx.log.error(`menu item ${item.id} failed`, err);
                  }
                },
              };
            }
            return en;
          });
        const show = () => {
          if (closeSub) return;
          closeSub = ui.menu(el, wrap(item.submenu!(c)), { side: "right", onClose: () => (closeSub = null) });
        };
        el.addEventListener("pointerenter", show);
        el.addEventListener(
          "click",
          (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            show();
          },
          true,
        );
        el.addEventListener("keydown", (e) => {
          if (e.key !== "ArrowRight" && e.key !== "Enter" && e.key !== " ") return;
          e.preventDefault();
          e.stopImmediatePropagation();
          show();
          document.querySelector<HTMLElement>("#ggpp-layer .ggpp-menu:last-of-type .ggpp-menu-item")?.focus();
        }, true);
        return el;
      }
      el.addEventListener(
        "click",
        (e) => {
          e.preventDefault();
          e.stopImmediatePropagation();
          closeMenu(panel);
          try {
            item.onSelect?.(c);
          } catch (err) {
            ctx.log.error(`menu item ${item.id} failed`, err);
          }
        },
        true,
      );
      return el;
    }

    function fill(panel: HTMLElement, trigger: HTMLElement | null) {
      if (!trigger) return;
      const c = classify(trigger, gemini.SEL);
      const list = [...items.values()]
        .filter((i) => i.location === c.location && (!i.when || i.when(c)))
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      if (!list.length) return;
      const native = [...panel.querySelectorAll<HTMLElement>(ITEM)].filter((n) => !n.closest(".ggpp-native-item") && n.parentElement?.closest(ITEM) === null);
      if (!native.length) return;
      // Conversation menus: just above the last (destructive) action, like Delete. Elsewhere: at the end.
      const anchor = c.location === "conversation" && native.length > 1 ? native[native.length - 1] : null;
      const template = (anchor ? native[native.length - 2] : native[native.length - 1]) ?? native[0];
      const nodes = list.map((item) => makeItem(template, item, c, panel));
      if (anchor) anchor.before(...nodes);
      else native[native.length - 1].after(h("div", { class: "ggpp-native-item ggpp-native-sep", role: "separator" }), ...nodes);
    }

    ctx.css(`
      .ggpp-native-icon { display: inline-grid; place-items: center; width: 100%; height: 100%; min-width: 20px; min-height: 20px; color: var(--mat-menu-item-icon-color, currentColor); }
      .ggpp-native-icon-pad { width: 24px; height: 24px; flex: none; margin-inline-end: 12px; }
      .ggpp-native-item { cursor: pointer; }
      .ggpp-native-more { display: inline-grid; place-items: center; margin-inline-start: auto; padding-inline-start: 12px; color: var(--mat-menu-item-icon-color, currentColor); }
      .ggpp-native-sep { height: 1px; margin: 8px 0; background: var(--gem-sys-color--outline-variant, rgb(127 127 127 / 25%)); cursor: default; }
    `);

    ctx.cleanup(
      gemini.watch(PANEL, (panel) => {
        // GG++'s own pop-up menus also have role=menu.
        if (panel.parentElement?.closest(PANEL) || panel.closest("#ggpp-layer")) return;
        const run = () => {
          if (!panel.querySelector(".ggpp-native-item")) fill(panel, lastTrigger);
        };
        nextFrame(run);
        // Hovering one of Gemini's own items closes a flyout opened from ours.
        const offHover = (e: Event) => {
          const t = (e.target as HTMLElement).closest?.(ITEM);
          if (t && !t.closest(".ggpp-native-item")) dropSub();
        };
        panel.addEventListener("pointerover", offHover);
        // Menus may be rebuilt while open, or reused for the next opening (data-visible flips).
        const mo = new MutationObserver((records) => {
          if (records.some((r) => r.type === "attributes" && panel.getAttribute("data-visible") === "true")) {
            panel.querySelectorAll(".ggpp-native-item").forEach((n) => n.remove());
          }
          if (panel.getAttribute("data-visible") === "false") dropSub();
          run();
        });
        mo.observe(panel, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-visible"] });
        return () => {
          mo.disconnect();
          panel.removeEventListener("pointerover", offHover);
          dropSub();
        };
      }),
    );
    ctx.cleanup(() => document.querySelectorAll(".ggpp-native-item").forEach((n) => n.remove()));

    ctx.provide("menus", {
      register(item) {
        items.set(item.id, item);
        return () => items.delete(item.id);
      },
    } satisfies MenusApi);
  },
});
