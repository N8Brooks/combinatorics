/** Cartesian product of input `iterables` repeated `r` times. */
export function* product<T>(
  r: number,
  ...iterables: Iterable<T>[]
): Generator<T[]> {
  if (r < 0 || !Number.isInteger(r)) {
    throw RangeError("r must be a non-negative integer");
  }
  const k = iterables.length;
  const n = r * k;
  if (n === 0) {
    yield [];
    return;
  }
  const pools = Array(n);
  const ns = new Uint32Array(n);
  let i, j, pool, length, index, result;
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
