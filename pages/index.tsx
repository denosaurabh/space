import { useEffect } from 'react';
import { styled } from '@styled';

import Header from '@shared/home/header';
import MidHeading from '@shared/home/midHeading';
import AllFeatures from '@shared/home/allFeatures';
import HomeNotes from '@shared/home/notes';
import CallToAction from '@shared/home/cta';
import Footer from '@shared/home/footer';
import LandingPageSEO from '@shared/home/seo';

import DreamyGradient from '@components/dreamyGradient';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: '$grey-100',
  padding: '4rem 5rem',

  position: 'relative',

  '@laptop': {
    padding: '2rem',
  },

  '@tablet': {
    padding: '3rem',
  },
});

const Home: React.FC = () => {
  useEffect(() => {
    if (!window) return;

    // backing data on update v0.1.2
    if (process.env.NEXT_PUBLIC_VERSION == '0.1.2') {
      const notesStorage = localStorage.getItem('notesStorage');
      localStorage.setItem('notesStorage_on_release_v0_1_2', notesStorage);
    }
  }, []);

  return (
    <Container>
      <LandingPageSEO />

      <DreamyGradient color="orange" top="0%" right="0%" />
      <DreamyGradient color="yellow" top="10%" left="0" />
      <DreamyGradient color="green" top="35%" left="0" />
      <DreamyGradient color="blue" top="50%" right="0" />
      <DreamyGradient color="purple" top="68%" left="0" />

      <DreamyGradient color="orange" bottom="5%" left="45%" animate />

      <Header />
      <MidHeading />

      <HomeNotes />
      <AllFeatures />
      <CallToAction />
      <Footer />
    </Container>
  );
};

export default Home;
