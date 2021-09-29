/** Returns an array of length `n` containing elements `0` through `n - 1` */
export function range(n: number): number[] {
  const result = Array(n);
  for (let i = 0; i < n; i++) {
    result[i] = i;
  }
  return result;
}
