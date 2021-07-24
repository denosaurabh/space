import Image from 'next/image';
import { darkTheme, styled } from '@styled';

const Center = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2rem',

  width: 'fit-content',
  height: 'fit-content',

  fontFamily: '$indie',
  fontSize: '6rem',
  color: '$grey-500',

  position: 'relative',

  [`.${darkTheme} &`]: {
    opacity: 0.4,
  },
});

const Span = styled('span', {
  fontFamily: '$indie',
  fontSize: '2.4rem',
  color: '$grey-500',
});

interface CircularArrowProps {
  top: string;
  bottom: string;
  css?: { [key: string]: unknown };
}

const Repeat: React.FC<CircularArrowProps> = ({ top, bottom, css }) => {
  return (
    <Center css={css} className="annotation">
      <Span>{top}</Span>
      <Image
        src="/assets/annotations/Repeat.webp"
        alt="Repeat Circle"
        width={130}
        height={100}
      />
      <Span>{bottom}</Span>
    </Center>
  );
};

export default Repeat;
