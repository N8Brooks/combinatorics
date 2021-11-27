// This module is browser compatible.

/**
 * Yields `r` length `Arrays` from the input `iterable`. Order of selection is
 * important and elements are chosen with replacement.
 *
 * ```ts
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 * import { permutationsWithReplacement } from "https://deno.land/x/combinatorics/mod.ts";
 *
 * const sequences = [...permutationsWithReplacement([1, 2, 3, 4], 2)];
 *
 * assertEquals(sequences, [
 *   [1, 1], [1, 2], [1, 3], [1, 4],
 *   [2, 1], [2, 2], [2, 3], [2, 4],
 *   [3, 1], [3, 2], [3, 3], [3, 4],
 *   [4, 1], [4, 2], [4, 3], [4, 4],
 * ]);
 * ```
 */
export function* permutationsWithReplacement<T>(
  iterable: Iterable<T>,
  r: number,
): Generator<T[]> {
  if (r < 0 || !Number.isInteger(r)) {
    throw RangeError("r must be a non-negative integer");
  }
  const pool = Array.from(iterable);
  const n = pool.length;
  if (r === 0) {
    yield [];
    return;
  }
  if (n === 0 && r > 0) {
    return;
  }
  const indices = new Uint32Array(r);
  yield Array(r).fill(pool[0]);
  while (true) {
    let i: number;
    loop: {
      for (i = r - 1; i >= 0; i--) {
        if (indices[i] === n - 1) {
          continue;
        }
        const result: T[] = Array(r);
        for (let j = 0; j < i; j++) {
          result[j] = pool[indices[j]];
        }
        const index = indices[i] += 1;
        result[i] = pool[index];
        for (let j = i + 1; j < r; j++) {
          indices[j] = 0;
          result[j] = pool[0];
        }
        yield result;
        break loop;
      }
      return;
    }
  }
}
