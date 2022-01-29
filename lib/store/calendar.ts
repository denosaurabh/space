export type Months =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type Days =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

export interface Goal {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
}

export interface Goals {
  [key: string]: Goal[];
}

export interface Journals {
  [key: string]: string;
}

export interface CalendarState {
  months: Months[];
  days: Days[];
  currentFullDate: string;

  goals: Goals;
  journals: Journals;

  activeFullDate: string;

  currentDate: number;
  currentMonth: number;
  currentYear: number;

  cycleMonth: (inc: 1 | -1) => void;

  cycleYear: (inc: 1 | -1) => void;

  showCreateNewGoal: boolean;
  setShowCreateNewGoal: () => void;
  setActiveDay: (day: string) => void;

  getDayGoals: (day: string) => Goal[];
  getTodayGoals: () => Goal[];
  goalsInMonth: (month: number, year: number) => Goal[];

  createGoal: (goal: {
    title: string;
    description: string;
    date: string;
    time: string;
  }) => void;
  addOrUpdateJournal: (text: string) => void;

  deleteGoal: (id: string) => void;
}
