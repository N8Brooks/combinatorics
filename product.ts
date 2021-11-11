// This module is browser compatible.

/**
 *  * Yields `r * iterables.length` length `Arrays` from the input `iterables`
 * repeated `r` times. Order of selection is important and elements are chosen with
 * replacement.
 *
 * When `iterables.length === 1` the output is equivalent to the permutations with
 * replacement of `iterables[0]` with the given `r`.
 *
 * <!-- deno-fmt-ignore -->
 * ```ts
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 * import { product } from "https://deno.land/x/combinatorics/mod.ts";
 *
 * const sequences = [...product(2, [1, 2, 3, 4])];
 *
 * assertEquals(sequences, [
 *   [1, 1], [1, 2], [1, 3], [1, 4],
 *   [2, 1], [2, 2], [2, 3], [2, 4],
 *   [3, 1], [3, 2], [3, 3], [3, 4],
 *   [4, 1], [4, 2], [4, 3], [4, 4],
 * ]);
 * ```
 *
 * When `iterables.length > 1` the output is equivalent to the cartesian product of
 * the `iterables` repeated `r` times. This can also be explained as running nested
 * `for...of` loops using one of the inputs to provide the element at each index
 * for the yielded `Array`.
 *
 * <!-- deno-fmt-ignore -->
 * ```ts
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 * import { product } from "https://deno.land/x/combinatorics/mod.ts";
 *
 * const sequences = [...product(1, [1, 2, 3], [4, 5, 6], [7, 8, 9])];
 *
 * assertEquals(sequences, [
 *   [1, 4, 7], [1, 4, 8], [1, 4, 9],
 *   [1, 5, 7], [1, 5, 8], [1, 5, 9],
 *   [1, 6, 7], [1, 6, 8], [1, 6, 9],
 *   [2, 4, 7], [2, 4, 8], [2, 4, 9],
 *   [2, 5, 7], [2, 5, 8], [2, 5, 9],
 *   [2, 6, 7], [2, 6, 8], [2, 6, 9],
 *   [3, 4, 7], [3, 4, 8], [3, 4, 9],
 *   [3, 5, 7], [3, 5, 8], [3, 5, 9],
 *   [3, 6, 7], [3, 6, 8], [3, 6, 9],
 * ]);
 * ```
 */
export function* product<T>(
  r: number,
  ...iterables: Iterable<T>[]
): Generator<T[]> {
  if (r < 0 || !Number.isInteger(r)) {
    throw RangeError("r must be a non-negative integer");
  }
  const pool = iterables.map((iterable) => [...iterable]);
  const pools = [];
  for (let i = 0; i < r; i++) {
    pools.push(...pool);
  }
  const n = pools.length;
  if (n === 0) {
    yield [];
    return;
  }
  if (pools.some((pool) => pool.length === 0)) {
    return;
  }
  const indices = new Uint32Array(n);
  yield pools.map((pool) => pool[0]);
  while (true) {
    let i;
    loop: {
      for (i = n - 1; i >= 0; i--) {
        if (indices[i] === pools[i].length - 1) {
          continue;
        }
        const result: T[] = Array(n);
        for (let j = 0; j < i; j++) {
          result[j] = pools[j][indices[j]];
        }
        const index = indices[i] += 1;
        result[i] = pools[i][index];
        for (let j = i + 1; j < n; j++) {
          indices[j] = 0;
          result[j] = pools[j][0];
        }
        yield result;
        break loop;
      }
      return;
    }
  }
}
