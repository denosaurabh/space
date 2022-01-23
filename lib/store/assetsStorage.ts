interface NotesCollectionIcon extends File {
  file: File;
  src: string;
}

export interface AssetsStorageState {
  notesCollection: {
    icons: Record<string, NotesCollectionIcon>;
  };
  addNotesCollectionIcon: (notesCollectionSlug: string, icon: File) => void;
  readAndSetIconURL: (notesCollectionSlug: string) => string;
  setURLtoNotesCollection: (id: string) => void;
}
