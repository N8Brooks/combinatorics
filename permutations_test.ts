import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.108.0/testing/asserts.ts";
import { permutations } from "./permutations.ts";

Deno.test("negative r", () => {
  assertThrows(
    () => [...permutations("abc", -1)],
    RangeError,
    "r must be non-negative",
  );
});

Deno.test("r = 0", () => {
  const expected = [[]];
  const actual = [...permutations("abc", 0)];
  assertEquals(actual, expected);
});

Deno.test("r = n = 0", () => {
  const expected = [[]];
  const actual = [...permutations("", 0)];
  assertEquals(actual, expected);
});

Deno.test("r > n", () => {
  const expected: Iterable<string[]> = [];
  const actual = [...permutations("abc", 32)];
  assertEquals(actual, expected);
});

Deno.test("r = n", () => {
  const expected = [
    ["a", "b", "c"],
    ["a", "c", "b"],
    ["b", "a", "c"],
    ["b", "c", "a"],
    ["c", "a", "b"],
    ["c", "b", "a"],
  ];
  const actual = [...permutations("abc", 3)];
  assertEquals(actual, expected);
});

Deno.test("r = n (implied)", () => {
  const expected = [
    ["a", "b", "c"],
    ["a", "c", "b"],
    ["b", "a", "c"],
    ["b", "c", "a"],
    ["c", "a", "b"],
    ["c", "b", "a"],
  ];
  const actual = [...permutations("abc")];
  assertEquals(actual, expected);
});

Deno.test("n > r", () => {
  const expected = [
    [0, 1, 2],
    [0, 1, 3],
    [0, 2, 1],
    [0, 2, 3],
    [0, 3, 1],
    [0, 3, 2],
    [1, 0, 2],
    [1, 0, 3],
    [1, 2, 0],
    [1, 2, 3],
    [1, 3, 0],
    [1, 3, 2],
    [2, 0, 1],
    [2, 0, 3],
    [2, 1, 0],
    [2, 1, 3],
    [2, 3, 0],
    [2, 3, 1],
    [3, 0, 1],
    [3, 0, 2],
    [3, 1, 0],
    [3, 1, 2],
    [3, 2, 0],
    [3, 2, 1],
  ];
  const actual = [...permutations([0, 1, 2, 3], 3)];
  assertEquals(actual, expected);
});
