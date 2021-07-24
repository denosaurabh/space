import { darkTheme, styled } from '@styled';

const Annotation = styled('div', {
  position: 'relative',

  '& .anno, svg': {
    position: 'absolute',
  },
});

const AnnoGroupStyled = styled('div', {
  position: 'absolute',

  [`.${darkTheme} &`]: {
    opacity: 0.3,
  },
});

interface AnnoGroupProps {
  css?: Record<string, unknown>;
}

const AnnoGroup: React.FC<AnnoGroupProps> = ({ children, css }) => {
  return (
    <AnnoGroupStyled className="anno" css={css}>
      {children}
    </AnnoGroupStyled>
  );
};

export { Annotation, AnnoGroup };
