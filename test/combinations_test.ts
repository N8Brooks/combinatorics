import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.108.0/testing/asserts.ts";
import { combinations } from "../combinatorics/combinations.ts";

Deno.test("negative r", () => {
  assertThrows(
    () => [...combinations("abc", -1)],
    RangeError,
    "r must be non-negative",
  );
});

Deno.test("r = 0", () => {
  const expected = [[]];
  const actual = [...combinations("abc", 0)];
  assertEquals(actual, expected);
});

Deno.test("r = n = 0", () => {
  const expected = [[]];
  const actual = [...combinations("", 0)];
  assertEquals(actual, expected);
});

Deno.test("r > n", () => {
  const expected: Iterable<string[]> = [];
  const actual = [...combinations("abc", 32)];
  assertEquals(actual, expected);
});

Deno.test("r = n", () => {
  const expected = [["a", "b", "c"]];
  const actual = [...combinations("abc", 3)];
  assertEquals(actual, expected);
});

Deno.test("n > r", () => {
  const expected = [
    [0, 1, 2],
    [0, 1, 3],
    [0, 2, 3],
    [1, 2, 3],
  ];
  const actual = [...combinations([0, 1, 2, 3], 3)];
  assertEquals(actual, expected);
});
