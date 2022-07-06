import { combinationsWithReplacement } from "./combinations_with_replacement.ts";

Deno.bench("combinationsWithReplacement", () => {
  for (const _ of combinationsWithReplacement(Array(14), 11));
});
