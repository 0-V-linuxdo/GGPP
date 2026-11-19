# GG++ userscript icon provenance

**Date (Asia/Shanghai):** 2026-11-18  
**Scope:** `static/icons/userscript.svg`, `static/icons/userscript.png` (backup), `sites/gemini/userscript.json` `@icon` **SVG** data URI, fixture `sites/gemini/gemini-cdn-original.svg`.  
**Not in scope:** shared `static/icons/icon.svg` (unchanged), package name/version/match URLs, plugin logic, build/install/dist.

## Upstream silhouette (verbatim)

| Field | Value |
| --- | --- |
| URL | `https://storage.googleapis.com/gweb-gemini-cdn/gemini/uploads/c546a20243c57b297546630cf76e417a2483acb8.svg` |
| HTTP | 200 (re-fetched 2026-11-18; byte-identical to local fixture) |
| Local fixture | `sites/gemini/gemini-cdn-original.svg` |
| SHA256 | `70648972251464cd382d1418e126a5167ad2d7f18b42f06a4ce18866cb0d9831` |
| Notes | Official Gemini four-point concave sparkle path `d=` kept as the compound-path prefix in the userscript SVG. |

## Derivative GG++ mark

| Asset | Path | SHA256 |
| --- | --- | --- |
| SVG (visual source) | `static/icons/userscript.svg` | `fd99751a0ef71004349065a79b9674db6453a82ff05442e2cf601848069bdfb5` |
| PNG 128×128 backup | `static/icons/userscript.png` | `de420743f08f3513f2d46136d86bcbe79e05d8cdfb30e13712897a6540380d6c` |
| `@icon` primary | `sites/gemini/userscript.json` → `data:image/svg+xml;base64,…` | decoded bytes = SVG SHA256 above |

**How ++ is expressed:** `fill-rule="evenodd"` compound path = CDN star outline + two plus polygons. Transparent cutouts — not sliders.

**Color:** `#4893FC` → `#969DFF` → `#BD99FE`, transparent background.

**@icon format change (2026-11-18):** primary metadata icon switched from PNG data URI to **`data:image/svg+xml;base64`** of the same approved SVG bytes (PNG file retained, not deleted). Violentmonkey **v2.50.0** support evidence: `public Violentmonkey source/tag and issue references recorded below` (tag commit `f3f4e7f50e92f84e83076046171e042ecce6c4ff`; `vetUrl`/`loadScriptIcon` data-URI short-circuit; issue #2214 SVG data `@icon` repro + fix `188f7321`).

**USPP header:** the pinned framework `scripts/build.mjs` `header()` emits `cfg.icon` verbatim on one `// @icon …` line (no truncation). URI must stay single-line.

## Trademark / license

- GG++ code is licensed **GPL-3.0-or-later**.
- **Google / Gemini names and logo geometry are trademarks (and related rights) of Google LLC.** Those rights are **not** granted by the GPL.
- This repository **does not** claim Google trademark authorization, endorsement, or official affiliation.

## Replaced

Prior unapproved “sparkle + dual slider knobs” icon was replaced by ++ cutouts; `@icon` encoding later moved PNG→SVG data URI without changing visual SVG/PNG hashes.
