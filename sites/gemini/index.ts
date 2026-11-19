/**
 * GG++ Gemini site adapter on Userscript++.
 * Public API is the factory parameter U. Feature plugins live in ./plugins.
 * Side effects that need `window` must run in start(), not when the factory
 * is invoked at build time for metadata.
 */
import { bindApi, getKernelFacade } from "./runtime";
import { migrateGgSettings } from "./migrate";
import { installNetHook } from "./netHook";
import { installUsageObserver } from "./usageObserver";

export default (U: any) => {
  bindApi(U);

  return U.defineSite({
    id: "gemini",
    name: "Gemini",
    matches: ["*://gemini.google.com/*"],
    ready: {
      element: ":is(bard-sidenav-content, main.chat-app, [role='main'], chat-window, side-navigation-content)",
      timeout: 20000,
    },
    styleHost: "adopted",
    legacySettings: true,
    theme: () => {
      try {
        if (document.documentElement.getAttribute("data-color-scheme") === "dark") return "dark";
        if (document.body?.classList.contains("dark-theme")) return "dark";
        if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) return "dark";
      } catch {}
      return "light";
    },
    slots: [
      { name: "chatBar", kind: "button", context: "composer trailing actions" },
      { name: "conversationMenu", kind: "menu", context: "{ conversationId }" },
      { name: "messageMenu", kind: "menu", context: "{ response }" },
      { name: "settingsMenu", kind: "menu", context: "{}" },
    ],
    // Route USPP openSettings / menu / floating into GG++ settings modal (not the framework panel).
    // open() looks up settingsUI at call time — the settings plugin provides it after start.
    settingsHost: {
      open(opts: { tab?: string; plugin?: string } = {}) {
        const ui = getKernelFacade()?.service<{ open: (tab?: string, plugin?: string) => void }>("settingsUI");
        if (!ui?.open) return false;
        try {
          ui.open(opts.tab, opts.plugin);
          return true;
        } catch {
          return false;
        }
      },
      isOpen() {
        return false;
      },
    },
    start() {
      migrateGgSettings();
      installNetHook();
      // Voyager-style MAIN-world batchexecute capture/replay (userscript sandbox ≠ page fetch/WIZ).
      installUsageObserver();
      const kernel = getKernelFacade();

      window.addEventListener("ggpp:net", (e) => {
        try {
          const d = JSON.parse(String((e as CustomEvent).detail));
          if (d.phase === "start" || d.phase === "end") {
            kernel?.emit(`net:stream-${d.phase}`, {
              conversationId: d.conversationId ?? null,
              requestId: String(d.requestId),
              error: !!d.error,
            });
          } else if (d.phase === "chunk") {
            kernel?.emit("net:chunk", {
              ids: Array.isArray(d.ids) ? d.ids.map(String) : [],
              bytes: Number(d.bytes) || 0,
              url: String(d.url ?? ""),
            });
          } else if (d.phase === "log") {
            kernel?.emit("net:log", Array.isArray(d.entries) ? d.entries.map(String) : []);
          }
        } catch {
          /* ignore */
        }
      });

      window.addEventListener(
        "keydown",
        (e) => {
          kernel?.emit("key:early", e);
        },
        { capture: true },
      );

      try {
        const g = (globalThis as any).GGPP;
        if (g && typeof g === "object") {
          Object.defineProperty(g, "kernel", { value: kernel, configurable: true });
        }
      } catch {}
    },
  });
};
