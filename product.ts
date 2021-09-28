/** Cartesian product of input `iterables` repeated `repeat` times. */
export function* product<T>(
  iterables: Iterable<T>[],
  repeat = 1,
): Generator<T[]> {
  if (repeat < 0) {
    throw RangeError("repeat parameter cannot be negative");
  }
  const pools: T[][] = Array(repeat).fill(
    iterables.map((iterable) => [...iterable]),
  ).flat();
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
