import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { filterNavMessages, isChromeNavText, isTopLevelMessageEl, navLabelText, type MessageLike } from "./navItems";

const HERE = dirname(fileURLToPath(import.meta.url));

function msg(role: MessageLike["role"], text: string, el?: MessageLike["el"]): MessageLike {
  return { role, text, el };
}

describe("isChromeNavText", () => {
  test("empty, ellipsis, and Writing placeholders", () => {
    expect(isChromeNavText("model", "")).toBe(true);
    expect(isChromeNavText("user", "   ")).toBe(true);
    expect(isChromeNavText("user", "…")).toBe(true);
    expect(isChromeNavText("user", "...")).toBe(true);
    expect(isChromeNavText("model", "Writing…")).toBe(true);
    expect(isChromeNavText("model", "Writing...")).toBe(true);
  });

  test("Allow / Cancel / Continue chips in English and Chinese", () => {
    for (const text of ["Cancel", "Allow", "Allow once", "Always allow", "Allow for this chat", "取消", "允许", "始终允许", "允许一次", "允许本次对话", "Continue", "继续", "Keep going"]) {
      expect(isChromeNavText("user", text)).toBe(true);
    }
  });

  test("thinking status and action-only labels", () => {
    for (const text of ["Finished thinking", "思考完成", "思考中", "copy", "Share", "RETRY", "edit", "more", "thinking", "analyzing", "searching", "Copy Share Retry"]) {
      expect(isChromeNavText("model", text)).toBe(true);
    }
  });

  test("permission card titles are chrome", () => {
    expect(isChromeNavText("model", "Run evaluate_script?")).toBe(true);
    expect(isChromeNavText("model", "Allow Gemini to run evaluate_script on your machine?")).toBe(true);
    expect(
      isChromeNavText(
        "model",
        "Run evaluate_script?\nAllow Gemini to run evaluate_script on your machine?\nCancel\nAllow\nWaiting for your input",
      ),
    ).toBe(true);
    expect(isChromeNavText("model", "Waiting for your input")).toBe(true);
    expect(isChromeNavText("model", "{} Cancel Allow")).toBe(true);
    expect(isChromeNavText("model", "Run list_pages?\n{}\nCancel\nAllow\nWaiting for your input")).toBe(true);
  });

  test("real prompts and replies are not chrome", () => {
    expect(isChromeNavText("user", "Allow me to inspect this tab")).toBe(false);
    expect(isChromeNavText("user", "Please continue the TypeScript refactor")).toBe(false);
    expect(isChromeNavText("model", "当前 Tabbit mcp 已连接，可以继续。")).toBe(false);
    expect(isChromeNavText("model", "Here is a plan for the migration.")).toBe(false);
  });
});

describe("navLabelText", () => {
  test("collapses whitespace and blanks chrome", () => {
    expect(navLabelText("  Hello   world  ")).toBe("Hello world");
    expect(navLabelText("Writing...")).toBe("");
    expect(navLabelText("Cancel")).toBe("");
    expect(navLabelText("继续")).toBe("");
    expect(navLabelText("{} Cancel Allow")).toBe("tool");
    expect(navLabelText("Run list_pages? {} Cancel Allow")).toBe("list_pages");
    expect(navLabelText('Run click?\nAllow Gemini to run click on your machine?\n{"pageId":37,"includeSnapshot":true,"uid":"8_24"}\nCancel\nAllow')).toBe("click");
    expect(navLabelText('{"pageId":68,"function":"async () => { return 1; }"}')).toBe("evaluate_script");
  });

  test("strips a permission prefix when real markdown follows", () => {
    expect(navLabelText("Run evaluate_script?\nAllow Gemini to run evaluate_script on your machine?\n\nHere is the TypeScript plan.")).toBe(
      "Here is the TypeScript plan.",
    );
  });
});

describe("isTopLevelMessageEl", () => {
  test("drops nested user-query / model-response via parent walk", () => {
    const nested = { tagName: "USER-QUERY", parentNode: { tagName: "MODEL-RESPONSE", parentNode: null } };
    const top = { tagName: "USER-QUERY", parentNode: { tagName: "DIV", parentNode: null } };
    expect(isTopLevelMessageEl(nested)).toBe(false);
    expect(isTopLevelMessageEl(top)).toBe(true);
    expect(isTopLevelMessageEl({ tagName: "MODEL-RESPONSE" })).toBe(true);
  });

  test("uses parent.closest when present", () => {
    const host = { closest: (sel: string) => (sel.includes("model-response") ? {} : null) };
    expect(isTopLevelMessageEl({ tagName: "USER-QUERY", parentElement: host })).toBe(false);
    expect(isTopLevelMessageEl({ tagName: "USER-QUERY", parentElement: { closest: () => null } })).toBe(true);
  });
});

describe("filterNavMessages", () => {
  const liveOutline: MessageLike[] = [
    msg("user", "Help me inspect the current tab"),
    msg("model", "Writing..."),
    msg("user", "Cancel"),
    msg("model", "Run evaluate_script?\nAllow Gemini to run evaluate_script on your machine?\nCancel\nAllow\nWaiting for your input"),
    msg("user", "继续"),
    msg("user", "Allow"),
    msg("user", "Continue"),
    msg("user", "…"),
    msg("model", "当前 Tabbit mcp 已连接，可以继续。"),
    msg("model", "Writing..."),
  ];

  test("keeps the real prompt, tool steps, and reply; drops Cancel / 继续 / Allow chips", () => {
    const kept = filterNavMessages(liveOutline, { showAssistant: true, generating: false });
    expect(kept.map((m) => navLabelText(m.text) || m.text)).toEqual([
      "Help me inspect the current tab",
      "evaluate_script",
      "当前 Tabbit mcp 已连接，可以继续。",
    ]);
    expect(kept.map((m) => m.role)).toEqual(["user", "model", "model"]);
  });

  test("keeps a {} Cancel Allow computer-use step as a tool row", () => {
    const kept = filterNavMessages(
      [msg("user", "Help me inspect the current tab"), msg("model", "当前 Tabbit mcp 已连接，可以继续。"), msg("model", "{} Cancel Allow")],
      { showAssistant: true, generating: true },
    );
    expect(kept.map((m) => navLabelText(m.text) || m.text)).toEqual([
      "Help me inspect the current tab",
      "当前 Tabbit mcp 已连接，可以继续。",
      "tool",
    ]);
  });

  test("while generating, also keeps the last Writing placeholder", () => {
    const kept = filterNavMessages(liveOutline, { showAssistant: true, generating: true });
    expect(kept.map((m) => [m.role, navLabelText(m.text)])).toEqual([
      ["user", "Help me inspect the current tab"],
      ["model", "evaluate_script"],
      ["model", "当前 Tabbit mcp 已连接，可以继续。"],
      ["model", ""],
    ]);
    expect(isChromeNavText(kept[3]!.role, kept[3]!.text)).toBe(true);
  });

  test("H3yun task-mode outline keeps prose and named tool steps, not Allow chips or raw JSON", () => {
    const kept = filterNavMessages(
      [
        msg("user", "直接通过页面设置补齐 订单 的 2 个打印模板及主链路自动化并逐条验证生效。继续"),
        msg("model", "现在响应完全正常。刚实测了 Tabbit mcp 和氚云页面，连接顺畅。"),
        msg("user", "Allow"),
        msg("model", 'Run click?\nAllow Gemini to run click on your machine?\n{"pageId":37,"includeSnapshot":true,"uid":"8_24"}\nCancel\nAllow'),
        msg("user", "Allow"),
        msg("model", "Run list_pages?\nAllow Gemini to run list_pages on your machine?\n{}\nCancel\nAllow"),
        msg("model", '{"pageId":68,"function":"async () => { const get = (u) => fetch(u); return 1; }"}'),
      ],
      { showAssistant: true, generating: false },
    );
    expect(kept.map((m) => navLabelText(m.text))).toEqual([
      "直接通过页面设置补齐 订单 的 2 个打印模板及主链路自动化并逐条验证生效",
      "现在响应完全正常。刚实测了 Tabbit mcp 和氚云页面，连接顺畅。",
      "click",
      "list_pages",
      "evaluate_script",
    ]);
  });

  test("showAssistant false hides model rows including the live placeholder", () => {
    const kept = filterNavMessages(liveOutline, { showAssistant: false, generating: true });
    expect(kept.map((m) => m.text)).toEqual(["Help me inspect the current tab"]);
  });

  test("strips permission chrome from a mixed model message rather than dropping it", () => {
    const kept = filterNavMessages(
      [msg("user", "go"), msg("model", "Run evaluate_script?\nAllow Gemini to run evaluate_script on your machine?\n\nDone with the tab.")],
      { generating: false },
    );
    expect(kept).toHaveLength(2);
    expect(navLabelText(kept[1]!.text)).toBe("Done with the tab.");
  });

  test("does not keep a chrome model when a real user message follows", () => {
    const kept = filterNavMessages(
      [msg("user", "first"), msg("model", "Writing..."), msg("user", "a real follow-up")],
      { generating: true },
    );
    expect(kept.map((m) => m.text)).toEqual(["first", "a real follow-up"]);
  });

  test("ignores nested message nodes", () => {
    const nested = msg("user", "nested should drop", { tagName: "USER-QUERY", parentNode: { tagName: "MODEL-RESPONSE" } });
    const real = msg("user", "visible prompt", { tagName: "USER-QUERY", parentNode: { tagName: "DIV" } });
    expect(filterNavMessages([nested, real]).map((m) => m.text)).toEqual(["visible prompt"]);
  });
});

describe("BetterNavigator wiring", () => {
  test("collect filters messages and live tick is only the last item", () => {
    const src = readFileSync(resolve(HERE, "index.ts"), "utf8");
    expect(src).toContain('filterNavMessages(gemini.messages(), { showAssistant, generating: gemini.isGenerating() })');
    expect(src).toContain("isPermissionWaitText");
    expect(src).toContain("gemini.isGenerating() && !waiting && last?.role === \"model\" ? last : undefined");
    expect(src).toContain("navLabelText(");
    expect(src).not.toMatch(/if \(isChromeNavText/);
    expect(src).not.toMatch(/items\.findLast\(\((?:m|m3)\) => \1\.role === "model"\)/);
  });
});
