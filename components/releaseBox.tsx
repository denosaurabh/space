import React from 'react';
import Markdown from 'markdown-to-jsx';

import { styled } from '@styled';

interface ReleaseBoxI {
  heading: string;
  body: string;
}

const ReleseBox: React.FC<ReleaseBoxI> = ({ heading, body }) => {
  return (
    <ReleaseContainer>
      <Heading>{heading}</Heading>
      <MarkDownStyled>{body}</MarkDownStyled>
    </ReleaseContainer>
  );
};

export default ReleseBox;

const ReleaseContainer = styled('div', {
  width: '100%',
  height: 'fit-content',

  margin: '5rem auto',

  borderBottom: '1px solid $grey-400',

  '& a': {
    color: 'inherit',
    fontWeight: 'bold',
    textDecoration: 'underline',

    margin: '0 0.5rem',
  },

  '@tablet': {
    maxWidth: '90%',
    width: '90%',
  },
});

const Heading = styled('h1', {
  fontSize: '4rem',
  fontWeight: '900',
  color: '$grey-800',

  marginBottom: '3rem',
});

const MarkDownStyled = styled(Markdown, {
  fontSize: '1.6rem',
  color: '$grey-800',
  lineHeight: '25px',

  '& h3': {
    marginBottom: '1rem',
  },

  '& ul': {
    listStyle: 'inside',
    marginTop: '2rem',
    marginBottom: '4rem',
  },
});
