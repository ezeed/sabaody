import { useCallback, useEffect, useMemo, useState } from 'react';
import levels from '../../../data.json';
import { Difficulty, GameStatus, StatsType } from '../../types';

interface Props {
  status: keyof typeof GameStatus;
  difficulty: keyof typeof Difficulty;
  elapsedTime: number;
  onStart: () => void;
  onFinish: () => void;
  updateStats: (newStats: StatsType) => void;
}

function getRandom(max: number) {
  return Math.floor(Math.random() * max);
}

export const TypeTracker = ({
  difficulty,
  updateStats,
  elapsedTime,
  onFinish,
  onStart,
  status,
}: Props) => {
  const randomPick = useMemo(() => {
    const randNum = getRandom(levels[difficulty].length);
    // Pick random text and replace special character
    return levels[difficulty][randNum]?.text.replace(/—/g, '-').split('') || [];
  }, [difficulty]);

  const [current, setCurrent] = useState(0);
  const [errors, setError] = useState(() => new Set<number>());
  const [totalErrors, setTotalError] = useState(0);

  useEffect(() => {
    const correct = randomPick.length - totalErrors;
    updateStats({
      wpm:
        elapsedTime > 0
          ? Math.round((current - totalErrors) / 5 / (elapsedTime / 60))
          : 0,
      accuracy: totalErrors
        ? Math.round((correct / randomPick.length) * 100)
        : 100,
      correctChar: correct,
      incorrectChar: totalErrors,
    });
  }, [totalErrors, current, randomPick, updateStats, elapsedTime]);

  // Move key tracker to a custom hook
  const handleGlobalKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Return on ended game
      if (status === GameStatus.ended) {
        return;
      }
      // Start non started game
      if (status === GameStatus['not-started']) {
        onStart();
        return;
      }
      // Handle the backspace
      if (event.key === 'Backspace' && current > 0) {
        setError(prevItems => {
          const nextItems = new Set(prevItems);
          nextItems.delete(current - 1);
          return nextItems;
        });
        setCurrent(current => current - 1);
        return;
      }
      // Avoid not letter keys -> should be after Backspace
      if (event.key.length > 1) {
        return;
      }
      // Trigger error
      if (randomPick[current] !== event.key) {
        setError(prevItems => {
          const nextItems = new Set(prevItems);
          nextItems.add(current);
          return nextItems;
        });
        setTotalError(prevErr => prevErr + 1);
      }
      // Move pointer
      setCurrent(current => current + 1);
      // Game ended
      if (current + 1 === randomPick.length) {
        onFinish();
        return;
      }
    },
    [current, randomPick, status, onStart, onFinish]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [handleGlobalKeyDown]);

  return (
    <div>
      <p className="text-xl text-neutral-400 sm:text-3xl">
        {randomPick.map((char, i) => (
          <span
            key={crypto.randomUUID()}
            className={`${errors.has(i) ? 'text-red-600 underline' : current > i ? 'text-green-500' : 'text-neutral-400'} ${i === current && 'animate-pulse bg-neutral-100/50'}`}
          >
            {char}
          </span>
        ))}
      </p>
    </div>
  );
};
