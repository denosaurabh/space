import create from 'zustand';
import { persist } from 'zustand/middleware';
import produce from 'immer';

import { SettingsStore } from '@lib/store/settings';

const useSettings = create(
  persist<SettingsStore>(
    (set) => ({
      newUser: true,
      version: '0.1.1',
      storage: 'localStorage',
      darkTheme: false,
      notes: {
        enableGrid: true,
        gridSize: 10,
        gridColor: '#ccc',
      },
      pomodoro: {
        actionTime: 25,
        restTime: 5,
      },
      setUserOld: () => {
        set(
          produce((draft) => {
            draft.newUser = false;
          })
        );
      },
      setNewVersion: (version) => {
        set(
          produce((draft) => {
            draft.version = version;
          })
        );
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
      changePomodoroActionTime: (time: number) => {
        set(
          produce((draft) => {
            draft.pomodoro.actionTime = time;
          })
        );
      },
      changePomodoroRestTime: (time: number) => {
        set(
          produce((draft) => {
            draft.pomodoro.restTime = time;
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
    console.log(state.version, state.storage, state.darkTheme, state.notes);
  }
});

export default useSettings;
