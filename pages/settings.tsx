import { useShortcuts } from 'react-shortcuts-hook';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { styled } from '@styled';

import Seperator from '@components/separator';

import NotesSettings from '@shared/settings/notes';
import KeyboardSettings from '@shared/settings/keyboard';
import DataSettings from '@shared/settings/data';

import Page from '@container';
import PomodoroSettings from '@shared/settings/pomodoro';

const SettingsContainer = styled('div', {
  width: '100%',
  height: '100%',
  minHeight: '100vh',

  padding: '2rem',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const MidContainer = styled('div', {
  width: '35%',
  minWidth: '50rem',
  maxWidth: '60rem',

  marginTop: '2rem',

  '@tablet': {
    width: '90%',
    minWidth: 'unset',
    maxWidth: '90%',
  },
});

const Heading = styled('h1', {
  fontSize: '5rem',
  fontFamily: '$inter',
  color: '$grey-800',
});

const Settings: React.FC = () => {
  const router = useRouter();

  useShortcuts(['escape'], () => router.back(), []);

  return (
    <Page>
      <Head>
        <title>Space</title>
      </Head>

      <SettingsContainer>
        <MidContainer>
          <Heading>Settings</Heading>

          <NotesSettings />
          <PomodoroSettings />
          <Seperator />
          <KeyboardSettings />
          <DataSettings />
        </MidContainer>
      </SettingsContainer>
    </Page>
  );
};

export default Settings;
