// This module is browser compatible.

/**
 * Yields `r` length `Arrays` from the input `iterable`. Order of selection is not
 * important and elements are chosen with replacement.
 *
 * ```ts
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 * import { combinationsWithReplacement } from "https://deno.land/x/combinatorics/mod.ts";
 *
 * const sequences = [...combinationsWithReplacement([1, 2, 3, 4], 2)];
 *
 * assertEquals(sequences, [
 *   [1, 1],
 *   [1, 2],
 *   [1, 3],
 *   [1, 4],
 *   [2, 2],
 *   [2, 3],
 *   [2, 4],
 *   [3, 3],
 *   [3, 4],
 *   [4, 4],
 * ]);
 * ```
 */
export function* combinationsWithReplacement<T>(
  iterable: Iterable<T>,
  r: number,
): Generator<T[]> {
  if (!Number.isInteger(r) || r < 0) {
    throw RangeError("r must be a non-negative integer");
  }
  const pool = Array.from(iterable);
  const n = pool.length;
  if (n === 0 && r > 0) {
    return;
  }
  const indices = new Uint32Array(r);
  yield Array(r).fill(pool[0]);
  while (true) {
    let i: number;
    loop: {
      for (i = r - 1; i >= 0; i--) {
        if (indices[i] !== n - 1) {
          break loop;
        }
      }
      return;
    }
    const result: T[] = Array(r);
    for (let j = 0; j < i; j++) {
      result[j] = pool[indices[j]];
    }
    const index = indices[i] + 1;
    const element = pool[index];
    for (let j = i; j < r; j++) {
      indices[j] = index;
      result[j] = element;
    }
    yield result;
  }
}
