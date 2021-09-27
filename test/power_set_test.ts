import { assertEquals } from "https://deno.land/std@0.108.0/testing/asserts.ts";
import { powerSet } from "../combinatorics/power_set.ts";

Deno.test("empty iterable", () => {
  const actual = [...powerSet([])];
  assertEquals(actual, [[]]);
});

Deno.test("iterable with one item", () => {
  const actual = [...powerSet([1])];
  assertEquals(actual, [[], [1]]);
});

Deno.test("1, 2, 3", () => {
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
