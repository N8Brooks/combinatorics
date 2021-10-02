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
  const ns = new Uint32Array(n);
  const result = Array(n);
  for (let i = 0; i < n; i++) {
    const pool = pools[i];
    const { length } = pool;
    if (length === 0) {
      return;
    }
    result[i] = pool[0];
    ns[i] = length - 1;
  }
  yield result;
  const indices = new Uint32Array(n).fill(0);
  while (true) {
    loop: {
      for (let i = n - 1; i >= 0; i--) {
        if (indices[i] === ns[i]) {
          continue;
        }
        indices[i] += 1;
        indices.fill(0, i + 1);
        const result = Array(n);
        for (let j = 0; j < n; j++) {
          result[j] = pools[j][indices[j]];
        }
        yield result;
        break loop;
      }
      return;
    }
  }
}
