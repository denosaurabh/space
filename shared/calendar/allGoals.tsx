import dayjs from 'dayjs';

import { styled } from '@styled';

import { GoalBox } from '@components/goalBox';
import Button from '@components/button';

import useCalendar from '@state/calendar';
import { Goal } from '@lib/store/calendar';

import CreateGoal from '@shared/calendar/createGoal';

import PlusSvg from '@assets/svg/Plus.svg';
import CloseSvg from '@assets/svg/Close.svg';
import JournalBox from '@components/journalBox';
import Seperator from '@components/separator';

const AllGoals: React.FC = () => {
  const { showCreateNewGoal, setShowCreateNewGoal, activeDay, getDayGoals } =
    useCalendar(
      ({
        showCreateNewGoal,
        setShowCreateNewGoal,
        activeFullDate: activeDay,
        getDayGoals,
      }) => ({
        showCreateNewGoal,
        setShowCreateNewGoal,
        activeDay,
        getDayGoals,
      })
    );

  return (
    <AllGoalsContainer>
      <AllGoalsHeader>
        <h3>
          Events
          {!showCreateNewGoal ? (
            <Button color="light" size="small" onClick={setShowCreateNewGoal}>
              New Event <PlusSvg />
            </Button>
          ) : (
            <Button color="light" size="small" onClick={setShowCreateNewGoal}>
              Cancel <CloseSvg />
            </Button>
          )}
        </h3>
        <span>{dayjs(activeDay, 'YYYY-M-D').format('dddd, D MMMM YYYY')}</span>
      </AllGoalsHeader>

      {showCreateNewGoal && <CreateGoal />}

      <GoalsContainer>
        {getDayGoals(activeDay).map((goal: Goal) => (
          <GoalBox key={goal.id} {...goal} />
        ))}
      </GoalsContainer>

      {!getDayGoals(activeDay).length ? <p>No Goals</p> : null}

      <Seperator />
      <JournalBox />
    </AllGoalsContainer>
  );
};

export default AllGoals;

const AllGoalsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '5rem',

  minWidth: '45rem',

  fontFamily: '$inter',
  fontSize: '1.5rem',
  fontWeight: '400',
  color: '$grey-600',

  '@tablet-big': {
    width: '100%',
    maxWidth: '50rem',
  },
});

const GoalsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

const AllGoalsHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  fontFamily: '$inter',

  h3: {
    width: '100%',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    fontSize: '4rem',
    color: '$grey-800',
  },

  span: {
    fontSize: '1.6rem',
    color: '$grey-600',
  },
});
