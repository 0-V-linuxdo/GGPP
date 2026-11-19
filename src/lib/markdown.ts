/** Rendered Gemini markdown (DOM) back to Markdown text. Covers what replies actually use. */

const SKIP = new Set(["BUTTON", "MAT-ICON", "GEM-ICON", "SVG", "STYLE", "SCRIPT", "SOURCES-CAROUSEL-INLINE", "SOURCE-FOOTNOTE"]);

function inline(node: Node): string {
  let out = "";
  for (const child of node.childNodes) out += convert(child, 0);
  return out;
}

function convert(node: Node, depth: number): string {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent ?? "";
  if (node.nodeType !== Node.ELEMENT_NODE) return "";
  const el = node as HTMLElement;
  if (SKIP.has(el.tagName) || el.classList.contains("cdk-visually-hidden") || el.getAttribute("aria-hidden") === "true") return "";
  const tag = el.tagName;
  switch (tag) {
    case "H1": case "H2": case "H3": case "H4": case "H5": case "H6":
      return `\n\n${"#".repeat(Number(tag[1]))} ${inline(el).trim()}\n\n`;
    case "P":
      return `\n\n${inline(el).trim()}\n\n`;
    case "BR":
      return "\n";
    case "HR":
      return "\n\n---\n\n";
    case "STRONG": case "B":
      return `**${inline(el)}**`;
    case "EM": case "I":
      return `*${inline(el)}*`;
    case "DEL": case "S":
      return `~~${inline(el)}~~`;
    case "CODE":
      return el.closest("pre") ? (el.textContent ?? "") : `\`${el.textContent ?? ""}\``;
    case "PRE": {
      const lang = el.closest("code-block")?.querySelector(".code-block-decoration span, .code-block-decoration")?.textContent?.trim().toLowerCase() ?? "";
      return `\n\n\`\`\`${/^[\w+#-]{1,20}$/.test(lang) ? lang : ""}\n${(el.textContent ?? "").replace(/\n$/, "")}\n\`\`\`\n\n`;
    }
    case "A": {
      const href = el.getAttribute("href");
      const text = inline(el).trim();
      return href && /^https?:/.test(href) ? `[${text || href}](${href})` : text;
    }
    case "IMG": {
      const src = el.getAttribute("src");
      return src && /^https?:/.test(src) ? `![${el.getAttribute("alt") ?? "image"}](${src})` : "";
    }
    case "BLOCKQUOTE":
      return `\n\n${inline(el).trim().split("\n").map((l) => `> ${l}`).join("\n")}\n\n`;
    case "UL": case "OL": {
      const items = [...el.children].filter((c) => c.tagName === "LI");
      const lines = items.map((li, i) => {
        const marker = tag === "OL" ? `${i + 1}.` : "-";
        const body = [...li.childNodes].map((c) => convert(c, depth + 1)).join("").trim().replace(/\n{2,}/g, "\n");
        return `${"  ".repeat(depth)}${marker} ${body.replace(/\n/g, `\n${"  ".repeat(depth + 1)}`)}`;
      });
      return `\n\n${lines.join("\n")}\n\n`;
    }
    case "TABLE": {
      const rows = [...el.querySelectorAll("tr")].map((tr) => [...tr.children].map((c) => inline(c).trim().replace(/\|/g, "\\|")));
      if (!rows.length) return "";
      const head = `| ${rows[0].join(" | ")} |\n| ${rows[0].map(() => "---").join(" | ")} |`;
      return `\n\n${[head, ...rows.slice(1).map((r) => `| ${r.join(" | ")} |`)].join("\n")}\n\n`;
    }
    default:
      return [...el.childNodes].map((c) => convert(c, depth)).join("");
  }
}

export function toMarkdown(root: Element) {
  return convert(root, 0).replace(/\n{3,}/g, "\n\n").trim();
}
