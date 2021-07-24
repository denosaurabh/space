import { useEffect } from 'react';

import Head from 'next/head';
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

  backgroundColor: '$grey-100',
});

const Home: React.FC = () => {
  const {
    notesState,
    currentCollection,
    addNote,
    updateNote,
    removeNote,
    changeCurrentCollection,
  } = useNotes((state: NotesState) => state);

  const { enableGrid, gridSize } = useSettings((state) => state.notes);
  useEffect(() => {
    changeCurrentCollection('0');
  }, [changeCurrentCollection]);

  const handleOnDragStop = (
    id: number,
    data: { position: NotePosition; size: NoteSize; text: string }
  ) => {
    updateNote(id, data);
  };

  const handleOnResizeStop = (
    id: number,
    data: { position: NotePosition; size: NoteSize; text: string }
  ) => {
    updateNote(id, data);
  };

  const handleOnTextChange = (
    id: number,
    data: { position: NotePosition; size: NoteSize; text: string }
  ) => {
    updateNote(id, data);
  };

  const handleOnRemoveClick = (id: number) => {
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
          enableCanvas={enableGrid}
          gridSize={gridSize}
        >
          {Object.values(notesState[currentCollection].notes).map(
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
          )}
        </AllNotesContainer>

        <NotesCollectionSidebar />
      </HomeContainer>
    </Page>
  );
};

export default Home;
