/*
Problem: Two Sum
Given an array of integers nums and a target integer target, return the indices of the two numbers that add up to the target.
You may assume each input has exactly one solution, and you may not use the same element twice. The answer can be returned in any order.
Examples:
twoSum([2, 7, 11, 15], 9)  → [0, 1]  // 2 + 7 = 9
twoSum([3, 2, 4], 6)       → [1, 2]  // 2 + 4 = 6
twoSum([3, 3], 6)           → [0, 1]  // 3 + 3 = 6
Constraints:

Don't use a nested loop (no O(n²)) — solve it in O(n)
Return the indices, not the values
*/

import { runTests, TestType } from './utils/run';

// First attempt
// function twoSum(arr: number[], numberTarget: number): number[] {
//   const indexList = [];
//   for (let i = 0; arr.length > i; i++) {
//     const current = arr[i];
//     const next = arr[i + 1];
//     if (current + next === numberTarget) {
//       console.log('IS EQUAL', current, next, numberTarget);
//       indexList.push(i, i + 1);
//     }
//   }
//   return indexList;
// }

// Correct approach
// function twoSum(arr: number[], numberTarget: number): number[] {
//   const notebook = new Map<number, number>();

//   for (let i = 0; i < arr.length; i++) {
//     const complement = numberTarget - arr[i];
//     if (notebook.has(complement)) {
//       return [notebook.get(complement)!, i];
//     }
//     notebook.set(arr[i], i);
//   }

//   return [];
// }

function twoSum(arr: number[], numberTarget: number): number[] {
  const resp = arr.reduce(
    (accum, current, index) => {
      const complement = numberTarget - current;
      const complementIndex = accum.notebook.get(complement);
      if (complementIndex !== undefined) {
        accum.indexes.push(complementIndex, index);
      } else {
        accum.notebook.set(current, index);
      }
      return accum;
    },
    { notebook: new Map(), indexes: [] }
  );
  return resp.indexes;
}

const testsParams: TestType[] = [
  { name: 'TEST 1', actual: twoSum([2, 7, 11, 15], 9), expected: [0, 1] },
  { name: 'TEST 2', actual: twoSum([3, 2, 4], 6), expected: [1, 2] },
  { name: 'TEST 3', actual: twoSum([3, 3], 6), expected: [0, 1] },
  { name: 'TEST 3', actual: twoSum([2, 11, 7], 9), expected: [0, 2] },
];

runTests(testsParams);
