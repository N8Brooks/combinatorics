import { build } from "https://deno.land/x/dnt@0.20.1/mod.ts";

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  package: {
    name: "combinatorial-generators",
    version: Deno.args[0],
    description:
      "Combinatorial generators including combinations, permutations, combinations with replacement, cartesian products, and power sets.",
    keywords: [
      "typescript",
      "combinatorics",
      "permutations",
      "combinations",
      "cartesian-product",
      "combinations-with-repetition",
      "permutations-with-repetition",
    ],
    author: "Nathan Brooks <natebrooks004@gmail.com>",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/N8Brooks/combinatorics.git",
    },
    bugs: {
      url: "https://github.com/N8Brooks/combinatorics/issues",
    },
    homepage: "https://github.com/N8Brooks/combinatorics#readme",
  },
  shims: {
    deno: {
      test: "dev",
    },
  },
});

Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
