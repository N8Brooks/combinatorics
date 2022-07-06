import { combinationsWithReplacement } from "./combinations_with_replacement.ts";

Deno.bench("combinations", () => {
  for (const _ of combinationsWithReplacement(Array(14), 11));
});
