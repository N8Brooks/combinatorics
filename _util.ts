/** Random integer between 0 and up to, but not including, `stop`. */
export function randRange(stop: number) {
  return Math.floor(stop * Math.random());
}
