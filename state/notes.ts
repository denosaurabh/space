import create from 'zustand';
import { persist } from 'zustand/middleware';
import produce from 'immer';
import { nanoid } from 'nanoid';

import { NotesState } from '@lib/store/notes';
import useSettings from '@state/settings';
import slugify from '@utils/slug';
import { convertDataVersion } from '@utils/versionMigration';

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

            if (draft.notesState[slug]) return;

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
      updateCollectionIcon: (id, icon) => {
        set(
          produce((draft) => {
            draft.notesState[id].icon = icon;
          })
        );
      },
      deleteCollection: (slug) => {
        set(
          produce((draft) => {
            delete draft.notesState[slug];
          })
        );
      },
    }),
    {
      name: 'notesStorage',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      migrate: async (persistedState, version): Promise<any> => {
        console.log(
          `Current DB version: ${version}, converting data to new version....`
        );

        const {
          notesState: updatedNotesState,
          currentCollection: updatedCurrentCollection,
        } = await convertDataVersion({
          from: 'v0.1.1',
          to: 'v0.1.2',
          data: {
            currentCollection: persistedState.currentCollection,
            notesState: persistedState.notesState,
          },
        });

        return {
          currentCollection: updatedCurrentCollection,
          notesState: updatedNotesState,
        };
      },
      version: 2,
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
