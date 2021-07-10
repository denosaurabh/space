import Image from 'next/image';
import { Rnd } from 'react-rnd';
import { styled } from '@styled';
import { Note } from '@lib/notes';

const NoteContainer = styled('div', {
  width: '100%',
  height: '100%',
  border: '1px solid #000',
  borderRadius: '$small',
  display: 'flex',
  flexDirection: 'column',
  transition: 'box-shadow 0.25s',
  // position: 'relative',
  zIndex: 1,
  '&:active': {
    boxShadow: '5px 5px 10px 0px #E9ECEF',
  },
});

const NoteHeader = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: '100%',
  height: '20px',
  padding: '0 0.2rem',
  borderBottom: '1px solid #000',
  backgroundColor: '#fff',
  borderTopLeftRadius: '$small',
  borderTopRightRadius: '$small',
  '&:hover': {
    cursor: 'grab',
  },
  '&:active': {
    cursor: 'grabbing',
  },
  '.note-header-dot:hover': {
    cursor: 'pointer',
  },
});

const NoteContent = styled('textarea', {
  width: '100%',
  height: '100%',
  padding: '1rem',
  fontFamily: '$mono',
  fontSize: '0.8rem',
  borderRadius: '$small',
  resize: 'none',
  border: 'none',
  outline: 'none',
});

const NoteBox: React.FC<Note> = ({ position, id }) => {
  console.log(id);

  return (
    <Rnd
      default={{
        x: position.x,
        y: position.y,
        width: 200,
        height: 300,
      }}
      minWidth={200}
      minHeight={100}
      resizeGrid={[10, 10]}
      dragGrid={[10, 10]}
      dragHandleClassName="drag-header"
      bounds=".notes-container"
      enableResizing={{
        bottom: false,
        bottomLeft: false,
        left: false,
        right: false,
        top: false,
        topLeft: false,
        topRight: false,
        bottomRight: true,
      }}
    >
      <NoteContainer>
        <NoteHeader className="drag-header">
          <Image
            className="note-header-dot"
            src="/icons/Dot.svg"
            width={15}
            height={15}
            alt="Note Menu"
          />
        </NoteHeader>

        <NoteContent placeholder="Type something here ....." />
      </NoteContainer>
    </Rnd>
  );
};

export default NoteBox;
