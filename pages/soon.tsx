import Image from 'next/image';
import Link from 'next/link';

import Page from '@layouts/page';

import { styled } from '@styled';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%',
  height: '100%',
});

const Heading = styled('h2', {
  fontFamily: '$indie',
  fontSize: '6rem',
  color: '$grey-700',

  marginBottom: '3rem',
});

const Text = styled('span', {
  fontSize: '1.6rem',
  color: '$grey-600',

  '& a': {
    fontWeight: 'bold',
    color: '$grey-700',
    textDecoration: 'underline',

    margin: '0 0.5rem',
  },
});

const Soon: React.FC = () => {
  return (
    <Page>
      <Container>
        <Heading>Coming Soon</Heading>
        <Image
          src="/assets/images/coming-soon.webp"
          alt="Coming Soon"
          width={600}
          height={600}
        />
        <Text>
          Illustration by
          <Link href="https://icons8.com/illustrations/author/5dca95ef01d036001426e2bc">
            <a target="_blank" rel="noreferrer">
              Ivan Haidutski
            </a>
          </Link>
          from
          <Link href="https://icons8.com/illustrations">
            <a target="_blank" rel="noreferrer">
              Ouch!
            </a>
          </Link>
        </Text>
      </Container>
    </Page>
  );
};

export default Soon;
