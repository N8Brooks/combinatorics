import { cartesianProduct } from "./cartesian_product.ts";

Deno.bench("n = 6 with pools of length 12", () => {
  for (const _ of cartesianProduct(...Array(6).fill(Array(12))));
});
