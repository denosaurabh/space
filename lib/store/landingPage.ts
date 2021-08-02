import { NotePosition, Notes, NoteSize } from '@lib/store/notes';

export interface NewNote {
  position: NotePosition;
  size: NoteSize;
  text: string;
}

export interface LandingPageState {
  notes: Notes;
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
}
