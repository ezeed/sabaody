import { StatsType, EndTypes } from '../../types';

import Restart from '../../../assets/images/icon-restart.svg?react';
import Completed from '../../../assets/images/icon-completed.svg?react';
import NewPersonalBest from '../../../assets/images/icon-new-pb.svg?react';
import PatternConfetti from '../../../assets/images/pattern-confetti.svg?react';
import PatterStarRigth from '../../../assets/images/pattern-star-1.svg?react';
import PatternStarLeft from '../../../assets/images/pattern-star-2.svg?react';

interface EndedSessionProps {
  stats: StatsType;
  endType: keyof typeof EndTypes;
  handleReset: () => void;
}

const HoveredCompleted = () => (
  <div className="flex rounded-4xl shadow-[0px_0px_0px_10px] shadow-green-400/10 sm:shadow-[0px_0px_1px_20px]">
    <div className="flex rounded-4xl shadow-[0px_0px_0px_5px] shadow-green-400/25 sm:shadow-[0px_0px_1px_10px]">
      <Completed width={40} height={40} className="sm:hidden" />
      <Completed className="hidden sm:block" />
    </div>
  </div>
);

const endScenario = {
  regular: {
    icon: <HoveredCompleted />,
    title: 'Test Complete!',
    description: 'Solid run. Keep pushing to beat your high score.',
    retryBtnText: 'Go Again',
  },
  newRecord: {
    icon: <NewPersonalBest />,
    title: 'High Score Smashed!',
    description: "You're getting faster. That was incredible typing.",
    retryBtnText: 'Beat This Score',
  },
  baseline: {
    icon: <HoveredCompleted />,
    title: 'Baseline Established!',
    description:
      "You've set the bar. Now the real challenge begins-time to beat it.",
    retryBtnText: 'Beat This Score',
  },
};

export const EndedSession = ({
  stats,
  endType,
  handleReset,
}: EndedSessionProps) => {
  const { description, icon, retryBtnText, title } = endScenario[endType];
  return (
    <div className="relative flex w-full flex-1 flex-col overflow-hidden">
      {/* main stats */}
      <div className="flex w-full flex-col justify-around sm:flex-row">
        {endType !== EndTypes.newRecord && (
          <div className="hidden pt-15 sm:relative sm:block">
            <PatternStarLeft width={25} />
          </div>
        )}
        <div className="flex flex-col items-center gap-10 p-5">
          {icon}
          {endType !== EndTypes.newRecord && (
            <PatternStarLeft
              className="absolute left-5 mt-5 sm:hidden"
              width={15}
            />
          )}
          <span className="text-center">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-md text-neutral-500">{description}</p>
          </span>
          <div className="flex w-full flex-col gap-3 text-neutral-500 sm:flex-row">
            <div className="flex min-w-0 flex-1 flex-col rounded-md border border-neutral-700 p-3">
              <span>WPM:</span>
              <span className="font-bold text-neutral-100">{stats.wpm}</span>
            </div>
            <div className="flex min-w-0 flex-1 flex-col rounded-md border border-neutral-700 p-3">
              <span>Accuracy:</span>
              <span
                className={`${stats.accuracy === 100 ? 'text-green-400' : 'text-red-500'} font-bold`}
              >
                {stats.accuracy}%
              </span>
            </div>
            <div className="flex min-w-0 flex-1 flex-col rounded-md border border-neutral-700 p-3">
              <span>Characters:</span>
              <span>
                <span className="font-bold text-green-500">
                  {stats.correctChar}
                </span>
                /
                <span className="font-bold text-red-500">
                  {stats.incorrectChar}
                </span>
              </span>
            </div>
          </div>

          <button
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-neutral-100 px-4 py-2 text-neutral-900 hover:bg-neutral-400"
            onClick={handleReset}
          >
            {retryBtnText} <Restart color="black" width={15} height={15} />
          </button>
        </div>
        {endType !== EndTypes.newRecord && (
          <div className="sm:relative sm:block">
            <div className="absolute right-5 bottom-25 sm:bottom-5">
              <PatterStarRigth width={40} height={40} className="sm:hidden" />
              <PatterStarRigth className="hidden sm:block" />
            </div>
          </div>
        )}
      </div>
      {endType === EndTypes.newRecord && (
        <div className="w-full">
          <PatternConfetti
            height={200}
            className="absolute bottom-0 sm:hidden"
          />
          <PatternConfetti className="hidden sm:absolute sm:bottom-0 sm:block sm:w-full" />
        </div>
      )}
    </div>
  );
};
