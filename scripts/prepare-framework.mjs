#!/usr/bin/env node
// Public pinned-archive provisioning only. No git clone, credentials, or user configuration writes.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pin = JSON.parse(readFileSync(join(root, "build-dependencies.json"), "utf8"));
const args=process.argv.slice(2), local=args.indexOf("--archive");
const dest = resolve(process.env.USPP_DIR || join(root, ".build-deps/UserscriptPP"));
if (existsSync(dest)) throw new Error("Dependency directory already exists; refusing to replace it. Use a fresh USPP_DIR.");
const cache = join(dirname(dest), ".downloads"); mkdirSync(cache, { recursive: true });
const archive = join(cache, `UserscriptPP-${pin.commit}.tar.gz`);
let bytes;
if (local>=0) bytes=readFileSync(resolve(args[local+1]));
else { const response = await fetch(pin.archiveUrl); if (!response.ok) throw new Error(`Framework HTTP ${response.status}`); bytes=Buffer.from(await response.arrayBuffer()); }
if (createHash("sha256").update(bytes).digest("hex") !== pin.archiveSha256) throw new Error("Public archive SHA256 mismatch");
writeFileSync(archive,bytes);
const listing=spawnSync("tar",["-tzf",archive],{encoding:"utf8"}); if(listing.status!==0) throw new Error("Cannot inspect framework archive");
const prefix=`UserscriptPP-${pin.commit}/`;
if(listing.stdout.trim().split(/\r?\n/).some(n=>!n.startsWith(prefix)||n.split("/").includes(".."))) throw new Error("Unexpected archive paths");
mkdirSync(dest,{recursive:true});
const extracted=spawnSync("tar",["-xzf",archive,"--strip-components=1","-C",dest],{stdio:"inherit"});if(extracted.status!==0)throw new Error("Framework extraction failed");
const actualLock=createHash("sha256").update(readFileSync(join(dest,"package-lock.json"))).digest("hex");
if(actualLock!==pin.upstreamPackageLockSha256)throw new Error("Pinned framework lock SHA mismatch");
const npmName=process.platform==="win32"?"npm.cmd":"npm";
const bundled=join(dirname(process.execPath),npmName),npm=existsSync(bundled)?bundled:npmName;
const installed=spawnSync(npm,["ci","--no-audit","--no-fund"],{cwd:dest,stdio:"inherit",shell:process.platform==="win32",env:{...process.env}});
if(installed.status!==0)throw new Error(`Pinned framework npm ci failed (${installed.status})`);
console.log(`Pinned framework ${pin.commit}: archive and package-lock verified; dependencies installed.`);
