/**
 * Randomly selects an item from array `arr`.
 * @returns A randomly selected item from `arr`.
 */
export function selectRandom(arr: any[]) {
  const randomIdx = Math.floor(Math.random() * arr.length);
  return arr[randomIdx];
}
