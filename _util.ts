/** Random integer between `0` and `stop - 1` */
export function randRange(stop: number) {
  return Math.floor(stop * Math.random());
}

/** Returns an array of length `stop` containing elements `0` through `stop - 1` */
export function range(stop: number) {
  const result = Array(stop);
  for (let i = 0; i < stop; i++) {
    result[i] = i;
  }
  return result;
}
