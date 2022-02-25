import { assertEquals, assertStrictEquals, range } from "./test_deps.ts";
import { cartesianProduct } from "./cartesian_product.ts";

Deno.test("no iterables", () => {
  const actual = [...cartesianProduct()];
  assertEquals(actual, [[]]);
});

Deno.test("one iterable", () => {
  const actual = [...cartesianProduct("abc")];
  const expected = [["a"], ["b"], ["c"]];
  assertEquals(actual, expected);
});

Deno.test("iterables of varying length", () => {
  const actual = [...cartesianProduct([1], [2, 3, 4], [5, 6])];
  const expected = [
    [1, 2, 5],
    [1, 2, 6],
    [1, 3, 5],
    [1, 3, 6],
    [1, 4, 5],
    [1, 4, 6],
  ];
  assertEquals(actual, expected);
});

Deno.test("iterables with empty", () => {
  const actual = [...cartesianProduct([1, 2, 3], [], [4, 5, 6])];
  assertEquals(actual, []);
});

Deno.test("r = 65_537", () => {
  const actual = [...cartesianProduct(range(65_537))];
  const expected = Array(65_537).fill(undefined).map((_, i) => [i]);
  assertEquals(actual, expected);
});

Deno.test("multiple data types", () => {
  const actual = [...cartesianProduct(range(3), ["a", "b", "c"], [1n])];
  const expected = [
    [0, "a", 1n],
    [0, "b", 1n],
    [0, "c", 1n],
    [1, "a", 1n],
    [1, "b", 1n],
    [1, "c", 1n],
    [2, "a", 1n],
    [2, "b", 1n],
    [2, "c", 1n],
  ];
  assertEquals(
    actual,
    expected,
  );
});

Deno.test("arbitrary amount of data types", () => {
  // deno-fmt-ignore
  const actual = [...cartesianProduct(
    [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a',
    [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a',
    [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a',
    [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a',
    [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a',
    [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a',
    [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a',
    [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a', [0], 'a',
  )];
  // deno-fmt-ignore
  const expected = [[
    0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 
    0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 
    0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 
    0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 
    0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 
    0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 
    0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 
    0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 0, 'a', 
  ]];
  assertEquals(actual, expected);
});

test(cartesianProductLength);

test(cartesianProductContent);

/** Calls a function with varying `r`s and `iterables`. */
function test(
  func: typeof cartesianProductLength | typeof cartesianProductContent,
): void {
  for (let n0 = 0; n0 < 8; n0++) {
    func(n0);
  }

  for (let n0 = 0; n0 < 8; n0++) {
    for (let n1 = 0; n1 < 8; n1++) {
      func(n0, n1);
    }
  }

  for (let n0 = 0; n0 < 4; n0++) {
    for (let n1 = 0; n1 < 4; n1++) {
      for (let n2 = 0; n2 < 4; n2++) {
        func(n0, n1, n2);
      }
    }
  }

  for (let n0 = 0; n0 < 4; n0++) {
    for (let n1 = 0; n1 < 4; n1++) {
      for (let n2 = 0; n2 < 4; n2++) {
        for (let n3 = 0; n3 < 4; n3++) {
          func(n0, n1, n2, n3);
        }
      }
    }
  }
}

/** Tests `cartesianProduct` for length against `prod`. */
function cartesianProductLength(...ns: number[]) {
  const iterables = getIterables(...ns);
  Deno.test(`prod(${ns.join(", ")})`, () => {
    const actual = [...cartesianProduct(...iterables)];
    const expectedLength = prod(...ns);
    assertStrictEquals(actual.length, expectedLength);
  });
}

/** Tests `cartesianProduct` for content against `cartesianProduct1`. */
function cartesianProductContent(...ns: number[]) {
  const iterables = getIterables(...ns);
  const restArgs = JSON.stringify(iterables).slice(1, -1);
  Deno.test(`cartesianProduct1(${restArgs})`, () => {
    const actual = [...cartesianProduct(...iterables)];
    const expected1 = [...cartesianProduct1(...iterables)];
    assertEquals(actual, expected1);
  });
}

/** Creates arrays of the given lengths containing unique numbers. */
function getIterables(...ns: number[]): number[][] {
  let i = 0;
  return ns.map((n) => Array.from({ length: n }, () => i++));
}

/** Calculate the product of all `ns`. */
function prod(...ns: number[]): number {
  let product = 1;
  for (const n of ns) {
    product *= n;
  }
  return product;
}

/** Equivalent to `cartesianProduct` for testing. */
function* cartesianProduct1<T>(
  ...iterables: Iterable<T>[]
): Generator<T[]> {
  const pools = iterables.map((iterable) => [...iterable]);
  let result: T[][] = [[]];
  for (const pool of pools) {
    result = result.map((x) => pool.map((y) => [...x, y])).flat();
  }
  for (const prod of result) {
    yield prod;
  }
}
