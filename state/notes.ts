import create from 'zustand';
import { persist } from 'zustand/middleware';
import produce from 'immer';
import { nanoid } from 'nanoid';

import { NotesState } from '@lib/store/notes';
import useSettings from '@state/settings';
import slugify from '@utils/slug';

const useNotes = create<NotesState>(
  persist(
    (set) => ({
      currentCollection: 'home',
      notesState: {
        home: {
          id: '0',
          slug: 'home',
          name: 'Home',
          icon: '',
          notes: {},
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
            const newCollectionId = nanoid();
            const { name } = data;

            const slug = slugify(name);

            draft.notesState[slug] = {
              id: newCollectionId,
              slug,
              name,
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

            const newNoteId = nanoid();

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
      migrateNotesState: (newState, currentCollection) => {
        /* 
        * This is a bit of a hack, but it's the only way I could think of to // hmm, that's a suggestion BY Github CoPilot

        But, what I am saying is that, this is a function only for migration purposes, beware before using it for other purposes.
        */

        set(
          produce((draft) => {
            draft.notesState = newState;
            draft.currentCollection = currentCollection;
          })
        );
      },
    }),
    {
      name: 'notesStorage',
      getStorage: () => {
        const { storage } = useSettings.getState();

        switch (storage) {
          case 'localStorage':
            return localStorage;

          default:
            return localStorage;
        }
      },
    }
  )
);

useNotes.subscribe((state) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(state.notesState, state.currentCollection);
  }
});

export default useNotes;
