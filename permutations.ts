/** Yields successive `r` length permutations of elements in the `iterable`. */
export function* permutations<T>(
  r: number | undefined,
  iterable: Iterable<T>,
): Generator<T[]> {
  const pool = [...iterable];
  const n = pool.length;
  r = r === undefined ? n : r;
  if (r < 0 || !Number.isInteger(r)) {
    throw RangeError("r must be a non-negative integer");
  }
  if (r > n) {
    return;
  }
  let i, j, temp, index, result;
  const cycles = Array(r);
  const indices = new Uint32Array(n);
  for (i = 0; i < r; i++) {
    cycles[i] = n - i;
    indices[i] = i;
  }
  for (; i < n; i++) {
    indices[i] = i;
  }
  result = Array(r);
  for (i = 0; i < r; i++) {
    result[i] = pool[i];
  }
  yield result;
  while (n) {
    loop: {
      for (i = r - 1; i >= 0; i--) {
        cycles[i] -= 1;
        if (cycles[i] === 0) {
          index = indices[i];
          for (j = n - 1; j >= i; j--) {
            temp = indices[j];
            indices[j] = index;
            index = temp;
          }
          cycles[i] = n - i;
        } else {
          j = n - cycles[i];
          temp = indices[j];
          indices[j] = indices[i];
          indices[i] = temp;
          result = Array(r);
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
