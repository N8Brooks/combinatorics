/** Yields `r` length subsequences of elements from the input `iterable`. */
export function* combinations<T>(
  r: number,
  iterable: Iterable<T>,
): Generator<T[]> {
  if (r < 0 || !Number.isInteger(r)) {
    throw RangeError("r must be a non-negative integer");
  }
  const pool: T[] = Array.from(iterable);
  const n: number = pool.length;
  if (r > n) {
    return;
  }
  const indices: Uint32Array = new Uint32Array(r);
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
      return;
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
