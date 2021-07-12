import Head from 'next/head';
import Image from 'next/image';
import { styled } from '@styled';

import Page from '@container';
import NoteBox from '@components/noteBox';
import NotesCollection from '@shared/notes/collections';

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

const AddNote = styled('div', {
  position: 'fixed',
  right: '5%',
  top: '10%',

  width: '3rem',
  height: '3rem',
  borderRadius: '50%',
  backgroundColor: '#fff',
  boxShadow: '0px 0px 10px 6px #E9ECEF',

  display: 'grid',
  placeItems: 'center',

  transition: '$fast',
  zIndex: 1000,

  '&:hover': {
    cursor: 'pointer',
    transform: 'scale(1.1)',
  },
});

const Home: React.FC = () => {
  const { notesState, currentCollection, addNote } = useNotes(
    (state: NotesState) => state
  );
  console.log(notesState, currentCollection);

  const handleAddNewNoteClick = () => {
    addNote({
      position: { x: 40, y: 40 },
      size: { width: 100, height: 200 },
      text: '',
    });
  };

  return (
    <Page>
      <Head>
        <title>Space</title>
      </Head>

      <HomeContainer>
        <AllNotesContainer className="notes-container">
          {Object.values(notesState[currentCollection].notes).map(
            (note: Note, i) => (
              <NoteBox key={i} {...note} />
            )
          )}
        </AllNotesContainer>

        <NotesCollection />
      </HomeContainer>

      <AddNote onClick={handleAddNewNoteClick}>
          <Image
            src="/icons/Plus.svg"
            width={15}
            height={15}
            alt="Add new Note"
          />
        </AddNote>
    </Page>
  );
};

export default Home;
