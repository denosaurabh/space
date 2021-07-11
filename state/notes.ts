import create from 'zustand';
import { persist } from 'zustand/middleware';

import { NotesState } from '@lib/notes';

const useNotes = create<NotesState>(
  persist(
    (set) => ({
      notes: {},
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
    }),
    {
      name: 'notesStorage',
      getStorage: () => localStorage,
    }
  )
);

useNotes.subscribe((state) => {
  console.log(state.notes);
});

export default useNotes;
