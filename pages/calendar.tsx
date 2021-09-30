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
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '15rem',

  padding: '4rem',
});
