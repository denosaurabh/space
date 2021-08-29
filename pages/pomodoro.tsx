import { useState } from 'react';
import { styled } from '@styled';

import Page from '@layouts/page';

import PomoCircle from '@components/pomoCircle';
import Button from '@components/button';
import PomoBox from '@components/pomoBox';
import Input from '@components/input';

import PauseSvg from '@assets/svg/Pause.svg';
import StopSvg from '@assets/svg/Stop.svg';
import CloseSvg from '@assets/svg/Close.svg';

const Pomodoro: React.FC = () => {
  const [showAddPomo, setShowAddPomo] = useState(false);

  return (
    <Page>
      <PomoContainer>
        <PomoLeftBox>
          <PomoCircle time="16:25" />
          <ButtonsBox>
            <PomoCircleButton color="light" size="medium">
              <PauseSvg />
              Pause
            </PomoCircleButton>
            <PomoCircleButton color="light" size="medium">
              <StopSvg />
              Stop
            </PomoCircleButton>
          </ButtonsBox>
        </PomoLeftBox>
        <PomoRightBox>
          <PomoBoxContainer>
            <PomoBoxContainerHeading>continuing -&gt;</PomoBoxContainerHeading>
            <PomoBox heading="Adding feature to Atmos" span="2 / 3" />
          </PomoBoxContainer>
          <PomoBoxContainer>
            <PomoBoxContainerHeading>next up -&gt;</PomoBoxContainerHeading>

            <PomoBox heading="Adding dark theme to app" span="2 pomos" />
            <PomoBox heading="Adding dark theme to app" span="1 pomos" />
            <PomoBox heading="Adding dark theme to app" span="4 pomos" />
            <PomoBox heading="Adding dark theme to app" span="1 pomos" />
          </PomoBoxContainer>

          <PomoCircleButton
            onClick={() => setShowAddPomo(true)}
            color="light"
            css={{ width: '30rem', height: '5rem', borderRadius: '12px' }}
          >
            Add Pomodoro
          </PomoCircleButton>
        </PomoRightBox>
        {showAddPomo ? (
          <NewPomoBox>
            <CancelSpan onClick={() => setShowAddPomo(false)}>
              <CloseSvg />
              Cancel
            </CancelSpan>

            <Input type="name" placeHolder="adding a feature" label="Name" />
            <Input type="number" placeHolder="4" label="Est. Pomos" />

            <Button>Add Pomodoro</Button>
          </NewPomoBox>
        ) : null}
      </PomoContainer>
    </Page>
  );
};

export default Pomodoro;

const PomoContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
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

const PomoLeftBox = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  gap: '4rem',
});

const NewPomoBox = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  gap: '3rem',
});

const PomoRightBox = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  gap: '10rem',
});

const PomoBoxContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  gap: '3rem',
});

const PomoBoxContainerHeading = styled('h5', {
  alignSelf: 'flex-start',

  fontFamily: '$inter',
  fontSize: '1.6rem',
  fontWeight: 400,

  color: '$grey-600',
});

const ButtonsBox = styled('div', {
  display: 'flex',
  gap: '2rem',
});

const PomoCircleButton = styled(Button, {
  width: '12rem',
  border: '1px solid $grey-400',
  boxShadow: 'none !important',
});

const CancelSpan = styled('span', {
  alignSelf: 'flex-start',

  fontFamily: '$inter',
  fontSize: '1.6rem',
  color: '$grey-700',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.8rem',

  marginBottom: '2rem',

  svg: {
    fill: '$grey-600',
  },

  transition: '$fast',

  '&:hover': {
    fontWeight: 500,
    cursor: 'pointer',
  },
});
