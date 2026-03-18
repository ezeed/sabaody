import { runTests } from './utils';

function merge(left: number[], right: number[]) {
  const result = [];
  let il = 0;
  let ir = 0;

  while (il < left.length && ir < right.length) {
    if (left[il] <= right[ir]) {
      result.push(left[il]);
      il++;
    } else {
      result.push(right[ir]);
      ir++;
    }
  }
  const overflowL = left.slice(il);
  const overflowR = right.slice(ir);
  return [...result, ...overflowL, ...overflowR];
}

merge([1, 3], [2, 4]);

function mergeSort(arr: number[]) {
  if (arr.length <= 1) return arr;
  const half = Math.floor(arr.length / 2);
  const firstHalf = arr.slice(0, half);
  const secondHalf = arr.slice(half);
  return merge(mergeSort(firstHalf), mergeSort(secondHalf));
}

runTests([
  [
    mergeSort([8, 2, 3, 1, 2, 8, 7, 1, 2, 0, 9, 7, 4, 3, 8, 9]),
    [0, 1, 1, 2, 2, 2, 3, 3, 4, 7, 7, 8, 8, 8, 9, 9],
  ],
  [mergeSort([5, 1, 2, 6, 9, 7, 4, 3, 8, 9]), [1, 2, 3, 4, 5, 6, 7, 8, 9, 9]],
]);
