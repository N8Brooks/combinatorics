// Used to generate the combinatorial-generators npm package.

import { build, emptyDir } from "https://deno.land/x/dnt@0.22.0/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    deno: {
      test: "dev",
    },
  },
  package: {
    name: "combinatorial-generators",
    version: Deno.args[0],
    description:
      "Combinatorial generators including combinations, permutations, combinations with replacement, permutations with replacement, cartesian products, and power sets.",
    keywords: [
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
    homepage: "https://github.com/N8Brooks/combinatorics",
  },
});

Deno.copyFileSync("./LICENSE", "./npm/LICENSE");

const readme = Deno.readTextFileSync("./README.md")
  .replaceAll("https://deno.land/std/testing/asserts.ts", "asserts")
  .replaceAll(
    "https://deno.land/x/combinatorics/mod.ts",
    "combinatorial-generators",
  );

Deno.writeTextFileSync("./npm/README.md", readme);
