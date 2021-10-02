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
  let i, j, index, element, result;
  const indices = new Uint32Array(r);
  result = Array(r);
  element = pool[0];
  for (i = 0; i < r; i++) {
    result[i] = element;
  }
  yield result;
  while (true) {
    loop: {
      for (i = r - 1; i >= 0; i--) {
        if (indices[i] !== n - 1) {
          break loop;
        }
      }
      return;
    }
    result = Array(r);
    for (j = 0; j < i; j++) {
      result[j] = pool[indices[j]];
    }
    index = indices[i] + 1;
    element = pool[index];
    for (; j < r; j++) {
      indices[j] = index;
      result[j] = element;
    }
    yield result;
  }
}
