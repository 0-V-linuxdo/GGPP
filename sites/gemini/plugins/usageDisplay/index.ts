import { definePlugin } from "../../shims/types";
import { h, svg } from "../../../../src/lib/dom";
import { I } from "../../../../src/lib/icons";
import type { ChatBarApi } from "../chatBar";
import type { GeminiApi } from "../gemini";
import type { UiApi } from "../ui";
import { calendar, dayKey, record, signed, used, type Day, type Log } from "./stats";
import {
  accountKeyFromPath,
  bumpUsageGeneration,
  getUsageDiagnostics,
  noteUsageDiagAttempt,
  noteUsageDiagResult,
  noteUsageDiagSkip,
  onUsageEvent,
  replayUsage,
  type ParsedUsageMetrics,
} from "../../usageObserver";
import { usageDiagDisplayRows, type UsageDiagnostics } from "../../usageDiag";
import { collectComposerAppearanceDiagnostics } from "../../composerAppearanceDiagnostics";
import {
  COMPOSER_BUTTON_ROLES,
  composerButtonViewRows,
  sanitizeComposerAppearanceForView,
} from "./composerAppearanceView";
import {
  buildHoverTooltip,
  detectUsageUiLang,
  formatResetLocal,
  formatUsagePct,
  formatWindowHoverLine,
  formatWeeklyHoverLine,
  resolveResetDisplayPhrase,
  resetTime,
  staleHint,
  todayBaselineExplain,
  modalTitle,
  modalNoLive,
  dayLabelToday,
  statsToggleTitle,
  statsToggleHint,
  statsOffHint,
  statsEmptyHint,
  nothingThatDay,
  detailTermBefore,
  detailTermAfter,
  detailTermUsed,
  detailTermCurrent,
  detailTermLast,
  detailTermStart,
  weeklyResetCaption,
  hoverTitle,
  type UsageUiLang,
} from "./usageCopy";
import { createUsageTooltipController } from "./usageTooltipController";

/** Re-export for any callers/tests that imported resetTime from this module. */
export { resetTime };


/**
 * Gemini's usage limits (5-hour window and weekly) as a ring in the message box.
 * Numbers come from real Gemini sources only:
 *   1) DOM text while on /usage (legacy path),
 *   2) Voyager-style batchexecute capture on /usage + MAIN-world replay with WIZ tokens
 *      (see sites/gemini/usageObserver.ts; default recipe jSf9Qc / []).
 * Never invent or estimate usage.
 */

interface Usage {
  window?: number;
  windowReset?: string;
  /** When the 5-hour window resets (ms), if the text could be read. */
  windowResetAt?: number;
  weekly?: number;
  weeklyReset?: string;
  weeklyResetAt?: number;
  /** Voyager accountKey (`u/N` or default) — prevents cross-slot cache bleed. */
  accountKey?: string;
  at: number;
}

const REFRESH_MS = 60_000;

/** Pull "NN%" values and their reset hints out of the usage page text. */
function parse(text: string): Usage {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const pick = (label: RegExp) => {
    const i = lines.findIndex((l) => label.test(l));
    if (i < 0) return {};
    const near = lines.slice(i, i + 6);
    const pct = near.map((l) => l.match(/(\d+(?:\.\d+)?)\s*%/)).find(Boolean);
    const reset = near.find((l) => /reset|重置/i.test(l));
    return { pct: pct ? Number(pct[1]) : undefined, reset };
  };
  const cur = pick(/current usage|5[- ]?hour|当前用量/i);
  const week = pick(/weekly|每周/i);
  const now = Date.now();
  return {
    window: cur.pct,
    windowReset: cur.reset,
    windowResetAt: resetTime(cur.reset, now),
    weekly: week.pct,
    weeklyReset: week.reset,
    weeklyResetAt: resetTime(week.reset, now),
    at: now,
  };
}


/** Locale-aware reset label; browser local TZ via Date — not hard-coded Asia/Shanghai. */
function formatResetEpoch(epoch: number | undefined, now: number, lang: UsageUiLang = detectUsageUiLang()): string | undefined {
  return formatResetLocal(epoch, now, lang);
}

/** Map Voyager-parsed batchexecute metrics into GG++ Usage (real values only). */
function fromMetrics(m: ParsedUsageMetrics): Usage | null {
  if (!m.daily && !m.weekly) return null;
  const now = Date.now();
  const windowReset = formatResetEpoch(m.daily?.resetEpoch, now);
  const weeklyReset = formatResetEpoch(m.weekly?.resetEpoch, now);
  return {
    window: m.daily?.percent,
    windowReset,
    windowResetAt: m.daily ? m.daily.resetEpoch * 1000 : undefined,
    weekly: m.weekly?.percent,
    weeklyReset,
    weeklyResetAt: m.weekly ? m.weekly.resetEpoch * 1000 : undefined,
    accountKey: accountKeyFromPath(),
    at: now,
  };
}


/**
 * Sample composer appearance via the peer helper (other thread owns the file).
 * Called only when the usage settings panel draws — never triggers usage RPC.
 */

function fillComposerAppearanceSlot(slot: HTMLElement) {
  let raw: unknown;
  try {
    raw = collectComposerAppearanceDiagnostics();
  } catch {
    slot.replaceChildren(h("p", { class: "ggpp-muted" }, "Composer appearance diagnostics: sample failed."));
    return;
  }
  const data = sanitizeComposerAppearanceForView(raw);
  const kids: Node[] = [
    h("div", { class: "ggpp-ud-strong" }, "Composer appearance"),
    h("p", { class: "ggpp-muted" }, "只读取样（打开本面板时）。不含 URL / 路径 / 聊天内容 / 按钮文案。"),
    h(
      "div",
      { class: "ggpp-ud-diag-dl", role: "group", "aria-label": "composer summary" },
      h("dt", null, "errorCode"),
      h("dd", null, data.errorCode),
      h("dt", null, "hasInputGradient"),
      h("dd", null, data.hasInputGradient ? "true" : "false"),
    ),
  ];
  for (const id of Object.keys(data.layers) as (keyof typeof data.layers)[]) {
    const layer = data.layers[id];
    const fields: { k: string; v: string }[] = [{ k: "present", v: layer.present ? "true" : "false" }];
    for (const [k, v] of Object.entries(layer)) {
      if (k === "present" || typeof v !== "string") continue;
      fields.push({ k, v });
    }
    kids.push(
      h(
        "div",
        { class: "ggpp-ud-composer-layer", "data-layer": id },
        h("div", { class: "ggpp-ud-strong" }, id),
        h(
          "dl",
          { class: "ggpp-ud-diag-dl" },
          ...fields.flatMap((f) => [h("dt", null, f.k), h("dd", null, f.v)]),
        ),
      ),
    );
  }
  kids.push(h("div", { class: "ggpp-ud-strong" }, "Composer buttons"));
  for (const role of COMPOSER_BUTTON_ROLES) {
    const rows = composerButtonViewRows(data.buttons[role]);
    kids.push(
      h(
        "div",
        { class: "ggpp-ud-composer-layer", "data-button": role },
        h("div", { class: "ggpp-ud-strong" }, role),
        h(
          "dl",
          { class: "ggpp-ud-diag-dl", "aria-label": `composer button ${role}` },
          ...rows.flatMap((f) => [h("dt", null, f.key), h("dd", null, f.value)]),
        ),
      ),
    );
  }
  slot.replaceChildren(...kids);
}


export default definePlugin({
  id: "usageDisplay",
  name: "UsageDisplay",
  description: "Show your Gemini usage limits (5-hour and weekly) as a ring in the message box.",
  tags: ["Composer"],
  icon: I.clock,
  enabledByDefault: true,
  updated: "2026-10-21",
  dependencies: ["gemini", "chatBar", "ui"],
  liveSettings: true,
  settings: {
    showPercent: { type: "boolean", label: "Show percent", description: "Show the used percent next to the ring.", default: false },
    source: {
      type: "select",
      label: "Ring shows",
      default: "max",
      options: [
        { value: "max", label: "Whichever is higher" },
        { value: "window", label: "5-hour window" },
        { value: "weekly", label: "Weekly limit" },
      ],
    },
    usageStats: {
      type: "boolean",
      label: "Daily usage stats",
      description: "Record how much of the weekly limit each day uses, on this device. Click the ring for the history.",
      default: false,
    },
    retainDays: {
      type: "number",
      label: "Keep history for",
      description: "Days of usage history to keep.",
      default: 90,
      min: 7,
      max: 180,
      slider: true,
      unit: " days",
      showIf: (v) => !!v.usageStats,
    },
  },
  async start(ctx) {
    const gemini = ctx.use<GeminiApi>("gemini");
    const bar = ctx.use<ChatBarApi>("chatBar");
    const ui = ctx.use<UiApi>("ui");
    // Voyager HL: Google /u/N path slot only — NOT Firefox Multi-Account Container id.
    // GM storage (ctx.data) may be shared across containers in one profile; never show a
    // persisted reading as live truth until this page session verifies via capture/replay/DOM.
    const slotOf = () => location.pathname.match(/^\/u\/(\d+)/)?.[1] ?? "0";
    const usageKey = () => `usage:${slotOf()}`;
    const belongsHere = (u: Usage | null | undefined) =>
      !u || !u.accountKey || u.accountKey === accountKeyFromPath();
    let liveAccount = accountKeyFromPath();
    /** Set only after capture | replay | dom | rpc:* from this session. */
    let liveVerified = false;
    let usage: Usage | null = null;

    /** A number read before its reset time has passed is no longer true; treat it as unknown. */
    const live = (v: number | undefined, resetAt: number | undefined) => (resetAt && Date.now() > resetAt ? undefined : v);
    const stale = () => !!usage && [usage.windowResetAt, usage.weeklyResetAt].some((t) => t && Date.now() > t);
    const value = () => {
      if (!usage) return undefined;
      const w = live(usage.window, usage.windowResetAt);
      const k = live(usage.weekly, usage.weeklyResetAt);
      switch (ctx.settings.source) {
        case "window":
          return w;
        case "weekly":
          return k;
        default:
          return w === undefined ? k : k === undefined ? w : Math.max(w, k);
      }
    };

    function ring() {
      const v = value();
      const tone = v === undefined ? "currentColor" : v >= 90 ? "var(--ggpp-danger)" : v >= 70 ? "var(--ggpp-warn)" : "currentColor";
      const c = 2 * Math.PI * 7;
      return svg(
        "svg",
        { width: 18, height: 18, viewBox: "0 0 18 18", "aria-hidden": "true" },
        svg("circle", { cx: 9, cy: 9, r: 7, fill: "none", stroke: "currentColor", "stroke-opacity": 0.35, "stroke-width": 2 }),
        v !== undefined &&
          svg("circle", {
            cx: 9,
            cy: 9,
            r: 7,
            fill: "none",
            stroke: tone,
            "stroke-width": 2,
            "stroke-linecap": "round",
            "stroke-dasharray": `${(c * Math.min(100, v)) / 100} ${c}`,
            transform: "rotate(-90 9 9)",
          }),
      );
    }
    const uiLang = (): UsageUiLang => detectUsageUiLang();
    const fmt = (v?: number) => formatUsagePct(v);
    /**
     * 5h / weekly **used** % + locale reset.
     * Reset phrase: epochMs first; else parseable raw via resetTime; else omit
     * (unparseable DOM English is not locale-safe — do not pass through).
     */
    const lines = () => {
      if (!usage) return [];
      const lang = uiLang();
      const now = Date.now();
      const w = live(usage.window, usage.windowResetAt);
      const k = live(usage.weekly, usage.weeklyResetAt);
      const wReset = resolveResetDisplayPhrase({
        epochMs: usage.windowResetAt,
        rawText: usage.windowReset,
        nowMs: now,
        lang,
      });
      const kReset = resolveResetDisplayPhrase({
        epochMs: usage.weeklyResetAt,
        rawText: usage.weeklyReset,
        nowMs: now,
        lang,
      });
      return [
        formatWindowHoverLine(w, usage.window !== undefined, wReset, lang),
        formatWeeklyHoverLine(k, usage.weekly !== undefined, kReset, lang),
        ...(stale() ? [staleHint(lang)] : []),
      ];
    };
    // Daily log of the weekly limit, kept per Google account slot (/u/N).
    const statsKey = () => `stats:${location.pathname.match(/^\/u\/(\d+)/)?.[1] ?? "0"}`;
    let log = await ctx.data.get<Log>(statsKey(), []);
    const todayDelta = (): number | undefined => {
      if (!ctx.settings.usageStats) return undefined;
      const today = log.find((d) => d.date === dayKey(Date.now()));
      if (today) return used(today);
      // Stats on but no sample today yet — show +0 once weekly is known (same as prior).
      return usage?.weekly === undefined ? undefined : 0;
    };
    async function snapshot(u: Usage) {
      if (!ctx.settings.usageStats || u.weekly === undefined) return;
      // Another tab may have written since this one loaded.
      log = record(await ctx.data.get<Log>(statsKey(), []), u.weekly, u.weeklyResetAt, u.at, ctx.settings.retainDays);
      await ctx.data.set(statsKey(), log);
    }

    /** Short title/hover; overlay wired. No extra RPC on hover/focus. */
    const tooltip = () => {
      const lang = uiLang();
      const now = Date.now();
      return buildHoverTooltip({
        lang,
        liveVerified,
        hasUsage: !!usage,
        todayDelta: todayDelta(),
        statsEnabled: !!ctx.settings.usageStats,
        windowUsed: usage ? live(usage.window, usage.windowResetAt) : undefined,
        weeklyUsed: usage ? live(usage.weekly, usage.weeklyResetAt) : undefined,
        hadWindow: !!usage && usage.window !== undefined,
        hadWeekly: !!usage && usage.weekly !== undefined,
        windowResetEpochMs: usage?.windowResetAt,
        weeklyResetEpochMs: usage?.weeklyResetAt,
        windowResetRaw: usage?.windowReset,
        weeklyResetRaw: usage?.weeklyReset,
        nowMs: now,
        stale: stale(),
      });
    };

    ctx.cleanup(
      bar.register({
        id: "usageDisplay",
        icon: I.clock,
        // Accessible name must stay explicit — not an anonymous icon.
        get title() {
          return tooltip();
        },
        order: 1,
        render: ring,
        text: () => (ctx.settings.showPercent ? fmt(value()) : ""),
        onClick: () => void refresh().then(openHistory),
      }),
    );

    const usageTip = createUsageTooltipController({
      shortAriaLabel: hoverTitle(uiLang()),
      getMessage: tooltip,
      panelCssText:
        "position:fixed;z-index:2147483000;box-sizing:border-box;max-width:min(22rem,calc(100vw - 16px));padding:8px 10px;border-radius:12px;background:var(--ggpp-surface);color:var(--ggpp-fg);box-shadow:var(--ggpp-shadow);font:13px/18px var(--ggpp-font);white-space:pre-wrap;",
      gapPx: 8,
      viewportMarginPx: 8,
      showDelayMs: 400,
      hideDelayMs: 100,
      preferredPlacement: "above",
      interactive: false,
    });
    usageTip.attach();
    ctx.cleanup(() => usageTip.detach());
    const refreshBar = () => {
      bar.refresh();
      usageTip.syncBars();
    };

    const usageUrl = () => `${gemini.newChatUrl().replace(/\/app$/, "")}/usage`;

    ctx.on("settings:usageDisplay", () => {
      // Turning stats on starts the log from the latest reading, if it is recent.
      if (usage && Date.now() - usage.at < 3_600_000 && !log.some((d) => d.date === dayKey(Date.now()))) void snapshot(usage).then(() => historyView?.());
      refreshBar();
      historyView?.();
    });

    const label = (date: string, short = false) => {
      if (date === dayKey(Date.now())) return dayLabelToday(uiLang());
      const [y, m, d] = date.split("-").map(Number);
      const t = new Date(y, m - 1, d);
      return short ? String(d) : t.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    };

    /** Re-renders the open history modal, if any. */
    let historyView: (() => void) | null = null;

    function openHistory() {
      let selected = dayKey(Date.now());
      let pinRight = true;
      const current = h("div", { class: "ggpp-ud-now" });
      const body = h("div", { class: "ggpp-ud-stats" });
      const toggle = h(
        "div",
        { class: "ggpp-ud-toggle" },
        h("div", null, h("div", { class: "ggpp-ud-strong" }, statsToggleTitle(uiLang())), h("div", { class: "ggpp-muted" }, statsToggleHint(uiLang()))),
        ui.switch(ctx.settings.usageStats, (on) => ctx.setSetting("usageStats", on)),
      );

      const render = () => {
        current.replaceChildren(
          ...(liveVerified && usage ? lines() : [modalNoLive(uiLang())]).map((l) => h("div", null, l)),
          h("div", null, ui.button("Open usage page", () => (m.close(), gemini.navigate(usageUrl())), "ghost")),
        );
        if (!ctx.settings.usageStats) {
          body.replaceChildren(h("p", { class: "ggpp-muted" }, statsOffHint(uiLang())));
          return;
        }
        if (!log.length) {
          body.replaceChildren(h("p", { class: "ggpp-muted" }, statsEmptyHint(uiLang())));
          return;
        }
        const days = calendar(log, Date.now());
        if (!days.some((d) => d.date === selected)) selected = days[days.length - 1].date;
        const peak = Math.max(...days.map((d) => (d.day ? used(d.day) : 0)));
        const scale = Math.max(20, Math.ceil(peak / 10) * 10);
        const chart = h("div", { class: "ggpp-ud-chart", role: "listbox", tabindex: 0, "aria-label": "Usage by day" });
        for (const d of days) {
          const v = d.day ? used(d.day) : undefined;
          const on = d.date === selected;
          chart.append(
            h(
              "button",
              {
                class: `ggpp-ud-bar${on ? " ggpp-on" : ""}`,
                type: "button",
                role: "option",
                tabindex: -1,
                "aria-selected": String(on),
                "aria-label": `${label(d.date)}, ${signed(v)}`,
                dataset: { date: d.date },
                onclick: () => select(d.date),
              },
              h("span", { class: "ggpp-ud-val" }, v === undefined ? "" : signed(v)),
              h("span", { class: "ggpp-ud-track" }, h("span", { class: "ggpp-ud-fill", style: { height: v === undefined ? "0" : `max(2px, ${(v / scale) * 100}%)` } })),
              h("span", { class: "ggpp-ud-day" }, label(d.date, true)),
            ),
          );
        }
        chart.addEventListener("keydown", (e) => {
          if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
          e.preventDefault();
          const i = days.findIndex((d) => d.date === selected) + (e.key === "ArrowLeft" ? -1 : 1);
          if (days[i]) select(days[i].date, true);
        });
        const stopPin = () => (pinRight = false);
        chart.addEventListener("pointerdown", stopPin);
        chart.addEventListener("wheel", stopPin, { passive: true });
        body.replaceChildren(chart, detail(days.find((d) => d.date === selected)!));
        const last = selected === days[days.length - 1].date;
        const place = () => {
          if (last && pinRight) chart.scrollLeft = chart.scrollWidth;
          else chart.querySelector<HTMLElement>(".ggpp-on")?.scrollIntoView({ block: "nearest", inline: "nearest" });
        };
        for (const t of [0, 50, 200, 600]) setTimeout(place, t);
      };

      const select = (date: string, focus = false) => {
        selected = date;
        render();
        if (focus) body.querySelector<HTMLElement>(".ggpp-ud-chart")?.focus();
      };

      function detail({ date, day }: { date: string; day?: Day }) {
        const term = (name: string, v: string) => h("div", { class: "ggpp-ud-term" }, h("small", null, name), h("span", null, v));
        const pct = (v: number) => `${Math.round(v * 10) / 10}%`;
        const isToday = date === dayKey(Date.now());
        if (!day) return h("div", { class: "ggpp-ud-detail" }, h("div", { class: "ggpp-ud-strong" }, label(date)), h("p", { class: "ggpp-muted" }, nothingThatDay(uiLang())));
        const lang = uiLang();
        const formula = day.before
          ? [
              term(detailTermBefore(lang), signed(day.accrued)),
              h("span", null, "+"),
              term(detailTermAfter(lang), signed(Math.max(0, day.last - day.start))),
              h("span", null, "="),
              term(detailTermUsed(lang), signed(used(day))),
            ]
          : [
              term(isToday ? detailTermCurrent(lang) : detailTermLast(lang), pct(day.last)),
              h("span", null, "−"),
              term(detailTermStart(lang), pct(day.start)),
              h("span", null, "="),
              term(detailTermUsed(lang), signed(used(day))),
            ];
        return h(
          "div",
          { class: "ggpp-ud-detail" },
          h("div", { class: "ggpp-ud-strong" }, label(date)),
          h("div", { class: "ggpp-ud-formula" }, formula),
          day.before &&
            h(
              "div",
              { class: "ggpp-muted" },
              weeklyResetCaption(lang, pct(day.before.start), pct(day.before.end), pct(day.last)),
            ),
          isToday && h("p", { class: "ggpp-muted" }, todayBaselineExplain(lang)),
        );
      }

      const m = ui.modal({
        title: modalTitle(uiLang()),
        icon: I.clock,
        width: 460,
        content: [current, toggle, body],
        onClose: () => (historyView = null),
      });
      historyView = render;
      render();
    }

    ctx.css(`
      .ggpp-ud-now { display: grid; gap: 4px; margin-bottom: 12px; }
      .ggpp-ud-now > div:last-child { margin-top: 4px; }
      .ggpp-ud-toggle { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 12px 0; border-top: 1px solid var(--ggpp-border-soft); }
      .ggpp-ud-strong { font-weight: 600; }
      .ggpp-ud-stats { display: grid; gap: 12px; }
      .ggpp-ud-chart { display: flex; gap: 4px; height: 9.25rem; overflow-x: auto; padding: 4px 2px; border-radius: 12px; outline: none; }
      .ggpp-ud-chart:focus-visible { box-shadow: 0 0 0 2px var(--ggpp-accent); }
      .ggpp-ud-bar { all: unset; box-sizing: border-box; flex: 0 0 2.25rem; display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 4px 0; border-radius: 10px; cursor: pointer; color: var(--ggpp-fg-2); font-size: 11px; }
      .ggpp-ud-bar:hover { background: var(--ggpp-hover); }
      .ggpp-ud-bar.ggpp-on { background: var(--ggpp-accent-soft); color: var(--ggpp-fg); font-weight: 700; }
      .ggpp-ud-val { height: 14px; opacity: .6; white-space: nowrap; }
      .ggpp-ud-bar.ggpp-on .ggpp-ud-val { opacity: 1; }
      .ggpp-ud-track { flex: 1; width: 12px; display: flex; align-items: flex-end; }
      .ggpp-ud-fill { width: 100%; border-radius: 4px 4px 2px 2px; background: var(--ggpp-accent); opacity: .55; }
      .ggpp-ud-bar.ggpp-on .ggpp-ud-fill { opacity: 1; }
      .ggpp-ud-detail { display: grid; gap: 8px; }
      .ggpp-ud-formula { display: flex; align-items: flex-end; gap: 10px; }
      .ggpp-ud-term { display: grid; gap: 2px; }
      .ggpp-ud-term small { color: var(--ggpp-fg-2); font-size: 11px; }
      .ggpp-ud-term span { font-size: 18px; font-weight: 600; }
      .ggpp-ud-diag { display: grid; gap: 8px; padding: 12px 0; border-top: 1px solid var(--ggpp-border-soft); }
      .ggpp-ud-diag-dl { display: grid; grid-template-columns: minmax(8rem, 12rem) 1fr; gap: 4px 12px; margin: 0; font-size: 12px; }
      .ggpp-ud-diag-dl dt { margin: 0; color: var(--ggpp-fg-2); }
      .ggpp-ud-diag-dl dd { margin: 0; font-family: ui-monospace, monospace; word-break: break-all; }
      .ggpp-ud-diag-actions { display: flex; gap: 8px; flex-wrap: wrap; }
      .ggpp-ud-composer-diag { display: grid; gap: 6px; padding: 8px 0 4px; border-top: 1px solid var(--ggpp-border-soft); }
    `);
    async function applyUsage(next: Usage, source: string) {
      const stamped = { ...next, accountKey: next.accountKey ?? accountKeyFromPath() };
      if (!belongsHere(stamped)) return;
      // Provenance tag only — never log tokens / wrb bodies.
      const same =
        usage &&
        liveVerified &&
        usage.window === stamped.window &&
        usage.weekly === stamped.weekly &&
        usage.windowResetAt === stamped.windowResetAt &&
        usage.weeklyResetAt === stamped.weeklyResetAt;
      if (same && Date.now() - usage!.at < 60_000) return;
      usage = stamped;
      liveVerified = true;
      if (source === "dom" || source.startsWith("dom")) {
        const aid = noteUsageDiagAttempt(null);
        noteUsageDiagResult({
          attemptId: aid,
          ok: true,
          source: "dom",
          dailyParsed: stamped.window !== undefined,
          weeklyParsed: stamped.weekly !== undefined,
        });
      }
      // Optional same-slot hint for other tabs; UI does not trust this on cold start.
      try {
        await ctx.data.set(usageKey(), usage);
      } catch {}
      void snapshot(stamped);
      ctx.log.info(`usage from ${source}: 5-hour ${stamped.window ?? "?"}%, weekly ${stamped.weekly ?? "?"}%`);
      refreshBar();
      historyView?.();
      diagPanelDraw?.();
    }

    let replaying = false;
    /** Re-render settings diagnostics panel; opening it must NOT trigger RPC. */
    let diagPanelDraw: (() => void) | null = null;
    async function refreshFromRpc(reason: string) {
      if (replaying) {
        noteUsageDiagSkip("busy");
        diagPanelDraw?.();
        return;
      }
      if (document.hidden) {
        noteUsageDiagSkip("hidden");
        diagPanelDraw?.();
        return;
      }
      replaying = true;
      diagPanelDraw?.();
      try {
        const { metrics, error } = await replayUsage();
        if (metrics) {
          const next = fromMetrics(metrics);
          if (next) await applyUsage(next, `rpc:${reason}`);
        } else if (error && error !== "parse-miss") {
          ctx.log.debug(`usage rpc refresh (${reason}): ${error}`);
        }
      } finally {
        replaying = false;
        diagPanelDraw?.();
      }
    }

    // Storage pull + Voyager-style batchexecute replay (real tokens / real response only).
    async function refresh() {
      log = await ctx.data.get<Log>(statsKey(), []);
      // Do not hydrate ring numbers from GM/local cache — may be another Firefox container.
      await refreshFromRpc("refresh");
    }

    // Shown inside the plugin's settings dialog (Plugins → UsageDisplay → gear).
    ctx.provide("panel:usageDisplay", (el: HTMLElement) => {
      const draw = () => {
        const chatBarButtonPresent = !!document.querySelector('button.ggpp-chatbar-btn[data-ggpp-button="usageDisplay"]');
        // Read-only sample — getUsageDiagnostics does not replay.
        const diag: UsageDiagnostics = getUsageDiagnostics({ chatBarButtonPresent });
        const rows = usageDiagDisplayRows(diag);

        const refreshBtn = h(
          "button",
          {
            class: "ggpp-btn ggpp-btn-primary",
            type: "button",
            title: "刷新用量",
            "aria-label": "刷新用量",
            disabled: replaying || undefined,
            onclick: () => {
              // Explicit manual refresh only — same mutex path as ring click.
              void refreshFromRpc("settings-refresh");
            },
          },
          "刷新用量",
        );

        const clear = ui.button(
          "Clear usage history",
          async () => {
            const ok = await ui.confirm({
              title: "Clear usage history",
              body: "Delete all locally recorded daily usage? This cannot be undone.",
              confirm: "Clear",
              danger: true,
            });
            if (!ok) return;
            log = [];
            await ctx.data.set(statsKey(), log);
            draw();
          },
          "default",
        );
        clear.disabled = !log.length;
        clear.title = "Clear usage history";
        clear.setAttribute("aria-label", "Clear usage history");

        const diagTable = h(
          "div",
          {
            class: "ggpp-ud-diag",
            role: "table",
            "aria-label": "用量只读诊断",
          },
          h("div", { class: "ggpp-ud-strong" }, "用量只读诊断"),
          h(
            "p",
            { class: "ggpp-muted" },
            "打开本面板不会发起 RPC。仅点「刷新用量」会走原 refresh 一次。字段为白名单；解析 false 表示未验证。",
          ),
          h(
            "dl",
            { class: "ggpp-ud-diag-dl" },
            ...rows.flatMap((r) => [h("dt", { dataset: { diagKey: r.key } }, r.label), h("dd", { dataset: { diagKey: r.key } }, r.value)]),
          ),
          h("div", { class: "ggpp-ud-diag-actions" }, refreshBtn),
        );

        // Hook for composer appearance helper (other thread). Present only when export exists — no guessed API.
        const composerSlot = h("div", {
          class: "ggpp-ud-composer-diag",
          "aria-label": "Composer appearance diagnostics slot",
        });
        fillComposerAppearanceSlot(composerSlot);

        const hist = h(
          "div",
          { class: "ggpp-ud-toggle" },
          h("span", { class: "ggpp-muted" }, `${log.length} recorded day(s).`),
          clear,
        );

        el.replaceChildren(diagTable, composerSlot, hist);
      };
      diagPanelDraw = draw;
      draw();
    });

    async function onAccountMaybeChanged() {
      const next = accountKeyFromPath();
      if (next === liveAccount) return;
      liveAccount = next;
      bumpUsageGeneration();
      liveVerified = false;
      usage = null; // unknown until this slot's live capture/replay/DOM
      log = await ctx.data.get<Log>(statsKey(), []);
      refreshBar();
      historyView?.();
      void refreshFromRpc("account-switch");
    }

    // On the usage page itself: DOM text fallback (Voyager also verifies via DOM).
    ctx.cleanup(
      // Older pages wrap the numbers in usage-metrics-window; since 2026-10 the page is a "route island"
      // with generated class names, so only its text can be relied on.
      gemini.watch("usage-metrics-window, declared-route-island-page", (box) => {
        const read = () => {
          if (!/\/usage\/?$/.test(location.pathname)) return false;
          const next = parse(box.innerText);
          if (next.window === undefined && next.weekly === undefined) return false;
          void applyUsage(next, "dom");
          return true;
        };
        const t = setInterval(read, 1000);
        return () => {
          clearInterval(t);
          read();
        };
      }),
    );

    // MAIN-world capture on /usage (and replay results / post-generation refresh).
    ctx.cleanup(
      onUsageEvent((ev) => {
        if (ev.accountKey && ev.accountKey !== accountKeyFromPath()) return;
        if (ev.kind === "capture" || ev.kind === "replay") {
          if (!ev.metrics) return;
          const next = fromMetrics(ev.metrics);
          if (next) void applyUsage(next, ev.kind);
          return;
        }
        if (ev.kind === "generation-complete") {
          // Usage changes after a send; Voyager refreshes then too.
          void refreshFromRpc("generation-complete");
        }
      }),
    );

    // Numbers from another tab arrive through shared storage (data:changed now emitted by runtime data.set).
    ctx.on("data:changed", ({ key, value }: { key: string; value: Usage | null }) => {
      if (key === `usageDisplay:${statsKey()}` && Array.isArray(value)) {
        log = value;
        historyView?.();
        return;
      }
      // Ignore cross-tab usage percentage caches — GM may cross Firefox containers.
      void value;
      void key;
    });

    document.addEventListener("visibilitychange", () => !document.hidden && void refresh(), { signal: ctx.signal });
    ctx.setInterval(() => {
      void onAccountMaybeChanged();
      if (!document.hidden) void refresh();
    }, REFRESH_MS);
    // First paint: try RPC once (default recipe jSf9Qc works for many accounts; capture upgrades it).
    void refreshFromRpc("start");
  },
});
