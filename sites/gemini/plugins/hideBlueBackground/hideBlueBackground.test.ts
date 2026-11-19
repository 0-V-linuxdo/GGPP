/**
 * hideBlueBackground — fixture + CSS scope (blur-bg + lm-glow::before) + ctx.css cleanup.
 * Parses a public synthetic structural fixture, not a live-page DOM capture.
 * ctx.css cleanup path is mocked to mirror sites/gemini/runtime.ts (noted below).
 */
import { expect, test, describe } from "bun:test";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  HIDE_BLUE_BACKGROUND_CSS,
  HIDE_BLUE_BACKGROUND_SELECTOR,
  HIDE_BLUE_LM_GLOW_BEFORE_SELECTOR,
} from "./index";
import pluginFactory from "./index";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../../../..");
// Public synthetic structure only; not a live-page or private acceptance capture.
const HOME_FIXTURE = join(ROOT, "test/fixtures/zero-state.synthetic.json");

function loadZeroStateHtml(): string {
  const home = JSON.parse(readFileSync(HOME_FIXTURE, "utf8")) as {
    regions?: { zeroState?: string };
  };
  const zs = home.regions?.zeroState;
  if (typeof zs !== "string" || !zs.includes("modular-zero-state")) {
    throw new Error("synthetic fixture regions.zeroState missing modular-zero-state");
  }
  return zs;
}

describe("hideBlueBackground public synthetic structural fixture (not live DOM)", () => {
  test("modular-zero-state .blur-bg is an empty non-interactive div", () => {
    const zs = loadZeroStateHtml();
    const opens = [...zs.matchAll(/<div\b[^>]*class="[^"]*\bblur-bg\b[^"]*"[^>]*>/g)];
    expect(opens.length).toBe(1);
    const open = opens[0]![0];
    expect(open).toContain("blur-bg");
    expect(open).toContain("visible-primary-message");
    // Immediately closed empty element in fixture
    const emptyPair = zs.match(
      /<div\b[^>]*class="[^"]*\bblur-bg\b[^"]*"[^>]*>\s*<\/div>/,
    );
    expect(emptyPair).toBeTruthy();
    const inner = zs.match(
      /<div\b[^>]*class="[^"]*\bblur-bg\b[^"]*"[^>]*>(.*?)<\/div>/s,
    )?.[1];
    expect(inner).toBe("");
    // No controls / text hosts inside the pair
    expect(open).not.toMatch(/<button|<a |<input|<textarea|contenteditable|tabindex|href=/i);
    // Greeting / promo content lives elsewhere under modular-zero-state, not inside blur-bg
    const afterBlur = zs.slice(zs.indexOf("blur-bg"));
    const closed = afterBlur.indexOf("</div>");
    const blurSlice = afterBlur.slice(0, closed + 6);
    expect(blurSlice).not.toMatch(/greeting|button|promo/i);
  });
});

describe("hideBlueBackground CSS scope", () => {
  test("exact selectors and rules; no broad chrome / ::after / voice", () => {
    expect(HIDE_BLUE_BACKGROUND_SELECTOR).toBe("modular-zero-state .blur-bg");
    expect(HIDE_BLUE_LM_GLOW_BEFORE_SELECTOR).toBe(
      "chat-window.show-lm-background > div.lm-glow::before",
    );
    expect(HIDE_BLUE_BACKGROUND_CSS).toBe(
      [
        "modular-zero-state .blur-bg { display: none !important; }",
        "chat-window.show-lm-background > div.lm-glow::before { background-image: none !important; }",
      ].join("\n"),
    );
    const css = HIDE_BLUE_BACKGROUND_CSS;
    expect(css).toContain("modular-zero-state .blur-bg");
    expect(css).toContain("display: none !important");
    expect(css).toContain("chat-window.show-lm-background > div.lm-glow::before");
    expect(css).toContain("background-image: none !important");
    // Must not broaden to input chrome / voice / ::after / ng attrs / host layout nukes
    expect(css).not.toMatch(/input-container|input-gradient|input-area|textarea|ql-editor/i);
    expect(css).not.toMatch(/::after|voice|dictation|mic-button|speech/i);
    expect(css).not.toMatch(/_ngcontent|ng-reflect|ngcontent-/i);
    expect(css).not.toMatch(/greeting-headline|ggpp-greeting|trailing-actions|send-button/i);
    // blur-bg only in zero-state form; lm-glow only as ::before under show-lm-background
    expect(css).toMatch(/modular-zero-state \.blur-bg/);
    expect(css).not.toMatch(/(?<!modular-zero-state )\.blur-bg \{/);
    expect(css.split("{").length - 1).toBe(2);
  });

  test("plugin metadata: default on, Composer+Appearance, no node style mutation API", () => {
    // Invoke factory with a minimal USPP-like stub to read converted def fields we care about.
    const registered: any[] = [];
    const U = {
      OptionType: { BOOLEAN: "BOOLEAN", STRING: "STRING", NUMBER: "NUMBER", SLIDER: "SLIDER", SELECT: "SELECT", COLOR: "COLOR" },
      StartAt: { Init: "Init", SiteReady: "SiteReady" },
      definePlugin(def: any) {
        registered.push(def);
        return def;
      },
      plugins: {},
    };
    // bindApi/registerGgSchema side effects are OK in unit test
    const out = (pluginFactory as any)(U);
    expect(out.name).toBe("hideBlueBackground");
    expect(out.enabledByDefault).toBe(true);
    expect(out.ggTags).toEqual(["Composer", "Appearance"]);
    expect(out.description).toMatch(/blur-bg|zero-state/i);
    expect(out.description).toMatch(/lm-glow|radial|chat-window/i);
    expect(out.description).not.toMatch(/input-container/i);
  });
});

describe("hideBlueBackground ctx.css cleanup (mocked like runtime.ts)", () => {
  test("start injects style; registered cleanup removes it without touching blur node", () => {
    /**
     * MOCK NOTE: minimal in-memory Document stub + the same css()/cleanup contract as
     * sites/gemini/runtime.ts L334–339 (style[data-ggpp-style] + register(remove)).
     * Not a full USPP/kernel boot; mirrors the plugin start body (single ctx.css call).
     * Avoids jsdom import resolution from this test path.
     */
    type FakeEl = {
      tagName: string;
      textContent: string;
      attrs: Record<string, string>;
      children: FakeEl[];
      parent: FakeEl | null;
      setAttribute(k: string, v: string): void;
      getAttribute(k: string): string | null;
      appendChild(c: FakeEl): FakeEl;
      remove(): void;
      contains(c: FakeEl): boolean;
      querySelector(sel: string): FakeEl | null;
    };

    function el(tag: string): FakeEl {
      const node: FakeEl = {
        tagName: tag.toUpperCase(),
        textContent: "",
        attrs: {},
        children: [],
        parent: null,
        setAttribute(k, v) {
          this.attrs[k] = v;
        },
        getAttribute(k) {
          return k in this.attrs ? this.attrs[k] : null;
        },
        appendChild(c) {
          c.parent = this;
          this.children.push(c);
          return c;
        },
        remove() {
          if (!this.parent) return;
          this.parent.children = this.parent.children.filter((x) => x !== this);
          this.parent = null;
        },
        contains(c) {
          if (this.children.includes(c)) return true;
          return this.children.some((ch) => ch.contains(c));
        },
        querySelector(sel) {
          const m = /^style\[data-ggpp-style="([^"]+)"\]$/.exec(sel);
          if (!m) return null;
          const want = m[1];
          const walk = (n: FakeEl): FakeEl | null => {
            if (
              n.tagName === "STYLE" &&
              n.getAttribute("data-ggpp-style") === want
            )
              return n;
            for (const ch of n.children) {
              const hit = walk(ch);
              if (hit) return hit;
            }
            return null;
          };
          return walk(this);
        },
      };
      return node;
    }

    const documentElement = el("html");
    const body = el("body");
    documentElement.appendChild(body);
    const document = {
      createElement: (tag: string) => el(tag),
      documentElement,
      body,
      querySelector(sel: string) {
        return documentElement.querySelector(sel);
      },
    };

    const cleanups: Array<() => void> = [];
    const ctx = {
      css(text: string) {
        const styleEl = document.createElement("style");
        styleEl.setAttribute("data-ggpp-style", "hideBlueBackground");
        styleEl.textContent = text;
        document.documentElement.appendChild(styleEl);
        cleanups.push(() => styleEl.remove());
        return styleEl;
      },
    };

    const host = document.createElement("modular-zero-state");
    const blur = document.createElement("div");
    blur.setAttribute("class", "blur-bg visible-primary-message");
    host.appendChild(blur);
    document.body.appendChild(host);

    ctx.css(HIDE_BLUE_BACKGROUND_CSS);

    const style = document.querySelector(
      'style[data-ggpp-style="hideBlueBackground"]',
    );
    expect(style).toBeTruthy();
    expect(style!.textContent).toBe(HIDE_BLUE_BACKGROUND_CSS);
    expect(host.contains(blur)).toBe(true);
    expect(blur.getAttribute("style")).toBeNull();

    for (const fn of [...cleanups].reverse()) fn();
    expect(
      document.querySelector('style[data-ggpp-style="hideBlueBackground"]'),
    ).toBeNull();
    expect(host.contains(blur)).toBe(true);
    expect(blur.getAttribute("style")).toBeNull();
  });
});
