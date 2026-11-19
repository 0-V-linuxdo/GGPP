import { definePlugin } from "../../shims/types";
import { h } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import type { GeminiApi } from "../gemini";

/** Your own name and picture in the side panel's account footer. Empty fields keep Google's. */

const SIZE = 256;

/** Center-crop and scale a picked image to a square data URL. */
async function toSquare(file: Blob): Promise<string> {
  const bmp = await createImageBitmap(file);
  const side = Math.min(bmp.width, bmp.height);
  const c = document.createElement("canvas");
  c.width = c.height = SIZE;
  c.getContext("2d")!.drawImage(bmp, (bmp.width - side) / 2, (bmp.height - side) / 2, side, side, 0, 0, SIZE, SIZE);
  return c.toDataURL("image/png");
}

export default definePlugin({
  id: "customSidebarIdentity",
  name: "CustomSidebarIdentity",
  description: "Replace the side panel's account name and picture with your own.",
  tags: ["Appearance", "Privacy"],
  icon: I.user,
  updated: "2026-10-14",
  dependencies: ["gemini"],
  settings: {
    displayName: { type: "string", label: "Display name", description: "Empty keeps your Google name.", placeholder: "Your name", default: "" },
    avatarUrl: { type: "string", label: "Avatar URL", description: "An https:// or data:image URL. Or paste / drop an image below. Empty keeps your Google picture.", placeholder: "https://…", default: "" },
    avatarSize: { type: "number", label: "Avatar size", default: 32, min: 24, max: 64, slider: true, unit: "px" },
  },
  start(ctx) {
    const gemini = ctx.use<GeminiApi>("gemini");
    const { displayName, avatarUrl, avatarSize } = ctx.settings;
    const name = displayName.trim();
    const url = /^(https:|data:image\/)/.test(avatarUrl.trim()) ? avatarUrl.trim() : "";

    ctx.css(`
      sidenav-mavatar-footer .mavatar-container { width: ${avatarSize}px !important; height: ${avatarSize}px !important; }
      sidenav-mavatar-footer .mavatar-container img { width: 100% !important; height: 100% !important; object-fit: cover; border-radius: 50%; }
      side-navigation-content.rail sidenav-mavatar-footer .mavatar-container { width: 32px !important; height: 32px !important; }
      ${
        name
          ? `sidenav-mavatar-footer .mavatar-user-name { font-size: 0 !important; }
      sidenav-mavatar-footer .mavatar-user-name::after { content: ${JSON.stringify(name)}; font-size: var(--gem-sys-typography-type-scale--body-m-font-size, 14px); }`
          : ""
      }
    `);

    ctx.cleanup(
      gemini.watch(`${gemini.SEL.accountFooter} .mavatar-container img`, (img) => {
        if (!url) return;
        const original = (img as HTMLImageElement).src;
        const swap = () => {
          if ((img as HTMLImageElement).src !== url) (img as HTMLImageElement).src = url;
        };
        img.classList.add("ggpp-custom-avatar");
        swap();
        img.addEventListener(
          "error",
          () => {
            img.dataset.ggppFailed = "1";
            (img as HTMLImageElement).src = original;
          },
          { once: true },
        );
        const mo = new MutationObserver(swap);
        mo.observe(img, { attributes: true, attributeFilter: ["src"] });
        return () => {
          mo.disconnect();
          img.classList.remove("ggpp-custom-avatar");
          (img as HTMLImageElement).src = original;
        };
      }),
    );

    // Gemini can swap the footer image without adding a new element; keep ours in place.
    if (url) {
      ctx.setInterval(() => {
        for (const img of gemini.qa<HTMLImageElement>(`${gemini.SEL.accountFooter} .mavatar-container img`)) {
          if (img.src !== url && !img.dataset.ggppFailed) {
            img.dataset.ggppOriginal ??= img.src;
            img.src = url;
          }
        }
      }, 1500);
    }

    ctx.provide("panel:customSidebarIdentity", (panel: HTMLElement) => {
      const preview = h("img", { alt: "", src: url, style: { width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover", display: url ? "block" : "none" } });
      const drop = h(
        "div",
        {
          tabindex: 0,
          style: { border: "1px dashed var(--ggpp-border)", borderRadius: "12px", padding: "16px", textAlign: "center", color: "var(--ggpp-fg-2)", cursor: "pointer" },
        },
        "Paste or drop an image here, or click to choose a file",
      );
      const use = async (file: Blob | null | undefined) => {
        if (!file?.type.startsWith("image/")) return;
        ctx.setSetting("avatarUrl", await toSquare(file));
      };
      const picker = h("input", { type: "file", accept: "image/*", style: { display: "none" }, onchange: () => void use(picker.files?.[0]) });
      drop.addEventListener("click", () => picker.click());
      drop.addEventListener("paste", (e) => void use([...(e.clipboardData?.files ?? [])][0]));
      drop.addEventListener("dragover", (e) => e.preventDefault());
      drop.addEventListener("drop", (e) => {
        e.preventDefault();
        void use(e.dataTransfer?.files[0]);
      });
      panel.append(h("div", { style: { display: "flex", gap: "12px", alignItems: "center" } }, preview, drop), picker);
    });
  },
});
