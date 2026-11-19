import { expect, test } from "bun:test";
import { resolveNetHookWindow } from "./netHook";

test("resolveNetHookWindow returns a global object without throwing in non-DOM test env", () => {
  const w = resolveNetHookWindow();
  expect(w).toBeTruthy();
  expect(typeof w === "object" || typeof w === "function").toBe(true);
});
