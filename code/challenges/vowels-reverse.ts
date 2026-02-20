import { runTests, TestSuite } from './utils/run';

/*
Description: 
You are given a string consisting of lowercase words, each separated by a single space. Determine how many vowels appear in the first word. 
Then, reverse each following word that has the same vowel count.
*/

const vowels = ['a', 'e', 'i', 'o', 'u'];
function howManyVowels(str: string) {
  return str.split('').reduce((accum, current) => {
    if (vowels.includes(current)) {
      accum++;
    }
    return accum;
  }, 0);
}
function flippedy(str: string) {
  const words = str.split(' ');
  const firstWord = words[0] || '';
  const vowelsCount = howManyVowels(firstWord);
  const reversedWords = words.map((word, index) =>
    index !== 0 && howManyVowels(word) === vowelsCount
      ? word.split('').reverse().join('')
      : word
  );
  return reversedWords.join(' ');
}

// const countVowels = (s?: string) => {
//   if (s === undefined) return 0;
//   return (s.match(/[aeiou]/g) ?? []).length;
// };
// function flippedy(str: string) {
//   const [first, ...rest] = str.split(' ');
//   const n = countVowels(first);
//   return [
//     first,
//     ...rest.map(w => (countVowels(w) === n ? [...w].reverse().join('') : w)),
//   ].join(' ');
// }

const testCases: TestSuite[] = [
  {
    actual: flippedy('cat and mice'),
    expected: 'cat dna mice',
    name: 'Test 1',
  },
  {
    actual: flippedy('banana healthy'),
    expected: 'banana healthy',
    name: 'Test 2',
  },
  {
    actual: flippedy('banana healthy ananat'),
    expected: 'banana healthy tanana',
    name: 'Test 3',
  },
];

runTests(testCases);
