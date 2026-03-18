/// <reference lib="webworker" />

import { transform } from 'sucrase';

export interface TestResult {
  name: string;
  status: 'pass' | 'fail';
  actual: unknown;
  expected: unknown;
}

export interface WorkerResult {
  type: 'results' | 'error';
  tests?: TestResult[];
  logs?: string[];
  message?: string;
}

const FLUSH_DELAY = 1500;

self.onmessage = (e: MessageEvent<{ source: string }>) => {
  const testResults: TestResult[] = [];
  const consoleLogs: string[] = [];

  const consoleShim = {
    log: (...args: unknown[]) => {
      consoleLogs.push(
        args
          .map(a => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)))
          .join(' ')
      );
    },
    error: (...args: unknown[]) => {
      consoleLogs.push('[error] ' + args.map(String).join(' '));
    },
    warn: (...args: unknown[]) => {
      consoleLogs.push('[warn] ' + args.map(String).join(' '));
    },
  };

  function deepStrictEqual(actual: unknown, expected: unknown): void {
    const a = JSON.stringify(actual);
    const b = JSON.stringify(expected);
    if (a !== b) {
      const err = new Error(`Expected ${b}, got ${a}`);
      err.name = 'AssertionError';
      (err as unknown as Record<string, unknown>).actual = actual;
      (err as unknown as Record<string, unknown>).expected = expected;
      throw err;
    }
  }

  function runTests(tests: unknown[]): void {
    tests.forEach((raw: unknown, i: number) => {
      const t = Array.isArray(raw)
        ? { name: `Test ${i + 1}`, actual: raw[0], expected: raw[1] }
        : (raw as { name: string; actual: unknown; expected: unknown });
      try {
        deepStrictEqual(t.actual, t.expected);
        testResults.push({ name: t.name, status: 'pass', actual: t.actual, expected: t.expected });
      } catch {
        testResults.push({ name: t.name, status: 'fail', actual: t.actual, expected: t.expected });
      }
    });
    flush();
  }

  function flush() {
    (self as unknown as Worker).postMessage({
      type: 'results',
      tests: testResults,
      logs: consoleLogs,
    } satisfies WorkerResult);
  }

  function require(moduleName: string): Record<string, unknown> {
    const utilsShim = { runTests, deepStrictEqual };
    const cryptoShim = {
      createHash: (algorithm: string) => {
        consoleLogs.push(`[shim] createHash('${algorithm}') — node:crypto is not available in browser`);
        return {
          update: () => ({ digest: () => '[hash-unavailable-in-browser]' }),
        };
      },
    };
    const map: Record<string, Record<string, unknown>> = {
      './utils/run': utilsShim,
      './utils': utilsShim,
      '../utils/run': utilsShim,
      '../utils': utilsShim,
      'crypto': cryptoShim,
      'node:crypto': cryptoShim,
      'node:assert': { deepStrictEqual },
    };

    return map[moduleName] ?? {};
  }

  try {
    const { code: js } = transform(e.data.source, {
      transforms: ['typescript', 'imports'],
    });

    // Provide CommonJS-like environment
    const exports: Record<string, unknown> = {};
    const module = { exports };

    // eslint-disable-next-line no-new-func
    const fn = new Function('require', 'exports', 'module', 'console', 'process', js);
    fn(
      require,
      exports,
      module,
      consoleShim,
      { stderr: { write: (s: string) => consoleLogs.push(s) }, env: {} }
    );

    // For challenges without runTests (async or console-only), flush after delay
    setTimeout(flush, FLUSH_DELAY);
  } catch (err) {
    (self as unknown as Worker).postMessage({
      type: 'error',
      message: String(err),
    } satisfies WorkerResult);
  }
};
