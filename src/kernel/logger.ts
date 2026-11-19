import type { Logger } from "./types";

const STYLE = "background:#1a73e8;color:#fff;border-radius:3px;padding:0 4px;font-weight:600";

export function createLogger(scope: string): Logger {
  const tag = [`%cGG++%c ${scope}`, STYLE, ""];
  return {
    info: (...a) => console.info(...tag, ...a),
    warn: (...a) => console.warn(...tag, ...a),
    error: (...a) => console.error(...tag, ...a),
    debug: (...a) => {
      // info level so it shows in consoles that hide debug output
      if (localStorage.getItem("ggpp:debug") === "1") console.info(...tag, "[debug]", ...a);
    },
  };
}
