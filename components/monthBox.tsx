import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import useCalendar from '@state/calendar';
import { styled } from '@styled';

interface MonthBoxProps {
  title?: string;
  noOfDays: number;
  month: number;
  year: number;
}

const MonthBox: React.FC<MonthBoxProps> = ({ title, month, year }) => {
  const { currentDate, activeDate, goals, setActiveDay } = useCalendar(
    ({
      currentFullDate: currentDate,
      activeFullDate: activeDate,
      goals,
      setActiveDay,
    }) => ({
      activeDate,
      currentDate,
      goals,
      setActiveDay,
    })
  );

  const [localGoals, setLocalGoals] = useState({});

  const onDayClickHandler = (e) => {
    const date = e.target.dataset.date;
    setActiveDay(date);
  };

  useEffect(() => {
    setLocalGoals(goals);
  }, [, goals]);

  const realMonthNo = month + 1;
  const firstDayOfMonth = dayjs(`${year}-${realMonthNo}-1`, 'YYYY-M-D').day();
  const noOfDays = dayjs(`${year}-${realMonthNo}-1`, 'YYYY-M-D').daysInMonth();

  return (
    <MonthContainer>
      {title ? <MonthTitle>{title}</MonthTitle> : null}
      <DatesContainer>
        {[...Array(firstDayOfMonth)].map((_, index) => (
          <DateEl key={index} hidden>
            -
          </DateEl>
        ))}
        {[...Array(noOfDays)].map((_, index) => {
          const date = index + 1;
          const fullDate = `${year}-${realMonthNo}-${date}`;

          const hasGoals = !!localGoals[fullDate];
          const isActive = fullDate === activeDate;
          const isToday = fullDate === currentDate;

          return (
            <DateEl
              key={index}
              onClick={onDayClickHandler}
              data-date={fullDate}
              activeDay={isActive}
              currentDay={isToday}
              hasGoals={hasGoals}
            >
              {date}
            </DateEl>
          );
        })}
      </DatesContainer>
    </MonthContainer>
  );
};

export default MonthBox;

const MonthContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',

  marginBottom: '8rem',
});

const MonthTitle = styled('h5', {
  fontSize: '1.4rem',
  fontWeight: '500',

  color: '$grey-800',
  marginLeft: '1rem',
  marginBottom: '1rem',
});

const DatesContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(7, auto)',
  gridTemplateRows: 'repeat(5, auto)',

  gap: '1.6rem',
});

const DateEl = styled('span', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  position: 'relative',

  width: '3rem',
  height: '3rem',

  fontFamily: '$inter',
  fontSize: '1.4rem',
  fontWeight: 'normal',
  color: '$grey-700',

  borderRadius: '100px',

  transition: '$medium',

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '$grey-200',
  },

  variants: {
    currentDay: {
      true: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.2rem',

        fontWeight: 500,
        backgroundColor: '$grey-200',
        border: '1px solid $grey-600',
      },
    },
    activeDay: {
      true: {
        fontWeight: 500,
        backgroundColor: '$grey-200',
        outline: '1px solid $grey-500',
      },
    },
    hasGoals: {
      true: {
        '&::before': {
          content: `''`,
          display: 'inline-block',

          position: 'absolute',
          top: '-10%',
          left: '50%',

          transform: 'translateX(-50%)',

          width: '5px',
          height: '5px',

          backgroundColor: '$grey-700',
          borderRadius: '999px',
        },
      },
    },
    hidden: {
      true: {
        visibility: 'hidden',
      },
    },
  },
});
