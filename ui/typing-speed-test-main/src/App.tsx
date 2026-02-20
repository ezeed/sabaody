import { useState } from 'react';
import { TypeTracker } from './components/TypingTracker';
import { Difficulty, GameStatus, Mode } from './types';
import { Settings } from './components/Settings/Index';

import Restart from './../assets/images/icon-restart.svg?react';

import { DEFAULT_SECONDS } from './constants';
import { useTimer } from './hooks/useTimer';
import { useStatsSession } from './hooks/useStatsSession';
import { EndedSession } from './components/EndedSession';
import { Header } from './components/Header';
import { SessionInfo } from './components/SessionInfo';

function App() {
  const [gameStatus, setGameStatus] =
    useState<keyof typeof GameStatus>('not-started');
  const [difficulty, setDifficulty] = useState<keyof typeof Difficulty>('easy');
  const [mode, setMode] = useState<keyof typeof Mode>('time');
  const [sessionKey, setSessionKey] = useState(0);
  const {
    stats,
    record,
    updateStats,
    endType,
    finalizeSession,
    resetToDefault,
  } = useStatsSession();
  const handleReset = () => {
    setGameStatus('not-started');
    resetToDefault();
    setSessionKey(k => k + 1);
  };
  const handleOnStart = () => setGameStatus('started');
  const handleOnFinish = () => {
    setGameStatus('ended');
    finalizeSession();
  };
  const { timeLeft, elapsedTime } = useTimer({
    gameStatus,
    initialSeconds: DEFAULT_SECONDS,
    onComplete: handleOnFinish,
    mode,
  });

  return (
    <div className="font-display flex h-dvh flex-col bg-neutral-900 text-neutral-100">
      <Header record={record} />
      {gameStatus === GameStatus.ended ? (
        <EndedSession
          stats={stats}
          handleReset={handleReset}
          endType={endType}
        />
      ) : (
        <div className="sm:px-45">
          <div className="flex flex-col justify-between pb-3 sm:flex-row">
            <SessionInfo
              stats={stats}
              timeLeft={timeLeft}
              gameStatus={gameStatus}
            />
            <Settings
              gameStatus={gameStatus}
              selectedDifficulty={difficulty}
              selectedMode={mode}
              setDifficulty={setDifficulty}
              setMode={setMode}
            />
          </div>
          <div className="relative mx-3 border-t border-b border-neutral-700 py-10">
            <div className={`${gameStatus === 'not-started' && 'blur-sm'}`}>
              <TypeTracker
                key={sessionKey}
                difficulty={difficulty}
                status={gameStatus}
                onStart={handleOnStart}
                onFinish={handleOnFinish}
                elapsedTime={elapsedTime}
                updateStats={updateStats}
              />
            </div>
            <div
              className={`${gameStatus !== 'not-started' && 'invisible'} absolute inset-0 flex flex-col items-center justify-center gap-3`}
            >
              <button
                onClick={handleOnStart}
                className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 focus:border-2 focus:border-neutral-900 focus:shadow-[0px_0px_2px_2px] focus:shadow-blue-400"
                type="button"
              >
                Start Typing Test
              </button>
              <p>Or click the text and start typing</p>
            </div>
          </div>
          {gameStatus === GameStatus.started && (
            <div className="flex justify-center p-5">
              <button
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-neutral-800 px-4 py-2 hover:bg-neutral-700"
                onClick={handleReset}
              >
                Restart Test <Restart width={15} height={15} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
