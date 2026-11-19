import { definePlugin } from "../../shims/types";
import { I } from "../../../../src/lib/icons";

/** Account block at the bottom of Gemini's side navigation (avatar, name, plan). */
export const ACCOUNT = "sidenav-mavatar-footer";

export default definePlugin({
  id: "noSidebarIdentity",
  name: "NoSidebarIdentity",
  description: "Hide your name, email and plan in the side panel; the avatar stays clickable.",
  tags: ["Privacy"],
  icon: I.userX,
  enabledByDefault: true,
  updated: "2026-10-14",
  settings: {
    hideName: { type: "boolean", label: "Name", description: "Your name next to the side-panel avatar.", default: true },
    hideEmail: { type: "boolean", label: "Email", description: "Your email in the account link's tooltip and label.", default: true },
    hidePlan: { type: "boolean", label: "Plan label", description: "The plan label (Pro, Ultra…) under your name.", default: false },
  },
  start(ctx) {
    const r: string[] = [];
    const { hideName, hidePlan } = ctx.settings;
    if (hideName) r.push(`${ACCOUNT} .mavatar-user-name`, ".ggpp-custom-name");
    if (hidePlan) r.push(`${ACCOUNT} .mavatar-tier-enterprise-labels`);
    if (hideName && hidePlan) r.push(`${ACCOUNT} .mavatar-user-info`);
    if (ctx.settings.hideEmail) {
      // The email only lives in the avatar link's label (read by tooltips and screen readers).
      const link = () => document.querySelector<HTMLAnchorElement>(`${ACCOUNT} a[aria-label^='Google Account']`);
      const scrub = () => {
        const a = link();
        const label = a?.getAttribute("aria-label");
        if (a && label && /\(.+@.+\)/.test(label)) {
          a.dataset.ggppLabel = label;
          a.setAttribute("aria-label", label.replace(/\s*\(.+@.+\)/, ""));
        }
      };
      scrub();
      ctx.setInterval(scrub, 2000);
      ctx.cleanup(() => {
        const a = link();
        if (a?.dataset.ggppLabel) {
          a.setAttribute("aria-label", a.dataset.ggppLabel);
          delete a.dataset.ggppLabel;
        }
      });
    }
    if (r.length) ctx.css(`${r.join(",\n")} { display: none !important; }`);
  },
});
