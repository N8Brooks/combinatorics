import { assertEquals } from "https://deno.land/std@0.108.0/testing/asserts.ts";
import { range } from "./_util.ts";

Deno.test("0", () => {
  const actual = range(0);
  assertEquals(actual, []);
});

Deno.test("1", () => {
  const actual = range(1);
  const expected = [0];
  assertEquals(actual, expected);
});

Deno.test("2", () => {
  const actual = range(2);
  const expected = [0, 1];
  assertEquals(actual, expected);
});

Deno.test("10", () => {
  const actual = range(10);
  const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  assertEquals(actual, expected);
});
