import {
  assertEquals,
  assertStrictEquals,
  assertThrows,
} from "https://deno.land/std@0.108.0/testing/asserts.ts";
import { combinations } from "./combinations.ts";
import { combinationsWithReplacement } from "./combinations_with_replacement.ts";
import { permutations } from "./permutations.ts";
import { factorial, range } from "./_util.ts";

Deno.test("r = NaN", () => {
  assertThrows(
    () => [...combinations(NaN, "abc")],
    RangeError,
    "r must be a non-negative integer",
  );
});

Deno.test("r = Infinity", () => {
  assertThrows(
    () => [...combinations(Infinity, "abc")],
    RangeError,
    "r must be a non-negative integer",
  );
});

Deno.test("r = Math.PI", () => {
  assertThrows(
    () => [...combinations(Math.PI, "abc")],
    RangeError,
    "r must be a non-negative integer",
  );
});

Deno.test("r = -1", () => {
  assertThrows(
    () => [...combinations(-1, "abc")],
    RangeError,
    "r must be a non-negative integer",
  );
});

Deno.test("r = n = 0", () => {
  const actual = [...combinations(0, "")];
  const expected = [[]];
  assertEquals(actual, expected);
});

Deno.test("r = 0", () => {
  const actual = [...combinations(0, "abc")];
  const expected = [[]];
  assertEquals(actual, expected);
});

Deno.test("n = 0", () => {
  const actual = [...combinations(1, "")];
  assertEquals(actual, []);
});

Deno.test("r > n", () => {
  const actual = [...combinations(32, "abc")];
  assertEquals(actual, []);
});

Deno.test("r = n", () => {
  const actual = [...combinations(3, "abc")];
  const expected = [["a", "b", "c"]];
  assertEquals(actual, expected);
});

Deno.test("r < n", () => {
  const actual = [...combinations(3, [0, 1, 2, 3])];
  const expected = [
    [0, 1, 2],
    [0, 1, 3],
    [0, 2, 3],
    [1, 2, 3],
  ];
  assertEquals(actual, expected);
});

for (let n = 0; n < 8; n++) {
  const iterable = range(n);
  for (let r = 0; r < 8; r++) {
    Deno.test(`combinations([${iterable}], ${r})`, () => {
      const actual = [...combinations(r, iterable)];
      const expected1 = [...combinations1(r, iterable)];
      assertEquals(actual, expected1);
      const expected2 = [...combinations2(r, iterable)];
      assertEquals(actual, expected2);
      const expectedLength = comb(r, n);
      assertStrictEquals(actual.length, expectedLength);
    });
  }
}

/** Return the number of ways to choose `r` items from `n` items without replacement and without order. */
function comb(r: number, n: number): number {
  if (n < 0 || !Number.isInteger(n)) {
    throw RangeError("n must be a non-negative integer");
  } else if (r < 0 || !Number.isInteger(r)) {
    throw RangeError("r must be a non-negative integer");
  } else if (r <= n) {
    return factorial(n) / (factorial(r) * factorial(n - r));
  } else {
    return 0;
  }
}

/** Equivalent to `combinations` for testing. */
export function* combinations1<T>(
  r: number,
  iterable: Iterable<T>,
): Generator<T[]> {
  const pool = [...iterable];
  const n = pool.length;
  for (const indices of permutations(r, range(n))) {
    if (!indices.some((x, i) => indices[i - 1] > x)) {
      yield indices.map((i) => pool[i]);
    }
  }
}

/** Equivalent to `combinations` for testing. */
export function* combinations2<T>(
  r: number,
  iterable: Iterable<T>,
): Generator<T[]> {
  const pool = [...iterable];
  const n = pool.length;
  for (const indices of combinationsWithReplacement(r, range(n))) {
    if (new Set(indices).size === r) {
      yield indices.map((i) => pool[i]);
    }
  }
}
