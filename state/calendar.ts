import create from 'zustand';
import { persist } from 'zustand/middleware';
import produce from 'immer';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
dayjs.extend(calendar);

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
      journals: {},
      showCreateNewGoal: false,

      currentDate: dayjs().date(),
      currentMonth: dayjs().month(),
      currentYear: dayjs().year(),

      currentFullDate: dayjs().format('YYYY-M-D'),
      activeFullDate: dayjs().format('YYYY-M-D'),

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
      setActiveDay: (date: string) => {
        set(
          produce((draft) => {
            draft.activeFullDate = date;
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
      addOrUpdateJournal: (text) => {
        set(
          produce((draft) => {
            const { journals, activeFullDate } = draft;
            journals[activeFullDate] = text;
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
      goalsInMonth: (month: number, year: number) => {
        const { goals } = get();

        const monthGoals = Object.keys(goals).filter((key) =>
          key.includes(`${year}-${month}`)
        );

        const goalsInMonth = monthGoals.reduce((acc, key) => {
          acc.push(goals[key]);

          return acc;
        }, []);

        return goalsInMonth;
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
    console.log(state);
  }
});

export default useCalendar;
