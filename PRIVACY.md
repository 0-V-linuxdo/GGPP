# GG++ privacy and permissions

GG++ is an unofficial userscript that runs in the user's browser on gemini.google.com. This source distribution contains no user's account state, messages, authentication material, or browser profile. It has no configured analytics collection endpoint.

Settings, custom CSS/themes, input history and message/chat metadata are stored by the userscript manager or browser-local fallbacks. Feature behavior can observe page content and Gemini request activity locally: export/history/star features use content when invoked, and usage observation can capture/replay the site's own batchexecute requests and parse usage response data. Diagnostics/report export is a local user action; do not share an unreviewed report, console log, or screenshot.

Network permissions in userscript metadata include `@connect *`, not just the listed CDN hosts. User-selected theme/sound URLs may cause requests to those services. Gemini usage features can communicate with Gemini's own services. Do not interpret this broad permission as a promise that only a small fixed host allowlist is technically reachable.

This snapshot ships no private acceptance logs, account presets, request samples from a user session, cookies, credentials, or browser state. Source unit-test fixtures are synthetic. This publication preparation did not modify the feature implementations or make a new exhaustive privacy/security certification.
