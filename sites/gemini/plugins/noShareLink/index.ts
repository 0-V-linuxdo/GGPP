import { definePlugin } from "../../shims/types";
import { I } from "../../../../src/lib/icons";

export default definePlugin({
  id: "noShareLink",
  name: "NoShareLink",
  description: "Hide the buttons that create public share links.",
  tags: ["Declutter", "Privacy"],
  icon: I.share,
  enabledByDefault: false,
  updated: "2026-10-14",
  settings: {
    hideChatShare: { type: "boolean", label: "Share conversation", description: "\"Share conversation\" in the conversation menu.", default: true },
    hidePublicLinks: { type: "boolean", label: "Your public links", description: "\"Your public links\" in the settings menu.", default: false },
  },
  start(ctx) {
    const rules: string[] = [];
    if (ctx.settings.hideChatShare) rules.push("[role='menuitem'][data-test-id='share-button'], gem-menu-item[data-test-id='share-button']");
    if (ctx.settings.hidePublicLinks) rules.push("[role='menuitem'][data-test-id='toggle-shared-links-button']");
    if (rules.length) ctx.css(`${rules.join(",\n")} { display: none !important; }`);
  },
});
