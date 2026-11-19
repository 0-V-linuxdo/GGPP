/**
 * Userscript @icon: Gemini CDN concave sparkle + dual ++ transparent cutouts.
 * Primary @icon is data:image/svg+xml;base64 (Violentmonkey 2.50.0-supported);
 * static/icons/userscript.png kept as PNG backup. Google trademarks are not
 * covered by the GPL; this tree does not claim Google trademark authorization.
 */
import { expect, test, describe } from "bun:test";
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { inflateSync as zlibInflateSync } from "node:zlib";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SITE = HERE;
const ROOT = resolve(HERE, "../..");
const CFG_PATH = join(SITE, "userscript.json");
const US_PNG = join(ROOT, "static/icons/userscript.png");
const US_SVG = join(ROOT, "static/icons/userscript.svg");
const SHARED_SVG = join(ROOT, "static/icons/icon.svg");
const CDN_ORIGINAL = join(SITE, "gemini-cdn-original.svg");
const SHARED_SVG_MD5 = "0da64d80ab7efbd3461b53510826933f";

/** Box review drafts copied verbatim 2026-11-18 (Asia/Shanghai). */
const EXPECT_SVG_SHA256 =
  "fd99751a0ef71004349065a79b9674db6453a82ff05442e2cf601848069bdfb5";
const EXPECT_PNG_SHA256 =
  "de420743f08f3513f2d46136d86bcbe79e05d8cdfb30e13712897a6540380d6c";
const EXPECT_CDN_ORIGINAL_SHA256 =
  "70648972251464cd382d1418e126a5167ad2d7f18b42f06a4ce18866cb0d9831";
const CDN_ORIGINAL_URL =
  "https://storage.googleapis.com/gweb-gemini-cdn/gemini/uploads/c546a20243c57b297546630cf76e417a2483acb8.svg";

function sha256(buf: Buffer | string) {
  return createHash("sha256").update(buf).digest("hex");
}

function loadCfg(path = CFG_PATH) {
  return JSON.parse(readFileSync(path, "utf8")) as {
    icon?: string;
    version?: string;
    name?: string;
  };
}

function iconHeaderLine(cfg: { icon?: string }) {
  if (!cfg.icon) return null;
  return `// @icon         ${cfg.icon}`;
}

function parseSvgDataUri(uri: string) {
  const m = /^data:image\/svg\+xml;base64,([A-Za-z0-9+/]+=*)$/.exec(uri);
  if (!m) throw new Error("not a data:image/svg+xml;base64 URI");
  if (uri.includes("\n") || uri.includes("\r")) throw new Error("URI must be single-line");
  const buf = Buffer.from(m[1], "base64");
  const text = buf.toString("utf8");
  if (!text.includes("<svg") || !text.includes("</svg>")) throw new Error("decoded SVG missing root");
  return { buf, text };
}

function starPathFromSvg(svg: string) {
  const m = /<path[^>]*\sd="([^"]+)"/.exec(svg);
  if (!m) throw new Error("missing path d");
  return m[1];
}

/** Decode 8-bit RGBA PNG (color type 6) to flat RGBA buffer. */
function decodePngRgba(buf: Buffer) {
  if (buf.subarray(0, 8).toString("binary") !== "\x89PNG\r\n\x1a\n") throw new Error("bad PNG");
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  const bitDepth = buf[24];
  const colorType = buf[25];
  if (bitDepth !== 8 || colorType !== 6) throw new Error(`unsupported PNG ${bitDepth}/${colorType}`);
  const parts: Buffer[] = [];
  let offset = 8;
  while (offset + 8 <= buf.length) {
    const len = buf.readUInt32BE(offset);
    const type = buf.subarray(offset + 4, offset + 8).toString("binary");
    const data = buf.subarray(offset + 8, offset + 8 + len);
    if (type === "IDAT") parts.push(data);
    if (type === "IEND") break;
    offset += 12 + len;
  }
  const inflated = zlibInflateSync(Buffer.concat(parts));
  const stride = width * 4;
  const out = Buffer.alloc(width * height * 4);
  let src = 0;
  for (let y = 0; y < height; y++) {
    const filter = inflated[src++];
    const row = inflated.subarray(src, src + stride);
    src += stride;
    const dst = y * stride;
    if (filter === 0) {
      row.copy(out, dst);
    } else if (filter === 1) {
      for (let i = 0; i < stride; i++) {
        const left = i >= 4 ? out[dst + i - 4] : 0;
        out[dst + i] = (row[i] + left) & 255;
      }
    } else if (filter === 2) {
      for (let i = 0; i < stride; i++) {
        const up = y > 0 ? out[dst - stride + i] : 0;
        out[dst + i] = (row[i] + up) & 255;
      }
    } else if (filter === 3) {
      for (let i = 0; i < stride; i++) {
        const left = i >= 4 ? out[dst + i - 4] : 0;
        const up = y > 0 ? out[dst - stride + i] : 0;
        out[dst + i] = (row[i] + Math.floor((left + up) / 2)) & 255;
      }
    } else if (filter === 4) {
      for (let i = 0; i < stride; i++) {
        const left = i >= 4 ? out[dst + i - 4] : 0;
        const up = y > 0 ? out[dst - stride + i] : 0;
        const upLeft = y > 0 && i >= 4 ? out[dst - stride + i - 4] : 0;
        const p = left + up - upLeft;
        const pa = Math.abs(p - left);
        const pb = Math.abs(p - up);
        const pc = Math.abs(p - upLeft);
        const pr = pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft;
        out[dst + i] = (row[i] + pr) & 255;
      }
    } else {
      throw new Error(`unsupported filter ${filter}`);
    }
  }
  return { width, height, rgba: out };
}

function alphaAtView(rgba: Buffer, width: number, height: number, vx: number, vy: number) {
  const x = Math.min(width - 1, Math.max(0, Math.floor((vx / 66) * width)));
  const y = Math.min(height - 1, Math.max(0, Math.floor((vy / 66) * height)));
  return rgba[(y * width + x) * 4 + 3];
}

describe("GG++ userscript @icon (SVG data URI + ++ cutouts)", () => {
  test("name/version unchanged; SVG data URI single-line; decode hash matches SVG file", () => {
    const cfg = loadCfg();
    expect(cfg.name).toBe("GG++");
    expect(cfg.version).toBe("0.2.0");
    const { buf, text } = parseSvgDataUri(cfg.icon!);
    expect(sha256(buf)).toBe(EXPECT_SVG_SHA256);
    expect(buf.equals(readFileSync(US_SVG))).toBe(true);
    expect(text).toContain('fill-rule="evenodd"');
    expect(cfg.icon!).not.toMatch(/[\r\n]/);
    // simulate USPP header line: no truncation of value
    const line = iconHeaderLine(cfg)!;
    expect(line).toBe(`// @icon         ${cfg.icon}`);
    expect(line.split("\n")).toHaveLength(1);
  });

  test("PNG backup retained with box hash; not the @icon primary", () => {
    expect(existsSync(US_PNG)).toBe(true);
    expect(sha256(readFileSync(US_PNG))).toBe(EXPECT_PNG_SHA256);
    expect(loadCfg().icon!.startsWith("data:image/svg+xml;base64,")).toBe(true);
    expect(loadCfg().icon!.startsWith("data:image/png")).toBe(false);
  });

  test("SVG file matches box review hash; CDN star curve kept; ++ evenodd holes; no sliders", () => {
    const svgBuf = readFileSync(US_SVG);
    expect(sha256(svgBuf)).toBe(EXPECT_SVG_SHA256);
    const svg = svgBuf.toString("utf8");
    expect(svg).toContain("#4893FC");
    expect(svg).toContain("#969DFF");
    expect(svg).toContain("#BD99FE");
    expect(svg).toContain('fill-rule="evenodd"');
    expect(svg).toContain("M21.200,26.300");
    expect(svg).toContain("M39.800,26.300");
    expect(svg).not.toContain("clipPath");
    expect(svg).not.toContain("ggppStarClip");
    expect(svg).not.toMatch(/slider/i);
    expect(svg).not.toContain('rect x="16" y="24.5"');
    expect(svg).not.toContain('circle cx="41" cy="27.75"');
    expect(existsSync(CDN_ORIGINAL)).toBe(true);
    expect(sha256(readFileSync(CDN_ORIGINAL))).toBe(EXPECT_CDN_ORIGINAL_SHA256);
    const origStar = starPathFromSvg(readFileSync(CDN_ORIGINAL, "utf8"));
    expect(starPathFromSvg(svg).startsWith(origStar)).toBe(true);
    expect(CDN_ORIGINAL_URL).toContain("gweb-gemini-cdn");
  });

  test("PNG backup ++ hole centers transparent; tip/body opaque", () => {
    const { width, height, rgba } = decodePngRgba(readFileSync(US_PNG));
    expect(width).toBe(128);
    expect(height).toBe(128);
    expect(alphaAtView(rgba, width, height, 32.9, 6)).toBe(255);
    expect(alphaAtView(rgba, width, height, 32.9, 18)).toBe(255);
    expect(alphaAtView(rgba, width, height, 23.6, 32.9)).toBe(0);
    expect(alphaAtView(rgba, width, height, 42.2, 32.9)).toBe(0);
  });

  test("shared static/icons/icon.svg fingerprint unchanged", () => {
    expect(createHash("md5").update(readFileSync(SHARED_SVG)).digest("hex")).toBe(SHARED_SVG_MD5);
  });

  test("cwd-independent resolution", () => {
    const prev = process.cwd();
    try {
      process.chdir("/tmp");
      expect(loadCfg(join(SITE, "userscript.json")).icon?.startsWith("data:image/svg+xml;base64,")).toBe(true);
    } finally {
      process.chdir(prev);
    }
  });

  test("USPP-style @icon header is data URI only", () => {
    const cfg = loadCfg();
    const line = iconHeaderLine(cfg)!;
    expect(line.startsWith("// @icon")).toBe(true);
    expect(line).toContain(cfg.icon!);
    expect(line).not.toMatch(/https?:\/\//);
  });
});
