import { combinations } from "./combinations.ts";

// TODO(N8Brooks): Replace calls to `combinations` with TypeScript to prevent repeated work.

/** Yields all successive subsets of input `iterable`. */
export function* powerSet<T>(iterable: Iterable<T>): Generator<T[]> {
  const pool = [...iterable];
  const n = pool.length;
  for (let r = 0; r <= n; r++) {
    yield* combinations(pool, r);
  }
}
