import {
  assertEquals,
  assertStrictEquals,
} from "https://deno.land/std@0.108.0/testing/asserts.ts";
import { product } from "./product.ts";
import { randRange } from "./_util.ts";

const ARRAYS_WITH_EMPTY = [
  [[], [0, 1], [0, 1, 2]],
  [[0, 1], [], [0, 1, 2]],
  [[0, 1], [0, 1, 2], []],
];

const RANDOM_ITERABLES = [
  new Set(),
  new Map(),
  "abcdefghijklmn",
  [NaN, -5.5, 0, Math.PI, Number.MAX_VALUE],
  [...Array(10).keys()],
  [undefined, undefined, null, null],
  [Symbol(), Symbol(), Symbol.iterator],
  [true, false, true, false, true],
  new Map([[1, 1], [1, 1], [1, 1]]),
  new Set([".", ".", ".", ".", ".", "."]),
  new Set([0n, 1n, 2n, 3n, 4n, 5n, 6n, 7n]),
  new Float32Array([8, 6, 7, 5, 3, 0, 9]),
  new Uint16Array([0, 0, 0, 1, 1, 1, 2, 3, 4]),
];

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
  assertEquals(actual, expected);
});

Deno.test("3 iterables of different lengths", () => {
  const expected = [
    [1, 3, 6],
    [1, 4, 6],
    [1, 5, 6],
    [2, 3, 6],
    [2, 4, 6],
    [2, 5, 6],
  ];
  const actual = [...product([1, 2], [3, 4, 5], [6])];
  assertEquals(actual, expected);
});

ARRAYS_WITH_EMPTY.forEach((iterables, i) => {
  Deno.test(`empty iterable ${i}`, () => {
    assertEquals([...product(...iterables)], []);
  });
});

for (let i = 0; i < 100; i++) {
  const arr = { length: randRange(5) + 1 };
  const indexes = Array.from(arr, () => randRange(RANDOM_ITERABLES.length));
  const iterables = indexes.map((i) => RANDOM_ITERABLES[i]);
  const prod = iterables.reduce((prod, factor) => prod * [...factor].length, 1);

  Deno.test(`indexes: ${indexes.join(",")}`, () => {
    const actual = [...product(...iterables)];
    const expected = [...product1(...iterables)];
    assertStrictEquals(prod, actual.length);
    assertEquals(actual, expected);
  });
}

/** Equivalent to `product` for testing. */
function* product1<T>(...iterables: Iterable<T>[]): Generator<T[]> {
  const pools = iterables.map((iterable) => [...iterable]);
  let result: T[][] = [[]];
  for (const pool of pools) {
    result = result.map((x) => pool.map((y) => [...x, y])).flat();
  }
  for (const prod of result) {
    yield prod;
  }
}
