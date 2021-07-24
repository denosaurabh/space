import Image from 'next/image';
import { darkTheme, styled } from '@styled';

const Center = styled('div', {
  display: 'grid',
  placeItems: 'center',

  width: '200px',
  height: '100px',

  fontFamily: '$indie',
  fontSize: '2rem',
  color: '$grey-500',

  position: 'relative',

  '@mobile': {
    width: '150px',
    height: '70px',
  },

  '& span': {
    position: 'absolute',
  },

  [`.${darkTheme} &`]: {
    opacity: 0.5,
  },
});

const Ellipse: React.FC = ({ children }) => {
  return (
    <Center className="annotation">
      <Image
        src="/assets/annotations/Ellipse.webp"
        alt="Ellipse"
        width={200}
        height={100}
      />

      <span>{children}</span>
    </Center>
  );
};

export default Ellipse;
