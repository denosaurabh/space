import Image from 'next/image';
import Link from 'next/link';

import { styled } from '@styled';

import Button from '@components/button';
import { Annotation, AnnoGroup } from '@components/annotation';
import Ellipse from '@components/annotations/ellipse';
import Badge from '@components/badge';
import ThemeButton from '@components/themeButton';

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

  '@desktop': {
    gap: '4rem',
  },
});

const LI = styled('span', {
  display: 'flex',
  alignItems: 'center',

  fontSize: '1.4rem',
  color: '$grey-600',

  '& a': {
    color: '$grey-600',
    transition: '$fast',

    '&:hover': {
      cursor: 'pointer',
      color: '$grey-800',
    },
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

  '& a': {
    fontWeight: '500',
    color: '$grey-700',

    margin: '0 0.5rem',
  },
});

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Annotation
          css={{
            annoPos: '150% unset unset -40%',
          }}
        >
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
        <Text
          css={{
            '@laptop': {
              display: 'none',
            },
          }}
        >
          Open Source Project
          <br /> by
          <Link href="https://github.com/denosaurabh">
            <a target="_blank" rel="noreferrer">
              @denosaurabh
            </a>
          </Link>
        </Text>
      </LogoContainer>
      <ULContainer>
        <LI
          css={{
            '@tablet': {
              display: 'none',
            },
          }}
        >
          <Link href="https://github.com/denosaurabh/space" passHref>
            <a target="_blank" rel="noreferrer">
              Github Code
            </a>
          </Link>
        </LI>
        <Annotation
          css={{
            annoPos: '120% 0% 0% -15%',
            '@tablet': {
              annoPos: '120% 0% 0% -25%',
            },
          }}
        >
          <Link href="/notes/home" passHref>
            <a>
              <Button color="dark" size="medium">
                Get Right In
              </Button>
            </a>
          </Link>

          <AnnoGroup css={{ width: 170, height: 80 }}>
            <Image
              alt="Scribble"
              src="/assets/annotations/Scribble.webp"
              width={170}
              height={80}
            />
          </AnnoGroup>
        </Annotation>

        <LI
          css={{
            '@tablet': {
              display: 'none',
            },
          }}
        >
          Support the Project<Badge size="medium">soon</Badge>
        </LI>
      </ULContainer>

      <RightBox>
        <ThemeButton />

        <Button
          color="light"
          size="small"
          css={{
            '@laptop': {
              display: 'none',
            },
          }}
        >
          {process.env.NEXT_PUBLIC_VERSION_ALPHA ? 'ALPHA' : 'BETA'}&nbsp;v
          {process.env.NEXT_PUBLIC_VERSION}
        </Button>
        <Link href="https://github.com/DenoSaurabh/space/releases" passHref>
          <a target="_blank" rel="noreferrer">
            <LI>Development</LI>
          </a>
        </Link>
      </RightBox>
    </HeaderContainer>
  );
};

export default Header;
