import Header from '@components/header';
import { styled } from '@styled';

const Container = styled('div', {
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

const Box = styled('main', {
  width: '100%',
  height: '100%',
});

const Page: React.FC = ({ children }) => {
  return (
    <Container>
      <Header />

      <Box className="main-content">{children}</Box>
    </Container>
  );
};

export default Page;
