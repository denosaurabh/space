import { memo } from 'react';
import Image from 'next/image';
import { Rnd } from 'react-rnd';
import { styled } from '@styled';
import { Note } from '@lib/notes';
import useNotes from '@state/notes';

import {
  Root as PopoverRoot,
  StyledTrigger as PopoverTrigger,
  Anchor as PopoverAnchor,
  StyledContent as PopoverContent,
  StyledClose as PopoverClose,
  Arrow as PopoverArrow,
} from '@components/popover';

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
  userSelect: 'none',

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

const NoteBox: React.FC<Note> = ({ id, position, size, text }) => {
  const { updateNote, removeNote } = useNotes((state) => ({
    updateNote: state.updateNote,
    removeNote: state.removeNote,
  }));

  const onNoteDragStop = (e, data) => {
    const { x, y } = data;

    updateNote(id, { position: { x, y }, size, text });
  };

  const onNoteResizeStop = (e, dir, el, delta, updatedPosition) => {
    const updatedWidth = size.width + delta.width;
    const updatedHeight = size.height + delta.height;

    updateNote(id, {
      position: updatedPosition,
      size: { width: updatedWidth, height: updatedHeight },
      text,
    });
  };

  const onNoteTextChange = (e) => {
    const { value } = e.target;
    updateNote(id, { position, size, text: value });
  };

  const onRemoveNoteClickHandler = () => {
    const noteId = id;
    removeNote(noteId);
  };

  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
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
      onDragStop={onNoteDragStop}
      onResizeStop={onNoteResizeStop}
    >
      <NoteContainer>
        <NoteHeader className="drag-header">
          <PopoverRoot>
            <PopoverTrigger>
              <Image
                className="note-header-dot"
                src="/icons/Dot.svg"
                width={15}
                height={15}
                alt="Note Menu"
              />
            </PopoverTrigger>
            <PopoverAnchor />

            <PopoverContent>
              Do you want to remove this note?
              <PopoverArrow />
              <PopoverClose onClick={onRemoveNoteClickHandler}>
                Yes
              </PopoverClose>
            </PopoverContent>
          </PopoverRoot>
        </NoteHeader>

        <NoteContent
          placeholder="Type something here ....."
          value={text}
          onChange={onNoteTextChange}
        />
      </NoteContainer>
    </Rnd>
  );
};

export default memo(NoteBox);
