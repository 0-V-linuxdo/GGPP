# GG++

A plugin-first, unofficial browser userscript for Gemini, built on [Userscript++](https://github.com/0-V-linuxdo/UserscriptPP). Feature implementations live in `sites/gemini`.

**Independent, unofficial project:** GG++ is not affiliated with or endorsed by Google. The existing Google-derived vector icon is retained unchanged; Google rights are reserved and no Google permission is claimed. Provenance, modifications, published brand guidance and limitations are documented in [ICON-RIGHTS.md](ICON-RIGHTS.md).

## Rebuild from public sources

Tested tools: **Node 24.19.0**, **Bun 1.3.14**. Node >=20 is required by the framework. No personal checkout path or global Node configuration is required.

1. Install this project's locked tools: `bun install --frozen-lockfile`.
2. Run `node scripts/prepare-framework.mjs`. It downloads the exact public archive in `build-dependencies.json`, verifies its SHA256 and the upstream package-lock SHA256, and runs **npm ci** in that extracted source tree. It refuses to replace an existing dependency directory. It does not clone a repository or modify user authentication.
3. Run `bun run test` (all GG++ tests in `sites` and publication-packaging tests in `scripts`; dependency tests are not this project's tests).
4. Run `bun run build` for production output.

By default the framework is provisioned in `.build-deps/UserscriptPP`. To keep it outside this project, set the cross-platform `USPP_DIR` environment variable to any new controlled directory for both preparation and build (PowerShell: `$env:USPP_DIR=...`; POSIX shell: `export USPP_DIR=...`). Do not set it to an unrelated user directory.

Pinned public framework commit: **a2390fa39ea8387227aef920eccdad6e8a935061**. Its upstream npm lock installs esbuild **0.25.10** and Preact **10.29.8**. Root `bun.lock` alone does not install the framework. The provisioning script also accepts `--archive <downloaded-file>` for a separately obtained archive; its SHA and upstream lock are still verified.

Outputs: `userscript/GGPP.user.js`, `userscript/GGPP.meta.js`, and an identical compatibility copy `dist/GGPP.user.js`. The checked-in distributable files are `userscript/GGPP.user.js` and `userscript/GGPP.meta.js`; `dist/` is an ignored local build copy and is not published in Git. Development/watch outputs and source maps stay local and are ignored.

Production packaging removes only AST-confirmed standalone generated source-origin path comments, retaining all runtime tokens and literal spelling, then embeds full legal notices. Random build-directory paths must not leak into production output. Two builds in different temporary directories should be byte-identical. Packaging-only changes necessarily produce a new SHA; they do not retain the earlier local acceptance hash.

The old extension command/entrypoints are intentionally outside this userscript-only snapshot. `tsconfig.json` now includes `sites`; **no TypeScript typecheck pass is claimed**. Unit tests/builds do not replace a typecheck.

## Install and settings

Install the production userscript using a compatible userscript manager. GG++ runs only at `https://gemini.google.com/*`. Open its own GG++ entry or settings shortcut Ctrl/Cmd+Shift+comma. No browser profile, login, or private acceptance evidence is shipped.

## Source / licenses

This distribution includes modified GG++ site code and packaging, with framework source at the pinned public commit above. Modifications dated 2026-11-19 are publication-only build configuration, path-comment normalization, documentation, and license notices; feature code and icon bytes are unchanged. [GPL-3.0-or-later](LICENSE) applies to GG++ plus the embedded framework, with third-party terms retained in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). The production userscript embeds those notices and verbatim GPLv3 license text so a standalone download retains them. Google marks are not granted by the GPL. See [PRIVACY.md](PRIVACY.md) and [ICON-RIGHTS.md](ICON-RIGHTS.md).
