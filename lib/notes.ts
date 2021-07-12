export interface NotePosition {
  x: number;
  y: number;
}

export interface NoteSize {
  width: number;
  height: number;
}

export interface Note {
  id: number;
  position: NotePosition;
  size: NoteSize;
  text: string;
}

export interface Notes {
  [key: string]: Note;
}

export interface NotesCollection {
  id: string;
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
  updateNote: (
    id: number,
    data: {
      position: NotePosition;
      size: NoteSize;
      text: string;
    }
  ) => void;
}
