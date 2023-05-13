import { darkTheme, styled } from '@styled';

import { Annotation } from '@components/annotation';
import Ellipse from '@components/annotations/ellipse';

const MidBoxStyled = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  width: '50rem',

  '@mobile': {
    width: '40rem',
  },
});

const LeftBoxStyled = styled('div', {
  position: 'relative',
});

const RightBoxStyled = styled('div', {
  position: 'relative',
});

const FeatureContainer = styled('div', {
  display: 'flex',
  gap: '8rem',

  margin: '5rem 0',

  textAlign: 'center',

  '@desktop': {
    gap: '4rem',
  },

  [`& ${LeftBoxStyled}`]: {
    width: 'fit-content',

    '@laptop': {
      display: 'none',
    },
  },

  [`& ${RightBoxStyled}`]: {
    width: 'fit-content',

    '@laptop': {
      display: 'none',
    },
  },
});

const Heading = styled('h1', {
  fontFamily: '$inter',
  fontSize: '10rem',
  fontWeight: 'bold',
  color: '$grey-800',

  marginBottom: '4rem',

  '@mobile': {
    fontSize: '7rem',
  },

  [`.${darkTheme} &`]: {
    color: '$grey-700',
  },
});

const Text = styled('p', {
  fontFamily: '$inter',
  fontSize: '1.8rem',
  lineHeight: '150%',
  color: '$grey-600',

  [`.${darkTheme} &`]: {
    color: '$grey-500',
  },
});

interface MidBoxProps {
  heading: string;
  description: string;
  soon?: boolean;
  children?: React.ReactNode;
}

interface SideBoxProps {
  css?: Record<string, unknown>;
  children?: React.ReactNode;
}

const LeftBox = ({ children, css }: SideBoxProps) => {
  return <LeftBoxStyled css={css}>{children}</LeftBoxStyled>;
};

const RightBox = ({ children, css }: SideBoxProps) => {
  return <RightBoxStyled css={css}>{children}</RightBoxStyled>;
};

const MidBox = ({ heading, description, soon, children }: MidBoxProps) => {
  return (
    <MidBoxStyled>
      {soon ? <Ellipse>Coming Soon</Ellipse> : <Ellipse>NEW!</Ellipse>}

      <Heading>{heading}</Heading>
      <Text>{description}</Text>
      <Annotation
        css={{
          margin: '4rem 0',
          display: 'none',

          '@laptop': {
            display: 'block',
          },
        }}
      >
        {children}
      </Annotation>
    </MidBoxStyled>
  );
};

const FeatureBox = ({ children }: { children?: React.ReactNode }) => {
  return <FeatureContainer>{children}</FeatureContainer>;
};

export { FeatureBox, LeftBox, MidBox, RightBox };
