import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { styled } from '@styled';

import Button from '@components/button';
import { AnnoGroup, Annotation } from '@components/annotation';

const CTAContaner = styled('div', {
  width: '100%',
  height: 'auto',

  marginTop: '40rem',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20rem',

  textAlign: 'center',
});

/*
const Heading = styled('h4', {
  fontSize: '5rem',
  fontWeight: 'bold',
  color: '$grey-800',
});
*/

const CallToAction: React.FC = () => {
  return (
    <CTAContaner>
      <Annotation>
        <AnnoGroup css={{ bottom: '140%', left: '20%' }}>
          <Image
            src="/assets/annotations/Sparkle.webp"
            alt="Sparkle"
            width={120}
            height={70}
          />
        </AnnoGroup>

        <AnnoGroup
          css={{
            left: '-150%',
            top: '40%',
            '@mobile': {
              left: '-170%',
            },
          }}
        >
          <Image
            src="/assets/annotations/ThinStraightArrow.webp"
            alt="Thin Right Arrow pointing towards button"
            width={280}
            height={20}
          />
        </AnnoGroup>

        <Link href="/notes" passHref>
          <a>
            <Button color="dark" size="mega">
              Use Space
            </Button>
          </a>
        </Link>

        <AnnoGroup
          css={{
            right: '-150%',
            top: '40%',
            transform: 'rotate(180deg)',
            '@mobile': {
              right: '-170%',
            },
          }}
        >
          <Image
            src="/assets/annotations/ThinStraightArrow.webp"
            alt="Thin Left Arrow pointing towards button"
            width={280}
            height={20}
          />
        </AnnoGroup>

        <AnnoGroup css={{ top: '120%' }}>
          <Image
            src="/assets/annotations/Scribble.webp"
            alt="Scribble"
            width={400}
            height={200}
          />
        </AnnoGroup>
      </Annotation>
      {/* <Heading>Help Support Space</Heading> */}
    </CTAContaner>
  );
};

export default CallToAction;
