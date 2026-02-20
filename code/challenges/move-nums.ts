// Given an integer array and a number n, move all of the ns to the end of the array while maintaining the relative order of the non-ns.
// Bonus: do this without making a copy of the array!

import { runTests, TestSuite } from './utils/run';

function moveNums(list: number[], n: number): number[] {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === n) {
      list.splice(i, 1);
      list.push(n);
    }
    console.log(list[i]);
  }
  return list;
}

// function moveNums(list: number[], n: number): number[] {
//   const originalLength = list.length;
//   let i = 0;

//   while (i < originalLength) {
//     if (list[i] === n) {
//       list.splice(i, 1);
//       list.push(n);
//     } else {
//       i++;
//     }
//   }

//   return list;
// }

// function moveNums(list: number[], n: number): number[] {
//   const nonN = list.filter(x => x !== n);
//   const nValues = list.filter(x => x === n);
//   return [...nonN, ...nValues];
// }

const testsParams: TestSuite[] = [
  {
    name: 'TEST 1',
    actual: moveNums([0, 2, 0, 3, 10], 0),
    expected: [2, 3, 10, 0, 0],
  },
  {
    name: 'TEST 2',
    actual: moveNums([0, 2, 0, 3, 10], 3),
    expected: [0, 2, 0, 10, 3],
  },
  {
    name: 'TEST 3',
    actual: moveNums([1, 0, 2, 1, 0, 3, 1, 10], 1),
    expected: [0, 2, 0, 3, 10, 1, 1, 1],
  },
];

runTests(testsParams);
