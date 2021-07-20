// import { styled } from '@styled';

import AllNotesContainer from '@components/notesContainer';
import NoteBox from '@components/noteBox';

import { Note, NotePosition, NoteSize, NotesState } from '@lib/store/notes';
import useNotes from '@state/notes';

const HomeNotes: React.FC = () => {
  const { addNote, updateNote, removeNote } = useNotes((state: NotesState) => ({
    addNote: state.addNote,
    updateNote: state.updateNote,
    removeNote: state.removeNote,
  }));

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

  const handleOnSelectionComplete = ({ position, size }) => {
    if (size.width >= 100 && size.height >= 100) {
      addNote({
        position,
        size,
        text: '',
      });
    }
  };

  return (
    <AllNotesContainer
      css={{
        width: '60%',
        height: '100rem',
        marginTop: '70rem',
        alignSelf: 'center',
      }}
      canvasClassName="home-notes"
      containerClassName="home-notes-container"
      onSelectionComplete={handleOnSelectionComplete}
      enableCanvas={true}
      gridSize={10}
    >
      {Object.values({}).map((note: Note, i) => (
        <NoteBox
          key={i}
          {...note}
          boundClassName={'home-notes-container'}
          onDragStop={handleOnDragStop}
          onRemoveClick={handleOnRemoveClick}
          onResizeStop={handleOnResizeStop}
          onTextChange={handleOnTextChange}
          gridSize={10}
        />
      ))}
    </AllNotesContainer>
  );
};

export default HomeNotes;
