/**
 * Usage display copy (文案阶段): locale-consistent hover/detail strings.
 * Does not touch stats baselines, RPC, or visual/Material overlay.
 * Default time formatting uses the browser local timezone (Date / Intl);
 * tests may pass an explicit `timeZone` — never hard-codes Asia/Shanghai in product paths.
 */

export type UsageUiLang = "zh" | "en";

export type FormatResetOpts = {
  /** IANA TZ for deterministic tests; omit in product → browser local. */
  timeZone?: string;
};

/** Prefer <html lang>, then navigator.language; non-zh → en. */
export function resolveUsageUiLang(opts?: {
  htmlLang?: string | null;
  navigatorLang?: string | null;
}): UsageUiLang {
  const html = (opts?.htmlLang ?? "").trim().toLowerCase();
  if (html.startsWith("zh")) return "zh";
  const nav = (opts?.navigatorLang ?? "").trim().toLowerCase();
  if (nav.startsWith("zh")) return "zh";
  return "en";
}

/** Live detect — safe in non-DOM tests when document/navigator absent. */
export function detectUsageUiLang(): UsageUiLang {
  const html =
    typeof document !== "undefined" ? document.documentElement?.getAttribute?.("lang") ?? document.documentElement?.lang : "";
  const nav = typeof navigator !== "undefined" ? navigator.language : "";
  return resolveUsageUiLang({ htmlLang: html, navigatorLang: nav });
}

/** One-decimal display; undefined → em dash. Source percents are integer from RPC. */
export function formatUsagePct(v: number | undefined | null): string {
  if (v === undefined || v === null || !Number.isFinite(v)) return "—";
  return `${Math.round(v * 10) / 10}%`;
}

export function formatSignedDelta(v: number | undefined | null): string {
  if (v === undefined || v === null || !Number.isFinite(v)) return "—";
  return `+${Math.round(v * 10) / 10}%`;
}

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/**
 * Parse legacy English Gemini reset phrases ("Resets at 1:57 PM" / "Resets Oct 21 at 1:57 AM")
 * into an absolute ms timestamp in the **browser local** calendar (same algorithm as before).
 * Unparseable → undefined (do not invent).
 */
export function resetTime(text: string | undefined, from: number): number | undefined {
  const m = text?.match(/(?:([a-z]{3})[a-z]*\s+(\d{1,2})\s+)?at\s+(\d{1,2}):(\d{2})\s*(am|pm)?/i);
  if (!m) return undefined;
  let hour = Number(m[3]) % 12;
  if (m[5]?.toLowerCase() === "pm") hour += 12;
  if (!m[5] && Number(m[3]) === 12) hour = 12;
  const d = new Date(from);
  if (m[1]) {
    const month = MONTHS.indexOf(m[1].toLowerCase());
    if (month < 0) return undefined;
    d.setMonth(month, Number(m[2]));
  }
  d.setHours(hour, Number(m[4]), 0, 0);
  if (d.getTime() < from - 60_000) {
    if (m[1]) d.setFullYear(d.getFullYear() + 1);
    else d.setDate(d.getDate() + 1);
  }
  return d.getTime();
}

function calendarDayKey(ms: number, timeZone?: string): string {
  if (!timeZone) {
    const d = new Date(ms);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(ms));
}

/**
 * Format reset from Unix epoch **seconds**.
 * Same calendar day → time only; else date+time. Locale-consistent prefix.
 * Invalid/missing → undefined (caller omits — never invent a clock time).
 */
export function formatResetLocal(
  epochSec: number | undefined | null,
  nowMs: number,
  lang: UsageUiLang,
  opts?: FormatResetOpts,
): string | undefined {
  if (typeof epochSec !== "number" || !Number.isFinite(epochSec) || epochSec < 16e8) return undefined;
  try {
    const rMs = epochSec * 1000;
    const r = new Date(rMs);
    if (!Number.isFinite(r.getTime())) return undefined;
    const sameDay = calendarDayKey(rMs, opts?.timeZone) === calendarDayKey(nowMs, opts?.timeZone);
    const loc = lang === "zh" ? "zh-CN" : "en";
    const tzOpt = opts?.timeZone ? { timeZone: opts.timeZone } : {};
    if (sameDay) {
      const time = r.toLocaleTimeString(loc, { hour: "numeric", minute: "2-digit", ...tzOpt });
      return lang === "zh" ? `重置 ${time}` : `Resets ${time}`;
    }
    const stamp = r.toLocaleString(loc, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      ...tzOpt,
    });
    return lang === "zh" ? `重置 ${stamp}` : `Resets ${stamp}`;
  } catch {
    return undefined;
  }
}

export function resetUnknownLabel(lang: UsageUiLang): string {
  return lang === "zh" ? "重置未知" : "reset unknown";
}

/**
 * Display reset phrase without changing stored Usage fields.
 * Priority:
 *  1) epochMs (RPC / already-parsed) → formatResetLocal
 *  2) else rawText that `resetTime` can parse → format that ms (keeps reliable DOM-derived times)
 *  3) else undefined — omit. Reason: unparseable page/DOM English (or other) strings are not
 *     locale-safe and must not be shown as if localized; we do not invent a time.
 */
export function resolveResetDisplayPhrase(opts: {
  epochMs?: number | null;
  rawText?: string | null;
  nowMs: number;
  lang: UsageUiLang;
  formatOpts?: FormatResetOpts;
}): string | undefined {
  const { nowMs, lang, formatOpts } = opts;
  if (typeof opts.epochMs === "number" && Number.isFinite(opts.epochMs) && opts.epochMs >= 16e8 * 1000) {
    return formatResetLocal(opts.epochMs / 1000, nowMs, lang, formatOpts);
  }
  // epoch might be stored as seconds mistakenly — accept sec-sized values too
  if (typeof opts.epochMs === "number" && Number.isFinite(opts.epochMs) && opts.epochMs >= 16e8 && opts.epochMs < 16e8 * 1000) {
    return formatResetLocal(opts.epochMs, nowMs, lang, formatOpts);
  }
  const parsed = resetTime(opts.rawText ?? undefined, nowMs);
  if (parsed != null) return formatResetLocal(parsed / 1000, nowMs, lang, formatOpts);
  return undefined;
}

/** Short hover line for Today — local log delta, not server "today total". */
export function formatTodayHoverLine(
  delta: number | undefined,
  lang: UsageUiLang,
  opts?: { statsEnabled: boolean },
): string | null {
  if (opts && !opts.statsEnabled) return null;
  const n = formatSignedDelta(delta);
  return lang === "zh" ? `今日 ${n}（本机记录增量）` : `Today ${n} (local log delta)`;
}

export function formatWindowHoverLine(
  usedPct: number | undefined,
  hadValue: boolean,
  resetPhrase: string | undefined,
  lang: UsageUiLang,
): string {
  if (usedPct === undefined && hadValue) {
    return lang === "zh" ? "5小时已用：自上次读取后已重置" : "5-hour used: reset since last read";
  }
  const pct = formatUsagePct(usedPct);
  const tail = resetPhrase ? ` · ${resetPhrase}` : "";
  return lang === "zh" ? `5小时已用 ${pct}${tail}` : `5-hour used ${pct}${tail}`;
}

export function formatWeeklyHoverLine(
  usedPct: number | undefined,
  hadValue: boolean,
  resetPhrase: string | undefined,
  lang: UsageUiLang,
): string {
  if (usedPct === undefined && hadValue) {
    return lang === "zh" ? "每周已用：自上次读取后已重置" : "Weekly used: reset since last read";
  }
  const pct = formatUsagePct(usedPct);
  const tail = resetPhrase ? ` · ${resetPhrase}` : "";
  return lang === "zh" ? `每周已用 ${pct}${tail}` : `Weekly used ${pct}${tail}`;
}

export function staleHint(lang: UsageUiLang): string {
  return lang === "zh" ? "请打开用量页刷新。" : "Open the usage page to refresh.";
}

export function hoverFooter(lang: UsageUiLang): string {
  return lang === "zh" ? "点击查看详情 / 刷新" : "Click for details / refresh";
}

export function hoverWaiting(lang: UsageUiLang): string {
  return lang === "zh"
    ? "用量 — 等待本会话实时读取（不显示缓存）"
    : "Usage — waiting for a live read this session (cache hidden)";
}

export function hoverTitle(lang: UsageUiLang): string {
  return lang === "zh" ? "用量" : "Usage";
}

/**
 * Longer copy for click-details only (not hover).
 * Explains local baseline / first sample / integer percent — stats algorithm unchanged.
 */
export function todayBaselineExplain(lang: UsageUiLang): string {
  if (lang === "zh") {
    return "「今日」是本机从当日首次采样起算的周额度记录增量，不是服务端「今日总量」。无前日基线时首次记为 +0%；跨日本地日历日切分。百分点来自 RPC 整数四舍五入；展示最多一位小数。重置时间按浏览器本地时区，非固定 Asia/Shanghai。";
  }
  return "“Today” is this device’s recorded weekly-limit delta since the first sample today — not a server “today total.” With no prior baseline the first sample is +0%. Day boundaries use the browser’s local calendar. Percents are integer-rounded from RPC; display uses at most one decimal. Reset times use the browser’s local timezone (not a hard-coded Asia/Shanghai).";
}

export function modalTitle(lang: UsageUiLang): string {
  return lang === "zh" ? "Gemini 用量" : "Gemini usage";
}

export function modalNoLive(lang: UsageUiLang): string {
  return lang === "zh"
    ? "本会话尚无实时用量读取。打开 /usage 或等待 RPC 回放。"
    : "No live usage read yet this session. Open /usage or wait for RPC replay.";
}

/** Detail formula term labels (user-facing). */
export function detailTermBefore(lang: UsageUiLang): string {
  return lang === "zh" ? "重置前" : "Before";
}
export function detailTermAfter(lang: UsageUiLang): string {
  return lang === "zh" ? "重置后" : "After";
}
export function detailTermUsed(lang: UsageUiLang): string {
  return lang === "zh" ? "已用增量" : "Used";
}
export function detailTermCurrent(lang: UsageUiLang): string {
  return lang === "zh" ? "当前" : "Current";
}
export function detailTermLast(lang: UsageUiLang): string {
  return lang === "zh" ? "末日值" : "Last";
}
export function detailTermStart(lang: UsageUiLang): string {
  return lang === "zh" ? "日起点" : "Start";
}

export function weeklyResetCaption(
  lang: UsageUiLang,
  beforeStart: string,
  beforeEnd: string,
  afterLast: string,
): string {
  if (lang === "zh") {
    return `周额度重置：${beforeStart} → ${beforeEnd}  +  0% → ${afterLast}`;
  }
  return `Weekly limit reset: ${beforeStart} → ${beforeEnd}  +  0% → ${afterLast}`;
}

/** Build short hover/title body lines (no RPC). */
export function buildHoverTooltip(opts: {
  lang: UsageUiLang;
  liveVerified: boolean;
  hasUsage: boolean;
  todayDelta: number | undefined;
  statsEnabled: boolean;
  windowUsed: number | undefined;
  weeklyUsed: number | undefined;
  hadWindow: boolean;
  hadWeekly: boolean;
  /** Prefer epoch; raw only via resolveResetDisplayPhrase when epoch missing. */
  windowResetEpochMs?: number;
  weeklyResetEpochMs?: number;
  windowResetRaw?: string;
  weeklyResetRaw?: string;
  nowMs: number;
  stale: boolean;
  formatOpts?: FormatResetOpts;
}): string {
  const { lang } = opts;
  if (!opts.liveVerified || !opts.hasUsage) return hoverWaiting(lang);

  const wReset = resolveResetDisplayPhrase({
    epochMs: opts.windowResetEpochMs,
    rawText: opts.windowResetRaw,
    nowMs: opts.nowMs,
    lang,
    formatOpts: opts.formatOpts,
  });
  const kReset = resolveResetDisplayPhrase({
    epochMs: opts.weeklyResetEpochMs,
    rawText: opts.weeklyResetRaw,
    nowMs: opts.nowMs,
    lang,
    formatOpts: opts.formatOpts,
  });

  const rows: string[] = [hoverTitle(lang)];
  const today = formatTodayHoverLine(opts.todayDelta, lang, { statsEnabled: opts.statsEnabled });
  if (today) rows.push(today);
  rows.push(formatWindowHoverLine(opts.windowUsed, opts.hadWindow, wReset, lang));
  rows.push(formatWeeklyHoverLine(opts.weeklyUsed, opts.hadWeekly, kReset, lang));
  if (opts.stale) rows.push(staleHint(lang));
  rows.push(hoverFooter(lang));
  return rows.join("\n");
}

export function dayLabelToday(lang: UsageUiLang): string {
  return lang === "zh" ? "今日" : "Today";
}

export function statsToggleTitle(lang: UsageUiLang): string {
  return lang === "zh" ? "每日用量统计" : "Daily usage stats";
}

export function statsToggleHint(lang: UsageUiLang): string {
  return lang === "zh" ? "在本机记录每日周额度增量。" : "Record local daily usage on this device.";
}

export function statsOffHint(lang: UsageUiLang): string {
  return lang === "zh"
    ? "打开每日用量统计后，将按本机日志记录周额度增量。"
    : "Turn on daily usage stats to keep a per-day log of the weekly limit.";
}

export function statsEmptyHint(lang: UsageUiLang): string {
  return lang === "zh"
    ? "尚无记录。统计从开启后的首次用量读取起算。"
    : "No days recorded yet. Stats start from the moment you enable tracking, each time usage is read.";
}

export function nothingThatDay(lang: UsageUiLang): string {
  return lang === "zh" ? "该日无记录。" : "Nothing recorded on this day.";
}
