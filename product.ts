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
  let i: number, j: number;
  let length: number, index: number;
  let pool: T[], result: T[];
  result = Array(n);
  for (i = 0; i < k; i++) {
    pool = Array.from(iterables[i]);
    length = pool.length;
    if (length === 0) {
      return;
    }
    for (j = i; j < n; j += k) {
      pools[j] = pool;
      ns[j] = length - 1;
      result[j] = pool[0];
    }
  }
  yield result;
  const indices: Uint32Array = new Uint32Array(n);
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
