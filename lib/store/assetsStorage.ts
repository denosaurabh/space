interface NotesCollectionIcon extends File {
  src: string;
}

export interface AssetsStorageState {
  notesCollection: {
    icons: Record<string, NotesCollectionIcon>;
  };
  addNotesCollectionIcon: (icon: File) => void;
}
