import Image from 'next/image';
import { styled } from '@styled';

import Button from '@components/button';
import { Annotation, AnnoGroup } from '@components/annotation';
import Ellipse from '@components/annotations/ellipse';

const HeaderContainer = styled('header', {
  width: '100%',
  height: 'fit-content',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  zIndex: 10,
});

const LogoContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2rem',

  width: 'fit-content',
  height: 'fit-content',
});

const ULContainer = styled('nav', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6rem',
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

const RightBox = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '3rem',
});

const Text = styled('span', {
  fontSize: '1.4rem',
  color: '$grey-600',
});

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Annotation css={{ annoPos: '150% unset unset -40%' }}>
          <Image
            className="logo"
            alt="Space"
            src="/assets/icon-192x192.png"
            width={40}
            height={40}
          />

          <AnnoGroup>
            <Image
              alt="Down Swirl"
              src="/assets/annotations/down-swirly.webp"
              width={60}
              height={200}
            />

            <Ellipse>Might Will Change</Ellipse>
          </AnnoGroup>
        </Annotation>
        <Text>
          Open Source Project
          <br /> by @denosaurabh
        </Text>
      </LogoContainer>
      <ULContainer>
        <LI>Github Code</LI>
        <Annotation css={{ annoPos: '120% -30% 0% 0%' }}>
          <Button color="dark" size="medium">
            Get Right In
          </Button>

          <AnnoGroup>
            <Image
              alt="Scribble"
              src="/assets/annotations/Scribble.webp"
              width={170}
              height={80}
            />
          </AnnoGroup>
        </Annotation>

        <LI>Support the Project</LI>
      </ULContainer>

      <RightBox>
        <Button color="light" size="small">
          Beta v0.9
        </Button>
        <LI>Development</LI>
      </RightBox>
    </HeaderContainer>
  );
};

export default Header;
