import { permutationsWithReplacement } from "./permutations_with_replacement.ts";

Deno.bench("n = 12 r = 6", () => {
  for (const _ of permutationsWithReplacement(Array(12), 6));
});
