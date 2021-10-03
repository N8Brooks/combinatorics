import {
  assertEquals,
  assertStrictEquals,
  assertThrows,
} from "https://deno.land/std@0.108.0/testing/asserts.ts";
import { product } from "./product.ts";
import { range } from "./_util.ts";

Deno.test("r = NaN", () => {
  assertThrows(
    () => [...product(NaN, "abc")],
    RangeError,
    "r must be a non-negative integer",
  );
});

Deno.test("r = Infinity", () => {
  assertThrows(
    () => [...product(Infinity, "abc")],
    RangeError,
    "r must be a non-negative integer",
  );
});

Deno.test("r = Math.PI", () => {
  assertThrows(
    () => [...product(Math.PI, "abc")],
    RangeError,
    "r must be a non-negative integer",
  );
});

Deno.test("r = -1", () => {
  assertThrows(
    () => [...product(-1, "abc")],
    RangeError,
    "r must be a non-negative integer",
  );
});

Deno.test("r = n = 0", () => {
  const actual = [...product(0, "")];
  const expected = [[]];
  assertEquals(actual, expected);
});

Deno.test("r = 0", () => {
  const actual = [...product(0, "abc")];
  const expected = [[]];
  assertEquals(actual, expected);
});

Deno.test("n = 0", () => {
  const actual = [...product(1, "")];
  assertEquals(actual, []);
});

Deno.test("r > n", () => {
  const actual = [...product(3, "ab")];
  const expected = [
    ["a", "a", "a"],
    ["a", "a", "b"],
    ["a", "b", "a"],
    ["a", "b", "b"],
    ["b", "a", "a"],
    ["b", "a", "b"],
    ["b", "b", "a"],
    ["b", "b", "b"],
  ];
  assertEquals(actual, expected);
});

Deno.test("r = n", () => {
  const actual = [...product(3, [1, 2, 3])];
  const expected = [
    [1, 1, 1],
    [1, 1, 2],
    [1, 1, 3],
    [1, 2, 1],
    [1, 2, 2],
    [1, 2, 3],
    [1, 3, 1],
    [1, 3, 2],
    [1, 3, 3],
    [2, 1, 1],
    [2, 1, 2],
    [2, 1, 3],
    [2, 2, 1],
    [2, 2, 2],
    [2, 2, 3],
    [2, 3, 1],
    [2, 3, 2],
    [2, 3, 3],
    [3, 1, 1],
    [3, 1, 2],
    [3, 1, 3],
    [3, 2, 1],
    [3, 2, 2],
    [3, 2, 3],
    [3, 3, 1],
    [3, 3, 2],
    [3, 3, 3],
  ];
  assertEquals(actual, expected);
});

Deno.test("r < n", () => {
  const actual = [...product(2, [1, 2, 3])];
  const expected = [
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 1],
    [2, 2],
    [2, 3],
    [3, 1],
    [3, 2],
    [3, 3],
  ];
  assertEquals(actual, expected);
});

Deno.test("r > n with two iterables", () => {
  const actual = [...product(3, [1], [2])];
  const expected = [[1, 2, 1, 2, 1, 2]];
  assertEquals(actual, expected);
});

Deno.test("r = n with two iterables", () => {
  const actual = [...product(3, [1, 2], [3])];
  const expected = [
    [1, 3, 1, 3, 1, 3],
    [1, 3, 1, 3, 2, 3],
    [1, 3, 2, 3, 1, 3],
    [1, 3, 2, 3, 2, 3],
    [2, 3, 1, 3, 1, 3],
    [2, 3, 1, 3, 2, 3],
    [2, 3, 2, 3, 1, 3],
    [2, 3, 2, 3, 2, 3],
  ];
  assertEquals(actual, expected);
});

Deno.test("r < n with two iterables", () => {
  const actual = [...product(1, [1, 2], [3, 4])];
  const expected = [[1, 3], [1, 4], [2, 3], [2, 4]];
  assertEquals(actual, expected);
});

Deno.test("r=65_537", () => {
  const actual = [...product(1, range(65_537))];
  const expected = Array(65_537).fill(undefined).map((_, i) => [i]);
  assertEquals(actual, expected);
});

for (let elements = 1; elements < 64; elements += 1) {
  const r = 1;
  const length = randRange(4) + 1;
  const iterables: number[][] = Array.from({ length }, () => ([]));
  for (let i = 0; i < elements; i++) {
    iterables[randRange(length)].push(i);
  }
  const name = JSON.stringify(iterables).slice(1, -1);
  Deno.test(`product(${r}, ${name})`, () => {
    const actual = [...product(r, ...iterables)];
    const expected1 = [...product1(r, ...iterables)];
    assertEquals(actual, expected1);
    const expectedLength = prod(r, iterables.map(({ length }) => length));
    assertStrictEquals(actual.length, expectedLength);
  });
}

/** Returns a random number between `0` and `stop - 1`. */
function randRange(stop: number): number {
  return Math.floor(Math.random() * stop);
}

/** Calculate the product of all the elements of the input `iterable` repeated `r` times. */
function prod(r: number, iterable: Iterable<number>): number {
  let product = 1;
  for (const factor of iterable) {
    product *= factor;
  }
  return Math.pow(product, r);
}

/** Equivalent to `product` for testing. */
function* product1<T>(r: number, ...iterables: Iterable<T>[]): Generator<T[]> {
  const pools: T[][] = Array(r)
    .fill(iterables.map((iterable) => [...iterable]))
    .flat();
  let result: T[][] = [[]];
  for (const pool of pools) {
    result = result.map((x) => pool.map((y) => [...x, y])).flat();
  }
  for (const prod of result) {
    yield prod;
  }
}
