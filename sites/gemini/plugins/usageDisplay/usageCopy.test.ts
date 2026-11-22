import { expect, test, describe } from "bun:test";
import {
  resolveUsageUiLang,
  formatResetLocal,
  formatUsagePct,
  formatSignedDelta,
  formatTodayHoverLine,
  formatWindowHoverLine,
  formatWeeklyHoverLine,
  buildHoverTooltip,
  todayBaselineExplain,
  resetUnknownLabel,
  resolveResetDisplayPhrase,
  resetTime,
  detailTermBefore,
  detailTermAfter,
  detailTermUsed,
  detailTermCurrent,
  detailTermLast,
  detailTermStart,
  weeklyResetCaption,
} from "./usageCopy";

/** Fixed instants (UTC). With timeZone Asia/Shanghai → local wall clock as noted. */
const TZ = "Asia/Shanghai";
// 2026-11-19 14:57 Asia/Shanghai
const SAME_RESET_MS = Date.UTC(2026, 10, 19, 6, 57, 0);
const SAME_NOW_MS = Date.UTC(2026, 10, 19, 4, 0, 0); // 12:00 Shanghai same day
// 2026-11-25 01:57 Asia/Shanghai
const CROSS_RESET_MS = Date.UTC(2026, 10, 24, 17, 57, 0);
const SAME_RESET_SEC = SAME_RESET_MS / 1000;
const CROSS_RESET_SEC = CROSS_RESET_MS / 1000;

describe("resolveUsageUiLang", () => {
  test("prefers html lang zh over navigator en", () => {
    expect(resolveUsageUiLang({ htmlLang: "zh-CN", navigatorLang: "en-US" })).toBe("zh");
  });
  test("falls back to navigator zh when html empty", () => {
    expect(resolveUsageUiLang({ htmlLang: "", navigatorLang: "zh-TW" })).toBe("zh");
  });
  test("non-zh → en", () => {
    expect(resolveUsageUiLang({ htmlLang: "en", navigatorLang: "en-US" })).toBe("en");
    expect(resolveUsageUiLang({})).toBe("en");
  });
});

describe("formatUsagePct / signed", () => {
  test("one decimal; undefined dash", () => {
    expect(formatUsagePct(2)).toBe("2%");
    expect(formatUsagePct(2.46)).toBe("2.5%");
    expect(formatUsagePct(undefined)).toBe("—");
    expect(formatSignedDelta(0)).toBe("+0%");
  });
});

describe("formatResetLocal with explicit timeZone (not process TZ)", () => {
  test("same calendar day in Asia/Shanghai → exact zh/en time strings", () => {
    expect(formatResetLocal(SAME_RESET_SEC, SAME_NOW_MS, "zh", { timeZone: TZ })).toBe("重置 14:57");
    expect(formatResetLocal(SAME_RESET_SEC, SAME_NOW_MS, "en", { timeZone: TZ })).toBe("Resets 2:57 PM");
  });

  test("cross calendar day in Asia/Shanghai → exact date+time strings", () => {
    expect(formatResetLocal(CROSS_RESET_SEC, SAME_NOW_MS, "zh", { timeZone: TZ })).toBe("重置 11月25日 1:57");
    expect(formatResetLocal(CROSS_RESET_SEC, SAME_NOW_MS, "en", { timeZone: TZ })).toBe("Resets Nov 25 at 1:57 AM");
  });

  test("missing / invalid → undefined (unknown, not fabricated)", () => {
    expect(formatResetLocal(undefined, SAME_NOW_MS, "zh", { timeZone: TZ })).toBeUndefined();
    expect(formatResetLocal(null, SAME_NOW_MS, "en", { timeZone: TZ })).toBeUndefined();
    expect(formatResetLocal(100, SAME_NOW_MS, "en", { timeZone: TZ })).toBeUndefined();
  });

  test("resetUnknownLabel is fixed whitelist text", () => {
    expect(resetUnknownLabel("zh")).toBe("重置未知");
    expect(resetUnknownLabel("en")).toBe("reset unknown");
  });
});

describe("resolveResetDisplayPhrase: epoch / parseable raw / omit unreliable", () => {
  test("prefers epochMs and formats with TZ", () => {
    expect(
      resolveResetDisplayPhrase({
        epochMs: SAME_RESET_MS,
        rawText: "Resets at garbage",
        nowMs: SAME_NOW_MS,
        lang: "zh",
        formatOpts: { timeZone: TZ },
      }),
    ).toBe("重置 14:57");
  });

  test("no epoch but parseable English raw via resetTime → still show localized phrase", () => {
    // resetTime parses in browser-local calendar; feed `from` aligned so "at 2:57 PM" lands on SAME_RESET wall if local==test env.
    // Use epoch-less path with a string that resetTime can parse relative to `from`.
    const from = new Date(2026, 10, 19, 12, 0, 0, 0).getTime();
    const parsed = resetTime("Resets at 2:57 PM", from);
    expect(parsed).toBeDefined();
    const phrase = resolveResetDisplayPhrase({
      epochMs: undefined,
      rawText: "Resets at 2:57 PM",
      nowMs: from,
      lang: "en",
    });
    expect(phrase).toBeDefined();
    expect(phrase!.startsWith("Resets")).toBe(true);
    expect(phrase).toMatch(/2:57/);
  });

  test("unparseable DOM/raw English omitted (not passed through) — documented reason", () => {
    // Reason: raw page strings are not locale-safe; without resetTime parse we must not invent or echo.
    expect(
      resolveResetDisplayPhrase({
        epochMs: undefined,
        rawText: "重置于稍后 / see usage page",
        nowMs: SAME_NOW_MS,
        lang: "zh",
        formatOpts: { timeZone: TZ },
      }),
    ).toBeUndefined();
    expect(
      resolveResetDisplayPhrase({
        epochMs: undefined,
        rawText: "sometime soon",
        nowMs: SAME_NOW_MS,
        lang: "en",
        formatOpts: { timeZone: TZ },
      }),
    ).toBeUndefined();
  });
});

describe("hover lines: used% + today local delta", () => {
  test("window/weekly say used", () => {
    expect(formatWindowHoverLine(2, true, "重置 14:57", "zh")).toBe("5小时已用 2% · 重置 14:57");
    expect(formatWeeklyHoverLine(1, true, "Resets 2:57 PM", "en")).toBe("Weekly used 1% · Resets 2:57 PM");
  });
  test("today line marks local log delta", () => {
    expect(formatTodayHoverLine(0, "zh", { statsEnabled: true })).toBe("今日 +0%（本机记录增量）");
    expect(formatTodayHoverLine(0, "en", { statsEnabled: true })).toBe("Today +0% (local log delta)");
    expect(formatTodayHoverLine(0, "zh", { statsEnabled: false })).toBeNull();
  });
  test("stale reset-since-last-read localized", () => {
    expect(formatWindowHoverLine(undefined, true, undefined, "zh")).toBe("5小时已用：自上次读取后已重置");
    expect(formatWeeklyHoverLine(undefined, true, undefined, "en")).toBe("Weekly used: reset since last read");
  });
});

describe("buildHoverTooltip short body (synthetic fixtures — not live quota)", () => {
  const base = {
    liveVerified: true,
    hasUsage: true,
    todayDelta: 0 as number | undefined,
    statsEnabled: true,
    windowUsed: 2,
    weeklyUsed: 1,
    hadWindow: true,
    hadWeekly: true,
    windowResetEpochMs: SAME_RESET_MS,
    weeklyResetEpochMs: CROSS_RESET_MS,
    nowMs: SAME_NOW_MS,
    stale: false,
    formatOpts: { timeZone: TZ },
  };

  test("zh hover exact lines for fixed fixtures", () => {
    const s = buildHoverTooltip({ ...base, lang: "zh" });
    expect(s).toBe(
      [
        "用量",
        "今日 +0%（本机记录增量）",
        "5小时已用 2% · 重置 14:57",
        "每周已用 1% · 重置 11月25日 1:57",
        "点击查看详情 / 刷新",
      ].join("\n"),
    );
    expect(s.includes(todayBaselineExplain("zh"))).toBe(false);
  });

  test("en hover exact lines for fixed fixtures", () => {
    const s = buildHoverTooltip({ ...base, lang: "en" });
    expect(s).toBe(
      [
        "Usage",
        "Today +0% (local log delta)",
        "5-hour used 2% · Resets 2:57 PM",
        "Weekly used 1% · Resets Nov 25 at 1:57 AM",
        "Click for details / refresh",
      ].join("\n"),
    );
  });

  test("waiting state when not liveVerified", () => {
    const s = buildHoverTooltip({ ...base, lang: "zh", liveVerified: false });
    expect(s).toBe("用量 — 等待本会话实时读取（不显示缓存）");
  });

  test("omit reset clause when epoch+raw both unusable", () => {
    const s = buildHoverTooltip({
      ...base,
      lang: "en",
      windowResetEpochMs: undefined,
      weeklyResetEpochMs: undefined,
      windowResetRaw: "soon",
      weeklyResetRaw: "稍后",
    });
    expect(s).toContain("5-hour used 2%");
    expect(s).not.toContain("5-hour used 2% ·");
    expect(s).toContain("Weekly used 1%\n");
  });
});

describe("detail term labels + weekly reset caption", () => {
  test("zh/en user-facing formula terms", () => {
    expect(detailTermBefore("zh")).toBe("重置前");
    expect(detailTermAfter("zh")).toBe("重置后");
    expect(detailTermUsed("zh")).toBe("已用增量");
    expect(detailTermCurrent("zh")).toBe("当前");
    expect(detailTermLast("zh")).toBe("末日值");
    expect(detailTermStart("zh")).toBe("日起点");
    expect(detailTermBefore("en")).toBe("Before");
    expect(detailTermCurrent("en")).toBe("Current");
    expect(detailTermUsed("en")).toBe("Used");
  });
  test("weeklyResetCaption", () => {
    expect(weeklyResetCaption("zh", "30%", "34%", "2%")).toBe("周额度重置：30% → 34%  +  0% → 2%");
    expect(weeklyResetCaption("en", "30%", "34%", "2%")).toBe("Weekly limit reset: 30% → 34%  +  0% → 2%");
  });
});

describe("todayBaselineExplain detail-only", () => {
  test("mentions first sample and browser local TZ disclaimer", () => {
    const zh = todayBaselineExplain("zh");
    expect(zh).toContain("首次");
    expect(zh).toContain("本机");
    expect(zh).toContain("Asia/Shanghai");
    expect(zh).toContain("整数");
  });
});
