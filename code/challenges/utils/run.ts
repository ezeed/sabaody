import { deepStrictEqual } from 'node:assert';

export type TestSuite = {
  name: string;
  actual: unknown;
  expected: unknown;
};

// Simple test runner
export function runTests(tests: TestSuite[]) {
  let passed = 0;
  let failed = 0;

  console.log('\n=== Running Tests ===\n');

  tests.forEach(test => {
    try {
      deepStrictEqual(test.actual, test.expected);
      console.log(`✅ ${test.name}: PASSED`);
      console.log(` - Got:     `, JSON.stringify(test.actual));
      console.log('\n');
      passed++;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log(`⚠️ ${test.name}: FAILED`);
      console.log(` - Expected:`, JSON.stringify(test.expected));
      console.log(` - Got:     `, JSON.stringify(test.actual));
      console.log('\n');
      failed++;
    }
  });

  console.log(`\n=== Summary ===`);
  console.log(`Passed: ${passed}/${tests.length}`);
  console.log(`Failed: ${failed}/${tests.length}`);
}
