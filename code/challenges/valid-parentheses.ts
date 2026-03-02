import { runTests, TestPlain } from './utils';

/*
Problem: Valid Parentheses
Given a string containing only the characters (, ), {, }, [ and ], determine if the input string is valid.
A string is valid if:

Every opening bracket has a corresponding closing bracket of the same type
Brackets are closed in the correct order

Examples:
isValid("()")        → true
isValid("()[]{}")    → true
isValid("(]")        → false
isValid("([)]")      → false
isValid("{[]}")      → true
isValid("")          → true
isValid("(")         → false
Constraints:

O(n) solution only
No nested loops


Hint to get you started
Think about what happens when you see an opening bracket — you need to remember it until you see its matching closing bracket. And the last one opened must be the first one closed. That "last in, first out" pattern has a classic data structure associated with it. 🥞
Go for it.
*/

const Parentheses = '(';
const Brackets = '[';
const Keys = '{';
const ParenthesesClose = ')';
const BracketsClose = ']';
const KeysClose = '}';

// Structure to to validate
const validMap = new Map();
validMap.set(ParenthesesClose, Parentheses);
validMap.set(BracketsClose, Brackets);
validMap.set(KeysClose, Keys);

function isOpener(str: string) {
  return str === Parentheses || str === Keys || str === Brackets;
}

function isValid(str: string): boolean {
  if (str === '') return true;
  const listChar = str.split('');
  const stack = [];

  for (let i = 0; listChar.length > i; i++) {
    const current = listChar[i];
    if (isOpener(current)) {
      stack.push(current);
    } else {
      if (stack.length === 0) return false;
      if (validMap.get(current) !== stack[stack.length - 1]) return false;

      stack.pop();
    }
  }
  return stack.length === 0;
}

// First approach
// function isValid(str: string): boolean {
//   if (str === '') return true;
//   const listChar = str.split('');
//   if (listChar.length === 1) return false;
//   if ([ParenthesesClose, BracketsClose, KeysClose].includes(listChar[0]))
//     return false;

//   for (let i = 0; listChar.length > i; i++) {
//     const current = listChar[i];
//     const nextOne = listChar[i + 1];

//     if (ValidMap.get(current) !== nextOne) {
//       if (!validateOpener(nextOne)) {
//         return false;
//       }
//     }
//   }
//   return true;
// }

const testSuite: TestPlain[] = [
  [isValid('()'), true],
  [isValid('()[]{}'), true],
  [isValid('(]'), false],
  [isValid('([)]'), false],
  [isValid('{[]}'), true],
  [isValid(''), true],
  [isValid('('), false],
  [isValid('[()]'), true], // [] wraps ()
  [isValid('([])'), true], // () wraps []
  [isValid('[({[]})]'), true], // complex nesting, all properly closed
  [isValid('[(])'), false],
];

runTests(testSuite);
