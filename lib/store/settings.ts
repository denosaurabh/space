export interface NotesSettings {
  enableGrid: boolean;
  gridSize: number;
  gridColor: string;
}

export interface SettingsStore {
  notes: NotesSettings;
  toggleGrid: (checked: boolean) => void;
  changeGridSize: (size: number) => void;
}
