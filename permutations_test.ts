import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.108.0/testing/asserts.ts";
import { permutations } from "./permutations.ts";
import { product } from "./product.ts";
import { range } from "./_util.ts";

Deno.test("negative r", () => {
  assertThrows(
    () => [...permutations("abc", -1)],
    RangeError,
    "r must be non-negative",
  );
});

Deno.test("n = 0", () => {
  const actual = [...permutations("", 1)];
  assertEquals(actual, []);
});

Deno.test("r = 0", () => {
  const expected = [[]];
  const actual = [...permutations("abc", 0)];
  assertEquals(actual, expected);
});

Deno.test("r = n = 0", () => {
  const expected = [[]];
  const actual = [...permutations("", 0)];
  assertEquals(actual, expected);
});

Deno.test("r > n", () => {
  const expected: Iterable<string[]> = [];
  const actual = [...permutations("abc", 32)];
  assertEquals(actual, expected);
});

Deno.test("r = n", () => {
  const expected = [
    ["a", "b", "c"],
    ["a", "c", "b"],
    ["b", "a", "c"],
    ["b", "c", "a"],
    ["c", "a", "b"],
    ["c", "b", "a"],
  ];
  const actual = [...permutations("abc", 3)];
  assertEquals(actual, expected);
});

Deno.test("n > r", () => {
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
  const actual = [...permutations([0, 1, 2, 3], 3)];
  assertEquals(actual, expected);
});

for (let n = 0; n < 8; n++) {
  const iterable = range(n);
  for (let r = 0; r < 6; r++) {
    Deno.test(`permutations([${iterable}], ${r})`, () => {
      const actual = [...permutations(iterable, r)];
      const expected1 = [...permutations1(iterable, r)];
      assertEquals(actual, expected1);
    });
  }
}

/** Equivalent to `permutations` for testing. */
function* permutations1<T>(
  iterable: Iterable<T>,
  r: number,
): Generator<T[]> {
  const pool = [...iterable];
  const n = pool.length;
  const factors: number[][] = Array(r).fill(range(n));
  for (const indices of product(...factors)) {
    if (new Set(indices).size === r) {
      yield indices.map((i) => pool[i]);
    }
  }
}
