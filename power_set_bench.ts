import { powerSet } from "./power_set.ts";

Deno.bench("powerSet", () => {
  for (const _ of powerSet(Array(21)));
});
