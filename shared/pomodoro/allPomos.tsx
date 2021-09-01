import { styled } from '@styled';

import PomoBox from '@components/pomoBox';
import Button from '@components/button';

import usePomodoro from '@state/pomodoro';

const AllPomos: React.FC = () => {
  const { pomos, setShowCreatePomo, currentPomo } = usePomodoro(
    (state) => state
  );

  const currentPomoObj = currentPomo();

  return (
    <PomoRightBox>
      <PomoBoxContainer>
        <PomoBoxContainerHeading>current -&gt;</PomoBoxContainerHeading>

        {currentPomoObj ? (
          <PomoBox
            id={currentPomoObj?.id}
            key={currentPomoObj?.id}
            heading={currentPomoObj?.title || '--'}
            span={`${currentPomoObj?.currentPomo || '--'} / ${
              currentPomoObj?.noOfPomos || '--'
            }`}
            hideMenu
          />
        ) : (
          <NoCurrentPomo>No Current Pomo</NoCurrentPomo>
        )}
      </PomoBoxContainer>

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
              id={id}
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
  // backgroundColor: '$grey-200 !important',
  border: '1px solid $grey-400',
  boxShadow: 'none !important',
});

const NoCurrentPomo = styled('p', {
  width: '40rem',
  textAlign: 'center',

  fontFamily: '$inter',
  fontSize: '1.4rem',
  fontWeight: 400,

  color: '$grey-600',
});
