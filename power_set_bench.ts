import { powerSet } from "./power_set.ts";

Deno.bench("n = 21", () => {
  for (const _ of powerSet(Array(21)));
});
