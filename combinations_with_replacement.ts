/** Yields `r` length subsequences of elements from the input `iterable` allowing replacement. */
export function* combinationsWithReplacement<T>(
  r: number,
  iterable: Iterable<T>,
): Generator<T[]> {
  if (r < 0 || !Number.isInteger(r)) {
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
