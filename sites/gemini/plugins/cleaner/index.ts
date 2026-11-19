import { definePlugin } from "../../shims/types";
import { I } from "../../../../src/lib/icons";

const RULES = {
  hideUpgrade: [
    "[data-test-id='desktop-upgrade-tier2-button']",
    "[data-test-id*='upgrade' i]",
    "[data-test-id*='upsell' i]",
    "top-bar-actions .buttons-container.adv-upsell",
  ],
  hidePromoGreeting: ["new-model-promo-greeting .greeting-container > :not(.ggpp-greeting)"],
  hideGetApp: ["desktop-get-app-button", "[data-test-id='desktop-get-app-button']"],
  hideBanners: ["remy-access-restricted-banner", "condensed-tos-disclaimer", "[data-test-id*='promo' i]", ".promo-banner"],
  hideLockedModels: [
    "[data-test-id^='bard-mode-option-']:has([data-test-id*='upsell' i], [fonticon='lock'])",
    "[data-test-id^='bard-mode-option-'][aria-disabled='true']",
  ],
  hideDisclaimer: ["hallucination-disclaimer"],
};

export default definePlugin({
  id: "cleaner",
  name: "Cleaner",
  description: "Hide upgrade prompts, promo banners and locked models.",
  tags: ["Declutter"],
  icon: I.brush,
  enabledByDefault: true,
  updated: "2026-10-14",
  settings: {
    hideUpgrade: { type: "boolean", label: "Upgrade buttons", description: "The Upgrade / Google AI plan buttons and links.", default: true },
    hidePromoGreeting: { type: "boolean", label: "Home promo", description: "The new-model promo headline and \"Let's go\" button on the home screen.", default: true },
    hideGetApp: { type: "boolean", label: "Get app button", description: "The \"Get app\" promo in the top bar.", default: true },
    hideBanners: { type: "boolean", label: "Promo banners", description: "Promotional banners and cards.", default: true },
    hideLockedModels: { type: "boolean", label: "Locked models", description: "Models you cannot use (upgrade gated) in the model picker.", default: true },
    hideDisclaimer: { type: "boolean", label: "Disclaimer line", description: "The \"Gemini is AI and can make mistakes\" line under the message box.", default: false },
  },
  start(ctx) {
    const on = (Object.keys(RULES) as (keyof typeof RULES)[]).filter((k) => ctx.settings[k]);
    if (on.length) ctx.css(`${on.flatMap((k) => RULES[k]).join(",\n")} { display: none !important; }`);
  },
});
