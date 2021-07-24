import create from 'zustand';
import { persist } from 'zustand/middleware';
import produce from 'immer';

import { NotesState } from '@lib/store/notes';

const useNotes = create<NotesState>(
  persist(
    (set) => ({
      currentCollection: '0',
      notesState: {
        '0': {
          id: '0',
          name: 'Home',
          icon: '',
          notes: {
            0: {
              id: 0,
              text: 'Welcome to Space',
              size: {
                width: 250,
                height: 350,
              },
              position: {
                x: 100,
                y: 100,
              },
            },
          },
        },
      },
      changeCurrentCollection: (collectionNumber) => {
        set(
          produce((draft) => {
            draft.currentCollection = collectionNumber;
          })
        );
      },
      createCollection: (data) => {
        set(
          produce((draft) => {
            const newCollectionId = Object.keys(draft.notesState).length;

            draft.notesState[newCollectionId] = {
              id: newCollectionId,
              name: data.name,
              icon: '',
              notes: {},
            };
          })
        );
      },
      addNote: (newNote) => {
        set(
          produce((draft) => {
            const collectionDraft = draft.notesState[draft.currentCollection];

            console.log(collectionDraft);

            const allNotesIDs = Object.keys(collectionDraft.notes);
            const newNoteId = allNotesIDs.length;

            collectionDraft.notes[newNoteId] = {
              id: newNoteId,
              ...newNote,
            };
          })
        );
      },
      updateNote: (id, data) => {
        set(
          produce((draft) => {
            const collectionDraft = draft.notesState[draft.currentCollection];

            collectionDraft.notes[id] = {
              ...collectionDraft.notes[id],
              ...data,
            };
          })
        );
      },
      removeNote: (id) => {
        set(
          produce((draft) => {
            const collectionDraft = draft.notesState[draft.currentCollection];

            delete collectionDraft.notes[id];
          })
        );
      },
    }),
    {
      name: 'notesStorage',
      getStorage: () => localStorage,
    }
  )
);

useNotes.subscribe((state) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(state.notesState, state.currentCollection);
  }
});

export default useNotes;
