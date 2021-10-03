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

      currentDate: new Date().getDate(),
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),

      currentFullDate: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`,

      activeFullDate: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`,

      getTodayGoals: () => {
        const { goals } = get();
        const { currentFullDate: currentDay } = get();

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
            draft.activeFullDate = day;
          })
        );
      },
      createGoal: (goal) => {
        set(
          produce((draft) => {
            const { goals, activeFullDate } = draft;

            if (!goals[activeFullDate]) {
              goals[activeFullDate] = [];
            }

            const goalObj = {
              id: nanoid(),
              ...goal,
            };

            goals[activeFullDate].push(goalObj);
          })
        );
      },

      deleteGoal: (goalId) => {
        set(
          produce((draft) => {
            const { goals, activeFullDate } = draft;

            goals[activeFullDate] = goals[activeFullDate].filter(
              (goal) => goal.id !== goalId
            );

            if (goals[activeFullDate].length === 0) {
              delete goals[activeFullDate];
            }
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
        'currentDate',
        'currentFullDate',
        'activeFullDate',
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
