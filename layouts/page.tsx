import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useShortcuts } from 'react-shortcuts-hook';

import { styled } from '@styled';

import Header from '@components/header';
import useSettings from '@state/settings';

const Container = styled('div', {
  width: '100%',
  height: '100%',
  minHeight: '100vh',

  display: 'flex',
  flexDirection: 'column',
});

const Box = styled('main', {
  backgroundColor: '$grey-100',

  width: '100%',
  height: '100%',
  minHeight: '100vh',
});

const Page: React.FC = ({ children }) => {
  const router = useRouter();

  const { theme, toggleTheme, version } = useSettings((state) => ({
    theme: state.darkTheme,
    toggleTheme: state.toggleTheme,
    version: state.version,
  }));

  useEffect(() => {
    console.log('Page loaded');

    if (process.env.NEXT_PUBLIC_VERSION !== version) {
      router.push('/update');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [, theme, version]);

  useShortcuts(['alt', 't'], toggleTheme, []);

  return (
    <Container>
      <Header />

      <Box className="main-content">{children}</Box>
    </Container>
  );
};

export default Page;
