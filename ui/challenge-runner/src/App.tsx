import { useState, useCallback, useRef } from 'react';
import { challenges as allChallenges } from 'virtual:challenges';
import { ChallengeList } from './components/ChallengeList';
import { CodeEditor } from './components/CodeEditor';
import { TestResults } from './components/TestResults';
import { ConsoleOutput } from './components/ConsoleOutput';
import type { TestResult, WorkerResult } from './worker/runner.worker';

type RunStatus = 'idle' | 'pass' | 'fail' | 'error';

const challengeNames = Object.keys(allChallenges).sort();

export default function App() {
  const [selected, setSelected] = useState<string>(challengeNames[0] ?? '');
  const [code, setCode] = useState<string>(allChallenges[challengeNames[0]] ?? '');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [statuses, setStatuses] = useState<Record<string, RunStatus>>({});
  const workerRef = useRef<Worker | null>(null);

  const selectChallenge = useCallback((name: string) => {
    setSelected(name);
    setCode(allChallenges[name] ?? '');
    setTestResults([]);
    setConsoleLogs([]);
  }, []);

  const runCode = useCallback(() => {
    if (isRunning) return;

    // Kill previous worker if still running
    workerRef.current?.terminate();
    setIsRunning(true);
    setTestResults([]);
    setConsoleLogs([]);

    const worker = new Worker(
      new URL('./worker/runner.worker.ts', import.meta.url),
      { type: 'module' }
    );
    workerRef.current = worker;

    worker.onmessage = (e: MessageEvent<WorkerResult>) => {
      const { type, tests, logs, message } = e.data;
      setIsRunning(false);
      worker.terminate();

      if (type === 'error') {
        setConsoleLogs([`[error] ${message ?? 'Unknown error'}`]);
        setStatuses(s => ({ ...s, [selected]: 'error' }));
        return;
      }

      setTestResults(tests ?? []);
      setConsoleLogs(logs ?? []);

      if ((tests ?? []).length > 0) {
        const allPass = (tests ?? []).every(t => t.status === 'pass');
        setStatuses(s => ({ ...s, [selected]: allPass ? 'pass' : 'fail' }));
      } else {
        setStatuses(s => ({ ...s, [selected]: 'idle' }));
      }
    };

    worker.onerror = (err) => {
      setIsRunning(false);
      setConsoleLogs([`[error] ${err.message}`]);
      setStatuses(s => ({ ...s, [selected]: 'error' }));
      worker.terminate();
    };

    worker.postMessage({ source: code });
  }, [code, isRunning, selected]);

  const resetCode = useCallback(() => {
    setCode(allChallenges[selected] ?? '');
    setTestResults([]);
    setConsoleLogs([]);
  }, [selected]);

  const hasResults = testResults.length > 0 || consoleLogs.length > 0;

  return (
    <div className="flex h-screen bg-[var(--base)]">
      <ChallengeList
        challenges={challengeNames}
        selected={selected}
        onSelect={selectChallenge}
        statuses={statuses}
      />

      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <header className="flex items-center px-4 py-2.5 border-b border-[var(--surface0)] flex-shrink-0">
          <h1 className="text-sm font-semibold text-[var(--mauve)]">{selected}</h1>
        </header>

        {/* Main split: editor + results */}
        <div className="flex flex-1 min-h-0">
          {/* Editor panel */}
          <div className="flex flex-col flex-1 min-w-0 min-h-0">
            <CodeEditor
              value={code}
              onChange={setCode}
              onRun={runCode}
              onReset={resetCode}
              isRunning={isRunning}
            />
          </div>

          {/* Results panel */}
          {(hasResults || isRunning) && (
            <div className="w-80 flex-shrink-0 border-l border-[var(--surface0)] flex flex-col overflow-hidden bg-[var(--base)]">
              <div className="flex-1 overflow-y-auto">
                <TestResults results={testResults} isRunning={isRunning} />
              </div>
              {!isRunning && <ConsoleOutput logs={consoleLogs} />}
            </div>
          )}
        </div>

        {/* Empty state */}
        {!hasResults && !isRunning && (
          <div className="absolute bottom-4 right-4 text-xs text-[var(--overlay0)]">
            Press ▶ Run to execute
          </div>
        )}
      </div>
    </div>
  );
}
