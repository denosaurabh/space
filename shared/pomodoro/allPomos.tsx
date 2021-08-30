import { styled } from '@styled';

import PomoBox from '@components/pomoBox';
import Button from '@components/button';

import usePomodoro from '@state/pomodoro';

const AllPomos: React.FC = () => {
  const { pomos, setShowCreatePomo, currentPomo } = usePomodoro(
    (state) => state
  );

  const currentPomoObj = currentPomo();
  const {
    id,
    title,
    currentPomo: currentPomoNo,
    noOfPomos,
    isRunning,
  } = currentPomoObj;

  return (
    <PomoRightBox>
      {isRunning && (
        <PomoBoxContainer>
          <PomoBoxContainerHeading>continuing -&gt;</PomoBoxContainerHeading>

          <PomoBox
            key={id}
            heading={title}
            span={`${currentPomoNo} / ${noOfPomos}`}
          />
        </PomoBoxContainer>
      )}

      <PomoBoxContainer>
        {pomos.length > 1 && (
          <PomoBoxContainerHeading>next up -&gt;</PomoBoxContainerHeading>
        )}

        {pomos.map((pomo, i) => {
          const { title, id, noOfPomos } = pomo;

          if (i === 0) return;

          return (
            <PomoBox
              key={id}
              heading={title}
              span={`${noOfPomos} ${noOfPomos == 1 ? 'pomo' : 'pomos'}`}
            />
          );
        })}
      </PomoBoxContainer>

      <PomoCircleButton
        onClick={() => setShowCreatePomo(true)}
        color="light"
        css={{ width: '30rem', height: '5rem', borderRadius: '12px' }}
      >
        Add Pomodoro
      </PomoCircleButton>
    </PomoRightBox>
  );
};

export default AllPomos;

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

const PomoCircleButton = styled(Button, {
  width: '12rem',
  border: '1px solid $grey-400',
  boxShadow: 'none !important',
});
