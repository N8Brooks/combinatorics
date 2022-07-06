import { cartesianProduct } from "./cartesian_product.ts";

Deno.bench("cartesianProduct", () => {
  for (const _ of cartesianProduct(...Array(6).fill(Array(12))));
});
