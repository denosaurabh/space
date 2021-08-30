import create from 'zustand';
import { persist } from 'zustand/middleware';
import produce from 'immer';
import { nanoid } from 'nanoid';

import useSettings from '@state/settings';

import { Pomodoro, PomodoroState } from '@lib/store/pomodoro';

const usePomodoro = create<PomodoroState>(
  persist(
    (set, get) => ({
      pomos: [],
      showCreatePomo: false,
      currentPomo: (): Pomodoro => {
        if (!get().pomos.length) {
          return {
            id: nanoid(),
            title: 'pomo',
            description: '',
            noOfPomos: 1,

            currentTime: 25 * 60 * 1000,
            currentPomo: 1,

            isRunning: false,
          };
        }

        return get().pomos[0];
      },
      setCurrentPomoTime: (time: number) => {
        set(
          produce((draft) => {
            draft.pomos[0].currentTime = time;
          })
        );
      },
      startCurrentPomo: () => {
        set(
          produce((draft) => {
            draft.pomos[0].isRunning = true;
          })
        );
      },
      pauseCurrentPomo: () => {
        set(
          produce((draft) => {
            draft.pomos[0].isRunning = false;
          })
        );
      },

      createPomo: ({ title, noOfPomos }) => {
        set(
          produce((draft) => {
            const pomoId = nanoid();

            draft.pomos.push({
              id: pomoId,

              title,
              description: '',
              noOfPomos,

              currentTime: 25 * 60 * 1000,
              currentPomo: 1,

              isRunning: false,
            });
          })
        );
      },
      setShowCreatePomo: (showCreatePomo) => {
        set(
          produce((draft) => {
            draft.showCreatePomo = showCreatePomo;
          })
        );
      },
    }),
    {
      name: 'pomodoroStorage',
      version: 1,
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

usePomodoro.subscribe((state) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(state.pomos);
  }
});

export default usePomodoro;
