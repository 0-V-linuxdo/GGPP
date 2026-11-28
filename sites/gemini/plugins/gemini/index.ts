import { definePlugin } from "../../shims/types";
import { isVisible, nextFrame } from "../../../../src/lib/dom";

/**
 * Page adapter: the only plugin that knows Gemini's DOM. Other plugins ask it
 * for elements and listen to its events instead of hard-coding selectors, so
 * a Gemini redesign is fixed here once.
 */

/** Every entry is a single selector (lists are wrapped in :is()), so entries compose with combinators. */
export const SEL = {
  main: ":is(bard-sidenav-content, main.chat-app, [role='main'])",
  chatWindow: "chat-window",
  scroller: ":is(infinite-scroller.chat-history, #chat-history, .chat-history-scroll-container)",
  conversationTurn: ".conversation-container",
  userQuery: "user-query",
  userText: ".query-text",
  userLine: ":is(.query-text-line, .query-bullet-item)",
  userBubble: ".user-query-bubble-with-background",
  modelResponse: "model-response",
  modelText: ":is(message-content .markdown-main-panel, message-content .markdown)",
  messageContent: "message-content",
  thoughts: ":is(thinking-overlay, model-thoughts)",
  responseActions: "message-actions",
  composer: "input-container",
  inputArea: ":is(input-area-v2 .input-area, input-area-v2)",
  editor: "rich-textarea .ql-editor[contenteditable='true']",
  leadingActions: ".leading-actions-wrapper",
  trailingActions: ".trailing-actions-wrapper",
  modeButton: "[data-test-id='bard-mode-menu-button']",
  sendButton: ":is([data-test-id='send-button-container'] gem-icon-button.send-button button, [data-test-id='send-button-container'] button)",
  stop: ":is([data-test-id='send-button-container'] gem-icon-button.send-button.stop, button[aria-label='Stop response'])",
  mic: "speech-dictation-mic-button",
  sidenav: "side-navigation-content",
  sidenavToggle: ":is(side-navigation-content button[aria-label='Close sidebar'], button[aria-label='Open sidebar'], button[aria-label='Main menu'])",
  conversationRow: "gem-nav-list-item[data-test-id='conversation']",
  conversationTitle: ".title-text",
  conversationLink: ":is(a[href*='/app/'], a[href*='/gem/'])",
  rowMenuButton: "[data-test-id='actions-menu-button']",
  accountFooter: "sidenav-mavatar-footer",
  topBar: "top-bar-actions",
  conversationMenuButton: "conversation-actions-icon",
  tempChatButton: "gem-icon-button.temp-chat-button",
  zeroState: ":is(modular-zero-state, zero-state-block-picker)",
  greeting: ":is(.greeting-container h1.greeting-headline, h1.greeting-headline)",
  overlay: ".cdk-overlay-container",
  error: ":is(response-container .error-message, .response-error, [data-test-id='error-message'])",
  codeBlock: "code-block",
} as const;

export type Role = "user" | "model";

const INTERRUPT = /you stopped this response|response (was )?stopped|你已让系统停止|已停止(生成|回答)/i;
/** Gemini reports failed replies as ordinary reply text, e.g. "I encountered an error doing what you asked. Could you try again?" */
const ERROR_TEXT = /^(something went wrong|an error occurred|i encountered an error|出了点问题|发生错误|我遇到了错误|出错了)/i;

export interface ResponseEvent {
  conversationId: string | null;
  title: string;
  hidden: boolean;
  responseId?: string | null;
  text?: string;
  error?: boolean;
  interrupted?: boolean;
  duration?: number;
}

export interface Message {
  role: Role;
  el: HTMLElement;
  index: number;
  text: string;
}

export interface Route {
  href: string;
  path: string;
  conversationId: string | null;
  isHome: boolean;
}

export type Watcher = (el: HTMLElement) => void | (() => void);

function parseRoute(): Route {
  const path = location.pathname.replace(/^\/u\/\d+/, "");
  const m = path.match(/\/(?:app|gem\/[^/]+|chat)\/([0-9a-f]{8,})/i);
  return {
    href: location.href,
    path,
    conversationId: m ? m[1] : null,
    isHome: /^\/(app|gem\/[^/]+)?\/?$/.test(path),
  };
}

function textOf(el: Element | null | undefined) {
  return (el as HTMLElement | null)?.innerText?.trim() ?? el?.textContent?.trim() ?? "";
}

/** innerText is empty for content-visibility-skipped / off-screen turns; textContent still has the card. */
export function readableText(el: Element | null | undefined): string {
  return (el as HTMLElement | null)?.innerText?.trim() || el?.textContent?.trim() || "";
}

export default definePlugin({
  id: "gemini",
  name: "Gemini Adapter",
  description: "Finds Gemini's page parts and reports chat events to other plugins.",
  tags: [],
  required: true,
  hidden: true,
  icon: ["M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z"],
  start(ctx) {
    const watchers = new Set<{ selector: string; fn: Watcher; seen: Map<HTMLElement, (() => void) | void> }>();
    let route = parseRoute();
    let generating = false;
    let generatingSince = 0;
    /** Conversation the in-flight reply belongs to. */
    let generatingIn: string | null = null;
    let generatingTitle = "";
    let scheduled = false;

    const q = <T extends HTMLElement = HTMLElement>(s: string, root: ParentNode = document) =>
      root.querySelector<T>(s);
    const qa = <T extends HTMLElement = HTMLElement>(s: string, root: ParentNode = document) =>
      [...root.querySelectorAll<T>(s)];

    function runWatchers() {
      if (!watchers.size) return;
      // One combined query instead of one per watcher keeps page load cheap.
      const selectors = [...new Set([...watchers].map((w) => w.selector))];
      let found: HTMLElement[];
      try {
        found = qa(selectors.join(", "));
      } catch {
        // One bad selector must not stop the others.
        found = selectors.flatMap((sel) => {
          try {
            return qa(sel);
          } catch {
            return [];
          }
        });
      }
      for (const w of watchers) {
        for (const el of found) {
          try {
            if (!el.matches(w.selector)) continue;
          } catch {
            continue;
          }
          if (w.seen.has(el)) continue;
          let dispose: (() => void) | void = undefined;
          try {
            dispose = w.fn(el);
          } catch (e) {
            ctx.log.error("watcher failed", w.selector, e);
          }
          w.seen.set(el, dispose);
        }
        for (const [el, dispose] of w.seen) {
          if (el.isConnected) continue;
          w.seen.delete(el);
          try {
            dispose?.();
          } catch (e) {
            ctx.log.error("watcher cleanup failed", e);
          }
        }
      }
    }

    function checkRoute() {
      if (location.href === route.href) return;
      const prev = route;
      route = parseRoute();
      // A brand-new chat gets its id while the first reply streams.
      if (generating && generatingIn === null && prev.conversationId === null) generatingIn = route.conversationId;
      ctx.emit("gemini:route", { route, prev });
    }

    function editor() {
      const all = qa(SEL.editor);
      return all.find(isVisible) ?? all[0] ?? null;
    }

    function isGenerating() {
      return qa(SEL.stop).some(isVisible);
    }

    function title() {
      const active = q<HTMLAnchorElement>(`${SEL.conversationRow} a[aria-current='page'], ${SEL.conversationRow} a.is-active`);
      const fromRow = textOf(active?.querySelector(".title-text") ?? active);
      if (fromRow) return fromRow;
      const t = document.title.replace(/\s*[-–|]\s*(Google\s+)?Gemini\s*$/i, "").trim();
      if (t && !/^(Google )?Gemini$/i.test(t)) return t;
      const first = q(SEL.userQuery);
      return first ? messageText(first, "user").replace(/\s+/g, " ").trim().slice(0, 60) || "Gemini" : "Gemini";
    }

    /** Pending "reply ended" decision: the stop button can vanish a moment before the URL changes. */
    let endTimer: ReturnType<typeof setTimeout> | undefined;
    ctx.cleanup(() => clearTimeout(endTimer));
    const SETTLE_MS = 700;

    function checkGenerating() {
      const now = isGenerating();
      if (now === generating) {
        if (now && route.conversationId !== generatingIn && generatingIn !== null) leave();
        return;
      }
      generating = now;
      if (now) {
        // Same reply resumed (e.g. the button flickered): keep its start time.
        if (endTimer) {
          clearTimeout(endTimer);
          endTimer = undefined;
          if (route.conversationId === generatingIn) return;
        }
        generatingSince = Date.now();
        generatingIn = route.conversationId;
        generatingTitle = title();
        ctx.emit("gemini:response-start", { conversationId: generatingIn, title: generatingTitle, hidden: document.hidden } satisfies ResponseEvent);
        ctx.emit("gemini:generating", true);
        return;
      }
      if (route.conversationId !== generatingIn && generatingIn !== null) {
        leave();
        ctx.emit("gemini:generating", false);
        return;
      }
      // Leaving a chat often removes the stop button before the URL changes. Wait briefly so that is
      // reported as leaving (still replying elsewhere), not as the reply having finished.
      clearTimeout(endTimer);
      endTimer = setTimeout(() => {
        endTimer = undefined;
        checkRoute();
        if (generating) return;
        if (route.conversationId !== generatingIn && generatingIn !== null) leave();
        else finish();
        ctx.emit("gemini:generating", false);
      }, SETTLE_MS);
    }

    function finish() {
      const last = qa(SEL.modelResponse).pop();
      const lastText = last ? messageText(last, "model") : "";
      // "You stopped this response" is a note below the reply, outside the reply text.
      const interrupted = INTERRUPT.test(lastText.slice(-200)) || (!!last && INTERRUPT.test(last.querySelector(".info-content")?.textContent ?? ""));
      const error = !interrupted && !!last && (last.querySelector(SEL.error) !== null || (lastText.length < 400 && ERROR_TEXT.test(lastText.trim())));
      ctx.emit("gemini:response-end", {
        conversationId: route.conversationId,
        title: title(),
        hidden: document.hidden,
        responseId: last ? responseId(last) : null,
        text: lastText,
        error,
        interrupted,
        duration: Date.now() - generatingSince,
      } satisfies ResponseEvent);
    }

    /** The user navigated away from a chat whose reply is still streaming on the server. */
    function leave() {
      if (generatingIn === null) return;
      const left = generatingIn;
      const leftTitle = generatingTitle;
      ctx.emit("gemini:response-left", { conversationId: left, title: leftTitle, hidden: document.hidden } satisfies ResponseEvent);
      generatingIn = route.conversationId;
      generatingTitle = title();
      away.set(left, { title: leftTitle, leftAt: Date.now(), lastData: 0, endedAt: 0 });
    }

    function tick() {
      scheduled = false;
      lastTick = Date.now();
      checkRoute();
      checkGenerating();
      runWatchers();
    }

    // At most one pass every ~120 ms: Gemini mutates the DOM thousands of times while loading.
    let lastTick = 0;
    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      const wait = 120 - (Date.now() - lastTick);
      if (wait > 0) setTimeout(() => nextFrame(tick), wait);
      else nextFrame(tick);
    };

    const mo = new MutationObserver(schedule);
    mo.observe(document.documentElement, { childList: true, subtree: true });
    ctx.cleanup(() => mo.disconnect());
    window.addEventListener("popstate", schedule, { signal: ctx.signal });
    // rAF is paused in background tabs; keep detecting completion there.
    ctx.setInterval(() => {
      checkRoute();
      checkGenerating();
      runWatchers();
    }, 700);
    ctx.cleanup(() => {
      for (const w of watchers) for (const d of w.seen.values()) d?.();
      watchers.clear();
    });

    const responseId = (el: HTMLElement) => q(SEL.messageContent, el)?.id.replace(/^message-content-id-/, "") ?? null;

    function messages(): Message[] {
      return qa(`${SEL.userQuery}, ${SEL.modelResponse}`).map((el, index) => {
        const role: Role = el.matches(SEL.userQuery) ? "user" : "model";
        return { role, el, index, text: messageText(el, role) };
      });
    }

    function messageText(el: HTMLElement, role: Role = el.matches(SEL.userQuery) ? "user" : "model") {
      if (role === "user") {
        const lines = qa(SEL.userLine, el);
        if (lines.length) return lines.map((l) => (l.textContent ?? "").trim()).join("\n").trim();
        const box = q(SEL.userText, el);
        if (!box) return textOf(el);
        const clone = box.cloneNode(true) as HTMLElement;
        clone.querySelectorAll(".cdk-visually-hidden").forEach((n) => n.remove());
        return clone.textContent?.trim() ?? "";
      }
      const fromMd = readableText(q(SEL.modelText, el));
      return fromMd || readableText(el);
    }

    function setEditorText(text: string, append = false) {
      const ed = editor();
      if (!ed) return false;
      ed.focus();
      const sel = getSelection();
      if (sel) {
        const range = document.createRange();
        range.selectNodeContents(ed);
        if (append) range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      }
      if (!text) {
        document.execCommand("delete");
      } else if (!document.execCommand("insertText", false, text)) {
        ed.textContent = text;
        ed.dispatchEvent(new InputEvent("input", { bubbles: true }));
      }
      return true;
    }

    function theme(): "dark" | "light" {
      const body = document.body;
      if (body?.classList.contains("dark-theme")) return "dark";
      if (body?.classList.contains("light-theme")) return "light";
      const bg = body ? getComputedStyle(body).backgroundColor : "";
      const m = bg.match(/\d+(\.\d+)?/g);
      if (m && m.length >= 3 && (m[3] === undefined || Number(m[3]) > 0)) {
        const [r, g, b] = m.map(Number);
        return 0.2126 * r + 0.7152 * g + 0.0722 * b < 128 ? "dark" : "light";
      }
      return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    // Network-level stream tracking (extension build): replies finishing in chats you are not viewing.
    const streams = new Map<string, { title: string }>();
    /** Which conversation each in-flight request belongs to, decided when it started. */
    const requests = new Map<string, string>();
    /**
     * Chats left while their reply was still being written. Gemini streams replies over a long-lived
     * connection, so a left chat's reply is done once that stream goes quiet: no data mentioning the
     * chat (or, if ids can't be seen, no data at all) for QUIET_MS.
     */
    const away = new Map<string, { title: string; leftAt: number; lastData: number; endedAt: number }>();
    const QUIET_MS = 5000;
    /** After the reply request ends, wait this long for Gemini to retry before calling the reply done. */
    const CONFIRM_MS = 3000;
    let lastAnyStart = 0;
    const GIVE_UP_MS = 15 * 60_000;
    let lastAnyData = 0;
    ctx.on("net:chunk", (e: { ids: string[]; bytes: number }) => {
      if (!e.bytes) return;
      const now = Date.now();
      lastAnyData = now;
      for (const id of e.ids) {
        const a = away.get(id);
        if (a) a.lastData = now;
      }
    });
    ctx.setInterval(() => {
      const now = Date.now();
      for (const [id, a] of away) {
        if (id === route.conversationId) {
          away.delete(id);
          continue;
        }
        const inFlight = [...requests.values()].includes(id);
        // Precise path: the reply request ended, nothing restarted, and the data has settled.
        const confirmed = a.endedAt > 0 && now - a.endedAt >= CONFIRM_MS && now - lastAnyData >= 2000 && lastAnyStart <= a.endedAt;
        // Fallback: the reply had already arrived before you left, so only quiet tells us it is over.
        const lastSeen = a.lastData || Math.max(lastAnyData, a.leftAt);
        const quiet = now - a.leftAt >= QUIET_MS && now - lastSeen >= QUIET_MS && now - lastAnyStart >= QUIET_MS && !inFlight;
        if (!confirmed && !quiet && now - a.leftAt < GIVE_UP_MS) continue;
        away.delete(id);
        if (now - a.leftAt > GIVE_UP_MS) continue;
        ctx.emit("gemini:response-elsewhere", { conversationId: id, title: rowTitle(id) ?? a.title, hidden: document.hidden, error: false } satisfies ResponseEvent);
      }
    }, 1000);
    const rowTitle = (id: string) =>
      qa(SEL.conversationRow)
        .find((r) => r.querySelector<HTMLAnchorElement>(SEL.conversationLink)?.href.includes(id))
        ?.querySelector(SEL.conversationTitle)
        ?.textContent?.trim();
    // Gemini also opens short processSession requests that are not replies (e.g. on page load). Only a
    // request that starts right after you send, or while a reply is on screen, is treated as a reply.
    let sentAt = 0;
    const onSend = () => (sentAt = Date.now());
    document.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Enter" && !e.shiftKey && !e.isComposing && editor()?.contains(e.target as Node)) onSend();
      },
      { capture: true, signal: ctx.signal },
    );
    document.addEventListener(
      "click",
      (e) => {
        if ((e.target as HTMLElement).closest?.("[data-test-id='send-button-container'] button")) onSend();
      },
      { capture: true, signal: ctx.signal },
    );
    ctx.on("net:stream-start", (e: { conversationId: string | null; requestId: string }) => {
      // A reply request you didn't just send (e.g. Gemini retrying a reply in a chat you left) cancels
      // pending "done" calls; one you sent in the chat on screen doesn't.
      if (Date.now() - sentAt > 1500) {
        lastAnyStart = Date.now();
        for (const a of away.values()) a.endedAt = 0;
      }
      if (Date.now() - sentAt > 5000 && !generating) return;
      // A request is always sent from the chat on screen, so that is the best owner when the body can't be read.
      const id = e.conversationId ?? route.conversationId ?? "new";
      if (e.requestId) requests.set(e.requestId, id);
      streams.set(id, { title: rowTitle(id) ?? title() });
      ctx.emit("gemini:stream-start", { conversationId: id === "new" ? null : id, title: streams.get(id)!.title, hidden: document.hidden } satisfies ResponseEvent);
    });
    ctx.on("gemini:route", ({ route: r, prev }: { route: Route; prev: Route }) => {
      if (prev.conversationId === null && r.conversationId && streams.has("new")) {
        streams.set(r.conversationId, streams.get("new")!);
        streams.delete("new");
      }
      if (prev.conversationId === null && r.conversationId) {
        for (const [rid, owner] of requests) if (owner === "new") requests.set(rid, r.conversationId);
      }
    });
    ctx.on("net:stream-end", (e: { conversationId: string | null; requestId: string; error: boolean }) => {
      // Gemini opens a short and a long processSession per send; the reply text streams in the long one.
      const id = requests.get(e.requestId);
      requests.delete(e.requestId);
      if (!id) return;
      const info = streams.get(id);
      streams.delete(id);
      if (id === route.conversationId) return;
      // The reply text streams in the longest of these requests. When the last one for a chat you left
      // ends, start the confirmation wait; the interval above reports it once nothing restarts.
      const a = away.get(id);
      if (!a || [...requests.values()].includes(id)) return;
      if (e.error) {
        // Leaving a chat can abort its stream; Gemini then replays the reply when you come back. We
        // can't know when it really finishes, so say nothing rather than announce it too early.
        away.delete(id);
        ctx.emit("gemini:response-lost", { conversationId: id, title: a.title, hidden: document.hidden } satisfies ResponseEvent);
        return;
      }
      a.endedAt = Date.now();
      if (info?.title) a.title = info.title;
    });

    ctx.provide("gemini", {
      SEL,
      q,
      qa,
      /** Call fn for every current and future element matching selector; its return value runs on removal. */
      watch(selector: string, fn: Watcher) {
        const w = { selector, fn, seen: new Map() };
        watchers.add(w);
        schedule();
        return () => {
          watchers.delete(w);
          for (const d of w.seen.values()) d?.();
        };
      },
      route: () => route,
      title,
      editor,
      editorText: () => textOf(editor()),
      setEditorText,
      composer: () => editor()?.closest<HTMLElement>(SEL.composer) ?? q(SEL.composer),
      responseId,
      sendButton: () => qa(SEL.sendButton).find(isVisible) ?? null,
      send() {
        const btn = qa(SEL.sendButton).find(isVisible);
        if (btn && !btn.matches(".stop") && !btn.hasAttribute("disabled")) btn.click();
        return !!btn;
      },
      isGenerating: () => generating,
      messages,
      messageText,
      scroller: () => {
        const all = qa(SEL.scroller);
        return all.find((el) => el.scrollHeight > el.clientHeight + 4 && /(auto|scroll)/.test(getComputedStyle(el).overflowY)) ?? all[0] ?? null;
      },
      sidenav: () => q(SEL.sidenav),
      toggleSidenav: () => q(SEL.sidenavToggle)?.click(),
      theme,
      newChatUrl: () => {
        const prefix = location.pathname.match(/^\/u\/\d+/)?.[0] ?? "";
        return `${prefix}/app`;
      },
      navigate(url: string) {
        const target = new URL(url, location.href);
        if (target.href === location.href) return;
        // Let Gemini's router handle it when an in-app link exists.
        const link = qa<HTMLAnchorElement>("a[href]").find((l) => l.href === target.href);
        if (link) return link.click();
        if (/^(\/u\/\d+)?\/app\/?$/.test(target.pathname)) {
          const newChat = q("[data-test-id='new-chat-button'] a, [data-test-id='new-chat-button'] button, [data-test-id='new-chat-button']");
          if (newChat) return newChat.click();
        }
        location.assign(target.href);
      },
    });
  },
});

export type GeminiApi = {
  SEL: typeof SEL;
  q<T extends HTMLElement = HTMLElement>(s: string, root?: ParentNode): T | null;
  qa<T extends HTMLElement = HTMLElement>(s: string, root?: ParentNode): T[];
  watch(selector: string, fn: Watcher): () => void;
  route(): Route;
  title(): string;
  editor(): HTMLElement | null;
  editorText(): string;
  setEditorText(text: string, append?: boolean): boolean;
  composer(): HTMLElement | null;
  responseId(modelResponse: HTMLElement): string | null;
  sendButton(): HTMLElement | null;
  send(): boolean;
  isGenerating(): boolean;
  messages(): Message[];
  messageText(el: HTMLElement, role?: Role): string;
  scroller(): HTMLElement | null;
  sidenav(): HTMLElement | null;
  toggleSidenav(): void;
  theme(): "dark" | "light";
  newChatUrl(): string;
  navigate(url: string): void;
};
