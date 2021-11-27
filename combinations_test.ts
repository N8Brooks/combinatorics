import {
  assertEquals,
  assertStrictEquals,
  assertThrows,
} from "https://deno.land/std@0.113.0/testing/asserts.ts";
import { combinations } from "./combinations.ts";
import { combinationsWithReplacement } from "./combinations_with_replacement.ts";
import { permutations } from "./permutations.ts";
import { factorial, range } from "./_util.ts";

Deno.test("r = NaN", () => {
  assertThrows(
    () => [...combinations("abc", NaN)],
    RangeError,
    "r must be a non-negative integer",
  );
});

Deno.test("r = Infinity", () => {
  assertThrows(
    () => [...combinations("abc", Infinity)],
    RangeError,
    "r must be a non-negative integer",
  );
});

Deno.test("r = Math.PI", () => {
  assertThrows(
    () => [...combinations("abc", Math.PI)],
    RangeError,
    "r must be a non-negative integer",
  );
});

Deno.test("r = -1", () => {
  assertThrows(
    () => [...combinations("abc", -1)],
    RangeError,
    "r must be a non-negative integer",
  );
});

Deno.test("n = r = 0", () => {
  const actual = [...combinations("", 0)];
  const expected = [[]];
  assertEquals(actual, expected);
});

Deno.test("r = 0", () => {
  const actual = [...combinations("abc", 0)];
  const expected = [[]];
  assertEquals(actual, expected);
});

Deno.test("n = 0", () => {
  const actual = [...combinations("", 1)];
  assertEquals(actual, []);
});

Deno.test("r > n", () => {
  const actual = [...combinations("abc", 32)];
  assertEquals(actual, []);
});

Deno.test("n = r", () => {
  const actual = [...combinations("abc", 3)];
  const expected = [["a", "b", "c"]];
  assertEquals(actual, expected);
});

Deno.test("r < n", () => {
  const actual = [...combinations([0, 1, 2, 3], 3)];
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
    Deno.test(`comb(${n}, ${r})`, () => {
      const actual = [...combinations(iterable, r)];
      const expectedLength = comb(n, r);
      assertStrictEquals(actual.length, expectedLength);
    });
  }
}

for (let n = 0; n < 8; n++) {
  const iterable = range(n);
  for (let r = 0; r < 8; r++) {
    Deno.test(`combinations1([${iterable}], ${r})`, () => {
      const actual = [...combinations(iterable, r)];
      const expected1 = [...combinations1(iterable, r)];
      assertEquals(actual, expected1);
    });
  }
}

for (let n = 0; n < 8; n++) {
  const iterable = range(n);
  for (let r = 0; r < 8; r++) {
    Deno.test(`combinations2([${iterable}], ${r})`, () => {
      const actual = [...combinations(iterable, r)];
      const expected2 = [...combinations2(iterable, r)];
      assertEquals(actual, expected2);
    });
  }
}

/** Return the number of ways to choose `r` items from `n` items without replacement and without order. */
function comb(n: number, r: number): number {
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
