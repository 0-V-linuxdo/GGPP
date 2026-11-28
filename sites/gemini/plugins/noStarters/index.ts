import { definePlugin } from "../../shims/types";
import { I } from "../../../../src/lib/icons";

export default definePlugin({
  id: "noStarters",
  name: "NoStarters",
  description: "Hide suggested prompts and promo cards on the home screen.",
  tags: ["Declutter"],
  icon: I.sparkles,
  enabledByDefault: false,
  updated: "2026-10-14",
  start(ctx) {
    ctx.css(`
      modular-zero-state :is(zero-state-block-picker ~ *, .zero-state-suggestions, [data-test-id*='suggestion' i], intent-card, card-zero-state, .greeting-container button),
      prompt-flow-bar:not(.in-conversation) { display: none !important; }
    `);
  },
});
