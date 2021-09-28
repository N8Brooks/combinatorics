/** Cartesian product of input `iterables`. */
export function* product<T>(...iterables: Iterable<T>[]): Generator<T[]> {
  const pools = iterables.map((iterable) => [...iterable]);
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
    any: {
      for (let i = n - 1; i >= 0; i--) {
        if (indices[i] === pools[i].length - 1) {
          continue;
        }
        indices[i]++;
        indices.fill(0, i + 1, n);
        yield indices.map((i, pool) => pools[pool][i]);
        break any;
      }
      return;
    }
  }
}
