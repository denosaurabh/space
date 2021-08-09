import React from 'react';
import { GetStaticProps } from 'next';

import { styled } from '@styled';

import Page from '@layouts/page';
import ReleaseBox from '@components/releaseBox';

interface Release {
  name: string;
  body: string;
}

interface ReleasesProps {
  allReleases: Release[];
}

const Releases: React.FC<ReleasesProps> = ({ allReleases }) => {
  return (
    <Page>
      <Container>
        {allReleases
          ? allReleases.map((release, i) => (
              <>
                <ReleaseBox
                  heading={release.name}
                  body={release.body}
                  key={i}
                />
              </>
            ))
          : null}
      </Container>
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    `https://api.github.com/repos/denosaurabh/space/releases`
  );

  const allReleases = await res.json();

  if (!allReleases) {
    return {
      notFound: true,
    };
  }

  return {
    props: { allReleases },
  };
};

export default Releases;

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  '& div': {
    minWidth: '40rem',
    width: '70%',
  },
});
