// This module is browser compatible.

/**
 * Yields `r` length `Arrays` from the input `iterable`. Order of selection does
 * not matter and elements are chosen without replacement.
 *
 * ```ts
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 * import { combinations } from "https://deno.land/x/combinatorics/mod.ts";
 *
 * const sequences = [...combinations([1, 2, 3, 4], 2)];
 *
 * assertEquals(sequences, [
 *   [1, 2],
 *   [1, 3],
 *   [1, 4],
 *   [2, 3],
 *   [2, 4],
 *   [3, 4],
 * ]);
 * ```
 */
export function* combinations<T>(
  iterable: Iterable<T>,
  r: number,
): Generator<T[]> {
  if (!Number.isInteger(r) || r < 0) {
    throw RangeError("r must be a non-negative integer");
  }
  const pool = [...iterable];
  const n = pool.length;
  if (r > n) {
    return;
  }
  const indices = new Uint32Array(r).map((_, index) => index);
  yield pool.slice(0, r);
  while (true) {
    let i: number;
    loop: {
      for (i = r - 1; i >= 0; i--) {
        if (indices[i] !== i + n - r) {
          break loop;
        }
      }
      return;
    }
    const result: T[] = Array(r);
    for (let j = 0; j < i; j++) {
      result[j] = pool[indices[j]];
    }
    let index = indices[i] += 1;
    result[i] = pool[index];
    for (let j = i + 1; j < r; j++) {
      indices[j] = index += 1;
      result[j] = pool[index];
    }
    yield result;
  }
}
