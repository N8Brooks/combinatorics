/** Cartesian product of input `iterables` repeated `r` times. */
export function* product<T>(
  r: number,
  ...iterables: Iterable<T>[]
): Generator<T[]> {
  if (r < 0 || !Number.isInteger(r)) {
    throw RangeError("r must be a non-negative integer");
  }
  const k: number = iterables.length;
  const n: number = r * k;
  if (n === 0) {
    yield [];
    return;
  }
  const pools: T[][] = Array(n);
  const ns: Uint32Array = new Uint32Array(n);
  const result: T[] = Array(n);
  for (let i = 0; i < k; i++) {
    const pool = Array.from(iterables[i]);
    const length = pool.length;
    if (length === 0) {
      return;
    }
    for (let j = i; j < n; j += k) {
      pools[j] = pool;
      ns[j] = length - 1;
      result[j] = pool[0];
    }
  }
  yield result;
  const indices: Uint32Array = new Uint32Array(n);
  while (true) {
    loop: {
      for (let i = n - 1; i >= 0; i--) {
        if (indices[i] === ns[i]) {
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
