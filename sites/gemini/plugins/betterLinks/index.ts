import { definePlugin } from "../../shims/types";
import { h } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import type { GeminiApi } from "../gemini";

/** Colour links in replies and turn bare domains (example.com/path) into links. */

const TLDS =
  "com|org|net|io|dev|app|co|ai|gov|edu|me|xyz|gg|tv|cc|so|is|info|tech|pro|site|store|cloud|online|icu|top|be|ly|sh|to|fm|am|us|uk|ca|de|fr|es|it|nl|jp|cn|ru|br|au|in|eu";
const DOMAIN = new RegExp(`(?<![\\w@/:.#-])((?:www\\.)?(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+(?:${TLDS})(?:/[^\\s<>"'\`)\\]},，。]*)?)(?![\\w-])`, "gi");
/** Non-global twin for .test(): a global regex keeps lastIndex between calls and skips matches. */
const HAS_DOMAIN = new RegExp(DOMAIN.source, "i");
const HEX = /^#[0-9a-f]{6}$/i;

export default definePlugin({
  id: "betterLinks",
  name: "BetterLinks",
  description: "Colour links in replies and make bare domains like example.com clickable.",
  tags: ["Messages"],
  icon: I.link,
  updated: "2026-10-14",
  dependencies: ["gemini"],
  settings: {
    linkifyDomains: { type: "boolean", label: "Linkify domains", description: "Detect bare domains in messages and make them clickable.", default: true },
    linkColor: { type: "color", label: "Link color", default: "#4a9eff" },
    enableVisitedColor: { type: "boolean", label: "Visited color", description: "Use a different color for links you already visited.", default: false },
    visitedColor: { type: "color", label: "Visited link color", default: "#9b59b6", showIf: (v) => !!v.enableVisitedColor },
  },
  start(ctx) {
    const gemini = ctx.use<GeminiApi>("gemini");
    const link = HEX.test(ctx.settings.linkColor) ? ctx.settings.linkColor : "#4a9eff";
    const visited = HEX.test(ctx.settings.visitedColor) ? ctx.settings.visitedColor : "#9b59b6";
    ctx.css(`
      :is(message-content, user-query) a[href] { color: ${link} !important; text-decoration-color: ${link} !important; }
      ${ctx.settings.enableVisitedColor ? `:is(message-content, user-query) a[href]:visited { color: ${visited} !important; text-decoration-color: ${visited} !important; }` : ""}
    `);
    if (!ctx.settings.linkifyDomains) return;

    const made: HTMLAnchorElement[] = [];
    function linkify(root: HTMLElement) {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: (n) =>
          (n.parentElement?.closest("a, code, pre, button, .ggpp-bl") ? NodeFilter.FILTER_REJECT : HAS_DOMAIN.test(n.textContent ?? "") ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP),
      });
      const nodes: Text[] = [];
      for (let n = walker.nextNode(); n; n = walker.nextNode()) nodes.push(n as Text);
      for (const node of nodes) {
        const text = node.textContent ?? "";
        const frag = document.createDocumentFragment();
        let last = 0;
        for (const m of text.matchAll(DOMAIN)) {
          frag.append(text.slice(last, m.index));
          const a = h("a", { href: `https://${m[1]}`, target: "_blank", rel: "noopener noreferrer", class: "ggpp-bl" }, m[1]);
          made.push(a);
          frag.append(a);
          last = m.index + m[1].length;
        }
        frag.append(text.slice(last));
        node.replaceWith(frag);
      }
    }

    // Only finished replies: touching a streaming reply would fight Gemini's renderer.
    const pass = () => {
      if (gemini.isGenerating()) return;
      for (const el of gemini.qa(`${gemini.SEL.modelResponse} ${gemini.SEL.modelText}, ${gemini.SEL.userQuery} ${gemini.SEL.userText}`)) linkify(el);
    };
    // Gemini re-renders a reply once it finishes, which can drop links added too early; run again a
    // few times after the end, and keep the latest reply covered while nothing is generating.
    ctx.on("gemini:response-end", () => [300, 1500, 4000].forEach((ms) => ctx.setTimeout(pass, ms)));
    ctx.on("gemini:generating", (on: boolean) => !on && ctx.setTimeout(pass, 1200));
    ctx.setInterval(pass, 5000);
    ctx.cleanup(gemini.watch(gemini.SEL.modelResponse, () => void setTimeout(pass, 500)));
    ctx.cleanup(() => {
      for (const a of made) if (a.isConnected) a.replaceWith(a.textContent ?? "");
    });
  },
});
