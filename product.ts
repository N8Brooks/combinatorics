/** Cartesian product of input `iterables` repeated `r` times. */
export function* product<T>(
  r: number,
  ...iterables: Iterable<T>[]
): Generator<T[]> {
  if (r < 0 || !Number.isInteger(r)) {
    throw RangeError("r must be a non-negative integer");
  }
  const pools: T[][] = Array(r)
    .fill(iterables.map((iterable) => [...iterable]))
    .flat();
  const n = pools.length;
  if (n === 0) {
    yield [];
    return;
  }
  if (pools.some((pool) => pool.length === 0)) {
    return;
  }
  const indices = new Uint32Array(n);
  yield pools.map((pool) => pool[0]);
  while (true) {
    let i;
    loop: {
      for (i = n - 1; i >= 0; i--) {
        if (indices[i] === pools[i].length - 1) {
          continue;
        }
        const result: T[] = Array(n);
        for (let j = 0; j < i; j++) {
          result[j] = pools[j][indices[j]];
        }
        const index = indices[i] += 1;
        result[i] = pools[i][index];
        for (let j = i + 1; j < n; j++) {
          indices[j] = 0;
          result[j] = pools[j][0];
        }
        yield result;
        break loop;
      }
      return;
    }
  }
}
