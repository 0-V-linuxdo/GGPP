#!/usr/bin/env node
// Build GG++ as a Userscript++ site script.
//   node scripts/build.mjs            → userscript/GGPP.user.js (+ .dev)
//   node scripts/build.mjs --dev
//   USPP_DIR=/path/to/pinned/UserscriptPP node scripts/build.mjs
import { spawnSync, execSync } from "node:child_process";
import { prepareRelease } from "./release-output.mjs";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync, cpSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const isDev = args.includes("--dev");
const USPP_DIR = resolve(process.env.USPP_DIR || join(root, ".build-deps/UserscriptPP"));
if (!existsSync(join(USPP_DIR, "scripts/build.mjs"))) {
  throw new Error(`Userscript++ not found at ${USPP_DIR}. Set USPP_DIR.`);
}

const SITE = join(root, "sites/gemini");
const OUT = join(root, "userscript");
mkdirSync(OUT, { recursive: true });

function patchUsppBuild(srcText) {
  const pluginFile = join(root, "scripts/ggpp-esbuild-plugins.mjs");
  let text = srcText;
  if (!text.includes("plugins: [scopeNames(")) {
    throw new Error("USPP build.mjs does not contain plugins: [scopeNames( — cannot inject aliases");
  }
  if (!text.includes("ggppPlugins")) {
    const nl = text.indexOf("\n");
    text = text.slice(0, nl + 1) + `import { ggppPlugins } from ${JSON.stringify(pluginFile)};\n` + text.slice(nl + 1);
  }
  text = text.replace(
    "plugins: [scopeNames(",
    `plugins: [...ggppPlugins(${JSON.stringify(root)}), scopeNames(`,
  );
  // Define legacy compile-time constants referenced by settings UI.
  if (text.includes("__USPP_VERSION__: JSON.stringify(cfg.version || VERSION)")) {
    text = text.replace(
      "__USPP_VERSION__: JSON.stringify(cfg.version || VERSION),",
      `__USPP_VERSION__: JSON.stringify(cfg.version || VERSION),
            __GGPP_TARGET__: JSON.stringify("userscript"),
            __GGPP_VERSION__: JSON.stringify(cfg.version || VERSION),`,
    );
  }
  return text;
}

function main() {
  const tmp = mkdtempSync(join(tmpdir(), "ggpp-uspp-"));
  try {
    // Minimal USPP tree: core + scripts + package metadata + node_modules(esbuild)
    for (const name of ["core", "scripts", "types", "plugins", "package.json", "CHANGELOG.md", "LICENSE"]) {
      const src = join(USPP_DIR, name);
      if (!existsSync(src)) continue;
      const dest = join(tmp, name);
      cpSync(src, dest, { recursive: true });
    }
    // Prefer USPP's node_modules (esbuild); fall back to symlink
    const nm = join(USPP_DIR, "node_modules");
    if (existsSync(nm)) symlinkSync(nm, join(tmp, "node_modules"));

    const buildSrc = readFileSync(join(tmp, "scripts/build.mjs"), "utf8");
    writeFileSync(join(tmp, "scripts/build.mjs"), patchUsppBuild(buildSrc));

    const node = process.execPath;
    const buildArgs = [
      join(tmp, "scripts/build.mjs"),
      "--site-dir",
      SITE,
      "--out",
      OUT,
      ...(isDev ? ["--dev"] : (args.includes("--prod") ? [] : ["--prod"])),
      ...args.filter((a) => a !== "--dev"),
    ];
    const r = spawnSync(node, buildArgs, { stdio: "inherit", cwd: root, env: { ...process.env } });
    if (r.status) process.exit(r.status || 1);

    // Also produce an ignored local dist/GGPP.user.js compatibility copy.
    mkdirSync(join(root, "dist"), { recursive: true });
    if (!isDev) {
      const file = join(OUT, "GGPP.user.js");
      const release = prepareRelease(readFileSync(file, "utf8"), readFileSync(join(root, "THIRD_PARTY_NOTICES.md"), "utf8"), readFileSync(join(root, "LICENSE"), "utf8"));
      writeFileSync(file, release.code);
      if (process.env.GGPP_BUILD_AUDIT) writeFileSync(process.env.GGPP_BUILD_AUDIT, JSON.stringify(release.report, null, 2) + "\n");
      console.log(`Release packaging: ${release.report.removedStandaloneSourceComments} generated path comments removed; runtime tokens identical`);
    }
    const built = join(OUT, isDev ? "GGPP.dev.user.js" : "GGPP.user.js");
    const alt = existsSync(built) ? built : join(OUT, "GGPP.user.js");
    if (existsSync(alt)) {
      cpSync(alt, join(root, "dist", "GGPP.user.js"));
      // Prefer prod name
      if (existsSync(join(OUT, "GGPP.user.js"))) cpSync(join(OUT, "GGPP.user.js"), join(root, "dist", "GGPP.user.js"));
    }
    console.log(`GG++ userscript → ${OUT} (and dist/GGPP.user.js)`);
  } finally {
    try {
      rmSync(join(tmp, "node_modules"), { force: true });
    } catch {}
    try {
      rmSync(tmp, { recursive: true, force: true });
    } catch {}
  }
}

main();
