import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.108.0/testing/asserts.ts";
import { combinations } from "./combinations.ts";
import { combinationsWithReplacement } from "./combinations_with_replacement.ts";
import { permutations } from "./permutations.ts";
import { range } from "./_util.ts";

Deno.test("negative r", () => {
  assertThrows(
    () => [...combinations("abc", -1)],
    RangeError,
    "r must be non-negative",
  );
});

Deno.test("n = 0", () => {
  const actual = [...combinations("", 1)];
  assertEquals(actual, []);
});

Deno.test("r = 0", () => {
  const expected = [[]];
  const actual = [...combinations("abc", 0)];
  assertEquals(actual, expected);
});

Deno.test("r = n = 0", () => {
  const expected = [[]];
  const actual = [...combinations("", 0)];
  assertEquals(actual, expected);
});

Deno.test("r > n", () => {
  const expected: Iterable<string[]> = [];
  const actual = [...combinations("abc", 32)];
  assertEquals(actual, expected);
});

Deno.test("r = n", () => {
  const expected = [["a", "b", "c"]];
  const actual = [...combinations("abc", 3)];
  assertEquals(actual, expected);
});

Deno.test("n > r", () => {
  const expected = [
    [0, 1, 2],
    [0, 1, 3],
    [0, 2, 3],
    [1, 2, 3],
  ];
  const actual = [...combinations([0, 1, 2, 3], 3)];
  assertEquals(actual, expected);
});

for (let n = 0; n < 8; n++) {
  const iterable = range(n);
  for (let r = 0; r < 8; r++) {
    Deno.test(`combinations([${iterable}], ${r})`, () => {
      const actual = [...combinations(iterable, r)];
      const expected1 = [...combinations1(iterable, r)];
      const expected2 = [...combinations2(iterable, r)];
      assertEquals(actual, expected1);
      assertEquals(actual, expected2);
    });
  }
}

/** Equivalent to `combinations` for testing. */
export function* combinations1<T>(
  iterable: Iterable<T>,
  r: number,
): Generator<T[]> {
  const pool = [...iterable];
  const n = pool.length;
  for (const indices of permutations(range(n), r)) {
    if (!indices.some((x, i) => indices[i - 1] > x)) {
      yield indices.map((i) => pool[i]);
    }
  }
}

/** Equivalent to `combinations` for testing. */
export function* combinations2<T>(
  iterable: Iterable<T>,
  r: number,
): Generator<T[]> {
  const pool = [...iterable];
  const n = pool.length;
  for (const indices of combinationsWithReplacement(range(n), r)) {
    if (new Set(indices).size === r) {
      yield indices.map((i) => pool[i]);
    }
  }
}
