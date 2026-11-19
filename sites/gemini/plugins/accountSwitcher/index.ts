import { definePlugin } from "../../shims/types";
import { h } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import type { GeminiApi } from "../gemini";
import type { MenusApi } from "../menus";
import type { UiApi } from "../ui";

/**
 * Google keeps several accounts signed in at once (/u/0, /u/1, ...). This
 * remembers which account sits at each slot and switches between them.
 */

interface Account {
  slot: number;
  name: string;
  email: string;
  avatar: string;
  seen: number;
}

const slotOf = () => Number(location.pathname.match(/^\/u\/(\d+)/)?.[1] ?? 0);

export default definePlugin({
  id: "accountSwitcher",
  name: "AccountSwitcher",
  description: "Switch between your signed-in Google accounts from Gemini's settings menu.",
  tags: ["Navigation"],
  icon: I.user,
  updated: "2026-10-14",
  dependencies: ["gemini", "menus", "ui"],
  async start(ctx) {
    const gemini = ctx.use<GeminiApi>("gemini");
    const ui = ctx.use<UiApi>("ui");
    let accounts = await ctx.data.get<Account[]>("accounts", []);

    // Learn the account shown at this slot from the side panel's account link.
    const learn = () => {
      const link = gemini.q<HTMLAnchorElement>(`${gemini.SEL.accountFooter} a[aria-label^='Google Account']`);
      const label = link?.dataset.ggppLabel ?? link?.getAttribute("aria-label") ?? "";
      const m = label.match(/^Google Account:\s*(.*?)\s*\(([^)]+@[^)]+)\)/);
      if (!m) return;
      const slot = slotOf();
      const avatar = link?.querySelector("img")?.src ?? "";
      const next: Account = { slot, name: m[1], email: m[2], avatar, seen: Date.now() };
      const prev = accounts.find((a) => a.slot === slot);
      if (prev && prev.email === next.email && prev.avatar === next.avatar) return;
      accounts = [...accounts.filter((a) => a.slot !== slot && a.email !== next.email), next].sort((a, b) => a.slot - b.slot);
      void ctx.data.set("accounts", accounts);
    };
    ctx.cleanup(gemini.watch(gemini.SEL.accountFooter, () => void setTimeout(learn, 500)));

    const go = (slot: number) => {
      const rest = location.pathname.replace(/^\/u\/\d+/, "").replace(/^\/app\/.*/, "/app");
      location.assign(`/u/${slot}${rest || "/app"}`);
    };

    function open() {
      learn();
      const current = slotOf();
      const maxSlot = Math.max(3, ...accounts.map((a) => a.slot + 1));
      const rows = Array.from({ length: maxSlot + 1 }, (_, slot) => {
        const a = accounts.find((x) => x.slot === slot);
        return h(
          "button",
          { class: "ggpp-menu-item", type: "button", style: { height: "52px" }, onclick: () => (m.close(), slot !== current && go(slot)) },
          a?.avatar
            ? h("img", { src: a.avatar, alt: "", style: { width: "28px", height: "28px", borderRadius: "50%" } })
            : h("span", { style: { width: "28px", height: "28px", borderRadius: "50%", display: "grid", placeItems: "center", background: "var(--ggpp-surface-2)" } }, String(slot)),
          h(
            "span",
            { style: { flex: "1", minWidth: "0", lineHeight: "18px" } },
            h("div", null, a ? a.name : `Account slot ${slot}`),
            h("div", { class: "ggpp-field-desc" }, a ? a.email : "Not visited yet"),
          ),
          slot === current && h("span", { class: "ggpp-pill" }, "Current"),
        );
      });
      const m = ui.modal({
        title: "Switch account",
        icon: I.user,
        width: 420,
        content: [
          h("p", { class: "ggpp-muted" }, "Accounts are listed by Google's sign-in slot. Use Google's account menu to add another account."),
          h("div", { style: { display: "flex", flexDirection: "column" } }, rows),
        ],
      });
    }

    ctx.cleanup(
      ctx.use<MenusApi>("menus").register({ id: "accountSwitcher", location: "settings", label: "Switch account", icon: I.user, order: -50, onSelect: open }),
    );
  },
});
