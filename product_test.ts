import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.108.0/testing/asserts.ts";
import { product } from "./product.ts";

Deno.test("negative r", () => {
  assertThrows(
    () => [...product(-1, "abc")],
    RangeError,
    "r must be non-negative",
  );
});

Deno.test("n = 0", () => {
  const actual = [...product(1, "")];
  assertEquals(actual, []);
});

Deno.test("r = 0", () => {
  const expected = [[]];
  const actual = [...product(0, "abc")];
  assertEquals(actual, expected);
});

Deno.test("r = n = 0", () => {
  const expected = [[]];
  const actual = [...product(0, "")];
  assertEquals(actual, expected);
});

Deno.test("r > n", () => {
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
  const actual = [...product(3, "ab")];
  assertEquals(actual, expected);
});

Deno.test("r = n", () => {
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
  const actual = [...product(3, [1, 2, 3])];
  assertEquals(actual, expected);
});

Deno.test("n > r", () => {
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
  const actual = [...product(2, [1, 2, 3])];
  assertEquals(actual, expected);
});

Deno.test("r > n with two iterables", () => {
  const expected = [[1, 2, 1, 2, 1, 2]];
  const actual = [...product(3, [1], [2])];
  assertEquals(actual, expected);
});

Deno.test("r = n with two iterables", () => {
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
  const actual = [...product(3, [1, 2], [3])];
  assertEquals(actual, expected);
});

Deno.test("r < n with two iterables", () => {
  const expected = [[1, 3], [1, 4], [2, 3], [2, 4]];
  const actual = [...product(1, [1, 2], [3, 4])];
  assertEquals(actual, expected);
});

for (let elements = 1; elements < 10; elements += 0.1) {
  const r = randRange(3);
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
  });
}

/** Returns a random number between `0` and `stop - 1`. */
function randRange(stop: number): number {
  return Math.floor(Math.random() * stop);
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
