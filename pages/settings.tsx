import Head from 'next/head';
import Image from 'next/image';
import { styled } from '@styled';

import Page from '@container';
import Switch from '@components/switch';

const SettingsContainer = styled('div', {
  width: '100%',
  height: '100%',

  padding: '2rem',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const MidContainer = styled('div', {
  width: '30%',
  // maxWidth: '20rem',
});

const Heading = styled('h1', {
  fontSize: '3rem',
  fontFamily: '$inter',
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

          <Switch />
        </MidContainer>
      </SettingsContainer>
    </Page>
  );
};

export default Settings;
