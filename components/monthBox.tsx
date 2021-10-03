import { useEffect, useState } from 'react';
import useCalendar from '@state/calendar';
import { styled } from '@styled';

interface MonthBoxProps {
  title?: string;
  noOfDays: number;
  month: number;
  year: number;
}

const MonthBox: React.FC<MonthBoxProps> = ({
  title,
  noOfDays,
  month,
  year,
}) => {
  const { currentDay, activeDay, setActiveDay, goals } = useCalendar(
    ({
      currentFullDate: currentDay,
      setActiveDay,
      activeFullDate: activeDay,
      goals,
    }) => ({
      currentDay,
      setActiveDay,
      activeDay,
      goals,
    })
  );

  const [localGoals, setLocalGoals] = useState({});

  const onDayClickHandler = (e) => {
    const date = e.target.dataset.date;

    setActiveDay(date);
  };

  useEffect(() => {
    // console.log('goals', goals);
    setLocalGoals(goals);
  }, [, goals]);

  return (
    <MonthContainer>
      {title ? <MonthTitle>{title}</MonthTitle> : null}
      <DatesContainer>
        {[...Array(noOfDays)].map((_, i) => {
          const date = `${i + 1}-${month}-${year}`;
          const hasGoals = !!localGoals[date];

          return (
            <DateEl
              key={i}
              data-date={date}
              currentDay={date === currentDay}
              activeDay={date === activeDay}
              hasGoals={hasGoals}
              onClick={onDayClickHandler}
            >
              {i + 1}
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
});

const MonthTitle = styled('h5', {
  fontSize: '1.4rem',
  fontWeight: '500',

  color: '$grey-800',
  marginLeft: '1rem',
});

const DatesContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(10, auto)',
  gridTemplateRows: 'repeat(3, auto)',

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
  },
});
