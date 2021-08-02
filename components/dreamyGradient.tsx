import { styled } from '@styled';
import { keyframes } from '@stitches/react';

const rotateAndScale = keyframes({
  '0%': { transform: 'rotate(0) scale(0.8)' },
  '50%': { transform: 'rotate(180deg) scale(1.1)' },
  '100%': { transform: 'rotate(360deg) scale(0.8)' },
});

const GradientContainer = styled('div', {
  width: '20rem',
  height: '20rem',

  position: 'absolute',

  variants: {
    animate: {
      true: {
        animation: `${rotateAndScale} 3s infinite ease-in`,
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
    </GradientContainer>
  );
};

export default DreamyGradient;
