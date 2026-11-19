import { definePlugin } from "../../shims/types";
import { I } from "../../../../src/lib/icons";
import type { GeminiApi } from "../gemini";

/** Start every new chat as a Temporary chat. */

const ENTRY = "temp-chat-button gem-icon-button.temp-chat-entry button, temp-chat-button button[aria-label='Temporary chat']";

export default definePlugin({
  id: "incognito",
  name: "Incognito",
  description: "Turn on Temporary chat automatically whenever you start a new chat.",
  tags: ["Privacy"],
  icon: I.incognito,
  updated: "2026-10-14",
  dependencies: ["gemini"],
  start(ctx) {
    const gemini = ctx.use<GeminiApi>("gemini");
    let doneFor = "";
    const tryEnable = () => {
      const r = gemini.route();
      if (!r.isHome || doneFor === r.href) return;
      const btn = gemini.q(ENTRY);
      if (!btn) return;
      doneFor = r.href;
      btn.click();
    };
    ctx.cleanup(gemini.watch(ENTRY, () => void setTimeout(tryEnable, 150)));
    ctx.on("gemini:route", ({ route }) => {
      if (!route.isHome) doneFor = "";
      setTimeout(tryEnable, 300);
    });
  },
});
