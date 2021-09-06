import { useEffect } from 'react';
import { useShortcuts } from 'react-shortcuts-hook';

import { styled } from '@styled';

import Header from '@components/header';
import useSettings from '@state/settings';
import ErrorBoundary from '@components/errorBoundary';

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
  const { theme, toggleTheme } = useSettings((state) => ({
    theme: state.darkTheme,
    toggleTheme: state.toggleTheme,
  }));

  useEffect(() => {
    console.log('Page loaded');
  }, [, theme]);

  useShortcuts(['alt', 't'], toggleTheme, []);

  return (
    <ErrorBoundary>
      <Container>
        <Header />

        <Box className="main-content">{children}</Box>
      </Container>
    </ErrorBoundary>
  );
};

export default Page;
