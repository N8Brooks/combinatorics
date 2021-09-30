/** Returns an array of length `n` containing elements `0` through `n - 1` */
export function range(n: number): number[] {
  if (!Number.isInteger(n)) {
    throw RangeError("n must be an integer");
  }
  const result = Array(Math.max(0, n));
  for (let i = 0; i < n; i++) {
    result[i] = i;
  }
  return result;
}

/** Return `n` factorial as an integer. */
export function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) {
    throw RangeError("n must be a non-negative integer");
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
