/** Yields successive `r` length permutations of elements in the `iterable`. */
export function* permutations<T>(
  r: number | undefined,
  iterable: Iterable<T>,
): Generator<T[]> {
  const pool: T[] = Array.from(iterable);
  const n: number = pool.length;
  if (r === undefined) {
    r = n;
  } else if (r < 0 || !Number.isInteger(r)) {
    throw RangeError("r must be a non-negative integer");
  } else if (r > n) {
    return;
  }
  let i: number, j: number, index: number;
  let temp: number, cycle: number;
  let result: T[];
  const cycles: number[] = Array(r);
  const indices: Uint32Array = new Uint32Array(n);
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
        cycle = cycles[i] -= 1;
        if (cycle === 0) {
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
