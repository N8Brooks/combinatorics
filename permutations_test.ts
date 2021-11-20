import {
  assertEquals,
  assertStrictEquals,
  assertThrows,
} from "https://deno.land/std@0.113.0/testing/asserts.ts";
import { permutations } from "./permutations.ts";
import { product } from "./product.ts";
import { factorial, range } from "./_util.ts";

Deno.test("r = NaN", () => {
  assertThrows(
    () => [...permutations("abc", NaN)],
    RangeError,
    "r must be a non-negative integer",
  );
});

Deno.test("r = Infinity", () => {
  assertThrows(
    () => [...permutations("abc", Infinity)],
    RangeError,
    "r must be a non-negative integer",
  );
});

Deno.test("r = Math.PI", () => {
  assertThrows(
    () => [...permutations("abc", Math.PI)],
    RangeError,
    "r must be a non-negative integer",
  );
});

Deno.test("r = -1", () => {
  assertThrows(
    () => [...permutations("abc", -1)],
    RangeError,
    "r must be a non-negative integer",
  );
});

Deno.test("n = r = 0", () => {
  const actual = [...permutations("", 0)];
  const expected = [[]];
  assertEquals(actual, expected);
});

Deno.test("r = 0", () => {
  const actual = [...permutations("abc", 0)];
  const expected = [[]];
  assertEquals(actual, expected);
});

Deno.test("n = 0", () => {
  const actual = [...permutations("", 1)];
  assertEquals(actual, []);
});

Deno.test("r > n", () => {
  const actual = [...permutations("abc", 4)];
  const expected: Iterable<string[]> = [];
  assertEquals(actual, expected);
});

Deno.test("n = r", () => {
  const actual = [...permutations("abc", 3)];
  const expected = [
    ["a", "b", "c"],
    ["a", "c", "b"],
    ["b", "a", "c"],
    ["b", "c", "a"],
    ["c", "a", "b"],
    ["c", "b", "a"],
  ];
  assertEquals(actual, expected);
});

Deno.test("r = undefined (n)", () => {
  const actual = [...permutations("abc", undefined)];
  const expected = [
    ["a", "b", "c"],
    ["a", "c", "b"],
    ["b", "a", "c"],
    ["b", "c", "a"],
    ["c", "a", "b"],
    ["c", "b", "a"],
  ];
  assertEquals(actual, expected);
});

Deno.test("r < n", () => {
  const actual = [...permutations([0, 1, 2, 3], 3)];
  const expected = [
    [0, 1, 2],
    [0, 1, 3],
    [0, 2, 1],
    [0, 2, 3],
    [0, 3, 1],
    [0, 3, 2],
    [1, 0, 2],
    [1, 0, 3],
    [1, 2, 0],
    [1, 2, 3],
    [1, 3, 0],
    [1, 3, 2],
    [2, 0, 1],
    [2, 0, 3],
    [2, 1, 0],
    [2, 1, 3],
    [2, 3, 0],
    [2, 3, 1],
    [3, 0, 1],
    [3, 0, 2],
    [3, 1, 0],
    [3, 1, 2],
    [3, 2, 0],
    [3, 2, 1],
  ];
  assertEquals(actual, expected);
});

for (let n = 0; n < 8; n++) {
  const iterable = range(n);
  for (let r = 0; r < 8; r++) {
    Deno.test(`perm(${n}, ${r})`, () => {
      const actual = [...permutations(iterable, r)];
      const expectedLength = perm(n, r);
      assertStrictEquals(actual.length, expectedLength);
    });
  }
}

for (let n = 0; n < 8; n++) {
  const iterable = range(n);
  for (let r = 0; r < 8; r++) {
    Deno.test(`permutations1([${iterable}], ${r})`, () => {
      const actual = [...permutations(iterable, r)];
      const expected1 = [...permutations1(iterable, r)];
      assertEquals(actual, expected1);
    });
  }
}

/** Return the number of ways to choose `r` items from `n` items without replacement and with order. */
function perm(n: number, r: number): number {
  if (n < 0 || !Number.isInteger(n)) {
    throw RangeError("n must be a non-negative integer");
  } else if (r < 0 || !Number.isInteger(r)) {
    throw RangeError("r must be a non-negative integer");
  } else if (r > n) {
    return 0;
  } else {
    return factorial(n) / factorial(n - r);
  }
}

/** Equivalent to `permutations` for testing. */
function* permutations1<T>(
  iterable: Iterable<T>,
  r: number,
): Generator<T[]> {
  const pool = [...iterable];
  const n = pool.length;
  for (const indices of product(r, range(n))) {
    if (new Set(indices).size === r) {
      yield indices.map((i) => pool[i]);
    }
  }
}
