import { range } from "./_util.ts";

/** Yields `r` length subsequences of elements from the input `iterable`. */
export function* combinations<T>(
  r: number,
  iterable: Iterable<T>,
): Generator<T[]> {
  if (r < 0) {
    throw RangeError("r must be non-negative");
  }
  const pool = [...iterable];
  const n = pool.length;
  if (r > n) {
    return;
  }
  const indices = range(r);
  yield indices.map((i) => pool[i]);
  while (true) {
    let i = r - 1;
    loop: {
      for (; i >= 0; i--) {
        if (indices[i] !== i + n - r) {
          break loop;
        }
      }
      return;
    }
    indices[i]++;
    for (let j = i + 1; j < r; j++) {
      indices[j] = indices[j - 1] + 1;
    }
    yield indices.map((i) => pool[i]);
  }
}
