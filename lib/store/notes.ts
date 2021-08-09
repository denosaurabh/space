export interface NotePosition {
  x: number;
  y: number;
}

export interface NoteSize {
  width: number;
  height: number;
}

export interface Note {
  id: string;
  position: NotePosition;
  size: NoteSize;
  text: string;
}

export interface Notes {
  [key: string]: Note;
}

export interface NotesCollection {
  id: string;
  slug: string;
  name: string;
  icon: string;
  notes: Notes;
}

export interface NewNote {
  position: NotePosition;
  size: NoteSize;
  text: string;
}

export interface NotesState {
  currentCollection: string;
  notesState: {
    [key: string]: NotesCollection;
  };
  changeCurrentCollection: (collectionNo: string) => void;
  createCollection: (data: { name: string }) => void;
  addNote: (newNote: NewNote) => void;
  removeNote: (noteId: string) => void;
  updateNote: (
    id: string,
    data: {
      position: NotePosition;
      size: NoteSize;
      text: string;
    }
  ) => void;
  updateCollectionIcon: (id: string, icon: string) => void;
  deleteCollection: (slug: string) => void;
}
