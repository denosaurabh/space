import create from 'zustand';
import { NotesState } from '@lib/notes';

const useNotes = create<NotesState>((set) => ({
  notes: {
    0: {
      id: 0,
      position: { x: 150, y: 150 },
      size: { width: 100, height: 200 },
      text: '',
    },
  },
  addNote: (newNote) => {
    set((state) => {
      const allNotesIDs = Object.keys(state.notes);
      const newNoteId = allNotesIDs.length;

      return {
        notes: {
          ...state.notes,
          [newNoteId]: { id: newNoteId, ...newNote },
        },
      };
    });
  },
  updateNote: (id, data) => {
    set((state) => {
      return {
        notes: {
          ...state.notes,
          [id]: { ...state.notes[id], ...data },
        },
      };
    });
  },
}));

useNotes.subscribe((state) => {
  console.log(state.notes);
});

export default useNotes;
