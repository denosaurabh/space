import { memo } from 'react';
import { Rnd } from 'react-rnd';
import { styled } from '@styled';

import { NewNote, Note } from '@lib/store/notes';

import {
  Root as PopoverRoot,
  StyledTrigger as PopoverTrigger,
  Anchor as PopoverAnchor,
  StyledContent as PopoverContent,
  StyledClose as PopoverClose,
  StyledArrow as PopoverArrow,
} from '@components/popover';

import mRound from '@utils/mRound';

interface NoteBoxProps extends Note {
  boundClassName: string;
  gridSize: number;
  onDragStop: (id: string, data: NewNote) => void;
  onResizeStop: (id: string, data: NewNote) => void;
  onTextChange: (id: string, data: NewNote) => void;
  onRemoveClick: (noteId: string) => void;
}

const NoteBox: React.FC<NoteBoxProps> = ({
  id,
  position,
  size,
  text,
  boundClassName,
  onDragStop,
  onResizeStop,
  onTextChange,
  onRemoveClick,
  gridSize,
}) => {
  const onNoteDragStop = (e, data) => {
    const { x, y } = data;

    onDragStop(id, {
      position: {
        x: mRound(x, gridSize),
        y: mRound(y, gridSize),
      },
      size,
      text,
    });
  };

  const onNoteResizeStop = (e, dir, el, delta, updatedPosition) => {
    const updatedWidth = size.width + delta.width;
    const updatedHeight = size.height + delta.height;

    onResizeStop(id, {
      position: updatedPosition,
      size: { width: updatedWidth, height: updatedHeight },
      text,
    });
  };

  const onNoteTextChange = (e) => {
    const { value } = e.target;
    onTextChange(id, { position, size, text: value });
  };

  const onRemoveNoteClickHandler = () => {
    const noteId = id;
    onRemoveClick(noteId);
  };

  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      minWidth={200}
      minHeight={100}
      resizeGrid={[gridSize, gridSize]}
      dragGrid={[gridSize, gridSize]}
      dragHandleClassName="drag-header"
      bounds={`.${boundClassName}`}
      cancel=".circle-container"
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
      resizeHandleComponent={{
        bottomRight: <ResizeBtn />,
      }}
      resizeHandleStyles={{
        bottomRight: {
          position: 'absolute',
          right: '0',
          bottom: '0',

          width: '1.2rem',
          height: '1.2rem',
        },
      }}
      enableUserSelectHack={false}
    >
      <NoteContainer>
        <NoteHeader className="drag-header">
          <PopoverRoot>
            <PopoverTrigger>
              <CircleContainer className="circle-container">
                <Circle />
              </CircleContainer>
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
          spellCheck={false}
        />
      </NoteContainer>
    </Rnd>
  );
};

export default memo(NoteBox);

const NoteContainer = styled('div', {
  width: '100%',
  height: '100%',
  border: '1px solid $grey-700',
  borderRadius: '$small',
  display: 'flex',
  flexDirection: 'column',
  transition: 'box-shadow 0.25s',
  zIndex: 1,
  userSelect: 'none',

  '&:active': {
    boxShadow: '5px 5px 10px 0px $grey-100',
  },
});

const NoteHeader = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
  height: '2.4rem',
  padding: '0 0.4rem',
  borderBottom: '1px solid $grey-700',
  backgroundColor: '$grey-100',

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
  padding: '1.2rem',
  fontFamily: '$mono',
  fontSize: '1.4rem',
  borderRadius: '$small',
  resize: 'none',
  border: 'none',
  outline: 'none',

  backgroundColor: '$grey-100',
  color: '$grey-900',
});

const CircleContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: '2rem',
  height: '100%',

  '&:hover': {
    cursor: 'pointer',
  },
});

const Circle = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: '2rem',
  height: '100%',

  margin: '0 5px',

  '&:after': {
    content: '',

    width: '0.6rem',
    height: '0.6rem',

    border: '0.5px solid $grey-700',
    borderRadius: '9999px',
  },
});

const ResizeBtn = styled('div', {
  width: '100%',
  height: '100%',

  border: '1px solid $grey-600',
  borderBottomRightRadius: '$small',
});
