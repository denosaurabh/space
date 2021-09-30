import { styled } from '@styled';

import Button from '@components/button';
import MonthBox from '@components/monthBox';

import useCalendar from '@state/calendar';
import daysInMonth from '@utils/getDaysInMonth';

import ArrowUpSvg from '@assets/svg/ArrowUp.svg';
import ArrowDownSvg from '@assets/svg/ArrowDown.svg';

const CalendarContainer: React.FC = () => {
  const { months, currentMonth, currentYear, cycleMonth } = useCalendar(
    ({ months, currentMonth, currentYear, cycleMonth }) => ({
      months,
      currentMonth,
      currentYear,
      cycleMonth,
    })
  );

  return (
    <CalendarContainerStyled>
      <CalendarHeader>
        <h3>
          {months[currentMonth]} {currentYear}
        </h3>
        <Button
          size="small"
          color="light"
          shadow="small"
          onClick={() => cycleMonth(-1)}
        >
          <ArrowUpSvg />
        </Button>
        <Button
          size="small"
          color="light"
          shadow="small"
          onClick={() => cycleMonth(1)}
        >
          <ArrowDownSvg />
        </Button>
      </CalendarHeader>

      <MonthBox
        noOfDays={daysInMonth(currentMonth, currentYear)}
        month={currentMonth}
        year={currentYear}
      />

      {months.map((month, i) => {
        if (i <= currentMonth) return null;

        const daysInCurrentMonth: number = daysInMonth(i, currentYear);

        return (
          <MonthBox
            key={i}
            title={`${month} ${currentYear}`}
            noOfDays={daysInCurrentMonth}
            month={i}
            year={currentYear}
          />
        );
      })}
    </CalendarContainerStyled>
  );
};

export default CalendarContainer;

const CalendarContainerStyled = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '8rem',
});

const CalendarHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',

  fontFamily: '$inter',

  h3: {
    fontSize: '5rem',
    color: '$grey-800',

    marginRight: 'auto',
  },

  button: {
    height: '4rem',
    padding: '0 1.2rem',
  },
});
