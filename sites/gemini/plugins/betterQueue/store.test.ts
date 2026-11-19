import { expect, test } from "bun:test";
import { adopt, MAX_AGE, MAX_ITEMS, move, prune, type Item } from "./store";

const item = (id: string, at = 0): Item => ({ id, text: id, model: "", at });

test("prune drops old items, the unsaved new chat and empty queues", () => {
  const now = MAX_AGE + 10;
  const q = prune({ a: [item("old", 0), item("ok", now)], b: [item("x", 0)], new: [item("n", now)] }, now);
  expect(q).toEqual({ a: [item("ok", now)] });
});

test("prune caps a queue", () => {
  const many = Array.from({ length: MAX_ITEMS + 5 }, (_, i) => item(String(i), 1));
  expect(prune({ a: many }, 2).a).toHaveLength(MAX_ITEMS);
});

test("move reorders", () => {
  const list = [item("a"), item("b"), item("c")];
  expect(move(list, "c", 0).map((i) => i.id)).toEqual(["c", "a", "b"]);
  expect(move(list, "a", 9).map((i) => i.id)).toEqual(["b", "c", "a"]);
  expect(move(list, "zz", 0)).toBe(list);
});

test("adopt moves the new chat's queue to its id", () => {
  expect(adopt({ new: [item("a")] }, "c1")).toEqual({ c1: [item("a")] });
  expect(adopt({ c1: [item("x")] }, "c1")).toEqual({ c1: [item("x")] });
});
