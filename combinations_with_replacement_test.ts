import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.108.0/testing/asserts.ts";
import { combinationsWithReplacement } from "./combinations_with_replacement.ts";

Deno.test("negative r", () => {
  assertThrows(
    () => [...combinationsWithReplacement("abc", -1)],
    RangeError,
    "r must be non-negative",
  );
});

Deno.test("r = 0", () => {
  const expected = [[]];
  const actual = [...combinationsWithReplacement("abc", 0)];
  assertEquals(actual, expected);
});

Deno.test("r = n = 0", () => {
  const expected = [[]];
  const actual = [...combinationsWithReplacement("", 0)];
  assertEquals(actual, expected);
});

Deno.test("n = 0, r > 0", () => {
  const actual = [...combinationsWithReplacement("", 1)];
  assertEquals(actual, []);
});

Deno.test("r > n", () => {
  const expected = [
    ["a", "a", "a", "a"],
    ["a", "a", "a", "b"],
    ["a", "a", "a", "c"],
    ["a", "a", "b", "b"],
    ["a", "a", "b", "c"],
    ["a", "a", "c", "c"],
    ["a", "b", "b", "b"],
    ["a", "b", "b", "c"],
    ["a", "b", "c", "c"],
    ["a", "c", "c", "c"],
    ["b", "b", "b", "b"],
    ["b", "b", "b", "c"],
    ["b", "b", "c", "c"],
    ["b", "c", "c", "c"],
    ["c", "c", "c", "c"],
  ];
  const actual = [...combinationsWithReplacement("abc", 4)];
  assertEquals(actual, expected);
});

Deno.test("r = n", () => {
  const expected = [
    ["a", "a", "a"],
    ["a", "a", "b"],
    ["a", "a", "c"],
    ["a", "b", "b"],
    ["a", "b", "c"],
    ["a", "c", "c"],
    ["b", "b", "b"],
    ["b", "b", "c"],
    ["b", "c", "c"],
    ["c", "c", "c"],
  ];
  const actual = [...combinationsWithReplacement("abc", 3)];
  assertEquals(actual, expected);
});

Deno.test("n > r", () => {
  const expected = [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 1],
    [1, 2],
    [2, 2],
  ];
  const actual = [...combinationsWithReplacement([0, 1, 2], 2)];
  assertEquals(actual, expected);
});
