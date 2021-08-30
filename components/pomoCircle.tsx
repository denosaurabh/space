import { useEffect } from 'react';
import { styled } from '@styled';

import usePomodoro from '@state/pomodoro';

const PomoCircle: React.FC = () => {
  const { currentPomo, setCurrentPomoTime } = usePomodoro((state) => ({
    currentPomo: state.currentPomo,
    setCurrentPomoTime: state.setCurrentPomoTime,
  }));

  const {
    currentTime,
    noOfPomos,
    currentPomo: currentPomoNumber,
    title,
    isRunning,
  } = currentPomo();

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        if (currentTime > 0) {
          const newTime = currentTime - 1000;
          setCurrentPomoTime(newTime);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, currentTime, isRunning]);

  if (!currentPomo()) {
    return (
      <PomoCircleContainer>
        <Title>task</Title>
        <Time>25:00</Time>
        <Span>1 / 1</Span>
      </PomoCircleContainer>
    );
  }

  const minutes = Math.floor(currentTime / 60000);
  const seconds = ((currentTime % 60000) / 1000).toFixed(0);

  return (
    <PomoCircleContainer>
      <Title>{title}</Title>
      <Time>
        {minutes}:{seconds}
      </Time>
      <Span>
        {currentPomoNumber} / {noOfPomos}
      </Span>
    </PomoCircleContainer>
  );
};

export default PomoCircle;

const PomoCircleContainer = styled('div', {
  width: '40rem',
  height: '40rem',

  border: '1px solid $grey-600',
  borderRadius: '50%',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const Title = styled('p', {
  fontSize: '1.8rem',
  color: '$grey-600',
  fontWeight: 400,

  marginBottom: '1rem',
});

const Time = styled('span', {
  fontSize: '7rem',
  fontWeight: 600,
  color: '$grey-700',

  marginBottom: '1rem',
});

const Span = styled('span', {
  fontSize: '1.6rem',
  color: '$grey-600',
});
