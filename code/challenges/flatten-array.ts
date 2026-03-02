// Problem C: Flatten Array
// Given a nested array of any depth, return a flat array with all values.
// flatten([1, [2, 3], [4, [5, 6]]])        → [1, 2, 3, 4, 5, 6]
// flatten([1, [2, [3, [4, [5]]]]])         → [1, 2, 3, 4, 5]
// flatten([1, 2, 3])                       → [1, 2, 3]
// flatten([])

import { runTests } from './utils';

type NestedArray<T> = (T | NestedArray<T>)[];

function flatten(arr: NestedArray<number>): number[] {
  if (!Array.isArray(arr)) return [];
  const result = [];
  for (let i = 0; arr.length > i; i++) {
    if (Array.isArray(arr[i])) {
      const innerArr = flatten(arr[i] as NestedArray<number>);
      console.log('inner', innerArr);
      result.push(...innerArr);
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

runTests([
  [flatten([1, [2, 3], [4, [5, 6]]]), [1, 2, 3, 4, 5, 6]],
  [flatten([1, [2, [3, [4, [5]]]]]), [1, 2, 3, 4, 5]],
  [flatten([1, 2, 3]), [1, 2, 3]],
  [flatten([]), []],
  [flatten([[[[1]]]]), [1]],
  [flatten([1, [2, [3]], [4, [5, [6, [7]]]]]), [1, 2, 3, 4, 5, 6, 7]],
]);
