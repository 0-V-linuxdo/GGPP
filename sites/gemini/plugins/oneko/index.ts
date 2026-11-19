import { definePlugin } from "../../shims/types";
import { h } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";

/** A little cat that chases your cursor and naps when it stops. Self-contained, no downloads. */

export default definePlugin({
  id: "oneko",
  name: "Oneko",
  description: "A small cat follows your mouse cursor and naps when you stop.",
  tags: ["Appearance"],
  icon: I.cat,
  updated: "2026-10-14",
  settings: {
    speed: { type: "number", label: "Speed", default: 10, min: 4, max: 24, slider: true, unit: "px" },
  },
  start(ctx) {
    const cat = h("div", { id: "ggpp-oneko", "aria-hidden": "true" }, "🐈");
    const zz = h("span", { class: "ggpp-oneko-z" }, "💤");
    cat.append(zz);
    document.body.append(cat);
    ctx.cleanup(() => cat.remove());
    ctx.css(`
      #ggpp-oneko { position: fixed; left: 0; top: 0; z-index: 2147482000; pointer-events: none; font-size: 26px; line-height: 1; width: 32px; height: 32px; text-align: center; image-rendering: pixelated; transition: transform .05s linear; }
      #ggpp-oneko.ggpp-run { animation: ggpp-hop .25s steps(2) infinite; }
      #ggpp-oneko .ggpp-oneko-z { position: absolute; left: 18px; top: -14px; font-size: 14px; opacity: 0; transition: opacity .4s; }
      #ggpp-oneko.ggpp-sleep .ggpp-oneko-z { opacity: 1; }
      @keyframes ggpp-hop { 50% { margin-top: -3px; } }
    `);
    let x = 32;
    let y = 32;
    let mx = x;
    let my = y;
    let idle = 0;
    let flip = 1;
    window.addEventListener("mousemove", (e) => ((mx = e.clientX), (my = e.clientY)), { passive: true, signal: ctx.signal });
    const step = () => {
      const dx = mx - x;
      const dy = my - y;
      const d = Math.hypot(dx, dy);
      const speed = ctx.settings.speed;
      if (d < 48) {
        idle++;
        cat.classList.remove("ggpp-run");
        cat.classList.toggle("ggpp-sleep", idle > 40);
      } else {
        idle = 0;
        cat.classList.remove("ggpp-sleep");
        cat.classList.add("ggpp-run");
        x += (dx / d) * speed;
        y += (dy / d) * speed;
        if (Math.abs(dx) > 2) flip = dx > 0 ? -1 : 1;
      }
      x = Math.min(Math.max(16, x), innerWidth - 16);
      y = Math.min(Math.max(16, y), innerHeight - 16);
      cat.style.transform = `translate(${x - 16}px, ${y - 16}px) scaleX(${flip})`;
      zz.style.transform = `scaleX(${flip})`;
    };
    ctx.setInterval(step, 100);
  },
});
