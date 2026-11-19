import { definePlugin } from "../../shims/types";
import { I } from "../../../../src/lib/icons";

/** A quiet twinkling star field behind Gemini. */

const HEX = /^#[0-9a-f]{6}$/i;

export default definePlugin({
  id: "starry",
  name: "Starry",
  description: "A softly twinkling star field behind the page.",
  tags: ["Appearance"],
  icon: I.sparkles,
  updated: "2026-10-14",
  settings: {
    starColor: { type: "color", label: "Star color", default: "#ffffff" },
    density: { type: "number", label: "Density", description: "Stars per 10,000 px².", default: 1.2, min: 0.2, max: 5, step: 0.1, slider: true },
    darkOnly: { type: "boolean", label: "Dark theme only", description: "Hide the stars in light theme.", default: true },
  },
  start(ctx) {
    const color = HEX.test(ctx.settings.starColor) ? ctx.settings.starColor : "#ffffff";
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(color.slice(i, i + 2), 16));
    const canvas = document.createElement("canvas");
    canvas.className = "ggpp-starry";
    canvas.setAttribute("data-ggpp-own", "");
    document.body.prepend(canvas);
    ctx.cleanup(() => canvas.remove());
    ctx.css(`
      .ggpp-starry { position: fixed; inset: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 0; mix-blend-mode: screen; }
      ${ctx.settings.darkOnly ? `:root:not([data-ggpp-theme="dark"]) .ggpp-starry { display: none; }` : ""}
      @media (prefers-reduced-motion: reduce) { .ggpp-starry { opacity: .6; } }
    `);
    const g2 = canvas.getContext("2d")!;
    let stars: { x: number; y: number; r: number; p: number; s: number }[] = [];
    const resize = () => {
      const dpr = devicePixelRatio || 1;
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      g2.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round((innerWidth * innerHeight * ctx.settings.density) / 10_000);
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        r: Math.random() * 1.1 + 0.3,
        p: Math.random() * Math.PI * 2,
        s: Math.random() * 0.0015 + 0.0005,
      }));
    };
    resize();
    window.addEventListener("resize", resize, { signal: ctx.signal });
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const draw = (t: number) => {
      g2.clearRect(0, 0, innerWidth, innerHeight);
      for (const st of stars) {
        const a = still ? 0.6 : 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(st.p + t * st.s));
        g2.fillStyle = `rgba(${r},${g},${b},${a.toFixed(3)})`;
        g2.beginPath();
        g2.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        g2.fill();
      }
      if (!still) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    ctx.cleanup(() => cancelAnimationFrame(raf));
  },
});
