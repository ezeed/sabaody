import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onRun: () => void;
  onReset: () => void;
  isRunning: boolean;
}

export function CodeEditor({
  value,
  onChange,
  onRun,
  onReset,
  isRunning,
}: Props) {
  const monaco = useMonaco();

  useEffect(() => {
    if (!monaco) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ts = (monaco.languages as any).typescript;
    if (!ts) return;
    ts.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    });
  }, [monaco]);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--surface0)] flex-shrink-0">
        <button
          onClick={onRun}
          disabled={isRunning}
          className="px-3 py-1 text-xs font-semibold rounded bg-[var(--blue)] text-[var(--base)] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          {isRunning ? "Running…" : "▶ Run"}
        </button>
        <button
          onClick={onReset}
          disabled={isRunning}
          className="px-3 py-1 text-xs font-semibold rounded border border-[var(--surface1)] text-[var(--subtext)] hover:text-[var(--text)] hover:border-[var(--overlay0)] disabled:opacity-50 transition-colors"
        >
          ↺ Reset
        </button>
        <span className="ml-auto text-xs text-[var(--overlay0)]">
          TypeScript
        </span>
      </div>
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          language="typescript"
          value={value}
          onChange={(v) => onChange(v ?? "")}
          theme="vs-dark"
          options={{
            fontSize: 13,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontLigatures: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbers: "on",
            renderLineHighlight: "line",
            tabSize: 2,
            wordWrap: "on",
            padding: { top: 12 },
          }}
        />
      </div>
    </div>
  );
}
