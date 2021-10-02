/** Yields `r` length subsequences of elements from the input `iterable`. */
export function* combinations<T>(
  r: number,
  iterable: Iterable<T>,
): Generator<T[]> {
  if (r < 0 || !Number.isInteger(r)) {
    throw RangeError("r must be a non-negative integer");
  }
  const pool = [...iterable];
  const n = pool.length;
  if (r > n) {
    return;
  }
  const indices = new Uint32Array(r);
  let i, j, index, result;
  for (i = 0; i < r; i++) {
    indices[i] = i;
  }
  yield pool.slice(0, r);
  while (true) {
    loop: {
      for (i = r - 1; i >= 0; i--) {
        if (indices[i] !== i + n - r) {
          break loop;
        }
      }
      return;
    }
    result = Array(r);
    for (j = 0; j < i; j++) {
      result[j] = pool[indices[j]];
    }
    index = indices[i] += 1;
    result[i] = pool[index];
    for (j = i + 1; j < r; j++) {
      indices[j] = index += 1;
      result[j] = pool[index];
    }
    yield result;
  }
}
