import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { styled } from '@styled';

import Page from '@container';
import AllNotesContainer from '@components/notesContainer';
import NoteBox from '@components/noteBox';
import NotesCollectionSidebar from '@shared/notes/collections';

import useNotes from '@state/notes';

import { Note, NotePosition, NoteSize, NotesState } from '@lib/store/notes';
import useSettings from '@state/settings';

const HomeContainer = styled('div', {
  display: 'flex',
  height: '100%',
  minHeight: '100vh',

  backgroundColor: '$grey-100',
});

const Home: React.FC = () => {
  const router = useRouter();
  const version = useSettings((state) => state.version);

  const {
    notesState,
    addNote,
    updateNote,
    removeNote,
    changeCurrentCollection,
  } = useNotes((state: NotesState) => state);

  useEffect(() => {
    changeCurrentCollection(`${router.query.id}`);
  }, [, router.query.id, changeCurrentCollection, version, router]);

  const { enableGrid, gridSize } = useSettings((state) => state.notes);

  useEffect(() => {
    // backing up data for any potential user who use the app daily and has its data

    if (!window) return;

    localStorage.setItem(
      'notes_backup_pre_release_0_1_2',
      JSON.stringify(notesState)
    );
  }, [notesState]);

  const handleOnDragStop = (
    id: string,
    data: { position: NotePosition; size: NoteSize; text: string }
  ) => {
    updateNote(id, data);
  };

  const handleOnResizeStop = (
    id: string,
    data: { position: NotePosition; size: NoteSize; text: string }
  ) => {
    updateNote(id, data);
  };

  const handleOnTextChange = (
    id: string,
    data: { position: NotePosition; size: NoteSize; text: string }
  ) => {
    updateNote(id, data);
  };

  const handleOnRemoveClick = (id: string) => {
    removeNote(id);
  };

  const handleOnSelectionComplete = ({
    position,
    size,
  }: {
    position: NotePosition;
    size: NoteSize;
  }) => {
    if (size.width >= 200 && size.height >= 100) {
      addNote({
        position,
        size,
        text: '',
      });
    }
  };

  const onDoubleClick = ({ pos }) => {
    addNote({
      position: pos,
      size: {
        width: 200,
        height: 300,
      },
      text: '',
    });
  };

  useEffect(() => {
    if (!notesState[`${router.query.id}`]) {
      router.push(`/notes/home`);
    }
  }, [router, notesState]);

  return (
    <Page>
      <Head>
        <title>Space</title>
      </Head>

      <HomeContainer>
        <AllNotesContainer
          containerClassName="notes-container"
          canvasClassName="grid-canvas"
          css={{
            width: '100%',
            height: '100%',
          }}
          onSelectionComplete={handleOnSelectionComplete}
          onDoubleClick={onDoubleClick}
          enableCanvas={enableGrid}
          gridSize={gridSize}
        >
          {router.query.id && notesState[`${router.query.id}`]
            ? Object.values(notesState[`${router.query.id}`].notes).map(
                (note: Note, i) => (
                  <NoteBox
                    key={i}
                    {...note}
                    boundClassName={'notes-container'}
                    onDragStop={handleOnDragStop}
                    onRemoveClick={handleOnRemoveClick}
                    onResizeStop={handleOnResizeStop}
                    onTextChange={handleOnTextChange}
                    gridSize={gridSize}
                  />
                )
              )
            : null}
        </AllNotesContainer>

        <NotesCollectionSidebar />
      </HomeContainer>
    </Page>
  );
};

export default Home;
