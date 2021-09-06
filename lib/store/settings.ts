export interface NotesSettings {
  enableGrid: boolean;
  gridSize: number;
  gridColor: string;
}

export interface PomodoroSettings {
  actionTime: number;
  restTime: number;
}

export interface SettingsStore {
  newUser: boolean;
  version: string;
  storage: 'localStorage';
  darkTheme: boolean;
  notes: NotesSettings;
  pomodoro: PomodoroSettings;
  setUserOld: () => void;
  setNewVersion: (version: string) => void;
  toggleTheme: () => void;
  toggleGrid: (checked: boolean) => void;
  changeGridSize: (size: number) => void;
  changePomodoroActionTime: (time: number) => void;
  changePomodoroRestTime: (time: number) => void;
}
