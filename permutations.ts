// This module is browser compatible.

/**
 * Yields `r` length `Arrays` from the input `iterable`. Order of selection is
 * important and elements are chosen without replacement. If `r` is undefined, then
 * the length of the `iterable` is used.
 *
 * ```ts
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 * import { permutations } from "https://deno.land/x/combinatorics/mod.ts";
 *
 * const sequences = [...permutations([1, 2, 3, 4], 2)];
 *
 * assertEquals(sequences, [
 *   [1, 2], [1, 3], [1, 4],
 *   [2, 1], [2, 3], [2, 4],
 *   [3, 1], [3, 2], [3, 4],
 *   [4, 1], [4, 2], [4, 3],
 * ]);
 * ```
 */
export function* permutations<T>(
  iterable: Iterable<T>,
  r?: number,
): Generator<T[]> {
  const pool = Array.from(iterable);
  const n = pool.length;
  if (r === undefined) {
    r = n;
  } else if (!Number.isInteger(r) || r < 0) {
    throw RangeError("r must be a non-negative integer");
  } else if (r > n) {
    return;
  }
  const cycles = Array(r).fill(0).map((_, index) => n - index);
  const indices = new Uint32Array(n).map((_, index) => index);
  yield pool.slice(0, r);
  while (true) {
    loop: {
      for (let i = r - 1; i >= 0; i--) {
        cycles[i] -= 1;
        if (cycles[i] === 0) {
          let index = indices[i];
          for (let j = n - 1; j >= i; j--) {
            const temp = index;
            index = indices[j];
            indices[j] = temp;
          }
          cycles[i] = n - i;
        } else {
          const j = n - cycles[i];
          const temp = indices[i];
          indices[i] = indices[j];
          indices[j] = temp;
          const result = Array(r);
          for (i = 0; i < r; i++) {
            result[i] = pool[indices[i]];
          }
          yield result;
          break loop;
        }
      }
      return;
    }
  }
}
