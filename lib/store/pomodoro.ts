export interface Pomodoro {
  id: string;

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
  setCurrentPomoTime: (time: number) => void;
  startCurrentPomo: () => void;
  pauseCurrentPomo: () => void;

  setShowCreatePomo: (showCreatePomo: boolean) => void;
}