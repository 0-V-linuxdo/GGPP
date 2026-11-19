import { definePlugin } from "../../shims/types";
import { I } from "../../../../src/lib/icons";
import { ACCOUNT } from "../noSidebarIdentity";

const AREAS = {
  avatar: [`${ACCOUNT} .mavatar-container`, ".ggpp-custom-avatar"],
  name: [`${ACCOUNT} .mavatar-user-info`, ".ggpp-custom-name"],
  conversations: ["conversations-list .title-text", "top-bar-actions .conversation-title"],
  gems: ["side-navigation-content :is(.gem-title, .bot-name, project-item-button-gem .title-text)"],
  greeting: [".greeting-container", "h1.greeting-headline"],
};

export default definePlugin({
  id: "streamerMode",
  name: "StreamerMode",
  description: "Blur personal details while screen sharing. Hover an item to reveal it.",
  tags: ["Privacy"],
  icon: I.eyeOff,
  updated: "2026-10-14",
  settings: {
    avatar: { type: "boolean", label: "Avatar", default: true },
    name: { type: "boolean", label: "Name", default: true },
    conversations: { type: "boolean", label: "Conversation titles", description: "Titles in the recent chats list.", default: true },
    gems: { type: "boolean", label: "Gem names", default: true },
    greeting: { type: "boolean", label: "Home greeting", description: "The greeting that contains your first name.", default: true },
    strength: { type: "number", label: "Blur strength", default: 6, min: 2, max: 16, slider: true, unit: "px" },
  },
  start(ctx) {
    const sel = (Object.keys(AREAS) as (keyof typeof AREAS)[]).filter((k) => ctx.settings[k]).flatMap((k) => AREAS[k]);
    if (!sel.length) return;
    const list = sel.join(",\n");
    ctx.css(`
      ${list} { filter: blur(${ctx.settings.strength}px) !important; transition: filter .2s ease; }
      :is(${sel.map((s) => `${s}:hover`).join(", ")}) { filter: none !important; }
      @media (prefers-reduced-motion: reduce) { ${list} { transition: none !important; } }
    `);
  },
});
