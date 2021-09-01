import { styled } from '@styled';

import Page from '@layouts/page';

import CurrentPomo from '@shared/pomodoro/currentPomo';
import AllPomos from '@shared/pomodoro/allPomos';
import CreatePomo from '@shared/pomodoro/createPomo';

const Pomodoro: React.FC = () => {
  return (
    <Page>
      <PomoContainer>
        <CurrentPomo />
        <AllPomos />
        <CreatePomo />
      </PomoContainer>
    </Page>
  );
};

export default Pomodoro;

const PomoContainer = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: '16rem',
  flexWrap: 'wrap',

  width: '100%',
  height: '100%',

  padding: '4rem',

  marginTop: '5rem',

  '@mobile': {
    padding: '0',
  },
});
