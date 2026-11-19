import { definePlugin } from "../../shims/types";
import { h, icon } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import type { GeminiApi } from "../gemini";
import type { UiApi } from "../ui";

/**
 * Shell-style prompt history: ↑/↓ in the message box recall sent prompts,
 * Esc restores the draft, and a counter opens a searchable history list.
 */

const DEDUPE_MS = 2000;
const SETTLE_MS = 120;

const normalize = (t: string) => t.replace(/​/g, "").replace(/\r\n?/g, "\n").trim();

export default definePlugin({
  id: "inputHistory",
  name: "InputHistory",
  description: "Recall earlier prompts with ↑ / ↓ in the message box, like a terminal. Esc restores your draft.",
  tags: ["Composer"],
  icon: I.history,
  enabledByDefault: true,
  updated: "2026-10-14",
  dependencies: ["gemini", "ui"],
  liveSettings: true,
  settings: {
    maxEntries: { type: "number", label: "Maximum stored prompts", default: 100, min: 10, max: 500, step: 10, slider: true },
  },
  async start(ctx) {
    const gemini = ctx.use<GeminiApi>("gemini");
    const ui = ctx.use<UiApi>("ui");
    let list = await ctx.data.get<string[]>("history", []);
    // Prompts sent from another tab join this tab's history (not while browsing it).
    ctx.on("data:changed", ({ key, value }: { key: string; value: string[] }) => {
      if (key === "inputHistory:history" && Array.isArray(value) && cursor < 0) list = value;
    });
    const save = () => ctx.data.set("history", list);

    /** -1 when not browsing; otherwise the index into list being shown. */
    let cursor = -1;
    let draft = "";
    let shown = "";
    let lastCapture = { text: "", at: 0 };
    let modalOpen = false;
    let settleUntil = 0;
    let userMovedCaret = false;

    const trim = () => {
      const max = ctx.settings.maxEntries;
      if (list.length > max) list = list.slice(list.length - max);
    };
    ctx.on("settings:inputHistory", () => {
      trim();
      void save();
    });

    /** A send is only recorded once Gemini actually accepts it (a reply starts or a new prompt appears). */
    let pendingSend = "";
    function capture() {
      const text = normalize(gemini.editorText());
      if (text) pendingSend = text;
      endBrowsing();
    }
    function commit() {
      const text = pendingSend;
      pendingSend = "";
      if (!text) return;
      const now = Date.now();
      if (text === lastCapture.text && now - lastCapture.at < DEDUPE_MS) return;
      lastCapture = { text, at: now };
      if (list[list.length - 1] === text) return;
      list.push(text);
      trim();
      void save();
    }

    // ---------- HUD ----------

    const counter = h("button", { class: "ggpp-ih-count", type: "button", onclick: () => openHistory() });
    const hud = h(
      "div",
      { class: "ggpp-ih-hud", hidden: true },
      counter,
      h("button", { class: "ggpp-ih-x", type: "button", title: "Exit history", "aria-label": "Exit history", onclick: () => restoreDraft() }, icon(I.x, 14)),
    );
    document.body.append(hud);
    ctx.cleanup(() => hud.remove());

    function placeHud() {
      if (cursor < 0 || modalOpen) {
        hud.hidden = true;
        return;
      }
      const box = gemini.q(gemini.SEL.inputArea) ?? gemini.composer();
      if (!box) return;
      const r = box.getBoundingClientRect();
      counter.textContent = `${cursor + 1} / ${list.length}`;
      counter.setAttribute("aria-label", `Show input history (${cursor + 1} / ${list.length})`);
      hud.hidden = false;
      hud.style.left = `${r.left + r.width / 2}px`;
      hud.style.top = `${r.top - 8}px`;
    }
    window.addEventListener("resize", placeHud, { signal: ctx.signal });

    ctx.css(`
      .ggpp-ih-hud {
        position: fixed; z-index: 2147482000; transform: translate(-50%, -100%);
        display: flex; align-items: center; gap: 2px; padding: 2px 4px 2px 10px; border-radius: 14px;
        background: var(--ggpp-surface-2); color: var(--ggpp-fg-2); box-shadow: var(--ggpp-shadow);
        font: 500 12px/20px var(--ggpp-font); animation: ggpp-ih-in .12s ease-out;
      }
      .ggpp-ih-hud[hidden] { display: none; }
      .ggpp-ih-hud button { all: unset; cursor: pointer; border-radius: 10px; padding: 0 4px; display: inline-grid; place-items: center; }
      .ggpp-ih-hud button:hover { background: var(--ggpp-hover); color: var(--ggpp-fg); }
      .ggpp-ih-count { font-variant-numeric: tabular-nums; }
      @keyframes ggpp-ih-in { from { opacity: 0; } }
      .ggpp-ih-list { display: flex; flex-direction: column; gap: 4px; max-height: 50vh; overflow: auto; }
      .ggpp-ih-row { display: flex; gap: 8px; align-items: flex-start; padding: 8px 8px 8px 12px; border-radius: 10px; background: var(--ggpp-surface); cursor: pointer; }
      .ggpp-ih-row.ggpp-live { outline: 2px solid var(--ggpp-accent); }
      .ggpp-ih-idx { color: var(--ggpp-fg-3); font-variant-numeric: tabular-nums; min-width: 2.5em; }
      .ggpp-ih-text { flex: 1; min-width: 0; white-space: pre-wrap; overflow-wrap: anywhere; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      .ggpp-ih-row.ggpp-open .ggpp-ih-text { -webkit-line-clamp: unset; display: block; }
      .ggpp-ih-actions { display: flex; gap: 2px; }
      .ggpp-ih-actions .ggpp-icon-btn { width: 28px; height: 28px; }
      .ggpp-ih-meta { display: flex; align-items: center; gap: 8px; color: var(--ggpp-fg-2); font-size: 13px; }
      .ggpp-ih-meta span { flex: 1; }
    `);

    // ---------- browsing ----------

    function show(index: number, caretAtStart: boolean) {
      cursor = index;
      shown = list[index];
      gemini.setEditorText(shown);
      settleUntil = Date.now() + SETTLE_MS;
      userMovedCaret = false;
      setTimeout(() => {
        if (userMovedCaret) return;
        const ed = gemini.editor();
        if (!ed) return;
        const range = document.createRange();
        range.selectNodeContents(ed);
        range.collapse(caretAtStart);
        const sel = getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }, 0);
      placeHud();
    }

    function endBrowsing() {
      cursor = -1;
      shown = "";
      placeHud();
    }

    function restoreDraft() {
      gemini.setEditorText(draft);
      endBrowsing();
    }

    /** Is a collapsed caret on the first (up) or last (down) visual line of the editor? */
    function caretAtEdge(ed: HTMLElement, up: boolean) {
      const sel = getSelection();
      if (!sel?.rangeCount || !sel.isCollapsed) return false;
      if (ed.classList.contains("ql-blank") || !normalize(ed.innerText)) return true;
      const range = sel.getRangeAt(0);
      let rect = range.getClientRects()[0];
      if (!rect) {
        const probe = range.startContainer.nodeType === Node.ELEMENT_NODE ? (range.startContainer as Element) : range.startContainer.parentElement;
        rect = probe?.getBoundingClientRect() as DOMRect;
      }
      if (!rect) return true;
      const box = ed.getBoundingClientRect();
      const line = parseFloat(getComputedStyle(ed).lineHeight) || 24;
      return up ? rect.top - box.top < line * 0.8 : box.bottom - rect.bottom < line * 0.8;
    }

    function onKey(e: KeyboardEvent) {
      const ed = gemini.editor();
      if (!ed || e.isComposing || e.keyCode === 229) return;
      // Gemini blurs the editor on Esc before page scripts see the key, so accept Esc from anywhere while browsing.
      if (e.key === "Escape" && cursor >= 0 && !modalOpen && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
        ctx.log.debug("restore draft via keydown");
        e.preventDefault();
        e.stopImmediatePropagation();
        restoreDraft();
        ed.focus();
        return;
      }
      if (!ed.contains(e.target as Node)) return;

      if (e.key === "Enter" && !e.shiftKey && !e.altKey) {
        capture();
        return;
      }
      if (cursor >= 0 && Date.now() < settleUntil && /^(Home|End|ArrowLeft|ArrowRight)$/.test(e.key)) userMovedCaret = true;

      if (e.key === "Escape" && cursor >= 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
        if (modalOpen) return;
        e.preventDefault();
        e.stopPropagation();
        restoreDraft();
        return;
      }
      if ((e.key !== "ArrowUp" && e.key !== "ArrowDown") || e.shiftKey || e.ctrlKey || e.metaKey || modalOpen) return;
      const up = e.key === "ArrowUp";
      if (!e.altKey && !caretAtEdge(ed, up)) return;

      if (up) {
        if (!list.length) return;
        if (cursor < 0) {
          draft = gemini.editorText();
          e.preventDefault();
          show(list.length - 1, true);
        } else if (cursor > 0) {
          e.preventDefault();
          show(cursor - 1, true);
        }
      } else if (cursor >= 0) {
        e.preventDefault();
        if (cursor < list.length - 1) show(cursor + 1, false);
        else restoreDraft();
      }
    }
    ctx.on("key:early", onKey);
    // Belt and braces for Esc: if Gemini still gets the key first, catch its effects (keyup, or the
    // message box losing focus right after Esc) and restore the draft then.
    let escAt = 0;
    const restoreFromEsc = (why: string) => {
      if (cursor < 0 || modalOpen) return;
      ctx.log.debug("restore draft via", why);
      restoreDraft();
      gemini.editor()?.focus();
    };
    ctx.on("key:early", (e: KeyboardEvent) => {
      if (e.key === "Escape") escAt = Date.now();
    });
    window.addEventListener("keyup", (e) => e.key === "Escape" && restoreFromEsc("keyup"), { capture: true, signal: ctx.signal });
    // Gemini's Esc handling blurs the message box. Even if no key event reaches GG++, a blur to nowhere
    // (no new focus target, no click just before) while browsing history is that Esc: restore the draft.
    // (Firefox may not deliver this Esc to the page at all, so the blur is the only signal.)
    // Excluded: a click elsewhere, Tab to another control, and the whole window losing focus.
    let pointerAt = 0;
    let windowBlurAt = 0;
    document.addEventListener("pointerdown", () => (pointerAt = Date.now()), { capture: true, signal: ctx.signal });
    window.addEventListener("blur", (e) => e.target === window && (windowBlurAt = Date.now()), { signal: ctx.signal });
    document.addEventListener(
      "focusout",
      (e) => {
        if (cursor < 0 || !gemini.editor()?.contains(e.target as Node)) return;
        const fe = e as FocusEvent;
        const viaEsc = Date.now() - escAt < 500;
        if (!viaEsc && (fe.relatedTarget || Date.now() - pointerAt < 400)) return;
        setTimeout(() => {
          if (!viaEsc && Date.now() - windowBlurAt < 150) return;
          const active = document.activeElement;
          if (!viaEsc && active && active !== document.body && !gemini.editor()?.contains(active)) return;
          restoreFromEsc(viaEsc ? "blur after Esc" : "blur to nowhere");
        }, 50);
      },
      { capture: true, signal: ctx.signal },
    );

    // Typing over a recalled entry turns it into the new draft.
    document.addEventListener(
      "input",
      (e) => {
        if (cursor < 0 || (e as InputEvent).isComposing) return;
        const ed = gemini.editor();
        if (!ed?.contains(e.target as Node)) return;
        if (normalize(gemini.editorText()) !== normalize(shown)) {
          draft = gemini.editorText();
          endBrowsing();
        }
      },
      { capture: true, signal: ctx.signal },
    );
    document.addEventListener(
      "mousedown",
      (e) => {
        if (cursor >= 0 && gemini.editor()?.contains(e.target as Node)) userMovedCaret = true;
      },
      { capture: true, signal: ctx.signal },
    );
    // Send button clicks.
    document.addEventListener(
      "click",
      (e) => {
        const btn = (e.target as HTMLElement).closest?.("[data-test-id='send-button-container'] button");
        if (btn && !btn.closest(".stop")) capture();
      },
      { capture: true, signal: ctx.signal },
    );
    ctx.on("gemini:route", () => endBrowsing());
    ctx.on("gemini:response-start", commit);
    ctx.on("gemini:stream-start", commit);
    ctx.cleanup(gemini.watch(gemini.SEL.userQuery, () => void (pendingSend && setTimeout(commit, 50))));

    // ---------- history browser ----------

    function historyView(container: HTMLElement, inModal: { close(): void } | null) {
      let query = "";
      const meta = h("div", { class: "ggpp-ih-meta" });
      const rows = h("div", { class: "ggpp-ih-list" });
      const search = h("input", { class: "ggpp-input", type: "search", placeholder: "Search prompts", oninput: () => ((query = search.value), render()) });
      container.append(search, meta, rows);

      function render() {
        search.hidden = !list.length;
        const q = query.trim().toLowerCase();
        const items = list.map((text, i) => ({ text, i })).reverse().filter((x) => !q || x.text.toLowerCase().includes(q));
        meta.replaceChildren(
          h("span", null, q ? `${items.length} match${items.length === 1 ? "" : "es"}` : `${list.length} stored prompt${list.length === 1 ? "" : "s"}`),
          ...(list.length
            ? [ui.button(
                "Clear history",
                async () => {
                  if (!(await ui.confirm({ title: "Clear input history", body: "Delete all stored prompts? This cannot be undone.", confirm: "Clear", danger: true }))) return;
                  list = [];
                  endBrowsing();
                  void save();
                  render();
                },
                "ghost",
              )]
            : []),
        );
        if (!items.length) {
          rows.replaceChildren(h("p", { class: "ggpp-muted" }, q ? "No matches." : "No stored prompts."));
          return;
        }
        rows.replaceChildren(
          ...items.map(({ text, i }) => {
            const row = h(
              "div",
              { class: `ggpp-ih-row${inModal && i === cursor ? " ggpp-live" : ""}`, tabindex: 0, role: "button" },
              h("span", { class: "ggpp-ih-idx" }, String(i + 1)),
              h("span", { class: "ggpp-ih-text" }, text),
              h(
                "span",
                { class: "ggpp-ih-actions", onclick: (e: Event) => e.stopPropagation() },
                inModal &&
                  ui.iconButton(I.check, "Use", () => {
                    if (cursor < 0) draft = gemini.editorText();
                    inModal.close();
                    show(i, false);
                  }),
                ui.iconButton(I.copy, "Copy", () => void navigator.clipboard.writeText(text)),
                ui.iconButton(I.trash, "Delete", () => {
                  list.splice(i, 1);
                  if (cursor >= list.length) endBrowsing();
                  void save();
                  render();
                }),
              ),
            );
            const toggle = () => row.classList.toggle("ggpp-open");
            row.addEventListener("click", toggle);
            row.addEventListener("keydown", (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), toggle()));
            return row;
          }),
        );
        rows.querySelector(".ggpp-live")?.scrollIntoView({ block: "nearest" });
      }
      render();
    }

    function openHistory() {
      modalOpen = true;
      placeHud();
      const body = h("div", { style: { display: "flex", flexDirection: "column", gap: "10px" } });
      const m = ui.modal({
        title: "Input history",
        icon: I.history,
        width: 620,
        content: [h("p", { class: "ggpp-muted" }, "Stored on this device."), body],
        onClose: () => {
          modalOpen = false;
          placeHud();
        },
      });
      historyView(body, m);
    }

    ctx.provide("panel:inputHistory", (el: HTMLElement) => historyView(el, null));
    ctx.on("gemini:route", () => {
      if (modalOpen) document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });
  },
});
