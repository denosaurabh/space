// import { styled } from '@styled';

import AllNotesContainer from '@components/notesContainer';
import NoteBox from '@components/noteBox';

import { Note, NotePosition, NoteSize } from '@lib/store/notes';

import { styled } from '@styled';

import Circle from '@components/annotations/circle';
import useLandingPageNotes from '@state/landingPageNotes';
import { LandingPageState } from '@lib/store/landingPage';

const Container = styled('div', {
  height: 'fit-content',

  marginBottom: '40rem',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '4rem',

  '@tablet': {
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
});

const StepsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10rem',

  '@tablet': {
    width: '70%',
    gap: '5rem',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
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

  const handleOnSelectionComplete = ({ position, size }) => {
    if (size.width >= 100 && size.height >= 100) {
      addNote({
        position,
        size,
        text: '',
      });
    }
  };

  const onDoubleClick = ({ pos }) => {
    console.log(pos);

    addNote({
      position: pos,
      size: {
        width: 200,
        height: 300,
      },
      text: '',
    });
  };
  return (
    <Container>
      <StepsContainer
        css={{
          width: '20%',
          '@tablet': { width: 'auto', justifyContent: 'center' },
        }}
      >
        <CircleBox>
          <Circle>1</Circle>
          <CircleText>Drag the mouse and make a note</CircleText>
        </CircleBox>
        <CircleBox>
          <Circle>2</Circle>
          <CircleText>Write something down on note</CircleText>
        </CircleBox>
        <CircleBox>
          <Circle css={{}}>3</Circle>
          <CircleText>yeee.... make more notes</CircleText>
        </CircleBox>
      </StepsContainer>
      <AllNotesContainer
        css={{
          width: '50%',
          height: '100rem',

          '@laptop': {
            flex: 1,
          },

          '@tablet': {
            flex: 'unset',

            margin: '5rem 0',
            width: '90%',
            height: '100rem',
          },
        }}
        canvasClassName="home-notes"
        containerClassName="home-notes-container"
        onSelectionComplete={handleOnSelectionComplete}
        onDoubleClick={onDoubleClick}
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
      <StepsContainer
        css={{
          width: '20%',
          minWidth: '20rem',
          padding: '1rem',

          '@laptop': {
            width: '100%',
          },

          '@tablet': {
            width: 'unset',
            flex: 0.9,
            padding: '2rem',
          },
        }}
      >
        <Description>
          That&apos;s just one of the features of this tool. It is currently
          what there is in the app. But, There&apos;s more for you coming down
          the line, scroll down and you will find em out!
        </Description>
      </StepsContainer>
    </Container>
  );
};

export default HomeNotes;
