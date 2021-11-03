import {
  bench,
  BenchmarkTimer,
  runBenchmarks,
} from "https://deno.land/std@0.113.0/testing/bench.ts";
import { combinations } from "./combinations.ts";
import { combinationsWithReplacement } from "./combinations_with_replacement.ts";
import { permutations } from "./permutations.ts";
import { product } from "./product.ts";
import { powerSet } from "./power_set.ts";

bench({
  name: "combinations",
  runs: 3,
  func(benchmarkTimer: BenchmarkTimer): void {
    benchmarkTimer.start();
    for (const _ of combinations(12, Array(29)));
    benchmarkTimer.stop();
  },
});

bench({
  name: "combinationsWithReplacement",
  runs: 3,
  func(benchmarkTimer: BenchmarkTimer): void {
    benchmarkTimer.start();
    for (const _ of combinationsWithReplacement(12, Array(18)));
    benchmarkTimer.stop();
  },
});

bench({
  name: "permutations",
  runs: 3,
  func(benchmarkTimer: BenchmarkTimer): void {
    benchmarkTimer.start();
    for (const _ of permutations(11, Array(11)));
    benchmarkTimer.stop();
  },
});

bench({
  name: "product",
  runs: 3,
  func(benchmarkTimer: BenchmarkTimer): void {
    benchmarkTimer.start();
    for (const _ of product(7, Array(13)));
    benchmarkTimer.stop();
  },
});

bench({
  name: "powerSet",
  runs: 3,
  func(benchmarkTimer: BenchmarkTimer): void {
    benchmarkTimer.start();
    for (const _ of powerSet(Array(25)));
    benchmarkTimer.stop();
  },
});

runBenchmarks();
