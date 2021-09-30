import create from 'zustand';
import { persist } from 'zustand/middleware';
import produce from 'immer';
import { nanoid } from 'nanoid';

import useSettings from '@state/settings';
import { CalendarState } from '@lib/store/calendar';

const useCalendar = create<CalendarState>(
  persist(
    (set, get) => ({
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      days: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      goals: {},
      showCreateNewGoal: false,

      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      currentDay: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`,

      activeDay: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`,

      getTodayGoals: () => {
        const { goals } = get();
        const { currentDay } = get();

        return goals[currentDay] || [];
      },
      getDayGoals: (day: string) => {
        const goals = get().goals[day];

        if (!goals) {
          return [];
        }

        return goals;
      },
      cycleMonth: (inc: number) => {
        set(
          produce((draft) => {
            const newMonth = draft.currentMonth + inc;

            if (newMonth < 0) {
              draft.currentMonth = 11;
              draft.currentYear--;
            } else if (newMonth > 11) {
              draft.currentMonth = 0;
              draft.currentYear++;
            } else {
              draft.currentMonth = newMonth;
            }
          })
        );
      },
      cycleYear: (inc: number) => {
        set(
          produce((draft) => {
            draft.currentYear += inc;
          })
        );
      },
      setShowCreateNewGoal: () => {
        set(
          produce((draft) => {
            draft.showCreateNewGoal = !draft.showCreateNewGoal;
          })
        );
      },
      setActiveDay: (day: string) => {
        set(
          produce((draft) => {
            draft.activeDay = day;
          })
        );
      },
      createGoal: (goal) => {
        set(
          produce((draft) => {
            const { goals, activeDay } = draft;

            if (!goals[activeDay]) {
              goals[activeDay] = [];
            }

            const goalObj = {
              id: nanoid(),
              ...goal,
            };

            goals[activeDay].push(goalObj);
          })
        );
      },
    }),
    {
      name: 'calendarStorage',
      blacklist: [
        'showCreateNewGoal',
        'currentMonth',
        'currentYear',
        'currentDay',
        'activeDay',
      ],
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

useCalendar.subscribe((state) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(state.goals);
  }
});

export default useCalendar;
