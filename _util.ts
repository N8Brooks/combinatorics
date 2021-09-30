/** Returns an array of length `n` containing elements `0` through `n - 1` */
export function range(n: number): number[] {
  const result = Array(n);
  for (let i = 0; i < n; i++) {
    result[i] = i;
  }
  return result;
}

/** Return `n` factorial as an integer. */
export function factorial(n: number): number {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
