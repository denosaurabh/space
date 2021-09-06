export interface Pomodoro {
  id: string;
  state: 'action' | 'rest';

  title: string;
  description: string;
  noOfPomos: number;

  currentTime: number;
  currentPomo: number;

  isRunning: boolean;
}

export interface PomodoroState {
  pomos: Pomodoro[];
  showCreatePomo: false;

  currentPomo: () => Pomodoro;
  createPomo: ({
    title,
    noOfPomos,
  }: {
    title: string;
    noOfPomos: number;
  }) => void;
  deletePomo: (id: string) => void;
  finishPomo: () => void;

  switchPomoUp: (id: string) => void;
  switchPomoDown: (id: string) => void;

  setCurrentPomoTime: (time: number) => void;
  startCurrentPomo: () => void;
  pauseCurrentPomo: () => void;
  stopCurrentPomo: () => void;

  setShowCreatePomo: (showCreatePomo: boolean) => void;
}
