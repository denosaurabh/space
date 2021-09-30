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
  const { currentDay, activeDay, setActiveDay } = useCalendar(
    ({ currentDay, setActiveDay, activeDay }) => ({
      currentDay,
      setActiveDay,
      activeDay,
    })
  );

  const onDayClickHandler = (e) => {
    const date = e.target.dataset.date;
    console.log(date);

    setActiveDay(date);
  };

  return (
    <MonthContainer>
      {title ? <MonthTitle>{title}</MonthTitle> : null}
      <DatesContainer>
        {[...Array(noOfDays)].map((_, i) => (
          <DateEl
            key={i}
            data-date={`${i + 1}-${month}-${year}`}
            currentDay={`${i + 1}-${month}-${year}` === currentDay}
            activeDay={`${i + 1}-${month}-${year}` === activeDay}
            onClick={onDayClickHandler}
          >
            {i + 1}
          </DateEl>
        ))}
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

  fontFamily: '$inter',
  fontSize: '1.4rem',
  fontWeight: 'normal',
  color: '$grey-700',

  padding: '1rem',
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

        '&::before': {
          content: `''`,
          // display: 'inline-block',

          // position: 'relative',
          // top: '-1.5rem',
          // left: '1rem',

          width: '6px',
          height: '6px',

          backgroundColor: '$grey-800',
          borderRadius: '999px',
        },
      },
    },
    activeDay: {
      true: {
        fontWeight: 500,
        backgroundColor: '$grey-200',
        outline: '1px solid $grey-500',
      },
    },
  },
});
