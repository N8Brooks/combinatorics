/** Yields `r` length subsequences of elements from the input `iterable` allowing repetition. */
export function* combinationsWithReplacement<T>(
  r: number,
  iterable: Iterable<T>,
): Generator<T[]> {
  if (r < 0 || !Number.isInteger(r)) {
    throw RangeError("r must be a non-negative integer");
  }
  const pool = [...iterable];
  const n = pool.length;
  if (n === 0 && r > 0) {
    return;
  }
  const indices = new Uint32Array(r);
  yield Array(r).fill(pool[0]);
  while (true) {
    let i = r - 1;
    loop: {
      for (; i >= 0; i--) {
        if (indices[i] !== n - 1) {
          break loop;
        }
      }
      return;
    }
    indices.fill(indices[i] + 1, i);
    const result = Array(r);
    for (i = 0; i < r; i++) {
      result[i] = pool[indices[i]];
    }
    yield result;
  }
}
