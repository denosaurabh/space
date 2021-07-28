export interface NotesSettings {
  enableGrid: boolean;
  gridSize: number;
  gridColor: string;
}

export interface SettingsStore {
  version: string;
  storage: 'localStorage';
  darkTheme: boolean;
  notes: NotesSettings;
  setNewVersion: (version: string) => void;
  toggleTheme: () => void;
  toggleGrid: (checked: boolean) => void;
  changeGridSize: (size: number) => void;
}
