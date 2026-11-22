import { definePlugin } from "../../shims/types";
import { h, icon } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import type { GeminiApi } from "../gemini";
import { whenDocumentBody } from "../../runtime";
import css from "./ui.css";

/**
 * Shared UI kit: theme tokens that follow Gemini's light/dark mode, toasts,
 * modals, confirm dialogs and small controls. Other plugins draw with it so
 * GG++ looks like one product.
 */

export interface ToastOptions {
  title?: string;
  body?: string;
  icon?: string[];
  /** ms; 0 keeps it until dismissed. */
  duration?: number;
  onClick?: () => void;
  actions?: { label: string; onClick: () => void }[];
}

export interface ModalHandle {
  root: HTMLElement;
  body: HTMLElement;
  close(): void;
}

export interface ModalOptions {
  title: string;
  icon?: string[];
  width?: number;
  content?: Node | Node[];
  footer?: Node | Node[];
  onClose?: () => void;
  className?: string;
}

export type MenuEntry =
  | { label: string; icon?: string[]; onClick: () => void; checked?: boolean; danger?: boolean; submenu?: undefined }
  | { label: string; icon?: string[]; submenu: () => MenuEntry[]; onClick?: undefined }
  | { separator: true }
  | { heading: string };

export interface UiApi {
  toast(o: ToastOptions): { close(): void };
  modal(o: ModalOptions): ModalHandle;
  confirm(o: { title: string; body?: string; confirm?: string; danger?: boolean }): Promise<boolean>;
  prompt(o: { title: string; label?: string; value?: string; multiline?: boolean }): Promise<string | null>;
  switch(checked: boolean, onChange: (v: boolean) => void, disabled?: boolean): HTMLElement;
  button(label: string | Node, onClick: (e: MouseEvent) => void, kind?: "primary" | "ghost" | "danger" | "default"): HTMLButtonElement;
  iconButton(paths: string[], title: string, onClick: (e: MouseEvent) => void): HTMLButtonElement;
  /** A pop-up menu below the anchor (or to its right, for submenus). Returns a function that closes it. */
  menu(anchor: HTMLElement, items: MenuEntry[], opts?: { side?: "below" | "right"; level?: number; onClose?: () => void }): () => void;
  theme(): "dark" | "light";
}

export default definePlugin({
  id: "ui",
  name: "UI Kit",
  description: "Toasts, dialogs and theme colors shared by all GG++ plugins.",
  tags: [],
  required: true,
  hidden: true,
  dependencies: ["gemini"],
  start(ctx) {
    const gemini = ctx.use<GeminiApi>("gemini");
    ctx.css(css);

    const root = h("div", { id: "ggpp-layer" });
    const toasts = h("div", { class: "ggpp-toasts" });
    root.append(toasts);

    const syncTheme = () => {
      document.documentElement.dataset.ggppTheme = gemini.theme();
    };
    syncTheme();
    // StartAt.Init may run before <body> exists — defer mount/observe.
    ctx.cleanup(
      whenDocumentBody((body) => {
        body.append(root);
        const mo = new MutationObserver(syncTheme);
        mo.observe(body, { attributes: true, attributeFilter: ["class", "style"] });
        return () => {
          mo.disconnect();
          root.remove();
        };
      }),
    );
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", syncTheme, { signal: ctx.signal });
    ctx.cleanup(() => {
      delete document.documentElement.dataset.ggppTheme;
    });

    function toast(o: ToastOptions) {
      const close = () => {
        el.classList.add("ggpp-out");
        setTimeout(() => el.remove(), 180);
      };
      const el = h(
        "div",
        { class: `ggpp-toast${o.onClick ? " ggpp-clickable" : ""}`, role: "status" },
        o.icon && h("span", { class: "ggpp-toast-icon" }, icon(o.icon, 18)),
        h(
          "div",
          { class: "ggpp-toast-text" },
          o.title && h("div", { class: "ggpp-toast-title" }, o.title),
          o.body && h("div", { class: "ggpp-toast-body" }, o.body),
          o.actions?.length &&
            h(
              "div",
              { class: "ggpp-toast-actions" },
              o.actions.map((a) =>
                h("button", { class: "ggpp-link", onclick: (e: Event) => (e.stopPropagation(), a.onClick(), close()) }, a.label),
              ),
            ),
        ),
        h(
          "button",
          { class: "ggpp-toast-x", title: "Dismiss", onclick: (e: Event) => (e.stopPropagation(), close()) },
          icon(I.x, 14),
        ),
      );
      if (o.onClick) el.addEventListener("click", () => (o.onClick!(), close()));
      toasts.append(el);
      const duration = o.duration ?? 5000;
      if (duration > 0) setTimeout(close, duration);
      return { close };
    }

    function modal(o: ModalOptions): ModalHandle {
      const body = h("div", { class: "ggpp-modal-body" }, o.content as any);
      const close = () => {
        backdrop.remove();
        window.removeEventListener("keydown", onKey, true);
        o.onClose?.();
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.key !== "Escape" || root.lastElementChild !== backdrop) return;
        e.stopPropagation();
        close();
      };
      const dialog = h(
        "div",
        {
          class: `ggpp-modal ${o.className ?? ""}`,
          role: "dialog",
          "aria-modal": "true",
          "aria-label": o.title,
          style: { width: `min(${o.width ?? 560}px, calc(100vw - 32px))` },
        },
        h(
          "header",
          { class: "ggpp-modal-head" },
          o.icon && icon(o.icon, 20),
          h("h2", null, o.title),
          h("button", { class: "ggpp-icon-btn", title: "Close", onclick: close }, icon(I.x, 18)),
        ),
        body,
        o.footer && h("footer", { class: "ggpp-modal-foot" }, o.footer as any),
      );
      const backdrop = h("div", { class: "ggpp-backdrop" }, dialog);
      let backdropGesture = false;
      backdrop.addEventListener("pointerdown", (e) => {
        backdropGesture = e.target === backdrop;
      });
      backdrop.addEventListener("click", (e) => {
        if (backdropGesture && e.target === backdrop) close();
        backdropGesture = false;
      });
      window.addEventListener("keydown", onKey, true);
      root.append(backdrop);
      ctx.cleanup(() => backdrop.isConnected && close());
      return { root: dialog, body, close };
    }

    function button(label: string | Node, onClick: (e: MouseEvent) => void, kind = "default") {
      return h("button", { class: `ggpp-btn ggpp-btn-${kind}`, type: "button", onclick: onClick }, label);
    }

    /** Open menus, outermost first. A submenu replaces any deeper ones. */
    const menus: { el: HTMLElement; onClose?: () => void }[] = [];
    const closeFrom = (level: number) => {
      for (const m of menus.splice(level)) {
        m.el.remove();
        m.onClose?.();
      }
      if (!menus.length) window.removeEventListener("mousedown", outside, true);
    };
    const outside = (e: Event) => {
      if (!menus.some((m) => m.el.contains(e.target as Node))) closeFrom(0);
    };
    ctx.cleanup(() => closeFrom(0));

    function openMenu(anchor: HTMLElement, items: MenuEntry[], opts: { side?: "below" | "right"; level?: number; onClose?: () => void } = {}) {
      const level = Math.min(opts.level ?? 0, menus.length);
      closeFrom(level);
      const sub = (el: HTMLElement, entries: () => MenuEntry[]) => {
        const show = () => {
          if (menus[level + 1]?.el.dataset.owner === el.dataset.key) return;
          openMenu(el, entries(), { side: "right", level: level + 1 });
          menus[level + 1].el.dataset.owner = el.dataset.key!;
        };
        el.addEventListener("pointerenter", show);
        el.addEventListener("click", (e) => (e.stopPropagation(), show()));
        el.addEventListener("keydown", (e) => {
          if (e.key !== "ArrowRight") return;
          e.preventDefault();
          show();
          menus[level + 1]?.el.querySelector<HTMLElement>(".ggpp-menu-item")?.focus();
        });
      };
      const menu = h(
        "div",
        { class: "ggpp-menu", role: "menu" },
        items.map((it, i) => {
          if ("separator" in it) return h("div", { class: "ggpp-menu-sep", role: "separator" });
          if ("heading" in it) return h("div", { class: "ggpp-menu-heading" }, it.heading);
          const el = h(
            "button",
            {
              class: `ggpp-menu-item${"danger" in it && it.danger ? " ggpp-danger" : ""}`,
              role: "menuitem",
              type: "button",
              dataset: { key: `${level}-${i}` },
              "aria-haspopup": it.submenu ? "menu" : undefined,
            },
            it.icon ? icon(it.icon, 16) : h("span", { class: "ggpp-menu-gap" }),
            h("span", null, it.label),
            it.submenu ? icon(I.chevronRight, 16, { class: "ggpp-icon ggpp-menu-check ggpp-menu-more" }) : it.checked && icon(I.check, 16, { class: "ggpp-icon ggpp-menu-check" }),
          );
          if (it.submenu) sub(el, it.submenu);
          else {
            const run = it.onClick;
            el.addEventListener("click", () => (closeFrom(0), run()));
            // Moving onto a plain item closes a sibling's submenu.
            el.addEventListener("pointerenter", () => closeFrom(level + 1));
          }
          return el;
        }),
      );
      menu.addEventListener("keydown", (e) => {
        const all = [...menu.querySelectorAll<HTMLElement>(".ggpp-menu-item")];
        const i = all.indexOf(document.activeElement as HTMLElement);
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          all[(i + (e.key === "ArrowDown" ? 1 : all.length - 1)) % all.length]?.focus();
        } else if (e.key === "Escape" || (e.key === "ArrowLeft" && level > 0)) {
          e.preventDefault();
          e.stopPropagation();
          closeFrom(level);
          if (level > 0) anchor.focus();
        }
      });
      root.append(menu);
      menus.push({ el: menu, onClose: opts.onClose });
      const r = anchor.getBoundingClientRect();
      const mh = menu.offsetHeight;
      const mw = menu.offsetWidth;
      let top: number, left: number;
      if (opts.side === "right") {
        left = r.right + 4 + mw > innerWidth ? Math.max(8, r.left - mw - 4) : r.right + 4;
        top = Math.min(Math.max(8, r.top - 8), innerHeight - mh - 8);
      } else {
        top = r.bottom + 4 + mh > innerHeight ? Math.max(8, r.top - mh - 4) : r.bottom + 4;
        left = Math.min(Math.max(8, r.left), innerWidth - mw - 8);
      }
      Object.assign(menu.style, { top: `${top}px`, left: `${left}px` });
      if (menus.length === 1) setTimeout(() => menus.length && window.addEventListener("mousedown", outside, true));
      return () => closeFrom(menus.findIndex((m) => m.el === menu) === -1 ? menus.length : menus.findIndex((m) => m.el === menu));
    }

    const api: UiApi = {
      toast,
      modal,
      confirm: (o) =>
        new Promise((resolve) => {
          let done = false;
          const finish = (v: boolean) => {
            if (done) return;
            done = true;
            m.close();
            resolve(v);
          };
          const m = modal({
            title: o.title,
            width: 420,
            content: o.body ? h("p", { class: "ggpp-muted" }, o.body) : [],
            footer: [
              button("Cancel", () => finish(false), "ghost"),
              button(o.confirm ?? "OK", () => finish(true), o.danger ? "danger" : "primary"),
            ],
            onClose: () => finish(false),
          });
        }),
      prompt: (o) =>
        new Promise((resolve) => {
          let done = false;
          const input = o.multiline
            ? h("textarea", { class: "ggpp-input", rows: 6, value: o.value ?? "" })
            : h("input", { class: "ggpp-input", value: o.value ?? "" });
          const finish = (v: string | null) => {
            if (done) return;
            done = true;
            m.close();
            resolve(v);
          };
          input.addEventListener("keydown", (e) => {
            const k = e as KeyboardEvent;
            if (k.key === "Enter" && (!o.multiline || k.metaKey || k.ctrlKey)) finish(input.value);
          });
          const m = modal({
            title: o.title,
            width: 460,
            content: [o.label ? h("label", { class: "ggpp-label" }, o.label) : document.createTextNode(""), input],
            footer: [button("Cancel", () => finish(null), "ghost"), button("Save", () => finish(input.value), "primary")],
            onClose: () => finish(null),
          });
          setTimeout(() => input.focus());
        }),
      switch(checked, onChange, disabled) {
        const el = h("button", {
          class: "ggpp-switch",
          role: "switch",
          type: "button",
          "aria-checked": String(checked),
          disabled: !!disabled,
          onclick: (e: Event) => {
            e.stopPropagation();
            const next = el.getAttribute("aria-checked") !== "true";
            el.setAttribute("aria-checked", String(next));
            onChange(next);
          },
        });
        return el;
      },
      button,
      iconButton: (paths, title, onClick) =>
        h("button", { class: "ggpp-icon-btn", type: "button", title, "aria-label": title, onclick: onClick }, icon(paths, 18)),
      menu: openMenu,
      theme: gemini.theme,
    };
    ctx.provide("ui", api);
  },
});
