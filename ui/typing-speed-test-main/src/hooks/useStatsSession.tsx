import { useCallback, useState } from 'react';
import { WPM_RECORD_KEY } from '../constants';
import useLocalStorage from './useLocalStorage';
import { EndTypes, StatsType } from '../types';

const DEFAULT_STATS = {
  wpm: 0,
  accuracy: 0,
  correctChar: 0,
  incorrectChar: 0,
};

export const useStatsSession = () => {
  const [stats, setStats] = useState<StatsType>(DEFAULT_STATS);
  const [record, setRecord] = useLocalStorage(WPM_RECORD_KEY);
  const [endType, setEndType] = useState<keyof typeof EndTypes>(
    EndTypes.baseline
  );

  // Avoid effects and trigger whe game end
  const finalizeSession = () => {
    if (record === null) {
      setRecord(stats.wpm);
      setEndType(EndTypes.baseline);
      return;
    }
    if (stats.wpm && stats.wpm > record) {
      setRecord(stats.wpm);
      setEndType(EndTypes.newRecord);
      return;
    } else {
      setEndType(EndTypes.regular);
      return;
    }
  };

  const updateStats = useCallback((newStats: StatsType) => {
    setStats(prevStats => ({ ...prevStats, ...newStats }));
  }, []);

  const resetToDefault = () => {
    setStats(DEFAULT_STATS);
    setEndType(EndTypes.baseline);
  };

  return {
    record,
    stats,
    endType,
    updateStats,
    resetToDefault,
    finalizeSession,
  };
};
