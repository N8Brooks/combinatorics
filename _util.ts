/** Returns an array of length `stop` containing elements `0` through `stop - 1` */
export function range(stop: number): number[] {
  const result = Array(stop);
  for (let i = 0; i < stop; i++) {
    result[i] = i;
  }
  return result;
}
