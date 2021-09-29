/** Yields `r` length subsequences of elements from the input `iterable` allowing repetition. */
export function* combinationsWithReplacement<T>(
  r: number,
  iterable: Iterable<T>,
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
    loop: {
      for (; i >= 0; i--) {
        if (indices[i] !== n - 1) {
          break loop;
        }
      }
      return;
    }
    indices.fill(indices[i] + 1, i);
    yield indices.map((i) => pool[i]);
  }
}
