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

export interface NewNote {
  position: NotePosition;
  size: NoteSize;
  text: string;
}

export interface NotesState {
  notes: Notes;
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
