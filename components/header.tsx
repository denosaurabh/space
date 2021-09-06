import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useShortcuts } from 'react-shortcuts-hook';

import { styled } from '@styled';
import IconBox from '@components/iconBox';
import Badge from '@components/badge';
import ThemeButton from '@components/themeButton';
import Button from '@components/button';

import ReaderSvg from '@assets/svg/Reader.svg';
import PencilSvg from '@assets/svg/Pencil.svg';
import TimerSvg from '@assets/svg/Timer.svg';
import Calendarvg from '@assets/svg/Calendar.svg';

import useNotes from '@state/notes';
import SettingsButton from './settingsButton';

const HeaderStyled = styled('header', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '2rem',
  padding: '1.4rem 1.5rem',
  borderBottom: '1px solid $grey-400',

  backgroundColor: '$grey-100',
});

const HeaderNav = styled('div', {
  flexRow: '',
  gap: '1.6rem',
  marginRight: 'auto',
});

const HeaderLogo = styled(Image, {
  marginRight: '2rem',
});

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deferredPrompt: any;
  }
}

const Header: React.FC = () => {
  const [hideInstallButton, setHideInstallButton] = useState(true);
  const { currentCollection } = useNotes((state) => ({
    currentCollection: state.currentCollection,
  }));
  const router = useRouter();

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (event) => {
      console.log('👍', 'beforeinstallprompt', event);
      window.deferredPrompt = event;
      setHideInstallButton(false);
    });

    window.addEventListener('appinstalled', (event) => {
      console.log('👍', 'appinstalled', event);
      window.deferredPrompt = null;
    });
  }, []);

  const handleInstallPWA = async () => {
    if (!window) return;

    const promptEvent = window.deferredPrompt || undefined;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      return;
    }
    promptEvent.prompt();

    const result = await promptEvent.userChoice;
    console.log('👍', 'userChoice', result);

    window.deferredPrompt = null;

    setHideInstallButton(true);
  };

  useShortcuts(
    ['alt', '1'],
    () => router.push(`/notes/${currentCollection}`),
    []
  );
  useShortcuts(['alt', '2'], () => router.push('/soon'), []);
  useShortcuts(['alt', '3'], () => router.push('/soon'), []);
  useShortcuts(['alt', '4'], () => router.push('/soon'), []);

  useShortcuts(['alt', ','], () => router.push('/settings'), []);

  return (
    <HeaderStyled>
      <Link href="/" passHref>
        <a>
          <HeaderLogo
            className="header-logo"
            src="/space.png"
            alt="Space - Productivity & Management Tool"
            width={26}
            height={26}
          />
        </a>
      </Link>

      <HeaderNav>
        <IconBox
          name="Notes"
          icon={<ReaderSvg />}
          href={`/notes/${currentCollection}`}
          active={router.pathname.startsWith('/notes')}
        />
        <IconBox
          name="Pomodoro"
          icon={<TimerSvg />}
          href="/pomodoro"
          active={router.pathname === '/pomodoro'}
        />
        <IconBox
          name="Todo"
          icon={<PencilSvg />}
          href="/todo"
          soon
          active={router.pathname === '/todo'}
        />
        <IconBox
          name="Calender"
          icon={<Calendarvg />}
          href="/calendar"
          soon
          active={router.pathname === '/calendar'}
        />
      </HeaderNav>

      {process.env.NEXT_PUBLIC_VERSION_ALPHA ? (
        <Badge
          color="warning"
          css={{
            '& a': {
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              color: 'inherit',
            },

            '@tablet': {
              width: '5rem',
            },
          }}
        >
          This is a development version. Not Intended for use in production.
          <Link href="https://space-gray.vercel.app">
            <a target="_blank" rel="noreferrer">
              Check out release version
              <Image
                className="badge-icon"
                src="/icons/External-Link.svg"
                alt="External Link"
                width={18}
                height={18}
              />
            </a>
          </Link>
        </Badge>
      ) : null}

      {!hideInstallButton ? (
        <Button size="small" onClick={handleInstallPWA}>
          Install
        </Button>
      ) : null}

      <ThemeButton />
      <SettingsButton />
    </HeaderStyled>
  );
};

export default Header;
