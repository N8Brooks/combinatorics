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
  let i, j, index, result;
  const ns = new Uint32Array(n);
  result = Array(n);
  for (i = 0; i < n; i++) {
    const pool = pools[i];
    const { length } = pool;
    if (length === 0) {
      return;
    }
    result[i] = pool[0];
    ns[i] = length - 1;
  }
  yield result;
  const indices = new Uint32Array(n);
  while (true) {
    loop: {
      for (i = n - 1; i >= 0; i--) {
        if (indices[i] === ns[i]) {
          continue;
        }
        result = Array(n);
        for (j = 0; j < i; j++) {
          result[j] = pools[j][indices[j]];
        }
        index = indices[i] += 1;
        result[i] = pools[i][index];
        for (j = i + 1; j < n; j++) {
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
