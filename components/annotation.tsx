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
  children?: React.ReactNode;
  css?: Record<string, unknown>;
}

const AnnoGroup = ({ children, css }: AnnoGroupProps) => {
  return (
    <AnnoGroupStyled className="anno" css={css}>
      {children}
    </AnnoGroupStyled>
  );
};

export { Annotation, AnnoGroup };
