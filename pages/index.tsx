import Head from 'next/head';
import Image from 'next/image';

import Page from '@container';
import NoteBox from '@components/noteBox';
import { styled } from '@styled';
import useNotes from '@state/notes';

import { Note, NotesState } from '@lib/notes';

const AllNotesContainer = styled('div', {
  width: '100%',
  height: '100%',
  overflow: 'hidden',
});

const AddNote = styled('div', {
  position: 'fixed',
  right: '2%',
  top: '12%',

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
  const { notes, addNote } = useNotes((state: NotesState) => state);

  const handleAddNewNoteClick = () => {
    addNote({
      position: { x: 40, y: 40 },
    });
  };

  return (
    <Page>
      <Head>
        <title>Space</title>
      </Head>

      <AllNotesContainer className="notes-container">
        {Object.values(notes).map((note: Note) => (
          <NoteBox key={note.id} {...note} />
        ))}

        <AddNote onClick={handleAddNewNoteClick}>
          <Image
            src="/icons/Plus.svg"
            width={15}
            height={15}
            alt="Add new Note"
          />
        </AddNote>
      </AllNotesContainer>
    </Page>
  );
};

export default Home;
