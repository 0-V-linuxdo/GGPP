import { definePlugin } from "../../shims/types";
import { h } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import type { Kernel } from "../../shims/kernel";
import type { GeminiApi } from "../gemini";
import type { UiApi } from "../ui";

/** Logs GG++ page events to the console and reports which Gemini anchors were found. */

const ANCHORS = ["sidenav", "conversationRow", "accountFooter", "topBar", "conversationMenuButton", "composer", "editor", "modeButton", "mic", "userQuery", "modelResponse", "scroller", "greeting"] as const;

export default definePlugin({
  id: "diagnostics",
  name: "Diagnostics",
  description: "Log GG++ events to the console and check which parts of Gemini GG++ can find.",
  tags: ["Developer"],
  icon: I.bug,
  updated: "2026-10-14",
  dependencies: ["gemini", "ui"],
  settings: {
    logEvents: { type: "boolean", label: "Log events", description: "Print route and reply events to the console.", default: true },
  },
  start(ctx) {
    const gemini = ctx.use<GeminiApi>("gemini");
    const ui = ctx.use<UiApi>("ui");
    const kernel = ctx.use<Kernel>("kernel");
    if (ctx.settings.logEvents) {
      for (const ev of [
        "gemini:route",
        "gemini:response-start",
        "gemini:response-end",
        "gemini:response-left",
        "gemini:response-elsewhere",
        "gemini:response-lost",
        "net:stream-start",
        "net:stream-end",
        "plugin:started",
        "plugin:stopped",
      ]) {
        ctx.on(ev, (p) => ctx.log.info(ev, p));
      }
    }
    // Last keys GG++ saw before Gemini, to debug shortcuts that "do nothing".
    const keys: string[] = [];
    ctx.on("key:early", (e: KeyboardEvent) => {
      keys.push(`${new Date().toLocaleTimeString()} ${e.key} on ${(e.target as HTMLElement)?.tagName?.toLowerCase() ?? "?"}`);
      if (keys.length > 15) keys.shift();
    });
    const report = () => ({
      lastKeys: keys,
      version: kernel.version,
      url: location.href,
      theme: gemini.theme(),
      generating: gemini.isGenerating(),
      title: gemini.title(),
      messages: gemini.messages().length,
      anchors: Object.fromEntries(ANCHORS.map((k) => [k, gemini.qa(gemini.SEL[k]).length])),
      network: netLog,
      pageNetwork: pageNet,
      plugins: kernel.plugins().map((p) => `${p.def.id}:${p.state}${p.error ? ` (${p.error})` : ""}`),
    });
    let netLog: string[] = [];
    let pageNet: string[] = [];
    ctx.on("net:log", (entries: string[]) => (pageNet = entries));
    const pullNet = async () => {
      if (__GGPP_TARGET__ !== "extension") return;
      try {
        netLog = await (globalThis as any).browser.runtime.sendMessage({ type: "ggpp:net-log" });
      } catch (e) {
        netLog = [`unavailable: ${e}`];
      }
    };
    ctx.provide("panel:diagnostics", async (el: HTMLElement) => {
      // Ask the page-world hook for its request log (it answers with a ggpp:net "log" event).
      window.dispatchEvent(new CustomEvent("ggpp:net-log-request"));
      await pullNet();
      await new Promise((r) => setTimeout(r, 150));
      const pre = h("pre", { style: { whiteSpace: "pre-wrap", fontSize: "12px", maxHeight: "40vh", overflow: "auto", margin: "0" } }, JSON.stringify(report(), null, 2));
      el.append(
        h("div", { class: "ggpp-section-label" }, "Report"),
        pre,
        ui.button("Copy report", () => {
          void navigator.clipboard.writeText(JSON.stringify(report(), null, 2));
          ui.toast({ title: "Copied", duration: 1500, icon: I.copy });
        }),
      );
    });
  },
});
