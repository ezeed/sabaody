interface RunStatus {
  [key: string]: 'idle' | 'pass' | 'fail' | 'error';
}

interface Props {
  challenges: string[];
  selected: string;
  onSelect: (name: string) => void;
  statuses: RunStatus;
}

const statusColors: Record<string, string> = {
  idle: 'bg-[var(--surface1)]',
  pass: 'bg-[var(--green)]',
  fail: 'bg-[var(--red)]',
  error: 'bg-[var(--yellow)]',
};

export function ChallengeList({ challenges, selected, onSelect, statuses }: Props) {
  return (
    <aside className="w-56 flex-shrink-0 border-r border-[var(--surface0)] overflow-y-auto">
      <div className="px-3 py-3 text-xs font-semibold text-[var(--overlay0)] uppercase tracking-wider border-b border-[var(--surface0)]">
        Challenges
      </div>
      <ul>
        {challenges.map(name => (
          <li key={name}>
            <button
              onClick={() => onSelect(name)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors ${
                selected === name
                  ? 'bg-[var(--surface0)] text-[var(--text)]'
                  : 'text-[var(--subtext)] hover:bg-[var(--surface0)] hover:text-[var(--text)]'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full flex-shrink-0 ${statusColors[statuses[name] ?? 'idle']}`}
              />
              <span className="truncate">{name}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
