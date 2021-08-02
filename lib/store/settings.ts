export interface NotesSettings {
  enableGrid: boolean;
  gridSize: number;
  gridColor: string;
}

export interface SettingsStore {
  newUser: boolean;
  version: string;
  storage: 'localStorage';
  darkTheme: boolean;
  notes: NotesSettings;
  setUserOld: () => void;
  setNewVersion: (version: string) => void;
  toggleTheme: () => void;
  toggleGrid: (checked: boolean) => void;
  changeGridSize: (size: number) => void;
}
