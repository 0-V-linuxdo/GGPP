import { expect, test } from "bun:test";
import { calendar, dayKey, record, used, type Log } from "./stats";

const at = (d: number, h = 12) => new Date(2026, 9, d, h).getTime();
const WEEK = at(25, 2);

test("readings on one day add up", () => {
  let log: Log = [];
  log = record(log, 10, WEEK, at(20, 9), 90);
  log = record(log, 14, WEEK, at(20, 18), 90);
  expect(log).toHaveLength(1);
  expect(used(log[0])).toBe(4);
});

test("a new day starts where the previous one ended", () => {
  let log: Log = [];
  log = record(log, 10, WEEK, at(20), 90);
  log = record(log, 13, WEEK, at(21), 90);
  expect(log.map(used)).toEqual([0, 3]);
});

test("a weekly reset during the day keeps the usage from before it", () => {
  let log: Log = [];
  log = record(log, 30, WEEK, at(25, 0), 90);
  log = record(log, 34, WEEK, at(25, 1), 90);
  log = record(log, 2, WEEK + 7 * 86_400_000, at(25, 9), 90);
  expect(log[0].before).toEqual({ start: 30, end: 34 });
  expect(used(log[0])).toBe(6);
});

test("a reset between days starts the new day at zero", () => {
  let log: Log = [];
  log = record(log, 60, WEEK, at(24), 90);
  log = record(log, 5, WEEK + 7 * 86_400_000, at(26), 90);
  expect(used(log[1])).toBe(5);
});

test("old days are pruned", () => {
  let log: Log = [];
  log = record(log, 1, WEEK, at(1), 7);
  log = record(log, 2, WEEK, at(20), 7);
  expect(log.map((d) => d.date)).toEqual([dayKey(at(20))]);
});

test("calendar fills missing days and covers at least a week", () => {
  const log = record([], 5, WEEK, at(20), 90);
  const days = calendar(log, at(22));
  expect(days).toHaveLength(7);
  expect(days.at(-1)!.date).toBe(dayKey(at(22)));
  expect(days.find((d) => d.date === dayKey(at(20)))?.day).toBeDefined();
});
