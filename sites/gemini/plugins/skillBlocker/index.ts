import { definePlugin } from "../../shims/types";
import { coerceListSetting } from "../../runtime";
import { I } from "../../../../src/lib/icons";

/** Hide the Gemini skills (or Gems) you name from lists and menus. Hiding only; nothing is deleted. */

const ROW = "gem-menu-item, [role='menuitem'], [role='option'], [role='listitem'], mat-list-item, gem-nav-list-item, mat-card, li, tr, a";
const CARDISH = /card|item|tile|row|chip|skill|gem/i;

/** The smallest card or row around a title: a known row element, or a card-like block that isn't a whole section. */
function container(el: HTMLElement | null): HTMLElement | null {
  for (let cur = el, depth = 0; cur && cur !== document.body && depth < 10; cur = cur.parentElement, depth++) {
    const r = cur.getBoundingClientRect();
    const vw = document.documentElement.clientWidth || innerWidth || Number.POSITIVE_INFINITY;
    if (r.height > 420 || r.width > vw * 0.8) return null;
    if (cur.matches(ROW) || CARDISH.test(cur.tagName) || CARDISH.test(cur.className.toString())) return cur;
  }
  return null;
}

export default definePlugin({
  id: "skillBlocker",
  name: "SkillBlocker",
  description: "Hide the skills or Gems you name from Gemini's lists and menus.",
  tags: ["Privacy", "Declutter"],
  icon: I.ban,
  enabledByDefault: true,
  updated: "2026-10-14",
  settings: {
    blocked: { type: "list", label: "Names to hide", description: "Exact names, one per row.", placeholder: "Skill or Gem name", default: [] as string[] },
  },
  start(ctx) {
    const names = new Set(coerceListSetting(ctx.settings.blocked).map((n) => n.trim().toLowerCase()).filter(Boolean));
    if (!names.size) return;
    const hidden = new Set<HTMLElement>();

    const scan = () => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        const text = n.textContent?.trim().toLowerCase();
        if (!text || !names.has(text)) continue;
        // Hide the smallest row-like container, never a whole list or page section.
        const row = container(n.parentElement);
        if (!row || hidden.has(row)) continue;
        row.style.setProperty("display", "none", "important");
        row.dataset.ggppBlocked = "1";
        hidden.add(row);
      }
    };
    let timer: ReturnType<typeof setTimeout> | undefined;
    const mo = new MutationObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(scan, 150);
    });
    mo.observe(document.body, { childList: true, subtree: true, characterData: true });
    scan();
    ctx.cleanup(() => {
      mo.disconnect();
      clearTimeout(timer);
      for (const el of hidden) {
        el.style.removeProperty("display");
        delete el.dataset.ggppBlocked;
      }
    });
  },
});
