import type { TestResult } from '../worker/runner.worker';

interface Props {
  results: TestResult[];
  isRunning: boolean;
}

export function TestResults({ results, isRunning }: Props) {
  if (isRunning) {
    return (
      <div className="flex items-center justify-center h-full text-[var(--overlay0)] text-sm gap-2">
        <span className="animate-spin">⟳</span>
        Running…
      </div>
    );
  }

  if (results.length === 0) return null;

  const passed = results.filter(r => r.status === 'pass').length;
  const total = results.length;
  const allPass = passed === total;

  return (
    <div className="overflow-y-auto">
      <div className="px-3 py-1.5 flex items-center justify-between text-xs border-b border-[var(--surface0)]">
        <span className="font-semibold text-[var(--overlay0)] uppercase tracking-wider">
          Test Results
        </span>
        <span
          className={`font-semibold ${allPass ? 'text-[var(--green)]' : 'text-[var(--red)]'}`}
        >
          {passed}/{total} passed
        </span>
      </div>
      <div className="p-2 flex flex-col gap-1.5">
        {results.map((r, i) => (
          <div
            key={i}
            className={`rounded px-3 py-2 text-xs border ${
              r.status === 'pass'
                ? 'border-[var(--green)]/30 bg-[var(--green)]/5'
                : 'border-[var(--red)]/30 bg-[var(--red)]/5'
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{r.status === 'pass' ? '✅' : '❌'}</span>
              <span
                className={
                  r.status === 'pass' ? 'text-[var(--green)]' : 'text-[var(--red)]'
                }
              >
                {r.name}
              </span>
            </div>
            {r.status === 'fail' && (
              <div className="mt-1.5 pl-6 font-mono space-y-0.5">
                <div>
                  <span className="text-[var(--overlay0)]">expected: </span>
                  <span className="text-[var(--green)]">{JSON.stringify(r.expected)}</span>
                </div>
                <div>
                  <span className="text-[var(--overlay0)]">received: </span>
                  <span className="text-[var(--red)]">{JSON.stringify(r.actual)}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
