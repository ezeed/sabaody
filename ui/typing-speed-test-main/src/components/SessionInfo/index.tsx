import { StatsType, GameStatus } from '../../types';

export const SessionInfo = ({
  gameStatus,
  stats,
  timeLeft,
}: {
  gameStatus: keyof typeof GameStatus;
  stats: StatsType;
  timeLeft: number;
}) => {
  return (
    <div className="flex divide-x divide-neutral-700 text-neutral-500">
      <span className="px-6 text-center">
        WPM: <span className="font-bold text-neutral-100">{stats.wpm}</span>
      </span>
      <span className="px-6 text-center">
        Accuracy:{' '}
        <span
          className={`${gameStatus === GameStatus.started ? 'text-red-400' : 'text-neutral-100'} font-bold`}
        >
          {stats.accuracy}%
        </span>
      </span>
      <span className="px-6 text-center">
        Time:{' '}
        <span
          className={`${gameStatus === GameStatus.started ? 'text-yellow-300' : 'text-neutral-100'} font-bold`}
        >
          {timeLeft}
        </span>
      </span>
    </div>
  );
};
