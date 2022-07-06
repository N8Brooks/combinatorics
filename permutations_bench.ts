import { permutations } from "./permutations.ts";

Deno.bench("permutations", () => {
  for (const _ of permutations(Array(10), 8));
});
