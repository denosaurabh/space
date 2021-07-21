import create from 'zustand';
import produce from 'immer';

import { LandingPageState } from '@lib/store/landingPage';

const useLandingPageNotes = create<LandingPageState>((set) => ({
  notes: {},
  addNote: (newNote) => {
    set(
      produce((draft) => {
        const allNotesIDs = Object.keys(draft.notes);
        const newNoteId = allNotesIDs.length;

        draft.notes[newNoteId] = {
          id: newNoteId,
          ...newNote,
        };
      })
    );
  },
  updateNote: (id, data) => {
    set(
      produce((draft) => {
        draft.notes[id] = {
          ...draft.notes[id],
          ...data,
        };
      })
    );
  },
  removeNote: (id) => {
    set(
      produce((draft) => {
        delete draft.notes[id];
      })
    );
  },
}));

export default useLandingPageNotes;
