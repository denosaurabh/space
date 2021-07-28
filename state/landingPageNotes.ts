import create from 'zustand';
import produce from 'immer';

import { LandingPageState } from '@lib/store/landingPage';

const useLandingPageNotes = create<LandingPageState>((set) => ({
  notes: {
    0: {
      id: '0',
      text: `Here’s your mini interactive Space o/

Space is yours, very personal space, without any restrictions and complete flexibility. 



@denosaurabh`,
      position: { x: 50, y: 20 },
      size: { width: 270, height: 400 },
    },
    1: {
      id: '1',
      text: '',
      position: { x: 50, y: 450 },
      size: { width: 270, height: 200 },
    },
  },
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
