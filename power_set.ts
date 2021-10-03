/** Yields every subset of elements from `iterable`. */
export function* powerSet<T>(iterable: Iterable<T>): Generator<T[]> {
  let i: number, j: number, index: number, result: T[];
  const pool: T[] = Array.from(iterable);
  const n: number = pool.length;
  const indices: Uint32Array = new Uint32Array(n);
  for (let r = 0; r <= n; r++) {
    result = Array(r);
    for (i = 0; i < r; i++) {
      indices[i] = i;
      result[i] = pool[i];
    }
    yield result;
    while (true) {
      loop: {
        for (i = r - 1; i >= 0; i--) {
          if (indices[i] !== i + n - r) {
            break loop;
          }
        }
        break;
      }
      result = Array(r);
      for (j = 0; j < i; j++) {
        result[j] = pool[indices[j]];
      }
      index = indices[i] += 1;
      result[i] = pool[index];
      for (j = i + 1; j < r; j++) {
        indices[j] = index += 1;
        result[j] = pool[index];
      }
      yield result;
    }
  }
}
