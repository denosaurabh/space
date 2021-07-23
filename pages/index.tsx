import { styled } from '@styled';

import Header from '@shared/home/header';
import MidHeading from '@shared/home/midHeading';
import AllFeatures from '@shared/home/allFeatures';
import HomeNotes from '@shared/home/notes';
import CallToAction from '@shared/home/cta';
import Footer from '@shared/home/footer';

import DreamyGradient from '@components/dreamyGradient';

// import { Annotation } from '@components/annotation';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: '$grey-100',
  padding: '4rem 5rem',

  '@laptop': {
    padding: '2rem',
  },

  '@tablet': {
    padding: '3rem',
  }
});

const Home: React.FC = () => {
  return (
    <Container>
      <DreamyGradient color="yellow" top="45%" left="0" />
      <DreamyGradient color="orange" top="0" right="0%" />
      <DreamyGradient color="yellow" top="200%" left="0" />
      <DreamyGradient color="yellow" top="270%" right="0" />
      <DreamyGradient color="yellow" top="360%" left="0" />

      <Header />
      <MidHeading />

      {/* <Annotation css={{ position: 'absolute', top: '70%', right: '15%' }}>
        <ScrollDownSvg />
      </Annotation> */}

      <HomeNotes />
      <AllFeatures />
      <CallToAction />
      <Footer />
    </Container>
  );
};

export default Home;
