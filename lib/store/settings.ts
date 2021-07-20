export interface NotesSettings {
  enableGrid: boolean;
  gridSize: number;
  gridColor: string;
}

export interface SettingsStore {
  notes: NotesSettings;
  toggleGrid: () => void;
  changeGridSize: (size: number) => void;
}
