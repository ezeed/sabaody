/*
This week's question:
You have a 2D grid of numbers. 
Write a function that zooms in by an integer factor k >= 2 by turning each cell into a k x k block with the same value,
returning the bigger grid.
*/

import { runTests, TestSuite } from './utils/run';

// ==========================================
// YOUR ORIGINAL SOLUTION (working but complex)
// ==========================================
function zoom(arr: number[] | Array<number[]>, count: number) {
  const response = arr
    .map(val => Array(count).fill(Array(count).fill(val).flat().sort()))
    .flat();
  return response;
}

// ==========================================
// IMPROVED SOLUTIONS
// ==========================================

// // Option 1: Most readable - shows the logic clearly
// function zoom(grid: number[][], k: number): number[][] {
//   const result: number[][] = [];

//   for (const row of grid) {
//     // Step 1: Expand each cell in the row horizontally (k times)
//     const expandedRow = row.flatMap(cell => Array(k).fill(cell));

//     // Step 2: Duplicate the expanded row vertically (k times)
//     for (let i = 0; i < k; i++) {
//       result.push(expandedRow);
//     }
//   }

//   return result;
// }

// Option 2: More concise with flatMap
// function zoomConcise(grid: number[][], k: number): number[][] {
//   return grid.flatMap(row =>
//     Array(k).fill(row.flatMap(cell => Array(k).fill(cell)))
//   );
// }

// Option 3: Functional approach with reduce
// function zoomFunctional(grid: number[][], k: number): number[][] {
//   return grid.reduce<number[][]>((acc, row) => {
//     const expandedRow = row.flatMap(cell => Array(k).fill(cell));
//     return [...acc, ...Array(k).fill(expandedRow)];
//   }, []);
// }

const zoom1 = zoom(
  [
    [1, 2],
    [3, 4],
  ],
  2
);
const result1 = [
  [1, 1, 2, 2],
  [1, 1, 2, 2],
  [3, 3, 4, 4],
  [3, 3, 4, 4],
];

const zoom2 = zoom([[7, 8, 9]], 3);
const result2 = [
  [7, 7, 7, 8, 8, 8, 9, 9, 9],
  [7, 7, 7, 8, 8, 8, 9, 9, 9],
  [7, 7, 7, 8, 8, 8, 9, 9, 9],
];

const zoom3 = zoom([[1], [2]], 3);
const result3 = [
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1],
  [2, 2, 2],
  [2, 2, 2],
  [2, 2, 2],
];

const testsParams: TestSuite[] = [
  { name: 'TEST 1', actual: zoom1, expected: result1 },
  { name: 'TEST 2', actual: zoom2, expected: result2 },
  { name: 'TEST 3', actual: zoom3, expected: result3 },
];

runTests(testsParams);
