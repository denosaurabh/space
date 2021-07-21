import Image from 'next/image';
import { styled } from '@styled';

const Center = styled('div', {
  display: 'grid',
  placeItems: 'center',

  width: 'fit-content',
  height: 'fit-content',

  position: 'relative',
});

const Span = styled('span', {
  position: 'absolute',

  fontFamily: '$indie',
  fontSize: '4rem',
  color: '$grey-500',
});

const Circle: React.FC = ({ children }) => {
  return (
    <Center>
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
