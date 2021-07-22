import { styled } from '@styled';

import Ellipse from '@components/annotations/ellipse';

const MidBoxStyled = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  width: '50rem',
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

  width: '100%',
  margin: '5rem 0',

  textAlign: 'center',

  [`& ${LeftBoxStyled}`]: {
    width: 'fit-content',
  },
  [`& ${RightBoxStyled}`]: {
    width: 'fit-content',
  },
});

const Heading = styled('h1', {
  fontFamily: '$inter',
  fontSize: '10rem',
  fontWeight: 'bold',
  color: '$grey-800',

  marginBottom: '4rem',
});

const Text = styled('p', {
  fontFamily: '$inter',
  fontSize: '1.8rem',
  lineHeight: '150%',
  color: '$grey-600',
});

interface MidBoxProps {
  heading: string;
  description: string;
}

interface SideBoxProps {
  css?: Record<string, unknown>;
}

const LeftBox: React.FC<SideBoxProps> = ({ children, css }) => {
  return <LeftBoxStyled css={css}>{children}</LeftBoxStyled>;
};

const RightBox: React.FC<SideBoxProps> = ({ children, css }) => {
  return <RightBoxStyled css={css}>{children}</RightBoxStyled>;
};

const MidBox: React.FC<MidBoxProps> = ({ heading, description }) => {
  return (
    <MidBoxStyled>
      <Ellipse>Coming Soon</Ellipse>
      <Heading>{heading}</Heading>
      <Text>{description}</Text>
    </MidBoxStyled>
  );
};

const FeatureBox: React.FC = ({ children }) => {
  return <FeatureContainer>{children}</FeatureContainer>;
};

export { FeatureBox, LeftBox, MidBox, RightBox };
