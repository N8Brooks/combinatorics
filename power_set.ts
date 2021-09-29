import { range } from "./_util.ts";

/** Yields all successive subsets of input `iterable`. */
export function* powerSet<T>(iterable: Iterable<T>): Generator<T[]> {
  const pool = [...iterable];
  const n = pool.length;
  for (let r = 0; r <= n; r++) {
    const indices = range(r);
    yield indices.map((i) => pool[i]);
    while (true) {
      let i = r - 1;
      loop: {
        for (; i >= 0; i--) {
          if (indices[i] !== i + n - r) {
            break loop;
          }
        }
        break;
      }
      indices[i]++;
      for (let j = i + 1; j < r; j++) {
        indices[j] = indices[j - 1] + 1;
      }
      yield indices.map((i) => pool[i]);
    }
  }
}
