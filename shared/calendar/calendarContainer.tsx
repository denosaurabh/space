import { useEffect } from 'react';
import { styled } from '@styled';

import Button from '@components/button';
import MonthBox from '@components/monthBox';

import useCalendar from '@state/calendar';

import ArrowUpSvg from '@assets/svg/ArrowUp.svg';
import ArrowDownSvg from '@assets/svg/ArrowDown.svg';
import dayjs from 'dayjs';

const CalendarContainer: React.FC = () => {
  const { months, currentMonth, currentYear, cycleMonth, goals, goalsInMonth } =
    useCalendar(
      ({
        months,
        currentMonth,
        currentYear,
        cycleMonth,
        goals,
        goalsInMonth,
      }) => ({
        months,
        goalsInMonth,
        currentMonth,
        currentYear,
        cycleMonth,
        goals,
      })
    );

  useEffect(() => {
    //
  }, [, goals]);

  const goalsInCurrentMonth = goalsInMonth(currentMonth + 1, currentYear);

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
          css={{ border: '1px solid $grey-300' }}
          onClick={() => cycleMonth(-1)}
        >
          <ArrowUpSvg />
        </Button>
        <Button
          size="small"
          color="light"
          shadow="small"
          css={{ border: '1px solid $grey-300' }}
          onClick={() => cycleMonth(1)}
        >
          <ArrowDownSvg />
        </Button>
      </CalendarHeader>
      <CalendarSubTitle>
        {goalsInCurrentMonth.length
          ? `${goalsInCurrentMonth.length} Event${
              goalsInCurrentMonth.length > 1 ? 's' : ''
            }`
          : 'No events this month :('}{' '}
      </CalendarSubTitle>

      <DaysContainer>
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thr</span>
        <span>Fri</span>
        <span>Sat</span>
        {/* <span>Sun</span> */}
        {/* <span>Mon</span> */}
        {/* <span>Tue</span> */}
      </DaysContainer>

      <MonthBox
        noOfDays={dayjs(
          `${currentYear}-${currentMonth}-1`,
          'YYYY-M-D'
        ).daysInMonth()}
        month={currentMonth}
        year={currentYear}
      />

      <NextMonthsContainer>
        {months.map((month, i) => {
          if (i <= currentMonth) return null;

          const daysInCurrentMonth: number = dayjs(
            `${currentYear}-${month}-1`,
            'YYYY-M-D'
          ).daysInMonth();

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
      </NextMonthsContainer>
    </CalendarContainerStyled>
  );
};

export default CalendarContainer;

const CalendarContainerStyled = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  width: '45rem',
  minWidth: '45rem',
});

const CalendarHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  marginBottom: '2rem',

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

const CalendarSubTitle = styled('div', {
  fontSize: '2rem',
  color: '$grey-600',

  marginRight: 'auto',
  marginBottom: '6rem',
});

const DaysContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(7, auto)',
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

const NextMonthsContainer = styled('div', {
  '@tablet-big': {
    display: 'none',
  },
});
