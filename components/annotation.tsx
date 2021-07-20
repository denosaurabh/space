import { styled } from '@styled';

const Annotation = styled('div', {
  position: 'relative',

  '& .anno, svg': {
    position: 'absolute',
  },
});

const AnnoGroupStyled = styled('div', {
  position: 'absolute',
});

const AnnoGroup: React.FC = ({ children }) => {
  return <AnnoGroupStyled className="anno">{children}</AnnoGroupStyled>;
};

export { Annotation, AnnoGroup };
