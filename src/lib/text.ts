/** Plain one-line preview of a reply: no code, no markdown punctuation, collapsed spaces. */
export function preview(text: string, max = 120) {
  const plain = text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`#>~|]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return truncate(plain, max);
}

export function truncate(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}
