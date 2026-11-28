import { describe, expect, test } from "bun:test";
import { readableText } from "./index";

function el(inner: string, content: string) {
  return {
    innerText: inner,
    textContent: content,
  } as unknown as HTMLElement;
}

describe("readableText", () => {
  test("prefers visible innerText", () => {
    expect(readableText(el("「落地 1–2」已完成", "hidden Run take_snapshot?"))).toBe("「落地 1–2」已完成");
  });

  test("falls back to textContent when innerText is skipped", () => {
    expect(readableText(el("", " Run take_snapshot? Allow Gemini to run take_snapshot on your machine? {\"pageId\":37}"))).toBe(
      'Run take_snapshot? Allow Gemini to run take_snapshot on your machine? {"pageId":37}',
    );
  });
});
