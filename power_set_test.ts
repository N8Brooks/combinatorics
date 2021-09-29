import { assertEquals } from "https://deno.land/std@0.108.0/testing/asserts.ts";
import { combinations } from "./combinations.ts";
import { combinations1, combinations2 } from "./combinations_test.ts";
import { powerSet } from "./power_set.ts";
import { range } from "./_util.ts";

Deno.test("n = 0", () => {
  const actual = [...powerSet([])];
  assertEquals(actual, [[]]);
});

Deno.test("n = 1", () => {
  const actual = [...powerSet([1])];
  assertEquals(actual, [[], [1]]);
});

Deno.test("n = 2", () => {
  const actual = [...powerSet("ab")];
  const expected = [[], ["a"], ["b"], ["a", "b"]];
  assertEquals(actual, expected);
});

Deno.test("n = 3", () => {
  const actual = [...powerSet([1, 2, 3])];
  const expected = [
    [],
    [1],
    [2],
    [3],
    [1, 2],
    [1, 3],
    [2, 3],
    [1, 2, 3],
  ];
  assertEquals(actual, expected);
});

for (let i = 0; i < 8; i++) {
  const iterable = range(i);
  Deno.test(`powerSet([${iterable}])`, () => {
    const actual = [...powerSet(iterable)];
    const expected1 = [...powerSet1(iterable)];
    const expected2 = [...powerSet2(iterable)];
    const expected3 = [...powerSet3(iterable)];
    assertEquals(actual, expected1);
    assertEquals(actual, expected2);
    assertEquals(actual, expected3);
  });
}

/** Equivalent to `powerSet` for testing. */
function* powerSet1<T>(iterable: Iterable<T>): Generator<T[]> {
  const pool = [...iterable];
  const n = pool.length;
  yield [];
  for (let r = 1; r <= n; r++) {
    yield* combinations(r, pool);
  }
}

/** Equivalent to `product` for testing. */
function* powerSet2<T>(iterable: Iterable<T>): Generator<T[]> {
  const pool = [...iterable];
  const n = pool.length;
  yield [];
  for (let r = 1; r <= n; r++) {
    yield* combinations1(r, pool);
  }
}

/** Equivalent to `product` for testing. */
function* powerSet3<T>(iterable: Iterable<T>): Generator<T[]> {
  const pool = [...iterable];
  const n = pool.length;
  yield [];
  for (let r = 1; r <= n; r++) {
    yield* combinations2(r, pool);
  }
}
