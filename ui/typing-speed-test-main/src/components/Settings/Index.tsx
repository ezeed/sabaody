import { DEFAULT_SECONDS } from '../../constants';
import { Difficulty, Mode, GameStatus } from '../../types';
import { Dropdown } from '../Dropdown';

interface SettingsProps {
  gameStatus: keyof typeof GameStatus;
  selectedDifficulty: keyof typeof Difficulty;
  selectedMode: keyof typeof Mode;
  setDifficulty: (difficulty: keyof typeof Difficulty) => void;
  setMode: (mode: keyof typeof Mode) => void;
}

function capitalize(mychar: string) {
  return mychar.charAt(0).toUpperCase() + mychar.slice(1);
}

const ModeOptions = [
  {
    label: `${capitalize(Mode.time)} (${DEFAULT_SECONDS})`,
    value: Mode.time,
  },
  {
    label: `${capitalize(Mode.passage)}`,
    value: Mode.passage,
  },
];

export function Settings({
  gameStatus,
  selectedDifficulty,
  selectedMode,
  setDifficulty,
  setMode,
}: SettingsProps) {
  return (
    <div className="flex items-center gap-5 px-2 py-4 sm:p-0">
      <div className="flex w-full gap-3 sm:hidden">
        <Dropdown
          options={Object.values(Difficulty).map(d => ({
            label: capitalize(d),
            value: d,
          }))}
          value={selectedDifficulty}
          onChange={newVal => setDifficulty(newVal as keyof typeof Difficulty)}
          disabled={gameStatus !== GameStatus['not-started']}
        />
        <Dropdown
          options={ModeOptions}
          value={selectedMode}
          onChange={newVal => setMode(newVal as keyof typeof Mode)}
          disabled={gameStatus !== GameStatus['not-started']}
        />
      </div>
      {/* Difficult control */}
      <div className="hidden items-center gap-3 sm:flex">
        <span className="text-xs text-neutral-500">Difficulty:</span>
        <div className="flex gap-1">
          {Object.values(Difficulty).map(difficulty => (
            <button
              disabled={gameStatus !== GameStatus['not-started']}
              onClick={() => setDifficulty(difficulty)}
              key={difficulty}
              className={`${difficulty === selectedDifficulty ? 'text-blue-400' : 'text-neutral-100'} rounded-md border p-1 text-center text-xs transition-all hover:cursor-pointer hover:text-blue-400 hover:shadow-lg focus:border focus:border-neutral-100 focus:text-neutral-100 focus:shadow-[0px_0px_1px_2px] focus:shadow-blue-400 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
              type="button"
            >
              {difficulty}
            </button>
          ))}
        </div>
      </div>
      <div className="hidden h-6 w-px bg-neutral-700 sm:inline-block"></div>
      {/* Mode control */}
      <div className="hidden items-center gap-3 sm:flex">
        <span className="text-xs text-neutral-500">Mode:</span>
        <div className="flex gap-1">
          <button
            disabled={gameStatus !== GameStatus['not-started']}
            onClick={() => setMode(Mode.time)}
            className={`${Mode.time === selectedMode ? 'text-blue-400' : 'text-neutral-100'} active rounded-md border p-1 text-center text-xs transition-all hover:cursor-pointer hover:text-blue-400 hover:shadow-lg focus:border focus:border-neutral-100 focus:text-neutral-100 focus:shadow-[0px_0px_1px_2px] focus:shadow-blue-400 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            type="button"
          >
            Time ({DEFAULT_SECONDS})
          </button>
          <button
            disabled={gameStatus !== GameStatus['not-started']}
            onClick={() => setMode(Mode.passage)}
            className={`${Mode.passage === selectedMode ? 'text-blue-400' : 'text-neutral-100'} rounded-md border p-1 text-center text-xs transition-all hover:cursor-pointer hover:text-blue-400 hover:shadow-lg focus:border focus:border-neutral-100 focus:text-neutral-100 focus:shadow-[0px_0px_1px_2px] focus:shadow-blue-400 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            type="button"
          >
            Passage
          </button>
        </div>
      </div>
    </div>
  );
}
