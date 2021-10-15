import { useEffect } from 'react';
import { styled } from '@styled';

import Button from '@components/button';
import MonthBox from '@components/monthBox';

import useCalendar from '@state/calendar';
import daysInMonth from '@utils/getDaysInMonth';

import ArrowUpSvg from '@assets/svg/ArrowUp.svg';
import ArrowDownSvg from '@assets/svg/ArrowDown.svg';

const CalendarContainer: React.FC = () => {
  const { months, currentMonth, currentYear, cycleMonth, goals } = useCalendar(
    ({ months, currentMonth, currentYear, cycleMonth, goals }) => ({
      months,
      currentMonth,
      currentYear,
      cycleMonth,
      goals,
    })
  );

  useEffect(() => {
    //
  }, [, goals]);

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

      <DaysContainer>
        <span>M</span>
        <span>T</span>
        <span>W</span>
        <span>T</span>
        <span>F</span>
        <span>S</span>
        <span>S</span>
        <span>M</span>
        <span>T</span>
        <span>W</span>
      </DaysContainer>

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
});

const CalendarHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  marginBottom: '8rem',

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

const DaysContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(10, auto)',
  gridTemplateRows: 'repeat(3, auto)',

  gap: '1.6rem',

  span: {
    fontFamily: '$inter',
    fontSize: '1.4rem',
    color: '$grey-700',
    fontWeight: '500',

    textAlign: 'center',
  },
});
