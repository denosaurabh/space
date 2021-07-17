import Head from 'next/head';
import { styled } from '@styled';

import Page from '@container';
import NoteBox from '@components/noteBox';
import NotesCollection from '@shared/notes/collections';
import GridCanvas from '@shared/notes/gridCanvas';

import useNotes from '@state/notes';

import { Note, NotesState } from '@lib/notes';

const HomeContainer = styled('div', {
  display: 'flex',
  height: '100%',
});

const AllNotesContainer = styled('div', {
  width: '100%',
  height: '100%',
  overflow: 'hidden',
});

const Home: React.FC = () => {
  const { notesState, currentCollection } = useNotes(
    (state: NotesState) => state
  );

  return (
    <Page>
      <Head>
        <title>Space</title>
      </Head>

      <HomeContainer>
        <AllNotesContainer className="notes-container">
          <GridCanvas />

          {Object.values(notesState[currentCollection].notes).map(
            (note: Note, i) => (
              <NoteBox key={i} {...note} />
            )
          )}
        </AllNotesContainer>

        <NotesCollection />
      </HomeContainer>
    </Page>
  );
};

export default Home;
