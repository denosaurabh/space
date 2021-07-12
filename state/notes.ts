import create from 'zustand';
import { persist } from 'zustand/middleware';

import { NotesState } from '@lib/notes';

const useNotes = create<NotesState>(
  persist(
    (set) => ({
      currentCollection: '0',
      notesState: { '0': { id: '0', name: 'Home', icon: '', notes: {} } },
      changeCurrentCollection: (collectionNumber) => {
        set((state) => ({
          ...state,
          currentCollection: collectionNumber,
        }));
      },
      createCollection: (data) =>
        set((state) => {
          const { name } = data;

          const newCollectionId = Object.keys(state.notesState).length;

          return {
            ...state,
            notesState: {
              ...state.notesState,
              [newCollectionId]: {
                id: newCollectionId,
                name,
                icon: '',
                notes: {},
              },
            },
          };
        }),
      addNote: (newNote) => {
        set((state) => {
          const allNotesIDs = Object.keys(
            state.notesState[state.currentCollection].notes
          );
          const newNoteId = allNotesIDs.length;

          const { notesState, currentCollection } = state;
          const currentCollectionData = notesState[currentCollection];

          return {
            notesState: {
              ...notesState,
              [currentCollection]: {
                ...currentCollectionData,
                notes: {
                  ...currentCollectionData.notes,
                  [newNoteId]: { id: newNoteId, ...newNote },
                },
              },
            },
          };
        });
      },
      updateNote: (id, data) => {
        set((state) => {
          const { notesState, currentCollection } = state;
          const currentCollectionData = notesState[currentCollection];

          return {
            notesState: {
              ...notesState,
              [currentCollection]: {
                ...currentCollectionData,
                notes: {
                  ...currentCollectionData.notes,
                  [id]: { ...currentCollectionData.notes[id], ...data },
                },
              },
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
  console.log(state.notesState);
});

export default useNotes;
