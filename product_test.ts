import { assertEquals } from "https://deno.land/std@0.108.0/testing/asserts.ts";
import { product } from "./product.ts";

Deno.test("0 iterables", () => {
  const expected = [[]];
  const actual = [...product()];
  assertEquals(actual, expected);
});

Deno.test("1 iterable", () => {
  const expected = [["a"], ["b"]];
  const actual = [...product("ab")];
  assertEquals(actual, expected);
});

Deno.test("2 iterables", () => {
  const expected = [[0, 2], [0, 3], [1, 2], [1, 3]];
  const actual = [...product([0, 1], [2, 3])];
  assertEquals(expected, actual);
});

const ARRAYS_WITH_EMPTY = [
  [[], [0, 1], [0, 1, 2]],
  [[0, 1], [], [0, 1, 2]],
  [[0, 1], [0, 1, 2], []],
];

ARRAYS_WITH_EMPTY.forEach((iterables, i) => {
  Deno.test(`empty iterable ${i}`, () => {
    assertEquals([...product(...iterables)], []);
  });
});
