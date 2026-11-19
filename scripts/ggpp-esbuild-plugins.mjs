import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/** Aliases + CSS-as-text for GG++ plugins under sites/gemini. */
export function ggppPlugins(srcRoot) {
  const site = join(srcRoot, "sites/gemini");
  const shimTypes = join(site, "shims/types.ts");
  const shimKernel = join(site, "shims/kernel.ts");
  const libRoot = join(srcRoot, "src/lib");
  const kernelRoot = join(srcRoot, "src/kernel");

  const firstExisting = (base, exts) => {
    for (const ext of exts) {
      if (existsSync(base + ext)) return { path: base + ext };
    }
    return { path: base };
  };

  const under = (importer, frag) => importer.replace(/\\/g, "/").includes(frag);

  return [
    {
      name: "ggpp-alias",
      setup(b) {
        // Catch unresolved relative imports used by plugins.
        b.onResolve({ filter: /^\.\.\/\.\.\/kernel\/types$/ }, () => ({ path: shimTypes }));
        b.onResolve({ filter: /^\.\.\/\.\.\/kernel\/kernel$/ }, () => ({ path: shimKernel }));
        b.onResolve({ filter: /^\.\.\/\.\.\/kernel\/logger$/ }, () => firstExisting(join(kernelRoot, "logger"), [".ts"]));
        b.onResolve({ filter: /^\.\.\/\.\.\/lib\/([^/]+)$/ }, (args) => {
          const name = args.path.replace(/^\.\.\/\.\.\/lib\//, "");
          return firstExisting(join(libRoot, name), ["", ".ts", ".js"]);
        });
        // Absolute-style fallbacks if esbuild normalizes paths
        b.onResolve({ filter: /sites\/gemini\/kernel\/types$/ }, () => ({ path: shimTypes }));
        b.onResolve({ filter: /sites\/gemini\/kernel\/kernel$/ }, () => ({ path: shimKernel }));
        b.onResolve({ filter: /sites\/gemini\/lib\/([^/]+)$/ }, (args) => {
          const name = args.path.split("/lib/").pop();
          return firstExisting(join(libRoot, name), ["", ".ts", ".js"]);
        });
        // When importer is a plugin and path ends with kernel/types (non-relative forms)
        b.onResolve({ filter: /kernel\/types$/ }, (args) => {
          if (under(args.importer, "sites/gemini/shims")) return;
          if (under(args.importer, "src/kernel")) return;
          if (under(args.importer, "sites/gemini")) return { path: shimTypes };
        });
        b.onResolve({ filter: /kernel\/kernel$/ }, (args) => {
          if (under(args.importer, "sites/gemini/shims")) return;
          if (under(args.importer, "src/kernel")) return;
          if (under(args.importer, "sites/gemini")) return { path: shimKernel };
        });
      },
    },
    {
      name: "ggpp-css-text",
      setup(b) {
        b.onLoad({ filter: /\.css$/ }, (args) => {
          const css = readFileSync(args.path, "utf8");
          return { contents: `export default ${JSON.stringify(css)};`, loader: "js" };
        });
      },
    },
  ];
}
