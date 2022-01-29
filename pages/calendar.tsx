import { styled } from '@styled';
import Page from '@layouts/page';

import CalendarContainer from '@shared/calendar/calendarContainer';
import AllGoals from '@shared/calendar/allGoals';

const Calendar: React.FC = () => {
  return (
    <Page>
      <Container>
        <CalendarContainer />
        <AllGoals />
      </Container>
    </Page>
  );
};

export default Calendar;

const Container = styled('div', {
  display: 'flex',
  justifyContent: 'space-evenly',
  gap: '2rem',

  padding: '4rem',

  '@tablet-big': {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
