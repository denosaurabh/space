import create from 'zustand';
import { persist } from 'zustand/middleware';
import produce from 'immer';

import { SettingsStore } from '@lib/store/settings';

const useSettings = create(
  persist<SettingsStore>(
    (set) => ({
      darkTheme: false,
      notes: {
        enableGrid: true,
        gridSize: 10,
        gridColor: '#ccc',
      },
      toggleTheme: () => {
        set(
          produce((draft) => {
            draft.darkTheme = !draft.darkTheme;
          })
        );
      },
      toggleGrid: (checked: boolean) => {
        set(
          produce((draft) => {
            draft.notes.enableGrid = checked;

            draft.notes.gridSize = checked ? 10 : 1;
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
