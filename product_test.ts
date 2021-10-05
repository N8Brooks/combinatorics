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
  const actual = [...product(3, "")];
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

Deno.test("r = 65_537", () => {
  const actual = [...product(1, range(65_537))];
  const expected = Array(65_537).fill(undefined).map((_, i) => [i]);
  assertEquals(actual, expected);
});

test(productLength);

test(productContent);

/** Calls a function with varying `r`s and `iterables`. */
function test(func: typeof productLength | typeof productContent): void {
  for (let r = 0; r < 4; r++) {
    func(r);
  }

  for (let n0 = 0; n0 <= 4; n0++) {
    for (let r = 0; r < 4; r++) {
      func(r, n0);
    }
  }

  for (let n0 = 0; n0 <= 4; n0++) {
    for (let n1 = 0; n1 <= 4; n1++) {
      for (let r = 0; r < 2; r++) {
        func(r, n0, n1);
      }
    }
  }

  for (let n0 = 0; n0 <= 4; n0++) {
    for (let n1 = 0; n1 <= 4; n1++) {
      for (let n2 = 0; n2 <= 4; n2++) {
        func(1, n0, n1, n2);
      }
    }
  }

  for (let n0 = 0; n0 <= 4; n0++) {
    for (let n1 = 0; n1 <= 4; n1++) {
      for (let n2 = 0; n2 <= 4; n2++) {
        for (let n3 = 0; n3 <= 4; n3++) {
          func(1, n0, n1, n2, n3);
        }
      }
    }
  }
}

/** Tests `product` for length against `prod`. */
function productLength(r: number, ...ns: number[]) {
  const iterables = getIterables(...ns);
  Deno.test(`prod(${r}, ${ns.join(", ")})`, () => {
    const actual = [...product(r, ...iterables)];
    const expectedLength = prod(r, ...ns);
    assertStrictEquals(actual.length, expectedLength);
  });
}

/** Tests `product` for content against `product1`. */
function productContent(r: number, ...ns: number[]) {
  const iterables = getIterables(...ns);
  const restArgs = JSON.stringify(iterables).slice(1, -1);
  Deno.test(`product1(${r}, ${restArgs})`, () => {
    const actual = [...product(r, ...iterables)];
    const expected1 = [...product1(r, ...iterables)];
    assertEquals(actual, expected1);
  });
}

/** Creates arrays of the given lengths containing unique numbers. */
function getIterables(...ns: number[]): number[][] {
  let i = 0;
  return ns.map((n) => Array.from({ length: n }, () => i++));
}

/** Calculate the product of all the `ns` repeated `r` times. */
function prod(r: number, ...ns: number[]): number {
  let product = 1;
  for (const factor of ns) {
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
