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
  const indices = new Uint32Array(n);
  for (let i = 0; i < n; i++) {
    indices[i] = i;
  }
  const cycles = Array(r);
  for (let i = 0; i < r; i++) {
    cycles[i] = n - i;
  }
  yield pool.slice(0, r);
  while (n) {
    loop: {
      for (let i = r - 1; i >= 0; i--) {
        cycles[i] -= 1;
        if (cycles[i] === 0) {
          const index = indices[i];
          indices.copyWithin(i, i + 1);
          indices[n - 1] = index;
          cycles[i] = n - i;
        } else {
          const j = n - cycles[i];
          [indices[i], indices[j]] = [indices[j], indices[i]];
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
