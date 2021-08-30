import { styled } from '@styled';

import Button from '@components/button';
import PomoCircle from '@components/pomoCircle';

import PauseSvg from '@assets/svg/Pause.svg';
import StopSvg from '@assets/svg/Stop.svg';
import PlaySvg from '@assets/svg/Play.svg';

import usePomodoro from '@state/pomodoro';

const CurrentPomo: React.FC = () => {
  const { currentPomo, pauseCurrentPomo, startCurrentPomo } = usePomodoro(
    (state) => ({
      currentPomo: state.currentPomo,
      startCurrentPomo: state.startCurrentPomo,
      pauseCurrentPomo: state.pauseCurrentPomo,
    })
  );

  const currentPomoObj = currentPomo();

  return (
    <PomoLeftBox>
      <PomoCircle />
      <ButtonsBox>
        {currentPomoObj.isRunning && (
          <>
            <PomoCircleButton
              color="light"
              size="medium"
              onClick={pauseCurrentPomo}
            >
              <PauseSvg />
              Pause
            </PomoCircleButton>
            <PomoCircleButton color="light" size="medium">
              <StopSvg />
              Stop
            </PomoCircleButton>
          </>
        )}

        {!currentPomoObj.isRunning && (
          <PomoCircleButton
            color="light"
            size="medium"
            onClick={startCurrentPomo}
          >
            <PlaySvg />
            Start
          </PomoCircleButton>
        )}
      </ButtonsBox>
    </PomoLeftBox>
  );
};

export default CurrentPomo;

const PomoLeftBox = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  gap: '4rem',
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
