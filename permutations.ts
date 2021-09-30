/** Yields successive `r` length permutations of elements in the `iterable`. */
export function* permutations<T>(
  r: number,
  iterable: Iterable<T>,
): Generator<T[]> {
  const pool = [...iterable];
  const n = pool.length;
  if (r < 0 || !Number.isInteger(r)) {
    throw RangeError("r must be a non-negative integer");
  }
  if (r > n) {
    return;
  }
  const indices = Array(n);
  for (let i = 0; i < n; i++) {
    indices[i] = i;
  }
  const cycles = Array(r);
  for (let i = 0; i < r; i++) {
    cycles[i] = n - i;
  }
  yield indices.slice(0, r).map((i) => pool[i]);
  while (n) {
    loop: {
      for (let i = r - 1; i >= 0; i--) {
        cycles[i] -= 1;
        if (cycles[i] === 0) {
          indices.push(indices.splice(i, 1)[0]);
          cycles[i] = n - i;
        } else {
          const j = n - cycles[i];
          [indices[i], indices[j]] = [indices[j], indices[i]];
          yield indices.slice(0, r).map((i) => pool[i]);
          break loop;
        }
      }
      return;
    }
  }
}
