import Image from 'next/image';
import { darkTheme, styled } from '@styled';

const Center = styled('div', {
  display: 'grid',
  placeItems: 'center',

  width: 'fit-content',
  height: 'fit-content',

  position: 'relative',

  '@tablet': {
    '& img': {
      width: 50,
      height: 50,
    },
  },

  [`.${darkTheme} &`]: {
    opacity: 0.3,
  },
});

const Span = styled('span', {
  position: 'absolute',

  fontFamily: '$indie',
  fontSize: '4rem',
  color: '$grey-500',
});

interface CircleProps {
  css?: Record<string, unknown>;
}

const Circle: React.FC<CircleProps> = ({ children, css }) => {
  return (
    <Center className="annotation" css={css}>
      <Image
        src="/assets/annotations/Circle.webp"
        alt="Ellipse"
        width={80}
        height={60}
      />

      <Span>{children}</Span>
    </Center>
  );
};

export default Circle;
