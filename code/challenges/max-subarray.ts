// Problem A: Max Subarray Sum
// Given an array of integers and a number k, return the maximum sum of any contiguous subarray of size k.
// maxSum([2, 1, 5, 1, 3, 2], 3)  → 9   // [5, 1, 3]
// maxSum([2, 3, 4, 1, 5], 2)     → 7   // [3, 4]
// maxSum([1, 1, 1, 1, 1], 3)     → 3
// maxSum([-1, -2, -3, -4], 2)    → -3  // [-1, -2]

import { runTests } from './utils';

function maxSum(arr: number[], int: number) {
  if (int > arr.length) return null;
  if (int === arr.length) return arr;

  let windowSum = 0;
  let maxSum = 0;

  for (let i = 0; arr.length > i; i++) {
    if (i < int) {
      windowSum += arr[i]; // build first window into windowSum
      if (i === int - 1) maxSum = windowSum;
    } else {
      const indexToDrop = i - int;
      windowSum = windowSum - arr[indexToDrop] + arr[i];
      if (windowSum > maxSum) maxSum = windowSum;
    }
  }
  return maxSum;
}

runTests([
  [maxSum([2, 1, 5, 1, 3, 2], 3), 9], // [5, 1, 3]
  [maxSum([2, 3, 4, 1, 5], 2), 7], // [3, 4]
  [maxSum([1, 1, 1, 1, 1], 3), 3],
  [maxSum([-1, -2, -3, -4], 2), -3], // [-1, -2]
]);
