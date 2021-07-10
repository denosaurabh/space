import create from 'zustand';
import { NotesState } from '@lib/notes';

const useNotes = create((set) => ({
  notes: {
    0: {
      id: 0,
      position: { x: 40, y: 40 },
    },
  },
  addNote: (newNote: {
    position: {
      x: number;
      y: number;
    };
  }) =>
    set((state: NotesState) => {
      const allNotesIDs = Object.keys(state.notes);
      const newNoteId = allNotesIDs.length;

      return {
        notes: { ...state.notes, [newNoteId]: { id: newNoteId, ...newNote } },
      };
    }),
}));

export default useNotes;
