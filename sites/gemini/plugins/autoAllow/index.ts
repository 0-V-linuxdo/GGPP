import { definePlugin } from "../../shims/types";
import { I } from "../../../../src/lib/icons";
import { clickAllowPrompt, clickCancelPrompt, findToolPermission } from "./clickAllowPrompt";
import { decideAutoAllow, judgeApi, judgeRules, openTemporaryWebJudge } from "./judge";

/** Judge Gemini's in-page tool-permission cards before allowing or denying them. */

export default definePlugin({
  id: "autoAllow",
  name: "AutoAllow",
  description: "Judges Gemini's in-page tool permissions. 总是允许 skips the judge and clicks Allow.",
  tags: ["Messages"],
  icon: I.check,
  enabledByDefault: true,
  updated: "2026-11-28",
  settings: {
    delay: {
      type: "number",
      label: "Delay",
      description: "Seconds to wait before clicking Allow.",
      default: 0,
      min: 0,
      max: 5,
      unit: "s",
    },
    alwaysAllow: {
      type: "boolean",
      label: "总是允许",
      description: "所有权限请求都直接点 Allow，不展开询问内容。",
      default: true,
    },
    preferSticky: {
      type: "boolean",
      label: "Remember when possible",
      description: "Prefer Always allow / Allow for this chat when Gemini offers it.",
      default: true,
    },
    backend: {
      type: "select",
      label: "Judge backend",
      description: "Rules are local. API uses your Gemini key. Web opens a Gemini Temporary chat for review.",
      default: "rules",
      options: [
        { value: "rules", label: "Local safety rules" },
        { value: "api", label: "Gemini API" },
        { value: "web", label: "Gemini Temporary chat (preview)" },
      ],
    },
    apiKey: {
      type: "string",
      label: "Gemini API key",
      description: "Used only for the safety verdict; it is never logged.",
      default: "",
      placeholder: "AIza…",
      showIf: (values) => values.backend === "api",
    },
    model: {
      type: "string",
      label: "Gemini API model",
      description: "Must support generateContent.",
      default: "gemini-2.5-flash",
      showIf: (values) => values.backend === "api",
    },
  },
  start(ctx) {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let pending: ReturnType<typeof setTimeout> | undefined;
    const scan = () => {
      clearTimeout(pending);
      const delayMs = Math.max(0, Number(ctx.settings.delay) || 0) * 1000;
      const run = async () => {
        try {
          const always = ctx.settings.alwaysAllow !== false;
          const card = findToolPermission(document, { expand: !always });
          if (!card) return;
          if (always) {
            clickAllowPrompt(card.element, ctx.settings.preferSticky !== false);
            return;
          }
          const permission = { toolName: card.toolName, script: card.script, text: card.text };
          const backend = ctx.settings.backend;
          const verdict = backend === "api"
            ? await judgeApi(permission, ctx.settings.apiKey, ctx.settings.model)
            : backend === "web"
              ? openTemporaryWebJudge(permission)
              : judgeRules(permission);
          const action = decideAutoAllow(verdict, false);
          if (action === "allow") clickAllowPrompt(card.element, ctx.settings.preferSticky !== false);
          else if (action === "deny") clickCancelPrompt(card);
        } catch {}
      };
      if (delayMs) pending = setTimeout(run, delayMs);
      else run();
    };
    const mo = new MutationObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(scan, 80);
    });
    try {
      mo.observe(document.documentElement, { childList: true, subtree: true });
    } catch {}
    scan();
    ctx.cleanup(() => {
      mo.disconnect();
      clearTimeout(timer);
      clearTimeout(pending);
    });
  },
});
