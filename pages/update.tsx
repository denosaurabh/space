import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';

import { styled } from '@styled';
import Page from '@layouts/page';

import useSettings from '@state/settings';
import Button from '@components/button';
import ReleaseBox from '@components/releaseBox';

import { convertDataVersion } from '@utils/versionMigration';
import useNotes from '@state/notes';

interface UpdateProps {
  latestRelease: { name: string; body: string };
}

const Update: React.FC<UpdateProps> = ({ latestRelease }) => {
  const [completed, setCompleted] = useState(false);
  const router = useRouter();

  const { version, setNewVersion } = useSettings((state) => ({
    setNewVersion: state.setNewVersion,
    version: state.version,
  }));

  useEffect(() => {
    if (!window) return;
    if (version === '0.1.2') {
      router.push('/notes/home');
    }

    /* STEPS TO MIGRATE DATA

    1. Backup the user data
    2. Convert the data from v0.1.1 to v0.1.2
    3. Back to Space
    
    */

    const notesStore = JSON.parse(localStorage.getItem('notesStorage'));
    const { state } = notesStore;
    const { currentCollection, notesState } = state;

    // 1. Backup the user data
    localStorage.setItem('notesStorage_v0_1_1', JSON.stringify(notesStore));

    // 2. Convert the data from v0.1.1 to v0.1.2
    const migrate = async () => {
      try {
        const {
          notesState: updatedNotesState,
          currentCollection: updatedCurrentCollection,
        } = await convertDataVersion({
          from: 'v0.1.1',
          to: 'v0.1.2',
          data: {
            currentCollection: currentCollection,
            notesState: notesState,
          },
        });

        console.log(
          updatedNotesState,
          updatedCurrentCollection,
          'saving this migration'
        );

        useNotes.setState((state) => ({
          ...state,
          currentCollection: updatedCurrentCollection,
          notesState: updatedNotesState,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    migrate();

    // 3. Back to Space
    setCompleted(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onContinueClick = () => {
    setNewVersion(process.env.NEXT_PUBLIC_VERSION);

    router.push('/notes/home');
    // router.reload();
  };

  return (
    <Page>
      <Container>
        <ReleaseBox heading={latestRelease.name} body={latestRelease.body} />

        <Button disabled={!completed} onClick={onContinueClick}>
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
