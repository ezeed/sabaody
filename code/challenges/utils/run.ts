import { deepStrictEqual } from 'node:assert';

export type TestType = {
  name: string;
  actual: unknown;
  expected: unknown;
};

export type TestPlain = [actual: unknown, expected: unknown];

// Simple test runner
export function runTests(tests: (TestType | TestPlain)[]) {
  let passed = 0;
  let failed = 0;

  console.log('\n=== Running Tests ===\n');

  tests.forEach((raw, i) => {
    const test: TestType = Array.isArray(raw)
      ? { name: `Test ${i + 1}`, actual: raw[0], expected: raw[1] }
      : raw;

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
