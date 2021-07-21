// import { styled } from '@styled';

import AllNotesContainer from '@components/notesContainer';
import NoteBox from '@components/noteBox';

import { Note, NotePosition, NoteSize } from '@lib/store/notes';

import { styled } from '@styled';

import Circle from '@components/annotations/circle';
import useLandingPageNotes from '@state/landingPageNotes';
import { LandingPageState } from '@lib/store/landingPage';

const Container = styled('div', {
  width: '100%',
  height: '100rem',

  marginTop: '70rem',

  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '1rem',
});

const StepsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10rem',
});

const CircleBox = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '2rem',

  width: '16rem',
});

const CircleText = styled('span', {
  fontFamily: '$indie',
  fontSize: '2.2rem',
  color: '$grey-500',
});

const Description = styled('p', {
  fontFamily: '$indie',
  fontSize: '2rem',
  color: '$grey-600',
  lineHeight: '3.6rem',
});

const HomeNotes: React.FC = () => {
  const { notes, addNote, updateNote, removeNote } = useLandingPageNotes(
    (state: LandingPageState) => state
  );

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
    <Container>
      <StepsContainer css={{ width: 'max-content' }}>
        <CircleBox>
          <Circle>1</Circle>
          <CircleText>Drag the mouse and make a note</CircleText>
        </CircleBox>
        <CircleBox>
          <Circle>2</Circle>
          <CircleText>Write something down on note</CircleText>
        </CircleBox>
        <CircleBox>
          <Circle>3</Circle>
          <CircleText>yeee.... make more notes</CircleText>
        </CircleBox>
      </StepsContainer>
      <AllNotesContainer
        css={{
          // flexGrow: '1',
          maxWidth: '50%',
          height: '100%',
        }}
        canvasClassName="home-notes"
        containerClassName="home-notes-container"
        onSelectionComplete={handleOnSelectionComplete}
        enableCanvas={true}
        gridSize={10}
      >
        {Object.values(notes).map((note: Note, i) => (
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
      <StepsContainer css={{ width: '20%', padding: '1rem' }}>
        <Description>
          A lil online real-time environment to experience, so you might also
          see other users who are discovering this website right now, have a
          small conversation and get to know about this tool :D
        </Description>
      </StepsContainer>
    </Container>
  );
};

export default HomeNotes;
