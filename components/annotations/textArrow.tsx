import { styled } from '@styled';
import { AnnoGroup, Annotation } from '@components/annotation';

const Container = styled('div', {
  position: 'relative',

  fontFamily: '$indie',
  fontSize: '2rem',
  color: '$grey-500',

  '& span': {
    position: 'absolute',
  },

  '& img': {
    objectFit: 'cover',
  },
});

interface TextArrowI {
  children: React.ReactNode;
  arrow: JSX.Element;
  text: string;
  annoPos: string;
  textPos: {
    width?: string;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
}

const TextArrow = ({ children, arrow, annoPos, textPos, text }: TextArrowI) => {
  const { top, right, bottom, left, width } = textPos;

  return (
    <Annotation
      css={{
        annoPos,

        '& .annotation': {
          opacity: 0.3,
          transition: '$slow',
        },

        '&:hover': {
          '& .annotation': {
            opacity: 1,
          },
        },
      }}
    >
      <AnnoGroup
        css={{
          '@tablet': {
            display: 'none',
          },
        }}
      >
        <Container className="annotation">
          <div className="arrow">{arrow}</div>

          <span
            style={{
              top: top || 'unset',
              right: right || 'unset',
              bottom: bottom || 'unset',
              left: left || 'unset',
              width: width || 'fit-content',
              height: 'fit-content',
            }}
          >
            {text}
          </span>
        </Container>
      </AnnoGroup>
      {children}
    </Annotation>
  );
};

export default TextArrow;
