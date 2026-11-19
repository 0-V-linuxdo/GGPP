import { definePlugin } from "../../shims/types";
import { I } from "../../../../src/lib/icons";

/**
 * Hide Gemini blue decorative layers (two scoped site rules):
 * 1) home zero-state: modular-zero-state .blur-bg
 * 2) chat composer-adjacent glow: chat-window.show-lm-background > div.lm-glow::before
 *    (::before background radial-gradient; a scoped live-page OFF/restore check changed the halo)
 * Does not alter host layout, ::after, textarea, or voice chrome.
 */

/** Home zero-state wash — keep scoped under modular-zero-state. */
export const HIDE_BLUE_BACKGROUND_SELECTOR = "modular-zero-state .blur-bg";

/**
 * Chat lm-glow paint host ::before.
 * Matches Inspector breadcrumb chat-window…show-lm-… > div.lm-glow and
 * rule form .show-lm-background … .lm-glow …::before; direct child DIV; no ng-* attrs.
 */
export const HIDE_BLUE_LM_GLOW_BEFORE_SELECTOR =
  "chat-window.show-lm-background > div.lm-glow::before";

/** Exact rules applied via ctx.css (disable removes the style element). */
export const HIDE_BLUE_BACKGROUND_CSS = [
  `${HIDE_BLUE_BACKGROUND_SELECTOR} { display: none !important; }`,
  `${HIDE_BLUE_LM_GLOW_BEFORE_SELECTOR} { background-image: none !important; }`,
].join("\n");

export default definePlugin({
  id: "hideBlueBackground",
  name: "HideBlueBackground",
  description:
    "Hide Gemini blue decorative wash: home zero-state .blur-bg, and chat-window lm-glow ::before radial glow. Does not change message box layout, ::after, textarea, or voice controls.",
  tags: ["Composer", "Appearance"],
  icon: I.eyeOff,
  enabledByDefault: true,
  updated: "2026-11-18",
  start(ctx) {
    // Pure CSS; ctx.css registers style.remove on plugin stop/disable.
    ctx.css(HIDE_BLUE_BACKGROUND_CSS);
  },
});
