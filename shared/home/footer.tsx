import React from 'react';
import Image from 'next/image';

import { styled } from '@styled';
import Link from 'next/link';

const FooterContainer = styled('footer', {
  width: '100%',
  height: '10rem',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  padding: '8rem 6rem',
  marginTop: '35rem',
});

const LogoContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '2rem',

  width: 'fit-content',
  height: 'fit-content',
});

const ListContainer = styled('div', {
  width: 'auto',
  height: 'auto',

  display: 'flex',
  gap: '10rem',
});

const ULContainer = styled('nav', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: '2rem',
});

const LI = styled('span', {
  fontSize: '1.4rem',
  color: '$grey-600',

  transition: '$fast',

  '&:hover': {
    cursor: 'pointer',
    color: '$grey-800',
  },
});

const LIHead = styled('span', {
  fontSize: '1.4rem',
  color: '$grey-700',
  fontWeight: 'bold',

  marginBottom: '3rem',
});

const Text = styled('span', {
  fontSize: '1.4rem',
  color: '$grey-600',

  '& a': {
    fontWeight: '500',
    color: '$grey-700',

    margin: '0 0.5rem',
  },
});

const RightBox = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '2rem',
});

const InfoBox = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <LogoContainer>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Image
            className="logo"
            alt="Space"
            src="/assets/icon-192x192.png"
            width={40}
            height={40}
          />
          <Image
            className="dino"
            alt="denosaurabh"
            src="/assets/dinosaur.svg"
            width={40}
            height={40}
          />
        </div>

        <Text>
          Open Source Project
          <br /> by
          <Link href="https://github.com/denosaurabh" passHref>
            <a target="_blank" rel="noreferer">
              @denosaurabh
            </a>
          </Link>
        </Text>
      </LogoContainer>
      <ListContainer>
        <ULContainer>
          <LIHead>Overview</LIHead>
          <LI>Getting Started</LI>
          <LI>Features</LI>
          <Link
            href="https://github.com/DenoSaurabh/space/discussions/categories/feedback"
            passHref
          >
            <a target="_blank" rel="noreferer">
              <LI>Give us Feedback</LI>
            </a>
          </Link>
        </ULContainer>
        <ULContainer>
          <LIHead>Development</LIHead>
          <Link href="https://github.com/DenoSaurabh/space/releases" passHref>
            <a target="_blank" rel="noreferer">
              <LI>Updates</LI>
            </a>
          </Link>
          <LI>Technologies</LI>
          <Link href="https://github.com/DenoSaurabh/space/issues/new" passHref>
            <a target="_blank" rel="noreferer">
              <LI>Report a issue</LI>
            </a>
          </Link>
        </ULContainer>
        <ULContainer>
          <LIHead>Community</LIHead>
          <Link href="https://discord.gg/YhPsFzXj" passHref>
            <a target="_blank" rel="noreferer">
              <LI>Discord</LI>
            </a>
          </Link>
          <Link href="https://github.com/denosaurabh/space" passHref>
            <a target="_blank" rel="noreferer">
              <LI>Github</LI>
            </a>
          </Link>
          <Link
            href="https://github.com/DenoSaurabh/space/discussions"
            passHref
          >
            <a target="_blank" rel="noreferer">
              <LI>Discussions</LI>
            </a>
          </Link>
        </ULContainer>
      </ListContainer>
      <RightBox>
        <InfoBox>
          <Text>This project is under</Text>
          <LIHead>GNU GPL v3 License</LIHead>
        </InfoBox>
        <InfoBox>
          <Text>Have a question?</Text>
          <LIHead>
            Email me at <br /> denosaurabh@gmail.com
          </LIHead>
        </InfoBox>
      </RightBox>
    </FooterContainer>
  );
};

export default Footer;
