import { combinationsWithReplacement } from "./combinations_with_replacement.ts";

Deno.bench("n = 14 r = 11", () => {
  for (const _ of combinationsWithReplacement(Array(14), 11));
});
