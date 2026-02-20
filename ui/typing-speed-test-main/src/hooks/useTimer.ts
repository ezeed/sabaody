import { useEffect, useRef, useState } from 'react';
import { GameStatus, Mode } from '../types';

export const useTimer = ({
  initialSeconds,
  gameStatus,
  mode,
  onComplete,
}: {
  initialSeconds: number;
  gameStatus: keyof typeof GameStatus;
  mode: keyof typeof Mode;
  onComplete: () => void;
}) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const elapsedIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (gameStatus !== GameStatus.started) return;
    const startTime = Date.now();
    elapsedIntervalRef.current = setInterval(() => {
      const seconds = Math.floor((Date.now() - startTime) / 1000);
      setElapsedTime(seconds);
    }, 1000);

    return () => {
      if (elapsedIntervalRef.current) {
        clearInterval(elapsedIntervalRef.current);
        setElapsedTime(0);
      }
    };
  }, [gameStatus]);

  useEffect(() => {
    if (mode !== Mode.time || gameStatus !== GameStatus.started) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setTimeLeft(initialSeconds);
    };
  }, [gameStatus, mode, initialSeconds]);

  useEffect(() => {
    if (timeLeft === 0 && gameStatus === GameStatus.started) {
      if (elapsedIntervalRef.current) clearInterval(elapsedIntervalRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      onComplete();
    }
  }, [timeLeft, gameStatus, onComplete]);

  return {
    timeLeft,
    elapsedTime,
  };
};
