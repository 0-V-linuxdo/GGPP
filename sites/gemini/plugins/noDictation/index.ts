import { definePlugin } from "../../shims/types";
import { I } from "../../../../src/lib/icons";

// Drop the width reserve only for a wrapper containing one mic child.
export const NO_DICTATION_CSS = `input-container :is(speech-dictation-mic-button, .mic-button-container) { display: none !important; }
input-container .input-buttons-wrapper-bottom:has(> .mic-button-container:only-child) { min-width: 0 !important; }`;

export default definePlugin({
  id: "noDictation",
  name: "NoDictation",
  description: "Hide the microphone (voice input) button in the message box.",
  tags: ["Declutter"],
  icon: I.micOff,
  enabledByDefault: false,
  updated: "2026-10-14",
  start(ctx) {
    ctx.css(NO_DICTATION_CSS);
  },
});
