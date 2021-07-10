export interface NotePosition {
  x: number;
  y: number;
}

export interface Note {
  id: number;
  position: NotePosition;
}

export interface Notes {
  [key: string]: Note;
}

export interface NewNote {
  position: NotePosition;
}

export interface NotesState {
  notes: Notes;
  addNote: (newNote: NewNote) => void;
}
