import create from 'zustand';
import { persist } from 'zustand/middleware';
import produce from 'immer';

import { SettingsStore } from '@lib/store/settings';

const useSettings = create(
  persist<SettingsStore>(
    (set) => ({
      notes: {
        enableGrid: true,
        gridSize: 10,
        gridColor: '#ccc',
      },
      toggleGrid: () => {
        set(
          produce((draft) => {
            draft.notes.enableGrid = !draft.notes.enableGrid;
          })
        );
      },
      changeGridSize: (size: number) => {
        set(
          produce((draft) => {
            draft.notes.gridSize = size;
          })
        );
      },
    }),
    {
      name: 'settingsStorage',
      getStorage: () => localStorage,
    }
  )
);

useSettings.subscribe((state) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(state.notes);
  }
});

export default useSettings;
