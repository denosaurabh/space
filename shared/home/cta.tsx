import React from 'react';
import Link from 'next/link';

import { styled } from '@styled';

import Button from '@components/button';

const CTAContaner = styled('div', {
  width: '100%',
  height: 'auto',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20rem',

  textAlign: 'center',
});

const Heading = styled('h4', {
  fontSize: '5rem',
  fontWeight: 'bold',
  color: '$grey-800',
});

const CallToAction: React.FC = () => {
  return (
    <CTAContaner>
      <Link href="/notes" passHref>
        <a>
          <Button color="dark" size="mega">
            Use the App
          </Button>
        </a>
      </Link>
      <Heading>Help Support the Project</Heading>
    </CTAContaner>
  );
};

export default CallToAction;
