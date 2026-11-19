import { definePlugin } from "../../shims/types";
import { I } from "../../../../src/lib/icons";
import type { GeminiApi } from "../gemini";

export default definePlugin({
  id: "composerOpacity",
  name: "ComposerOpacity",
  description: "Make the message box see-through with an optional frosted blur.",
  tags: ["Composer", "Appearance"],
  dependencies: ["gemini"],
  icon: I.blend,
  enabledByDefault: true,
  updated: "2026-10-14",
  settings: {
    opacity: { type: "number", label: "Opacity", description: "Background opacity of the message box. 100 is fully opaque.", default: 100, min: 0, max: 100, slider: true, unit: "%" },
    blur: { type: "number", label: "Blur", description: "Backdrop blur in pixels; used when opacity is below 100.", default: 16, min: 0, max: 40, slider: true, unit: "px" },
  },
  start(ctx) {
    const { opacity, blur } = ctx.settings;
    if (opacity >= 100) return;
    const gemini = ctx.use<GeminiApi>("gemini");
    // Gemini rounds the outer box; give the inner surface the same radius once it is see-through.
    ctx.cleanup(
      gemini.watch("input-area-v2", (box) => {
        const r = getComputedStyle(box).borderTopLeftRadius;
        if (r && r !== "0px") box.style.setProperty("--ggpp-composer-radius", r);
        return () => box.style.removeProperty("--ggpp-composer-radius");
      }),
    );
    ctx.css(`
      input-container.input-gradient, input-container, input-container .input-area-container, input-area-v2 { background: transparent !important; box-shadow: none !important; }
      input-container::before, input-container::after { background: none !important; }
      input-area-v2 { overflow: clip; }
      input-area-v2 .input-area {
        border-radius: var(--ggpp-composer-radius, 32px) !important;
        background-color: color-mix(in srgb, var(--gem-sys-color--surface-container, var(--ggpp-surface)) ${opacity}%, transparent) !important;
        ${blur > 0 ? `backdrop-filter: blur(${blur}px) !important;` : ""}
      }
    `);
  },
});
