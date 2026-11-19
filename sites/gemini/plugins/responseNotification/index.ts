import { definePlugin } from "../../shims/types";
import { h } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import { preview } from "../../../../src/lib/text";
import type { ResponseEvent } from "../gemini";
import type { UiApi } from "../ui";

/** A chime and/or a system notification when Gemini finishes a reply. */

export default definePlugin({
  id: "responseNotification",
  name: "ResponseNotification",
  description: "Play a sound and show a system notification when Gemini finishes a reply.",
  tags: ["Notifications"],
  icon: I.bell,
  updated: "2026-10-14",
  dependencies: ["gemini", "ui"],
  settings: {
    sound: { type: "boolean", label: "Sound", description: "Play a notification sound.", default: true },
    soundUrl: {
      type: "string",
      label: "Custom sound URL",
      description: "Leave empty for the built-in chime.",
      placeholder: "https://example.com/sound.mp3",
      default: "",
      showIf: (v) => !!v.sound,
    },
    volume: { type: "number", label: "Volume", default: 50, min: 0, max: 100, slider: true, unit: "%", showIf: (v) => !!v.sound },
    browserNotification: { type: "boolean", label: "System notification", description: "Show a browser notification.", default: true },
    onlyWhenHidden: { type: "boolean", label: "Only when hidden", description: "Only notify when the tab is in the background.", default: true },
  },
  start(ctx) {
    const ui = ctx.use<UiApi>("ui");
    const notified = new Set<string>();
    let audio: AudioContext | null = null;
    let gestured = false;

    const onGesture = () => {
      gestured = true;
      if (ctx.settings.browserNotification && "Notification" in window && Notification.permission === "default") {
        void Notification.requestPermission();
      }
    };
    for (const ev of ["pointerdown", "keydown", "touchstart"]) window.addEventListener(ev, onGesture, { capture: true, once: true, signal: ctx.signal });
    ctx.cleanup(() => void audio?.close());

    function chime() {
      audio ??= new AudioContext();
      const vol = ctx.settings.volume / 100;
      const t = audio.currentTime;
      for (const [i, freq] of [880, 1318.5].entries()) {
        const osc = audio.createOscillator();
        const gain = audio.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        const start = t + i * 0.12;
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.25 * vol, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.5);
        osc.connect(gain).connect(audio.destination);
        osc.start(start);
        osc.stop(start + 0.55);
      }
    }

    function play() {
      if (!gestured) return;
      const url = ctx.settings.soundUrl.trim();
      if (!url) return chime();
      const el = new Audio(url);
      el.volume = ctx.settings.volume / 100;
      el.play().catch(() => chime());
    }

    function notify(e: ResponseEvent) {
      if (!ctx.settings.browserNotification || !("Notification" in window) || Notification.permission !== "granted") return;
      const n = new Notification(e.title && e.title !== "Gemini" ? e.title : "Gemini", {
        body: preview(e.text ?? "", 140) || "Response complete.",
        icon: "https://www.gstatic.com/lamda/images/gemini_sparkle_4g_512_lt_f94943af3be039176192d.png",
        tag: `ggpp-${e.conversationId ?? "new"}`,
      });
      n.onclick = () => {
        window.focus();
        n.close();
      };
    }

    ctx.on("gemini:response-end", (e: ResponseEvent) => {
      if (e.error) return;
      const key = e.responseId ?? `${e.conversationId}:${Date.now()}`;
      if (notified.has(key)) return;
      if (notified.size > 80) notified.clear();
      notified.add(key);
      if (ctx.settings.onlyWhenHidden && !document.hidden) return;
      if (ctx.settings.sound) play();
      notify(e);
    });

    ctx.provide("panel:responseNotification", (el: HTMLElement) => {
      el.append(
        h(
          "div",
          { class: "ggpp-field ggpp-field-inline" },
          h("div", { class: "ggpp-field-head" }, h("div", { class: "ggpp-field-desc" }, "Preview the notification sound.")),
          ui.button("Play preview", () => {
            gestured = true;
            play();
          }),
        ),
      );
    });
  },
});
