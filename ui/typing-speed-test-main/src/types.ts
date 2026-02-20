export const EndTypes = {
  baseline: 'baseline',
  newRecord: 'newRecord',
  regular: 'regular',
} as const;

export const GameStatus = {
  'not-started': 'not-started',
  started: 'started',
  ended: 'ended',
} as const;

export const Mode = {
  time: 'time',
  passage: 'passage',
} as const;

export const Difficulty = {
  easy: 'easy',
  medium: 'medium',
  hard: 'hard',
} as const;

export interface StatsType {
  wpm?: number;
  accuracy?: number;
  correctChar: number;
  incorrectChar: number;
}
