import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.108.0/testing/asserts.ts";
import { combinationsWithReplacement } from "./combinations_with_replacement.ts";
import { product } from "./product.ts";
import { range } from "./_util.ts";

Deno.test("r = -1", () => {
  assertThrows(
    () => [...combinationsWithReplacement(-1, "abc")],
    RangeError,
    "r must be non-negative",
  );
});

Deno.test("r = n = 0", () => {
  const expected = [[]];
  const actual = [...combinationsWithReplacement(0, "")];
  assertEquals(actual, expected);
});

Deno.test("r = 0", () => {
  const expected = [[]];
  const actual = [...combinationsWithReplacement(0, "abc")];
  assertEquals(actual, expected);
});

Deno.test("n = 0", () => {
  const actual = [...combinationsWithReplacement(1, "")];
  assertEquals(actual, []);
});

Deno.test("r > n", () => {
  const expected = [
    ["a", "a", "a", "a"],
    ["a", "a", "a", "b"],
    ["a", "a", "a", "c"],
    ["a", "a", "b", "b"],
    ["a", "a", "b", "c"],
    ["a", "a", "c", "c"],
    ["a", "b", "b", "b"],
    ["a", "b", "b", "c"],
    ["a", "b", "c", "c"],
    ["a", "c", "c", "c"],
    ["b", "b", "b", "b"],
    ["b", "b", "b", "c"],
    ["b", "b", "c", "c"],
    ["b", "c", "c", "c"],
    ["c", "c", "c", "c"],
  ];
  const actual = [...combinationsWithReplacement(4, "abc")];
  assertEquals(actual, expected);
});

Deno.test("r = n", () => {
  const expected = [
    ["a", "a", "a"],
    ["a", "a", "b"],
    ["a", "a", "c"],
    ["a", "b", "b"],
    ["a", "b", "c"],
    ["a", "c", "c"],
    ["b", "b", "b"],
    ["b", "b", "c"],
    ["b", "c", "c"],
    ["c", "c", "c"],
  ];
  const actual = [...combinationsWithReplacement(3, "abc")];
  assertEquals(actual, expected);
});

Deno.test("r < n", () => {
  const expected = [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 1],
    [1, 2],
    [2, 2],
  ];
  const actual = [...combinationsWithReplacement(2, [0, 1, 2])];
  assertEquals(actual, expected);
});

for (let n = 0; n < 6; n++) {
  const iterable = range(n);
  for (let r = 0; r < 6; r++) {
    Deno.test(`combinationsWithReplacement([${iterable}], ${r})`, () => {
      const actual = [...combinationsWithReplacement(r, iterable)];
      const expected1 = [...combinationsWithReplacement1(r, iterable)];
      assertEquals(actual, expected1);
    });
  }
}

/** Equivalent to `combinationsWithReplacement1` for testing. */
function* combinationsWithReplacement1<T>(
  r: number,
  iterable: Iterable<T>,
): Generator<T[]> {
  const pool = [...iterable];
  const n = pool.length;
  for (const indices of product(r, range(n))) {
    if (!indices.some((x, i) => indices[i - 1] > x)) {
      yield indices.map((i) => pool[i]);
    }
  }
}
