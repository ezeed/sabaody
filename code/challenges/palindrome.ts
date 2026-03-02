// Problem B: Is Palindrome
// Given a string, return true if it reads the same forwards and backwards. Ignore spaces and make it case-insensitive.
// isPalindrome("racecar")       → true
// isPalindrome("A man a plan a canal Panama")  → true
// isPalindrome("hello")         → false
// isPalindrome("Was it a car or a cat I saw")  → true
// isPalindrome("")              → true

import { runTests } from './utils';

function isPalindrome(str: string) {
  const word = str.toLowerCase().replace(/\s/g, '');
  let right = word.length - 1;
  for (let left = 0; left < right; left++) {
    if (word[left] !== word[right]) return false;
    right--;
  }
  return true;
}

runTests([
  [isPalindrome('racecar'), true],
  [isPalindrome('A man a plan a canal Panama'), true],
  [isPalindrome('hello'), false],
  [isPalindrome('Was it a car or a cat I saw'), true],
  [isPalindrome(''), true],
  [isPalindrome('abba'), true],
]);
