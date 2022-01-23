import { styled } from '@styled';
import Page from '@layouts/page';

import CalendarContainer from '@shared/calendar/calendarContainer';
import AllGoals from '@shared/calendar/allGoals';
import Seperator from '@components/separator';

const Calendar: React.FC = () => {
  return (
    <Page>
      <Container>
        <CalendarContainer />
        <Seperator orientation="vertical" css={{ height: '100vh' }} />
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

  // '@desktop': {
  //   gap: '10rem',
  // },

  // '@laptop': {
  //   gap: '4rem',
  // },

  '@tablet-big': {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
