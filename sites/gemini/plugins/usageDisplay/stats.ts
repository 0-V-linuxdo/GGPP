/**
 * Local per-day log of the weekly limit. Each day keeps how far the weekly percent moved while it
 * was "today", so the bars add up to the week. Gemini only reports the numbers when its usage page
 * is read, so snapshots are sparse: a day starts where the previous one ended (same week), or at 0
 * when the week has reset in between.
 */

export interface Day {
  /** Local calendar day, YYYY-MM-DD. */
  date: string;
  /** Weekly percent the current segment started from. */
  start: number;
  /** Last weekly percent seen that day. */
  last: number;
  /** When the week the current segment belongs to resets (ms), if known. */
  resetAt?: number;
  /** Usage from segments before a weekly reset that happened during this day. */
  accrued: number;
  /** The segment that ended at that reset, for the "before + after" caption. */
  before?: { start: number; end: number };
}

export type Log = Day[];

export const dayKey = (t: number) => {
  const d = new Date(t);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

/** A new week: the reset time moved by at least a minute, or the percent fell by more than 5 points. */
function isReset(prevPct: number, prevReset: number | undefined, pct: number, reset: number | undefined) {
  if (prevReset !== undefined && reset !== undefined && Math.abs(reset - prevReset) >= 60_000) return true;
  return pct < prevPct - 5;
}

/** Fold one reading of the weekly percent into the log. Returns a new log, oldest day first. */
export function record(log: Log, pct: number, resetAt: number | undefined, at: number, retainDays: number): Log {
  const key = dayKey(at);
  const days = log.filter((d) => d.date !== key);
  let today = log.find((d) => d.date === key);
  if (today) {
    today = { ...today };
    if (isReset(today.last, today.resetAt, pct, resetAt)) {
      today.before = { start: today.start, end: today.last };
      today.accrued += Math.max(0, today.last - today.start);
      // After a reset the week starts again from zero.
      today.start = 0;
    }
    today.last = pct;
    today.resetAt = resetAt ?? today.resetAt;
  } else {
    const prev = [...days].filter((d) => d.date < key).pop();
    const start = !prev ? pct : isReset(prev.last, prev.resetAt, pct, resetAt) ? 0 : Math.min(prev.last, pct);
    today = { date: key, start, last: pct, resetAt, accrued: 0 };
  }
  days.push(today);
  days.sort((a, b) => a.date.localeCompare(b.date));
  const cutoff = dayKey(at - retainDays * 86_400_000);
  return days.filter((d) => d.date > cutoff);
}

export const used = (d: Day) => d.accrued + Math.max(0, d.last - d.start);

/** One slot per calendar day from the oldest recorded day (or a week ago) through today. */
export function calendar(log: Log, now: number): { date: string; day?: Day }[] {
  const byDate = new Map(log.map((d) => [d.date, d]));
  const today = new Date(now);
  today.setHours(12, 0, 0, 0);
  const first = new Date(today);
  first.setDate(first.getDate() - 6);
  if (log.length) {
    const [y, m, d] = log[0].date.split("-").map(Number);
    const oldest = new Date(y, m - 1, d, 12);
    if (oldest < first) first.setTime(oldest.getTime());
  }
  const out: { date: string; day?: Day }[] = [];
  for (const t = new Date(first); t <= today; t.setDate(t.getDate() + 1)) {
    const key = dayKey(t.getTime());
    out.push({ date: key, day: byDate.get(key) });
  }
  return out;
}

export const signed = (v: number | undefined) => (v === undefined ? "—" : `+${Math.round(v * 10) / 10}%`);
