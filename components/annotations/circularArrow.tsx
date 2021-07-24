import Image from 'next/image';
import { darkTheme, styled } from '@styled';

const Center = styled('div', {
  display: 'grid',
  placeItems: 'center',

  width: '200px',
  height: '180px',

  fontFamily: '$indie',
  fontSize: '6rem',
  color: '$grey-500',

  position: 'relative',

  [`.${darkTheme} &`]: {
    opacity: 0.3,
  },
});

const Span = styled('span', {
  position: 'absolute',

  fontFamily: '$indie',
  fontSize: '5rem',
  color: '$grey-500',
});

interface CircularArrowProps {
  css?: { [key: string]: unknown };
}

const CircularArow: React.FC<CircularArrowProps> = ({ children, css }) => {
  return (
    <Center css={css} className="annotation">
      <Image
        src="/assets/annotations/CircularArrow.webp"
        alt="Circular Arrow"
        width={200}
        height={180}
      />

      <Span>{children}</Span>
    </Center>
  );
};

export default CircularArow;
