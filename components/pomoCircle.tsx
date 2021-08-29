import { styled } from '@styled';

interface PomoCircleProps {
  time: string;
}

const PomoCircle: React.FC<PomoCircleProps> = ({ time }) => {
  return (
    <PomoCircleContainer>
      <Title>Adding dark theme to app</Title>
      <Time>{time}</Time>
      <Span>1 / 3</Span>
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
