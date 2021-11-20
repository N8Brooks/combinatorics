import {
  bench,
  BenchmarkTimer,
  runBenchmarks,
} from "https://deno.land/std@0.113.0/testing/bench.ts";
import { combinations } from "./combinations.ts";
import { combinationsWithReplacement } from "./combinations_with_replacement.ts";
import { permutations } from "./permutations.ts";
import { permutationsWithReplacement } from "./permutations_with_replacement.ts";
import { cartesianProduct } from "./cartesian_product.ts";
import { powerSet } from "./power_set.ts";

bench({
  name: "combinations",
  runs: 3,
  func(benchmarkTimer: BenchmarkTimer): void {
    benchmarkTimer.start();
    for (const _ of combinations(Array(29), 12));
    benchmarkTimer.stop();
  },
});

bench({
  name: "combinationsWithReplacement",
  runs: 3,
  func(benchmarkTimer: BenchmarkTimer): void {
    benchmarkTimer.start();
    for (const _ of combinationsWithReplacement(Array(18), 12));
    benchmarkTimer.stop();
  },
});

bench({
  name: "permutations",
  runs: 3,
  func(benchmarkTimer: BenchmarkTimer): void {
    benchmarkTimer.start();
    for (const _ of permutations(Array(11), 11));
    benchmarkTimer.stop();
  },
});

bench({
  name: "permutationsWithReplacement",
  runs: 3,
  func(benchmarkTimer: BenchmarkTimer): void {
    benchmarkTimer.start();
    for (const _ of permutationsWithReplacement(Array(13), 7));
    benchmarkTimer.stop();
  },
});

bench({
  name: "cartesianProduct",
  runs: 3,
  func(benchmarkTimer: BenchmarkTimer): void {
    benchmarkTimer.start();
    for (const _ of cartesianProduct(...Array(7).fill(Array(13))));
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
