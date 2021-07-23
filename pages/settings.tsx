import Head from 'next/head';
import { styled } from '@styled';

import Seperator from '@components/separator';
import NotesSettings from '@shared/settings/notes';

import Page from '@container';

const SettingsContainer = styled('div', {
  width: '100%',
  height: '100%',

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
  return (
    <Page>
      <Head>
        <title>Space</title>
      </Head>

      <SettingsContainer>
        <MidContainer>
          <Heading>Settings</Heading>

          <NotesSettings />
          <Seperator />
        </MidContainer>
      </SettingsContainer>
    </Page>
  );
};

export default Settings;
