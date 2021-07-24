import { memo } from 'react';
import { styled } from '@styled';

const GradientContainer = styled('div', {
  width: '20rem',
  height: '20rem',

  position: 'absolute',
});

const GradientCircle = styled('div', {
  width: '20rem',
  height: '20rem',
  filter: `blur(100px)`,

  variants: {
    color: {
      'yellow-first': {
        background: '$dreamy-gradients-yellow-first',
      },
      'yellow-second': {
        background: '$dreamy-gradients-yellow-second',
      },
      'orange-first': {
        background: '$dreamy-gradients-orange-first',
      },
      'orange-second': {
        background: '$dreamy-gradients-orange-second',
      },
    },
  },
});

interface DreamyGradientI {
  color: 'yellow' | 'orange';

  top?: string | '0%';
  bottom?: string | '0%';
  left?: string | '0%';
  right?: string | '0%';
}

const DreamyGradient: React.FC<DreamyGradientI> = ({
  top,
  bottom,
  left,
  right,
  color,
}) => {
  return (
    <GradientContainer css={{ top, bottom, left, right }}>
      <GradientCircle color={`${color}-first`} />
      <GradientCircle color={`${color}-second`} />
    </GradientContainer>
  );
};

export default memo(DreamyGradient);
