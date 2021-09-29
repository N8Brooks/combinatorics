import {
  bench,
  BenchmarkTimer,
  runBenchmarks,
} from "https://deno.land/std@0.98.0/testing/bench.ts";
import { combinations } from "./combinations.ts";
import { combinationsWithReplacement } from "./combinations_with_replacement.ts";
import { permutations } from "./permutations.ts";
import { product } from "./product.ts";
import { powerSet } from "./power_set.ts";

bench({
  name: "combinations",
  runs: 1,
  func(benchmarkTimer: BenchmarkTimer): void {
    benchmarkTimer.start();
    for (const _ of combinations(Array(26), 10));
    benchmarkTimer.stop();
  },
});

bench({
  name: "combinationsWithReplacement",
  runs: 1,
  func(benchmarkTimer: BenchmarkTimer): void {
    benchmarkTimer.start();
    for (const _ of combinationsWithReplacement(Array(16), 10));
    benchmarkTimer.stop();
  },
});

bench({
  name: "permutations",
  runs: 1,
  func(benchmarkTimer: BenchmarkTimer): void {
    benchmarkTimer.start();
    for (const _ of permutations(Array(10), 9));
    benchmarkTimer.stop();
  },
});

bench({
  name: "product",
  runs: 1,
  func(benchmarkTimer: BenchmarkTimer): void {
    benchmarkTimer.start();
    const iterables = Array(8).fill(Array(7));
    for (const _ of product(1, ...iterables));
    benchmarkTimer.stop();
  },
});

bench({
  name: "powerSet",
  runs: 1,
  func(benchmarkTimer: BenchmarkTimer): void {
    benchmarkTimer.start();
    for (const _ of powerSet(Array(22)));
    benchmarkTimer.stop();
  },
});

runBenchmarks();
