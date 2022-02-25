// This module is browser compatible.

/**
 * Roughly equivalent to running nested `for...of` loops using one of the inputs to
 * provide the element at each index for the yielded `Array`.
 *
 * ```ts
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 * import { cartesianProduct } from "https://deno.land/x/combinatorics/mod.ts";
 *
 * const sequences = [...cartesianProduct([1, 2, 3], [4, 5, 6], [7, 8, 9])];
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
export function* cartesianProduct<T extends unknown[]>(
  ...iterables: { [K in keyof T]: Iterable<T[K]> }
): Generator<T> {
  const pools = iterables.map((iterable) => [...iterable]);
  const n = pools.length;
  if (n === 0) {
    yield [] as unknown as T;
    return;
  }
  if (pools.some((pool) => pool.length === 0)) {
    return;
  }
  const indices = new Uint32Array(n);
  yield pools.map((pool) => pool[0]) as T;
  while (true) {
    loop: {
      for (let i = n - 1; i >= 0; i--) {
        if (indices[i] === pools[i].length - 1) {
          continue;
        }
        const result = Array(n);
        for (let j = 0; j < i; j++) {
          result[j] = pools[j][indices[j]];
        }
        const index = indices[i] += 1;
        result[i] = pools[i][index];
        for (let j = i + 1; j < n; j++) {
          indices[j] = 0;
          result[j] = pools[j][0];
        }
        yield result as T;
        break loop;
      }
      return;
    }
  }
}
