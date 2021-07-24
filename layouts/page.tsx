import Header from '@components/header';
import useSettings from '@state/settings';
import { darkTheme, styled } from '@styled';

const Container = styled('div', {
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

const Box = styled('main', {
  backgroundColor: '$grey-100',

  width: '100%',
  height: '100%',
});

const Page: React.FC = ({ children }) => {
  const isDarkTheme = useSettings((state) => state.darkTheme);

  return (
    <Container className={isDarkTheme ? darkTheme : ''}>
      <Header />

      <Box className="main-content">{children}</Box>
    </Container>
  );
};

export default Page;
