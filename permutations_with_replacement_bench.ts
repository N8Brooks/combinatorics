import { permutationsWithReplacement } from "./permutations_with_replacement.ts";

Deno.bench("permutationsWithReplacement", () => {
  for (const _ of permutationsWithReplacement(Array(12), 6));
});
