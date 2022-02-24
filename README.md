# combinatorics

[![docs](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/combinatorics/mod.ts)
[![codecov](https://codecov.io/gh/N8Brooks/combinatorics/branch/main/graph/badge.svg?token=PTN34S691O)](https://codecov.io/gh/N8Brooks/combinatorics)
[![cd](https://github.com/N8Brooks/combinatorics/actions/workflows/cd.yml/badge.svg)](https://github.com/N8Brooks/combinatorics/actions/workflows/cd.yml)
[![ci](https://github.com/N8Brooks/combinatorics/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/N8Brooks/combinatorics/actions/workflows/ci.yml)

This module provides generators for iterating subsets of an input. It is heavily
inspired by the combinatorial iterators provided by the
[itertools](https://docs.python.org/3/library/itertools.html) package from the
`Python` standard library.

- All generators are importable on their own.
- These implementations do not build up intermediate results in memory.
- All functions iterate subsets lexicographically according to their input
  indices. If the input is sorted the output will be too.
- Likewise, whether the input elements are unique or not does not matter.
- The inputs provided are not modified, however, consumable iterables will be
  consumed.

## Usage

### combinations

Yields `r` length `Arrays` from the input `iterable`. Order of selection does
not matter and elements are chosen without replacement.

```ts
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { combinations } from "https://deno.land/x/combinatorics/mod.ts";

const sequences = [...combinations([1, 2, 3, 4], 2)];

assertEquals(sequences, [
  [1, 2],
  [1, 3],
  [1, 4],
  [2, 3],
  [2, 4],
  [3, 4],
]);
```

### permutations

Yields `r` length `Arrays` from the input `iterable`. Order of selection is
important and elements are chosen without replacement. If `r` is undefined, then
the length of the `iterable` is used.

<!-- deno-fmt-ignore -->
```ts
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { permutations } from "https://deno.land/x/combinatorics/mod.ts";

const sequences = [...permutations([1, 2, 3, 4], 2)];

assertEquals(sequences, [
  [1, 2], [1, 3], [1, 4],
  [2, 1], [2, 3], [2, 4],
  [3, 1], [3, 2], [3, 4],
  [4, 1], [4, 2], [4, 3],
]);
```

### combinationsWithReplacement

Yields `r` length `Arrays` from the input `iterable`. Order of selection is not
important and elements are chosen with replacement.

```ts
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { combinationsWithReplacement } from "https://deno.land/x/combinatorics/mod.ts";

const sequences = [...combinationsWithReplacement([1, 2, 3, 4], 2)];

assertEquals(sequences, [
  [1, 1],
  [1, 2],
  [1, 3],
  [1, 4],
  [2, 2],
  [2, 3],
  [2, 4],
  [3, 3],
  [3, 4],
  [4, 4],
]);
```

### permutationsWithReplacement

Yields `r` length `Arrays` from the input `iterable`. Order of selection is
important and elements are chosen with replacement.

<!-- deno-fmt-ignore -->
```ts
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { permutationsWithReplacement } from "https://deno.land/x/combinatorics/mod.ts";

const sequences = [...permutationsWithReplacement([1, 2, 3, 4], 2)];

assertEquals(sequences, [
  [1, 1], [1, 2], [1, 3], [1, 4],
  [2, 1], [2, 2], [2, 3], [2, 4],
  [3, 1], [3, 2], [3, 3], [3, 4],
  [4, 1], [4, 2], [4, 3], [4, 4],
]);
```

### cartesianProduct

Roughly equivalent to running nested `for...of` loops using one of the inputs to
provide the element at each index for the yielded `Array`.

<!-- deno-fmt-ignore -->
```ts
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { cartesianProduct } from "https://deno.land/x/combinatorics/mod.ts";

const sequences = [...cartesianProduct([1, 2, 3], [4, 5, 6], [7, 8, 9])];

assertEquals(sequences, [
  [1, 4, 7], [1, 4, 8], [1, 4, 9],
  [1, 5, 7], [1, 5, 8], [1, 5, 9],
  [1, 6, 7], [1, 6, 8], [1, 6, 9],
  [2, 4, 7], [2, 4, 8], [2, 4, 9],
  [2, 5, 7], [2, 5, 8], [2, 5, 9],
  [2, 6, 7], [2, 6, 8], [2, 6, 9],
  [3, 4, 7], [3, 4, 8], [3, 4, 9],
  [3, 5, 7], [3, 5, 8], [3, 5, 9],
  [3, 6, 7], [3, 6, 8], [3, 6, 9],
]);
```

### powerSet

The set of all subsets of the given `iterable`. Equivalent to running
`combinations` with `0 <= r <= iterable.length` and flattening the results. The
first subset is the empty set given when `r = 0`.

```ts
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { powerSet } from "https://deno.land/x/combinatorics/mod.ts";

const sequences = [...powerSet([1, 2, 3])];

assertEquals(sequences, [
  [],
  [1],
  [2],
  [3],
  [1, 2],
  [1, 3],
  [2, 3],
  [1, 2, 3],
]);
```
