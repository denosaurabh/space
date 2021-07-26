import { memo } from 'react';
import { styled } from '@styled';
import { keyframes } from '@stitches/react';

const rotate = keyframes({
  '0%': { transform: 'rotateX(0)' },
  '100%': { transform: 'rotateX(180deg)' },
});

const GradientContainer = styled('div', {
  width: '20rem',
  height: '20rem',

  position: 'absolute',

  variants: {
    animate: {
      true: {
        animation: `${rotate} 1.2s`,
      },
    },
  },
});

const GradientCircle = styled('div', {
  width: '20rem',
  height: '20rem',
  filter: `blur(10rem)`,

  '@tablet': {
    width: '10rem',
    height: '10rem',
  },

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
      yellow: {
        background: '$dreamy-gradients-yellow',
      },
      orange: {
        background: '$dreamy-gradients-orange',
      },
      green: {
        background: '$dreamy-gradients-green',
      },
      blue: {
        background: '$dreamy-gradients-blue',
      },
      purple: {
        background: '$dreamy-gradients-purple',
      },
    },
  },
});

interface DreamyGradientI {
  color: 'yellow' | 'orange' | 'green' | 'blue' | 'purple';

  top?: string | 'unset';
  bottom?: string | 'unset';
  left?: string | 'unset';
  right?: string | 'unset';

  animate?: boolean;
}

const DreamyGradient: React.FC<DreamyGradientI> = ({
  top,
  bottom,
  left,
  right,
  color,
  animate,
}) => {
  return (
    <GradientContainer css={{ top, bottom, left, right }} animate={animate}>
      <GradientCircle color={`${color}`} />
      {/* <GradientCircle color={`${color}-second`} /> */}
    </GradientContainer>
  );
};

export default memo(DreamyGradient);
