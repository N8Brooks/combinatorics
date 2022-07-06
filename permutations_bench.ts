import { permutations } from "./permutations.ts";

Deno.bench("n = 10 r = 8", () => {
  for (const _ of permutations(Array(10), 8));
});
