import { definePlugin } from "../../shims/types";
import { h, icon } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import { truncate } from "../../../../src/lib/text";
import type { NavigatorApi } from "../betterNavigator";
import type { GeminiApi } from "../gemini";

/** Star any message, see this chat's starred list from the top bar, and jump back to it. */

interface Star {
  conversationId: string;
  messageId: string;
  role: "user" | "model";
  snippet: string;
  title: string;
  at: number;
}

const ORANGE = "#ff7a17";

export default definePlugin({
  id: "messageStars",
  name: "MessageStars",
  description: "Star any message from its hover toolbar, then open this chat's starred list from the top bar to jump back.",
  tags: ["Messages"],
  icon: I.star,
  updated: "2026-10-14",
  dependencies: ["gemini"],
  settings: {
    showInHeader: { type: "boolean", label: "Starred list in top bar", description: "Show a star next to the conversation menu that opens this chat's starred messages.", default: true },
  },
  async start(ctx) {
    const gemini = ctx.use<GeminiApi>("gemini");
    let stars = await ctx.data.get<Star[]>("stars", []);
    // Stars made in another tab.
    ctx.on("data:changed", ({ key, value }: { key: string; value: Star[] }) => {
      if (key !== "messageStars:stars" || !Array.isArray(value)) return;
      stars = value;
      refresh();
    });
    const save = () => ctx.data.set("stars", stars);
    const nav = () => ctx.tryUse<NavigatorApi>("navigator");

    ctx.css(`
      .ggpp-star-btn { all: unset; box-sizing: border-box; display: inline-grid; place-items: center; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; color: var(--gem-sys-color--on-surface-variant, currentColor); }
      .ggpp-star-btn:hover, .ggpp-star-btn:focus-visible { background: rgb(127 127 127 / 14%); }
      .ggpp-star-btn[aria-pressed="true"] { color: ${ORANGE}; background: color-mix(in srgb, ${ORANGE} 14%, transparent); }
      .ggpp-star-btn[aria-pressed="true"] svg { fill: currentColor; }
      .ggpp-stars-wrap { position: relative; display: inline-flex; align-items: center; }
      .ggpp-stars-wrap.ggpp-has .ggpp-star-btn { color: ${ORANGE}; }
      .ggpp-stars-list {
        position: fixed; z-index: 2147482600; width: min(18rem, 70vw); max-height: 60vh; overflow: auto; padding: 8px;
        border-radius: 12px; background: var(--ggpp-surface); color: var(--ggpp-fg); box-shadow: var(--ggpp-shadow); font: 13px/18px var(--ggpp-font);
      }
      .ggpp-stars-list[hidden] { display: none; }
      .ggpp-stars-head { display: flex; align-items: center; gap: 6px; padding: 4px 8px 8px; font-weight: 500; color: ${ORANGE}; }
      .ggpp-stars-row { display: flex; align-items: center; gap: 8px; padding: 6px 4px 6px 8px; border-radius: 8px; cursor: pointer; }
      .ggpp-stars-row:hover { background: var(--ggpp-hover); }
      .ggpp-stars-role { color: var(--ggpp-fg-3); flex: none; width: 3.6em; }
      .ggpp-stars-text { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .ggpp-stars-row .ggpp-star-btn { width: 26px; height: 26px; }
      .ggpp-stars-empty { padding: 8px; color: var(--ggpp-fg-2); }
    `);

    const conv = () => gemini.route().conversationId;
    const idOf = (el: HTMLElement): string | null => {
      if (el.matches(gemini.SEL.modelResponse)) return gemini.responseId(el);
      const turn = el.closest<HTMLElement>(gemini.SEL.conversationTurn);
      return turn?.id ? `${turn.id}:u` : null;
    };
    const isStarred = (mid: string) => stars.some((s) => s.conversationId === conv() && s.messageId === mid);

    function toggle(el: HTMLElement) {
      const c = conv();
      const mid = idOf(el);
      if (!c || !mid) return;
      if (isStarred(mid)) stars = stars.filter((s) => !(s.conversationId === c && s.messageId === mid));
      else {
        const role = el.matches(gemini.SEL.modelResponse) ? "model" : "user";
        stars.push({
          conversationId: c,
          messageId: mid,
          role,
          snippet: truncate(gemini.messageText(el, role).replace(/\s+/g, " ").trim(), 61) || "Starred",
          title: gemini.title(),
          at: Date.now(),
        });
      }
      void save();
      refresh();
    }

    const buttons = new Map<HTMLElement, HTMLButtonElement>();
    function starButton(msg: HTMLElement) {
      const btn = h(
        "button",
        {
          class: "ggpp-star-btn",
          type: "button",
          onclick: (e: Event) => {
            e.stopPropagation();
            toggle(msg);
          },
        },
        icon(I.star, 18),
      );
      buttons.set(msg, btn);
      syncButton(msg, btn);
      return btn;
    }
    function syncButton(msg: HTMLElement, btn: HTMLButtonElement) {
      const mid = idOf(msg);
      const on = !!mid && isStarred(mid);
      btn.setAttribute("aria-pressed", String(on));
      btn.title = on ? "Unstar" : "Star";
      btn.setAttribute("aria-label", btn.title);
    }

    // Model replies: the action row under each reply.
    ctx.cleanup(
      gemini.watch(`${gemini.SEL.modelResponse} message-actions`, (row) => {
        const msg = row.closest<HTMLElement>(gemini.SEL.modelResponse)!;
        const host = row.querySelector(".actions-container-v2, .buttons-container-v2, .response-actions") ?? row.firstElementChild ?? row;
        const btn = starButton(msg);
        host.append(btn);
        return () => {
          btn.remove();
          buttons.delete(msg);
        };
      }),
    );
    // Your prompts: the hover actions next to the bubble.
    ctx.cleanup(
      gemini.watch(`${gemini.SEL.userQuery} .luminous-actions-container, ${gemini.SEL.userQuery} .query-content-actions`, (row) => {
        const msg = row.closest<HTMLElement>(gemini.SEL.userQuery)!;
        if (buttons.has(msg)) return;
        const btn = starButton(msg);
        row.append(btn);
        return () => {
          btn.remove();
          buttons.delete(msg);
        };
      }),
    );

    // ---------- top bar list ----------

    const list = h("div", { class: "ggpp-stars-list", hidden: true, role: "dialog", "aria-label": "Starred messages" });
    document.body.append(list);
    ctx.cleanup(() => list.remove());
    let wrap: HTMLElement | null = null;
    let pinned = false;
    let hoverTimer: ReturnType<typeof setTimeout> | undefined;

    function renderList() {
      const mine = stars.filter((s) => s.conversationId === conv());
      const order = gemini.messages().map((m) => idOf(m.el));
      mine.sort((a, b) => {
        const ia = order.indexOf(a.messageId);
        const ib = order.indexOf(b.messageId);
        if (ia >= 0 && ib >= 0) return ia - ib;
        if (ia >= 0) return -1;
        if (ib >= 0) return 1;
        return b.at - a.at;
      });
      list.replaceChildren(
        h("div", { class: "ggpp-stars-head" }, icon(I.star, 16), "Starred"),
        ...(mine.length
          ? mine.map((s) =>
              h(
                "div",
                {
                  class: "ggpp-stars-row",
                  onclick: () => {
                    closeList();
                    const target = gemini.messages().find((m) => idOf(m.el) === s.messageId);
                    if (!target) return;
                    const n = nav();
                    if (n) n.jump(target.el);
                    else target.el.scrollIntoView({ block: "start" });
                  },
                },
                h("span", { class: "ggpp-stars-role" }, s.role === "user" ? "You" : "Gemini"),
                h("span", { class: "ggpp-stars-text", title: s.snippet }, s.snippet),
                h(
                  "button",
                  {
                    class: "ggpp-star-btn",
                    type: "button",
                    "aria-pressed": "true",
                    title: "Unstar",
                    onclick: (e: Event) => {
                      e.stopPropagation();
                      stars = stars.filter((x) => x !== s);
                      void save();
                      refresh();
                    },
                  },
                  icon(I.star, 16),
                ),
              ),
            )
          : [h("div", { class: "ggpp-stars-empty" }, "No starred messages in this chat")]),
      );
    }

    function openList() {
      if (!wrap) return;
      renderList();
      list.hidden = false;
      const r = wrap.getBoundingClientRect();
      const below = r.bottom + 6;
      list.style.left = `${Math.max(8, r.right - list.offsetWidth)}px`;
      list.style.top = below + list.offsetHeight > innerHeight ? `${Math.max(8, r.top - 6 - list.offsetHeight)}px` : `${below}px`;
    }
    function closeList() {
      list.hidden = true;
      pinned = false;
    }

    if (ctx.settings.showInHeader) {
      ctx.cleanup(
        gemini.watch(`${gemini.SEL.topBar} ${gemini.SEL.conversationMenuButton}`, (more) => {
          const btn = h("button", { class: "ggpp-star-btn", type: "button", title: "Starred messages", "aria-label": "Starred messages" }, icon(I.star, 18));
          wrap = h("span", { class: "ggpp-stars-wrap" }, btn);
          const w = wrap;
          more.before(w);
          const fine = matchMedia("(pointer: fine)").matches;
          w.addEventListener("mouseenter", () => {
            if (!fine) return;
            clearTimeout(hoverTimer);
            hoverTimer = setTimeout(openList, 120);
          });
          const leave = () => {
            clearTimeout(hoverTimer);
            if (!pinned) hoverTimer = setTimeout(() => !list.matches(":hover") && !w.matches(":hover") && closeList(), 180);
          };
          w.addEventListener("mouseleave", leave);
          list.addEventListener("mouseleave", leave);
          list.addEventListener("mouseenter", () => clearTimeout(hoverTimer));
          btn.addEventListener("click", () => {
            if (pinned) closeList();
            else {
              pinned = true;
              openList();
            }
          });
          btn.addEventListener("focus", openList);
          syncHeader();
          return () => {
            w.remove();
            if (wrap === w) wrap = null;
          };
        }),
      );
      document.addEventListener(
        "pointerdown",
        (e) => {
          if (list.hidden) return;
          const t = e.target as Node;
          if (!list.contains(t) && !wrap?.contains(t)) closeList();
        },
        { capture: true, signal: ctx.signal },
      );
      document.addEventListener("keydown", (e) => e.key === "Escape" && !list.hidden && closeList(), { signal: ctx.signal });
    }

    function syncHeader() {
      wrap?.classList.toggle("ggpp-has", stars.some((s) => s.conversationId === conv()));
    }

    function refresh() {
      buttons.forEach((btn, msg) => syncButton(msg, btn));
      syncHeader();
      if (!list.hidden) renderList();
      const marked = new Set(gemini.messages().filter((m) => { const id = idOf(m.el); return !!id && isStarred(id); }).map((m) => m.el));
      nav()?.setMarks(marked);
    }
    ctx.on("gemini:route", () => {
      closeList();
      setTimeout(refresh, 300);
    });
    ctx.on("plugin:started", (id: string) => id === "betterNavigator" && refresh());
    setTimeout(refresh, 500);
    ctx.cleanup(() => nav()?.setMarks(new Set()));
  },
});
