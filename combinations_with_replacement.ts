/** Yields `r` length subsequences of elements from the input `iterable` allowing repetition. */
export function* combinationsWithReplacement<T>(
  iterable: Iterable<T>,
  r: number,
): Generator<T[]> {
  if (r < 0) {
    throw RangeError("r must be non-negative");
  }
  const pool = [...iterable];
  const n = pool.length;
  if (n === 0 && r > 0) {
    return;
  }
  const indices = Array(r).fill(0);
  yield indices.map((i) => pool[i]);
  while (true) {
    let i = r - 1;
    any: {
      for (; i >= 0; i--) {
        if (indices[i] !== n - 1) {
          break any;
        }
      }
      return;
    }
    indices.fill(indices[i] + 1, i);
    yield indices.map((i) => pool[i]);
  }
}
