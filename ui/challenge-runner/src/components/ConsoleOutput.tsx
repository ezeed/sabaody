interface Props {
  logs: string[];
}

export function ConsoleOutput({ logs }: Props) {
  if (logs.length === 0) return null;

  return (
    <div className="border-t border-[var(--surface0)]">
      <div className="px-3 py-1.5 text-xs font-semibold text-[var(--overlay0)] uppercase tracking-wider border-b border-[var(--surface0)]">
        Console
      </div>
      <div className="p-3 overflow-y-auto max-h-40 font-mono text-xs">
        {logs.map((line, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap leading-5 ${
              line.startsWith('[error]')
                ? 'text-[var(--red)]'
                : line.startsWith('[warn]')
                  ? 'text-[var(--yellow)]'
                  : line.startsWith('[shim]')
                    ? 'text-[var(--overlay0)]'
                    : 'text-[var(--text)]'
            }`}
          >
            <span className="text-[var(--overlay0)] mr-2">›</span>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
