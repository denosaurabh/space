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
          return null;
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
            if (!draft.pomos[0]) return;
            draft.pomos[0].isRunning = false;
          })
        );
      },
      finishPomo: () => {
        set(
          produce((draft) => {
            const { pomodoro } = useSettings.getState();
            const { actionTime, restTime } = pomodoro;

            const currentPomoObj = get().currentPomo();

            const isLastPomo =
              currentPomoObj.currentPomo == currentPomoObj.noOfPomos;
            const { state } = currentPomoObj;

            if (isLastPomo) {
              if (state === 'rest') {
                draft.pomos.shift();
              } else {
                draft.pomos[0].state = 'rest';
                draft.pomos[0].currentTime = restTime * 60 * 1000;
              }
            } else {
              if (state === 'action') {
                draft.pomos[0].state = 'rest';
                draft.pomos[0].currentTime = restTime * 60 * 1000;
              } else {
                draft.pomos[0].state = 'action';
                draft.pomos[0].currentTime = actionTime * 60 * 1000;

                draft.pomos[0].currentPomo++;
              }
            }
          })
        );
      },

      createPomo: ({ title, noOfPomos }) => {
        set(
          produce((draft) => {
            const { pomodoro } = useSettings.getState();
            const { actionTime } = pomodoro;

            const pomoId = nanoid();

            draft.pomos.push({
              id: pomoId,
              state: 'action',

              title,
              description: '',
              noOfPomos: Number(noOfPomos),

              currentTime: actionTime * 60 * 1000,
              currentPomo: 1,

              isRunning: false,
            });
          })
        );
      },
      switchPomoUp: (id: string) => {
        set(
          produce((draft) => {
            const pomoIndex = draft.pomos.findIndex((pomo) => pomo.id === id);

            if (pomoIndex <= 1) return;

            const pomo = draft.pomos[pomoIndex];
            draft.pomos[pomoIndex] = draft.pomos[pomoIndex - 1];
            draft.pomos[pomoIndex - 1] = pomo;
          })
        );
      },
      switchPomoDown: (id: string) => {
        set(
          produce((draft) => {
            const pomoIndex = draft.pomos.findIndex((pomo) => pomo.id === id);

            if (pomoIndex === draft.pomos.length - 1) return;

            const pomo = draft.pomos[pomoIndex];
            draft.pomos[pomoIndex] = draft.pomos[pomoIndex + 1];
            draft.pomos[pomoIndex + 1] = pomo;
          })
        );
      },
      stopCurrentPomo: () => {
        set(
          produce((draft) => {
            const { pomodoro } = useSettings.getState();
            const { actionTime } = pomodoro;

            const currentPomoObj = get().currentPomo();

            const isLastPomo =
              currentPomoObj.currentPomo == currentPomoObj.noOfPomos;

            if (isLastPomo) {
              draft.pomos.shift();
            } else {
              draft.pomos[0].state = 'action';
              draft.pomos[0].currentTime = actionTime * 60 * 1000;

              draft.pomos[0].isRunning = false;
              draft.pomos[0].currentPomo++;
            }
          })
        );
      },
      deletePomo: (id: string) => {
        set(
          produce((draft) => {
            draft.pomos = draft.pomos.filter((pomo) => pomo.id !== id);
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
