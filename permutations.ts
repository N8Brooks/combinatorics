/** Yields successive `r` length permutations of elements in the `iterable`. */
export function* permutations<T>(
  r: number | undefined,
  iterable: Iterable<T>,
): Generator<T[]> {
  const pool: T[] = Array.from(iterable);
  const n: number = pool.length;
  r = r === undefined ? n : r;
  if (r < 0 || !Number.isInteger(r)) {
    throw RangeError("r must be a non-negative integer");
  }
  if (r > n) {
    return;
  }
  const cycles: number[] = Array(r);
  const indices: Uint32Array = new Uint32Array(n);
  for (let i = 0; i < r; i++) {
    cycles[i] = n - i;
    indices[i] = i;
  }
  for (let i = r; i < n; i++) {
    indices[i] = i;
  }
  const result = Array(r);
  for (let i = 0; i < r; i++) {
    result[i] = pool[i];
  }
  yield result;
  while (n) {
    loop: {
      for (let i = r - 1; i >= 0; i--) {
        const cycle: number = cycles[i] -= 1;
        if (cycle === 0) {
          let index: number = indices[i];
          for (let j = n - 1; j >= i; j--) {
            const temp = indices[j];
            indices[j] = index;
            index = temp;
          }
          cycles[i] = n - i;
        } else {
          const j = n - cycles[i];
          const temp = indices[j];
          indices[j] = indices[i];
          indices[i] = temp;
          const result = Array(r);
          for (i = 0; i < r; i++) {
            result[i] = pool[indices[i]];
          }
          yield result;
          break loop;
        }
      }
      return;
    }
  }
}
