import React from 'react';
import Image from 'next/image';

import { styled } from '@styled';

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
});

const LI = styled('span', {
  fontSize: '1.4rem',
  color: '$grey-600',
  marginBottom: '2rem',

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
        <Image
          className="logo"
          alt="Space"
          src="/assets/icon-192x192.png"
          width={40}
          height={40}
        />
        <Text>
          Open Source Project
          <br /> by @denosaurabh
        </Text>
      </LogoContainer>
      <ListContainer>
        <ULContainer>
          <LIHead>Overview</LIHead>
          <LI>Getting Started</LI>
          <LI>Features</LI>
          <LI>Give us Feedback</LI>
        </ULContainer>
        <ULContainer>
          <LIHead>Development</LIHead>
          <LI>Updates</LI>
          <LI>Technologies</LI>
          <LI>Report a issue</LI>
        </ULContainer>
        <ULContainer>
          <LIHead>Community</LIHead>
          <LI>Discord</LI>
          <LI>Github</LI>
          <LI>Discussions</LI>
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
