import {
  assertEquals,
  assertStrictEquals,
  assertThrows,
} from "https://deno.land/std@0.108.0/testing/asserts.ts";
import { factorial, range } from "./_util.ts";

Deno.test("n = NaN", () => {
  assertThrows(() => range(NaN), RangeError, "n must be an integer");
});

Deno.test("n = Infinity", () => {
  assertThrows(() => range(Infinity), RangeError, "n must be an integer");
});

Deno.test("n = Math.PI", () => {
  assertThrows(() => range(Math.PI), RangeError, "n must be an integer");
});

Deno.test("n = -1", () => {
  const actual = range(-1);
  assertEquals(actual, []);
});

Deno.test("n = 0", () => {
  const actual = range(0);
  assertEquals(actual, []);
});

Deno.test("n = 1", () => {
  const actual = range(1);
  const expected = [0];
  assertEquals(actual, expected);
});

Deno.test("n = 2", () => {
  const actual = range(2);
  const expected = [0, 1];
  assertEquals(actual, expected);
});

Deno.test("n = 10", () => {
  const actual = range(10);
  const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  assertEquals(actual, expected);
});

Deno.test("n = NaN", () => {
  assertThrows(
    () => factorial(NaN),
    RangeError,
    "n must be a non-negative integer",
  );
});

Deno.test("n < Infinity", () => {
  assertThrows(
    () => factorial(Infinity),
    RangeError,
    "n must be a non-negative integer",
  );
});

Deno.test("n < Math.PI", () => {
  assertThrows(
    () => factorial(Math.PI),
    RangeError,
    "n must be a non-negative integer",
  );
});

Deno.test("n < -1", () => {
  assertThrows(
    () => factorial(-1),
    RangeError,
    "n must be a non-negative integer",
  );
});

Deno.test("n = 0", () => {
  const actual = factorial(0);
  assertStrictEquals(actual, 1);
});

Deno.test("n = 1", () => {
  const actual = factorial(1);
  assertStrictEquals(actual, 1);
});

Deno.test("n = 2", () => {
  const actual = factorial(2);
  assertStrictEquals(actual, 2);
});

Deno.test("n = 10", () => {
  const actual = factorial(10);
  assertStrictEquals(actual, 3628800);
});
