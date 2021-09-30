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
  if (pools.some(({ length }) => length === 0)) {
    return;
  }
  const indices = Array(n).fill(0);
  yield indices.map((i, pool) => pools[pool][i]);
  while (true) {
    loop: {
      for (let i = n - 1; i >= 0; i--) {
        if (indices[i] === pools[i].length - 1) {
          continue;
        }
        indices[i]++;
        indices.fill(0, i + 1);
        yield indices.map((i, pool) => pools[pool][i]);
        break loop;
      }
      return;
    }
  }
}
