import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';

import { styled } from '@styled';
import Page from '@layouts/page';

import Button from '@components/button';
import ReleaseBox from '@components/releaseBox';

interface UpdateProps {
  latestRelease: { name: string; body: string };
}

const Update: React.FC<UpdateProps> = ({ latestRelease }) => {
  const router = useRouter();

  const onContinueClick = () => {
    router.push('/notes/home');
  };

  return (
    <Page>
      <Container>
        <ReleaseBox heading={latestRelease.name} body={latestRelease.body} />

        <Button
          onClick={onContinueClick}
        >
          Use Space
        </Button>
      </Container>
    </Page>
  );
};

export default Update;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    `https://api.github.com/repos/denosaurabh/space/releases/latest`
  );

  const latestRelease = await res.json();

  if (!latestRelease) {
    return {
      notFound: true,
    };
  }

  return {
    props: { latestRelease },
  };
};

const Container = styled('div', {
  maxWidth: '60%',
  minWidth: '40rem',

  margin: '5rem auto',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',

  '& a': {
    color: 'inherit',
    fontWeight: 'bold',
    textDecoration: 'underline',

    margin: '0 0.5rem',
  },

  '@tablet': {
    maxWidth: '90%',
    width: '90%',
  },
});
