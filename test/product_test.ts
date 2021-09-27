import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.108.0/testing/asserts.ts";
import { product } from "../combinatorics/product.ts";

Deno.test("negative repeat", () => {
  assertThrows(
    () => [...product([], -1)],
    RangeError,
    "repeat parameter cannot be negative",
  );
});

Deno.test("repeat 0 with 0 iterables", () => {
  const expected = [[]];
  const actual = [...product([], 0)];
  assertEquals(actual, expected);
});

Deno.test("repeat 1 with 0 iterables", () => {
  const expected = [[]];
  const actual = [...product([], 1)];
  assertEquals(actual, expected);
});

Deno.test("repeat 2 with 0 iterables", () => {
  const expected = [[]];
  const actual = [...product([], 2)];
  assertEquals(actual, expected);
});

const ONE_ITERABLE = ["ab"];

Deno.test("repeat 0 with 1 iterable", () => {
  const expected = [[]];
  const actual = [...product(ONE_ITERABLE, 0)];
  assertEquals(actual, expected);
});

Deno.test("repeat 1 with 1 iterable", () => {
  const expected = [["a"], ["b"]];
  const actual = [...product(ONE_ITERABLE, 1)];
  assertEquals(actual, expected);
});

Deno.test("repeat 2 with 1 iterable", () => {
  const expected = [["a", "a"], ["a", "b"], ["b", "a"], ["b", "b"]];
  const actual = [...product(ONE_ITERABLE, 2)];
  assertEquals(actual, expected);
});

const TWO_ITERABLES = [[0, 1], [2, 3]];

Deno.test("repeat 0 with 2 iterables", () => {
  const expected = [[]];
  const actual = [...product(TWO_ITERABLES, 0)];
  assertEquals(expected, actual);
});

Deno.test("repeat 1 with 2 iterables", () => {
  const expected = [[0, 2], [0, 3], [1, 2], [1, 3]];
  const actual = [...product(TWO_ITERABLES, 1)];
  assertEquals(expected, actual);
});

Deno.test("repeat 2 with 2 iterables", () => {
  const expected = [
    [0, 2, 0, 2],
    [0, 2, 0, 3],
    [0, 2, 1, 2],
    [0, 2, 1, 3],
    [0, 3, 0, 2],
    [0, 3, 0, 3],
    [0, 3, 1, 2],
    [0, 3, 1, 3],
    [1, 2, 0, 2],
    [1, 2, 0, 3],
    [1, 2, 1, 2],
    [1, 2, 1, 3],
    [1, 3, 0, 2],
    [1, 3, 0, 3],
    [1, 3, 1, 2],
    [1, 3, 1, 3],
  ];
  const actual = [...product(TWO_ITERABLES, 2)];
  assertEquals(expected, actual);
});

const ARRAYS_WITH_EMPTY = [
  [[], [0, 1], [0, 1, 2]],
  [[0, 1], [], [0, 1, 2]],
  [[0, 1], [0, 1, 2], []],
];

ARRAYS_WITH_EMPTY.forEach((iterables, i) => {
  Deno.test(`repeat 0 with empty iterable ${i}`, () => {
    assertEquals([...product(iterables, 0)], [[]]);
  });
});

ARRAYS_WITH_EMPTY.forEach((iterables, i) => {
  for (let repeat = 1; repeat < 4; repeat++) {
    Deno.test(`repeat ${repeat} with empty iterable ${i}`, () => {
      assertEquals([...product(iterables, repeat)], []);
    });
  }
});
