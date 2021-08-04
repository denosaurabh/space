import Link from 'next/link';
import { darkTheme, styled } from '@styled';

import SettingSvg from '@assets/svg/Setting.svg';

import RocketSvg from '@assets/svg/Rocket.svg';
import MixerHorizontalSvg from '@assets/svg/MixerHorizontal.svg';
import StarSvg from '@assets/svg/Star.svg';
import ExclamationSvg from '@assets/svg/Exclamation.svg';
import ShareSvg from '@assets/svg/Share.svg';

import GithubSvg from '@assets/svg/Github.svg';
import DiscordSvg from '@assets/svg/Discord.svg';
import TwitterSvg from '@assets/svg/Twitter.svg';

import {
  Root,
  StyledTrigger,
  Anchor,
  StyledContent,
} from '@components/popover';

const StyledPopoverContent = styled(StyledContent, {
  width: '18rem',
  flexDirection: 'column',
  padding: '1rem 0',
  gap: '0.4rem',
});

const LI = styled('a', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',

  width: '90%',
  padding: '1rem 2rem',
  paddingLeft: '1.2rem',

  borderRadius: '0.8rem',

  fontSize: '1.4rem',
  fontWeight: '500',
  color: '$grey-800',

  transition: '$fast',

  svg: {
    width: '20',

    fill: '$grey-600',
  },

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '$grey-800',
    color: '$grey-200',

    svg: {
      fill: '$grey-200',
    },

    [`.${darkTheme} &`]: {
      backgroundColor: '$grey-200',
      color: '$grey-700',

      svg: {
        fill: '$grey-700',
      },
    },
  },
});

const SocialBox = styled('div', {
  width: '100%',
  padding: '1rem 2rem',
  marginTop: '0.5rem',

  display: 'none', // need to be removed after completion
  justifyContent: 'space-between',
  alignItems: 'center',

  ['svg']: {
    fill: '$grey-600',

    ['#clip0 rect']: {
      fill: '$grey-100',
    },

    transition: '$medium',
    '&:hover': {
      cursor: 'pointer',
      transform: 'rotateZ(20deg)',
    },
  },
});

const SettingsButton: React.FC = () => {
  return (
    <Root>
      <StyledTrigger>
        <SettingsStyledSvg />
      </StyledTrigger>
      <Anchor />
      <StyledPopoverContent
        color="light"
        dropShadow
        alignOffset={10}
        sideOffset={20}
      >
        <Link href="/settings" passHref>
          <LI>
            <MixerHorizontalSvg /> Settings
          </LI>
        </Link>
        <Link href="/releases" passHref>
          <LI>
            <RocketSvg /> Releases
          </LI>
        </Link>

        <Link href="https://github.com/denosaurabh/space" passHref>
          <LI target="_blank">
            <StarSvg />
            Star the Project
          </LI>
        </Link>

        <Link
          href="http://twitter.com/share?text=Space - Simple Productivity and Management Tool.

          Open source and free to use project, by @denosaurabh

          &url=http://space-gray.vercel.app"
          passHref
        >
          <LI target="_blank">
            <ShareSvg /> Share Space
          </LI>
        </Link>

        <Link
          href="https://github.com/DenoSaurabh/space/issues/new/choose"
          passHref
        >
          <LI target="_blank">
            <ExclamationSvg /> Report a issue
          </LI>
        </Link>

        <SocialBox>
          <GithubSvg />
          <DiscordSvg />
          <TwitterSvg />
        </SocialBox>
      </StyledPopoverContent>
    </Root>
  );
};

export default SettingsButton;

const SettingsStyledSvg = styled(SettingSvg, {
  width: 25,
  height: 25,
  fill: '$grey-700',

  transition: '$medium',

  '&:hover': {
    cursor: 'pointer',
    transform: 'rotate(40deg)',
  },
});
