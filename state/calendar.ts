import create from 'zustand';
import { persist } from 'zustand/middleware';
import produce from 'immer';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
dayjs.extend(calendar);

import useSettings from '@state/settings';
import { CalendarState } from '@lib/store/calendar';
import zeroPad from '@utils/zeroPad';

console.log(dayjs().calendar(dayjs('2021-10-05')));
console.log(dayjs().calendar());
console.log(dayjs().calendar('2021-10-05 12:00 AM'));
console.log(dayjs('10-10-2021 14:00', 'DD-MM-YYYY HH:mm').isValid());
console.log(dayjs('10-10-2021 14:00').isValid());

console.log(
  dayjs('10-10-2021 14:00', 'DD-MM-YYYY HH:mm').calendar(null, {
    // sameDay: '[Today]',
    // nextDay: '[Tomorrow]',
    // nextWeek: 'dddd',
    // lastDay: '[Yesterday]',
    // lastWeek: '[Last] dddd',
    // sameElse: 'DD/MM/YYYY',
  })
);

console.log(
  dayjs().calendar('17-10-2021 18:00', {
    // sameDay: '[Today]',
    // nextDay: '[Tomorrow]',
    // nextWeek: 'dddd',
    // lastDay: '[Yesterday]',
    // lastWeek: '[Last] dddd',
    sameElse: 'DD/MM/YYYY',
  })
);

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

      currentFullDate: `${zeroPad(new Date().getMonth())}-${zeroPad(
        new Date().getDate()
      )}-${new Date().getFullYear()}`,

      activeFullDate: `${zeroPad(new Date().getMonth())}-${zeroPad(
        new Date().getDate()
      )}-${new Date().getFullYear()}`,

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
    console.log(state);
  }
});

export default useCalendar;
