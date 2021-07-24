export interface NotesSettings {
  enableGrid: boolean;
  gridSize: number;
  gridColor: string;
}

export interface SettingsStore {
  darkTheme: boolean;
  notes: NotesSettings;
  toggleTheme: () => void;
  toggleGrid: (checked: boolean) => void;
  changeGridSize: (size: number) => void;
}
