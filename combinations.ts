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
  for (let i = 0; i < r; i++) {
    indices[i] = i;
  }
  yield pool.slice(0, r);
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
    let index = indices[i] += 1;
    for (i += 1; i < r; i++) {
      indices[i] = index += 1;
    }
    const result = Array(r);
    for (i = 0; i < r; i++) {
      result[i] = pool[indices[i]];
    }
    yield result;
  }
}
