import { useEffect } from 'react';
import { styled } from '@styled';

import usePomodoro from '@state/pomodoro';
import Badge from './badge';

const PomoCircle: React.FC = () => {
  const {
    currentPomo,
    setCurrentPomoTime,
    finishCurrentPomo,
    pauseCurrentPomo,
    // startCurrentPomo,
  } = usePomodoro((state) => ({
    currentPomo: state.currentPomo,
    setCurrentPomoTime: state.setCurrentPomoTime,
    finishCurrentPomo: state.finishPomo,
    pauseCurrentPomo: state.pauseCurrentPomo,
    startCurrentPomo: state.startCurrentPomo,
  }));

  const currentPomoObj = currentPomo();

  useEffect(() => {
    if (!window) return;

    if (!Notification) {
      alert(
        'Desktop notifications not available in your browser. Try modern browsers like Firefox/Chrome.'
      );

      return;
    }

    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    if (currentPomoObj?.isRunning) {
      const interval = setInterval(() => {
        if (currentPomoObj?.currentTime > 0) {
          const newTime = currentPomoObj?.currentTime - 1000;
          setCurrentPomoTime(newTime);
        } else {
          finishCurrentPomo();
          pauseCurrentPomo();

          // const worker = new window.Worker('/worker/index.js');
          // worker.postMessage({
          //   title: 'Pomo Complete',
          //   message: 'You have completed your pomo',
          // });

          const pomoCompleteNotify = () => {
            if (Notification.permission !== 'granted') {
              Notification.requestPermission();
            } else {
              // const notification = 
              new Notification('Pomodoro', {
                icon: '/space.png',
                body: `${currentPomoObj.title} Pomo Complete!`,
              });

              // notification.onclick = () => {
                // window.open(window.location.href);
              // };
            }
          };

          pomoCompleteNotify();
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentPomoObj?.title,
    currentPomoObj?.currentTime,
    currentPomoObj?.isRunning,
  ]);

  if (!currentPomo()) {
    return (
      <PomoCircleContainer>
        <Title>--</Title>
        <Time>--:--</Time>
        <Span>-- / --</Span>
      </PomoCircleContainer>
    );
  }

  const {
    state,
    title,
    noOfPomos,
    currentTime,
    currentPomo: currentPomoNumber,
  } = currentPomoObj;

  const minutes = Math.floor(currentTime / 60000);
  const seconds = ((currentTime % 60000) / 1000).toFixed(0);

  return (
    <PomoCircleContainer>
      <Title>{title}</Title>
      <Time>
        {minutes}:{seconds}
      </Time>
      <Span>
        {currentPomoNumber} out of {noOfPomos}
        {noOfPomos == 1 ? ' pomo' : ' pomos'}
      </Span>
      <Badge size="medium" color="grey" css={{ display: 'inline' }}>
        {state}
      </Badge>
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

  marginBottom: '1rem',
});
