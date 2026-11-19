import { definePlugin } from "../../shims/types";
import { debounce, h, icon, isVisible, uid } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import type { ModelsApi } from "../betterModeSelect";
import type { GeminiApi, ResponseEvent, Route } from "../gemini";
import type { UiApi } from "../ui";
import { adopt, MAX_ITEMS, MAX_TEXT, move, prune, type Item, type Queues } from "./store";

/**
 * A message queue for Gemini, which has none: press Enter while a reply is being written and the
 * message waits in a tray above the message box. Each time a reply finishes, the next one is sent,
 * with the model that was selected when it was queued.
 */

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default definePlugin({
  id: "betterQueue",
  name: "BetterQueue",
  description: "Press Enter while Gemini is replying to queue your next message. Queued messages are sent in order as each reply finishes.",
  tags: ["Composer"],
  icon: I.list,
  enabledByDefault: true,
  updated: "2026-10-21",
  dependencies: ["gemini", "ui"],
  liveSettings: true,
  settings: {
    showQueueMode: {
      type: "boolean",
      label: "Model per message",
      description: "Remember the model selected when a message is queued, show it on the message, and send with it. Needs BetterModeSelect.",
      default: true,
    },
    persistAcrossRefresh: {
      type: "boolean",
      label: "Keep after refresh",
      description: "Restore unsent queued messages in this browser after a reload (for 24 hours).",
      default: true,
    },
  },
  async start(ctx) {
    const gemini = ctx.use<GeminiApi>("gemini");
    const ui = ctx.use<UiApi>("ui");
    const models = () => (ctx.settings.showQueueMode ? ctx.tryUse<ModelsApi>("models") : undefined);

    let queues: Queues = ctx.settings.persistAcrossRefresh ? prune(await ctx.data.get<Queues>("queues", {}), Date.now()) : {};
    /** Chats whose queue stopped because a reply was stopped or failed. */
    const paused = new Set<string>();
    let sending = false;
    let collapsed = false;
    const trays = new Set<HTMLElement>();

    const keyOf = (r: Route) => r.conversationId ?? (r.isHome ? "new" : null);
    const key = () => keyOf(gemini.route());
    const list = (k = key()) => (k ? (queues[k] ?? []) : []);
    const setList = (k: string, items: Item[]) => {
      if (items.length) queues = { ...queues, [k]: items };
      else {
        const { [k]: _, ...rest } = queues;
        queues = rest;
        paused.delete(k);
      }
      save();
      render();
    };
    const save = debounce(() => void ctx.data.set("queues", ctx.settings.persistAcrossRefresh ? prune(queues, Date.now()) : {}), 300);
    ctx.cleanup(() => save.cancel());
    // Queued in another tab, or sent from it.
    ctx.on("data:changed", ({ key: k, value }: { key: string; value: Queues }) => {
      if (k !== "betterQueue:queues" || sending || !value || typeof value !== "object") return;
      queues = { ...value, ...(queues.new ? { new: queues.new } : {}) };
      render();
    });

    const replying = () => gemini.isGenerating() || gemini.qa(gemini.SEL.stop).some(isVisible);

    // ---------- queueing ----------

    window.addEventListener(
      "keydown",
      (e) => {
        if (e.key !== "Enter" || e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || e.isComposing) return;
        if (!gemini.editor()?.contains(e.target as Node) || !replying()) return;
        const k = key();
        const text = gemini.editorText().trim();
        if (!k || !text) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        if (list(k).length >= MAX_ITEMS) {
          ui.toast({ title: "Queue is full", body: `At most ${MAX_ITEMS} messages can wait in one chat.`, icon: I.list });
          return;
        }
        setList(k, [...list(k), { id: uid("q"), text: text.slice(0, MAX_TEXT), model: models()?.current() ?? "", at: Date.now() }]);
        gemini.setEditorText("");
      },
      { capture: true, signal: ctx.signal },
    );

    // ---------- sending ----------

    async function until(test: () => boolean, ms: number) {
      for (const end = Date.now() + ms; Date.now() < end; await sleep(100)) if (test()) return true;
      return test();
    }

    async function sendItem(k: string, it: Item) {
      if (sending || key() !== k) return;
      sending = true;
      render();
      const draft = gemini.editorText().trim();
      const m = models();
      const before = m?.current() ?? "";
      try {
        if (m && it.model && it.model !== before) {
          await m.pickByName(it.model);
          await sleep(300);
        }
        gemini.setEditorText(it.text);
        const ready = () => {
          const b = gemini.sendButton();
          return !!b && !b.matches(".stop, [disabled]") && !b.closest(".stop") && !replying();
        };
        // A short reply can come and go between checks, so a new message on the page also counts.
        const sent = gemini.qa(gemini.SEL.userQuery).length;
        const started = (await until(ready, 3000)) && gemini.send() && (await until(() => replying() || gemini.qa(gemini.SEL.userQuery).length > sent, 6000));
        if (!started) {
          gemini.setEditorText(draft);
          paused.add(k);
          ui.toast({ title: "Queued message not sent", body: "Gemini didn't accept it. The queue is paused; press Resume to try again.", icon: I.list });
          return;
        }
        setList(
          k,
          list(k).filter((x) => x.id !== it.id),
        );
        // Gemini empties the box when it sends; put back what you were typing.
        if (draft) setTimeout(() => !gemini.editorText().trim() && gemini.setEditorText(draft), 400);
        if (m && it.model && before && before !== it.model) await m.pickByName(before);
      } catch (e) {
        ctx.log.error("sending a queued message failed", e);
        paused.add(k);
      } finally {
        sending = false;
        render();
      }
    }

    function next(k: string) {
      const first = list(k)[0];
      if (first && !paused.has(k) && !replying()) void sendItem(k, first);
    }

    // Stopping a reply pauses the queue, so you can step in before the next message goes out.
    let stoppedAt = 0;
    document.addEventListener(
      "click",
      (e) => {
        if ((e.target as HTMLElement).closest?.(gemini.SEL.stop)) stoppedAt = Date.now();
      },
      { capture: true, signal: ctx.signal },
    );

    ctx.on("gemini:response-end", (e: ResponseEvent) => {
      const k = e.conversationId ?? key();
      if (!k || !list(k).length) return;
      if (e.interrupted || e.error || Date.now() - stoppedAt < 5000) {
        paused.add(k);
        render();
        return;
      }
      // Let Gemini finish rendering the reply before the next send.
      setTimeout(() => next(k), 800);
    });

    ctx.on("gemini:route", ({ route, prev }: { route: Route; prev: Route }) => {
      if (prev.conversationId === null && route.conversationId && queues.new?.length) {
        queues = adopt(queues, route.conversationId);
        save();
      }
      render();
    });

    // ---------- tray ----------

    ctx.css(`
      .ggpp-q { box-sizing: border-box; width: 100%; max-width: var(--ggpp-q-width, 100%); margin: 0 auto 8px; border-radius: 20px; background: var(--ggpp-surface); color: var(--ggpp-fg); font: 400 14px/20px var(--ggpp-font); box-shadow: 0 0 0 1px var(--ggpp-border-soft); }
      .ggpp-q[hidden] { display: none; }
      .ggpp-q-head { display: flex; align-items: center; gap: 8px; padding: 6px 8px 6px 16px; }
      .ggpp-q-title { font-weight: 500; }
      .ggpp-q-state { color: var(--ggpp-fg-2); font-size: 13px; }
      .ggpp-q-head .ggpp-spacer { flex: 1; }
      .ggpp-q-list { display: grid; gap: 2px; padding: 0 8px 8px; max-height: 40vh; overflow: auto; }
      .ggpp-q-row { display: flex; align-items: center; gap: 4px; padding: 4px 4px 4px 12px; border-radius: 14px; background: var(--ggpp-bg); cursor: grab; }
      .ggpp-q-row.ggpp-drag { opacity: .4; }
      .ggpp-q-row.ggpp-over { box-shadow: inset 0 2px 0 var(--ggpp-accent); }
      .ggpp-q-text { flex: 1; min-width: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; white-space: pre-wrap; word-break: break-word; }
      .ggpp-q-num { color: var(--ggpp-fg-3); font-size: 12px; min-width: 1.5em; }
      .ggpp-q-chip { all: unset; box-sizing: border-box; height: 24px; padding: 0 8px; border-radius: 12px; font-size: 12px; color: var(--ggpp-fg-2); box-shadow: inset 0 0 0 1px var(--ggpp-border); cursor: pointer; white-space: nowrap; max-width: 9rem; overflow: hidden; text-overflow: ellipsis; }
      .ggpp-q-chip:hover { background: var(--ggpp-hover); }
      .ggpp-q .ggpp-icon-btn { width: 32px; height: 32px; }
    `);

    function row(k: string, it: Item, i: number, items: Item[]) {
      const m = models();
      const el = h(
        "div",
        { class: "ggpp-q-row", draggable: "true", dataset: { id: it.id } },
        h("span", { class: "ggpp-q-num" }, String(i + 1)),
        h("span", { class: "ggpp-q-text", title: it.text }, it.text),
        m &&
          it.model &&
          h(
            "button",
            {
              class: "ggpp-q-chip",
              type: "button",
              title: `Sent with ${it.model}. Click to change.`,
              onclick: (e: MouseEvent) => {
                const choices = m.list();
                if (!choices.length) return;
                ui.menu(
                  e.currentTarget as HTMLElement,
                  choices.map((c) => ({
                    label: c.name,
                    checked: c.name === it.model,
                    onClick: () => setList(k, list(k).map((x) => (x.id === it.id ? { ...x, model: c.name } : x))),
                  })),
                );
              },
            },
            it.model,
          ),
        ui.iconButton(I.edit, "Edit queued message", async () => {
          const text = await ui.prompt({ title: "Edit queued message", value: it.text, multiline: true });
          if (text === null) return;
          const t = text.trim().slice(0, MAX_TEXT);
          setList(k, t ? list(k).map((x) => (x.id === it.id ? { ...x, text: t } : x)) : list(k).filter((x) => x.id !== it.id));
        }),
        ui.iconButton(replying() ? ["M12 19V5", "M5 12l7-7 7 7"] : ["M5 12h14", "M12 5l7 7-7 7"], replying() ? "Send next" : "Send now", () => {
          paused.delete(k);
          if (replying()) setList(k, move(list(k), it.id, 0));
          else void sendItem(k, it);
        }),
        ui.iconButton(I.x, "Remove from queue", () => setList(k, list(k).filter((x) => x.id !== it.id))),
      );
      el.addEventListener("dragstart", (e) => {
        e.dataTransfer?.setData("text/x-ggpp-queue", it.id);
        if (e.dataTransfer) e.dataTransfer.effectAllowed = "move";
        el.classList.add("ggpp-drag");
      });
      el.addEventListener("dragend", () => el.classList.remove("ggpp-drag"));
      el.addEventListener("dragover", (e) => {
        if (!e.dataTransfer?.types.includes("text/x-ggpp-queue")) return;
        e.preventDefault();
        el.classList.add("ggpp-over");
      });
      el.addEventListener("dragleave", () => el.classList.remove("ggpp-over"));
      el.addEventListener("drop", (e) => {
        e.preventDefault();
        el.classList.remove("ggpp-over");
        const id = e.dataTransfer?.getData("text/x-ggpp-queue");
        if (id && id !== it.id) setList(k, move(list(k), id, items.findIndex((x) => x.id === it.id)));
      });
      return el;
    }

    function render() {
      const k = key();
      const items = list(k);
      const busy = replying();
      const stalled = !!k && items.length > 0 && !busy && !sending;
      for (const tray of trays) {
        tray.hidden = !items.length;
        if (!items.length || !k) {
          tray.replaceChildren();
          continue;
        }
        const state = sending ? "Sending…" : paused.has(k) ? "Paused" : busy ? "Sends when this reply finishes" : "Waiting";
        tray.replaceChildren(
          h(
            "div",
            { class: "ggpp-q-head" },
            icon(I.list, 16),
            h("span", { class: "ggpp-q-title" }, `${items.length} queued`),
            h("span", { class: "ggpp-q-state" }, state),
            h("span", { class: "ggpp-spacer" }),
            (stalled || (paused.has(k) && !sending)) &&
              ui.button(
                stalled ? "Send next" : "Resume",
                () => {
                  paused.delete(k);
                  render();
                  next(k);
                },
                "primary",
              ),
            ui.iconButton(I.trash, "Clear queue", async () => {
              if (await ui.confirm({ title: "Clear queue", body: `Remove ${items.length} queued message(s)?`, confirm: "Clear", danger: true })) setList(k, []);
            }),
            ui.iconButton(collapsed ? ["M18 15l-6-6-6 6"] : I.chevronDown, "Toggle queued messages", () => {
              collapsed = !collapsed;
              render();
            }),
          ),
          ...(collapsed ? [] : [h("div", { class: "ggpp-q-list" }, items.map((it, i) => row(k, it, i, items)))]),
        );
      }
    }

    ctx.cleanup(
      gemini.watch(gemini.SEL.composer, (composer) => {
        const tray = h("div", { class: "ggpp-q", hidden: true, role: "region", "aria-label": "Queued messages" });
        composer.before(tray);
        tray.style.setProperty("--ggpp-q-width", `${composer.offsetWidth || 760}px`);
        trays.add(tray);
        render();
        const ro = new ResizeObserver(() => composer.offsetWidth && tray.style.setProperty("--ggpp-q-width", `${composer.offsetWidth}px`));
        ro.observe(composer);
        return () => {
          ro.disconnect();
          tray.remove();
          trays.delete(tray);
        };
      }),
    );
    // The state line and send buttons follow the reply starting and stopping.
    ctx.on("gemini:generating", () => render());
    ctx.on("settings:betterQueue", () => {
      save();
      render();
    });
  },
});
