import { h } from "./dom";

/** Pretty-print a one-line CSS snippet: one declaration per line, blank line between rules. */
export function formatCss(css: string) {
  let out = "";
  let depth = 0;
  const pad = () => "    ".repeat(depth);
  for (const raw of css.split(/(?<=[{};])/)) {
    const part = raw.trim();
    if (!part) continue;
    if (part.endsWith("{")) {
      out += `${pad()}${part.slice(0, -1).trim()} {\n`;
      depth++;
    } else if (part.endsWith("}")) {
      const decl = part.slice(0, -1).trim();
      if (decl) out += `${pad()}${decl}${decl.endsWith(";") ? "" : ";"}\n`;
      depth = Math.max(0, depth - 1);
      out += `${pad()}}\n${depth === 0 ? "\n" : ""}`;
    } else {
      out += `${pad()}${part}\n`;
    }
  }
  return out.trimEnd();
}

/** Monospace CSS textarea: Tab indents, minified pastes are expanded. */
export function cssEditor(value: string, onInput: (v: string) => void, placeholder = "Paste your CSS here...") {
  const ta = h("textarea", {
    class: "ggpp-input ggpp-css-editor",
    spellcheck: false,
    autocapitalize: "off",
    autocomplete: "off",
    placeholder,
    value,
  });
  ta.addEventListener("input", () => onInput(ta.value));
  ta.addEventListener("keydown", (e) => {
    if (e.key !== "Tab" || e.shiftKey) return;
    e.preventDefault();
    document.execCommand("insertText", false, "    ");
  });
  ta.addEventListener("paste", (e) => {
    const text = e.clipboardData?.getData("text/plain") ?? "";
    if (!text.includes("{") || text.includes("\n")) return;
    e.preventDefault();
    document.execCommand("insertText", false, formatCss(text));
  });
  return ta;
}
