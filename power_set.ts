// This module is browser compatible.

/**
 * The set of all subsets of the given `iterable`. Equivalent to running
 * `combinations` with `0 <= r <= iterable.length` and flattening the results. The
 * first subset is the empty set given when `r = 0`.
 *
 * ```ts
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 * import { powerSet } from "https://deno.land/x/combinatorics/mod.ts";
 *
 * const sequences = [...powerSet([1, 2, 3])];
 *
 * assertEquals(sequences, [
 *   [],
 *   [1],
 *   [2],
 *   [3],
 *   [1, 2],
 *   [1, 3],
 *   [2, 3],
 *   [1, 2, 3],
 * ]);
 * ```
 */
export function* powerSet<T>(iterable: Iterable<T>): Generator<T[]> {
  const pool = Array.from(iterable);
  const n = pool.length;
  const indices = new Uint32Array(n);
  for (let r = 0; r <= n; r++) {
    const result: T[] = Array(r);
    for (let i = 0; i < r; i++) {
      indices[i] = i;
      result[i] = pool[i];
    }
    yield result;
    while (true) {
      let i;
      loop: {
        for (i = r - 1; i >= 0; i--) {
          if (indices[i] !== i + n - r) {
            break loop;
          }
        }
        break;
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
}
