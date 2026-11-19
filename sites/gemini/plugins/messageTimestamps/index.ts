import { definePlugin } from "../../shims/types";
import { I } from "../../../../src/lib/icons";
import type { GeminiApi, ResponseEvent } from "../gemini";

/**
 * Gemini shows no message times, so GG++ records them: when you send a prompt
 * and when each reply starts. Messages from before the plugin was on stay unlabeled.
 */

const MAX = 5000;

export default definePlugin({
  id: "messageTimestamps",
  name: "MessageTimestamps",
  description: "Show when each message was sent. Gemini doesn't keep times, so only messages sent while this is on get one.",
  tags: ["Messages"],
  icon: I.clock,
  updated: "2026-10-14",
  dependencies: ["gemini"],
  settings: {
    showDate: { type: "boolean", label: "Show date", description: "Show the full date for messages older than today.", default: true },
    hideOwnMessages: { type: "boolean", label: "Hide on my messages", description: "Hide timestamps on your own messages.", default: false },
  },
  async start(ctx) {
    const gemini = ctx.use<GeminiApi>("gemini");
    const stamps = await ctx.data.get<Record<string, number>>("stamps", {});
    let saveTimer: ReturnType<typeof setTimeout> | undefined;
    const save = () => {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => {
        const keys = Object.keys(stamps);
        if (keys.length > MAX) keys.sort((a, b) => stamps[a] - stamps[b]).slice(0, keys.length - MAX).forEach((k) => delete stamps[k]);
        void ctx.data.set("stamps", stamps);
      }, 400);
    };

    // Drawn from an attribute on the message host, so Gemini re-rendering the message content can't wipe it.
    ctx.css(`
      :is(user-query, model-response)[data-ggpp-ts]::before {
        content: attr(data-ggpp-ts); display: block; font: 400 11px/16px var(--ggpp-font);
        color: var(--gem-sys-color--on-surface-variant, #888); opacity: .8; margin-bottom: .125rem;
      }
      /* Prompts: pinned just above the right edge of the bubble, whatever layout the host uses. */
      user-query[data-ggpp-ts] { position: relative; }
      user-query[data-ggpp-ts]::before { position: absolute; right: var(--ggpp-ts-end, 0px); top: var(--ggpp-ts-top, -16px); margin: 0; white-space: nowrap; }
      model-response[data-ggpp-ts]::before { padding-inline-start: var(--ggpp-ts-start, 0px); }
      @media print { :is(user-query, model-response)[data-ggpp-ts]::before { display: none; } }
    `);

    /** Stable keys: the reply's id for replies; the turn id (plus a text hash as a fallback) for prompts. */
    const keyOf = (el: HTMLElement) => {
      const turn = el.closest<HTMLElement>(gemini.SEL.conversationTurn)?.id;
      if (el.matches(gemini.SEL.modelResponse)) return turn ? `${turn}:m` : gemini.responseId(el);
      if (turn) return `${turn}:u`;
      const text = gemini.messageText(el, "user").slice(0, 240);
      let hash = 0;
      for (const ch of text) hash = (hash * 31 + ch.charCodeAt(0)) | 0;
      return text ? `${gemini.route().conversationId}:u:${hash}` : null;
    };

    const fmt = (t: number) => {
      const d = new Date(t);
      const today = new Date().toDateString() === d.toDateString();
      const time = d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
      return today || !ctx.settings.showDate ? time : `${d.toLocaleDateString(undefined, { month: "short", day: "numeric" })} ${time}`;
    };

    function label(el: HTMLElement) {
      const key = keyOf(el);
      const t = key ? stamps[key] : undefined;
      if (!t || (ctx.settings.hideOwnMessages && el.matches(gemini.SEL.userQuery))) {
        el.removeAttribute("data-ggpp-ts");
        return;
      }
      const text = fmt(t);
      if (el.dataset.ggppTs !== text) el.dataset.ggppTs = text;
      // Line the label up with the visible text column (Gemini centres reply blocks and right-aligns prompts).
      const box = el.getBoundingClientRect();
      if (el.matches(gemini.SEL.modelResponse)) {
        const block = el.querySelector<HTMLElement>(`${gemini.SEL.modelText} > *`);
        if (block) el.style.setProperty("--ggpp-ts-start", `${Math.max(0, block.getBoundingClientRect().left - box.left)}px`);
      } else {
        const bubble = el.querySelector<HTMLElement>(gemini.SEL.userBubble);
        if (bubble) {
          const b = bubble.getBoundingClientRect();
          el.style.setProperty("--ggpp-ts-end", `${Math.max(0, box.right - b.right + 4)}px`);
          el.style.setProperty("--ggpp-ts-top", `${b.top - box.top - 17}px`);
        }
      }
    }
    /** A reply that started but was never stamped (e.g. the end event was missed during a long reply). */
    let unstampedReplyAt = 0;
    let unstampedIn: string | null = null;
    const relabel = () => {
      const msgs = gemini.messages();
      if (unstampedReplyAt && !gemini.isGenerating() && gemini.route().conversationId === unstampedIn) {
        stamp(msgs.findLast((m) => m.role === "model")?.el, unstampedReplyAt);
        unstampedReplyAt = 0;
      }
      msgs.forEach((m) => label(m.el));
    };

    const stamp = (el: HTMLElement | undefined, t: number) => {
      const key = el && keyOf(el);
      if (!el || !key || stamps[key]) return;
      stamps[key] = t;
      label(el);
      save();
    };

    // Your prompt: the moment you send it, applied to the prompt that appears next.
    let sentAt = 0;
    const onSend = () => (sentAt = Date.now());
    document.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Enter" && !e.shiftKey && !e.isComposing && gemini.editor()?.contains(e.target as Node)) onSend();
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

    let replyStart = 0;
    ctx.on("gemini:response-start", () => {
      replyStart = Date.now();
      unstampedReplyAt = replyStart;
      unstampedIn = gemini.route().conversationId;
      if (!sentAt) sentAt = replyStart - 1000;
    });
    // Ids settle while the reply streams, so stamp at the end using the real start time.
    ctx.on("gemini:response-end", (e: ResponseEvent) => {
      const start = replyStart || Date.now() - (e.duration ?? 0);
      const sent = sentAt || start - 1000;
      sentAt = 0;
      replyStart = 0;
      setTimeout(() => {
        const msgs = gemini.messages();
        stamp(msgs.findLast((m) => m.role === "model")?.el, start);
        unstampedReplyAt = 0;
        stamp(msgs.findLast((m) => m.role === "user")?.el, sent);
      }, 300);
    });

    ctx.cleanup(
      gemini.watch(gemini.SEL.userQuery, (el) => {
        if (sentAt && Date.now() - sentAt < 15_000) stamp(el, sentAt);
        label(el);
      }),
    );
    ctx.cleanup(gemini.watch(gemini.SEL.modelResponse, (el) => label(el)));
    // Re-apply after navigation and layout changes (and in case Gemini replaced a host).
    ctx.on("gemini:route", () => ctx.setTimeout(relabel, 600));
    ctx.setInterval(relabel, 2000);
    window.addEventListener("resize", relabel, { signal: ctx.signal });
    ctx.cleanup(() => {
      clearTimeout(saveTimer);
      document.querySelectorAll("[data-ggpp-ts]").forEach((n) => {
        n.removeAttribute("data-ggpp-ts");
        (n as HTMLElement).style.removeProperty("--ggpp-ts-start");
        (n as HTMLElement).style.removeProperty("--ggpp-ts-end");
      });
    });
  },
});
