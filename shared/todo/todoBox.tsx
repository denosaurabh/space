import React, { useState } from 'react';
import { styled } from '@styled';
import { Todo } from '@lib/store/todo';

// import {
//   Root as PopoverRoot,
//   StyledTrigger as PopoverTrigger,
//   Anchor as PopoverAnchor,
//   StyledContent as PopoverContent,
//   StyledClose as PopoverClose,
//   StyledArrow as PopoverArrow,
// } from '@components/popover';

type TodoBoxProps = Todo;

const TodoBox: React.FC<TodoBoxProps> = () => {
  const [isDragging, setIsDragging] = useState(false);

  const onDragStartHandler = () => {
    console.log('onDragStartHandler');
    setIsDragging(true);
  };

  const onDragEndHandler = () => {
    console.log('onDragEndHandler');
    setIsDragging(false);
  };

  return (
    <TodoContainer
      draggable
      onDragStart={onDragStartHandler}
      onDragEnd={onDragEndHandler}
      isDragging={isDragging}
      placeholder="Type something here ....."
      spellCheck={false}
    >
      {/* <TodoHeader>
        <PopoverRoot>
          <PopoverTrigger>
            <CircleContainer>
              <Circle />
            </CircleContainer>
          </PopoverTrigger>
          <PopoverAnchor />

          <PopoverContent>
            Do you want to remove this note?
            <PopoverArrow />
            <PopoverClose>Yes</PopoverClose>
          </PopoverContent>
        </PopoverRoot>
      </TodoHeader> */}

      {/* <TodoContent placeholder="Typ e something here ....." spellCheck={false} /> */}
    </TodoContainer>
  );
};

export default TodoBox;

const TodoContainer = styled('textarea', {
  width: '100%',
  height: '10rem',
  border: '1px solid $grey-400',
  borderRadius: '$small',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1,
  userSelect: 'none',
  margin: '1rem 0',
  backgroundColor: '$grey-100',

  padding: '1rem',

  fontFamily: '$mono',
  fontSize: '1.4rem',
  color: '$grey-800',

  transition: 'transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',

  variants: {
    isDragging: {
      true: {
        transform: `scale(0.9)`,
      },
    },
  },
});

// const TodoContent = styled('textarea', {
//   width: '100%',
//   height: '100%',
//   padding: '1.2rem',
//   fontFamily: '$mono',
//   fontSize: '1.4rem',
//   borderRadius: '$small',
//   resize: 'none',
//   border: 'none',
//   outline: 'none',

//   backgroundColor: '$grey-100',
//   color: '$grey-900',

//   transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',

//   '&:active': {
//     cursor: 'grabbing',
//     boxShadow: '5px 5px 10px 0px $grey-600',
//   },
// });

// const TodoHeader = styled('div', {
//   display: 'flex',
//   justifyContent: 'flex-end',
//   width: '100%',
//   height: '2.4rem',
//   padding: '0 0.4rem',
//   backgroundColor: '$grey-100',
//   borderBottom: '1px solid $grey-500',

//   borderTopLeftRadius: '$small',
//   borderTopRightRadius: '$small',

//   '&:hover': {
//     cursor: 'grab',
//   },
//   '&:active': {
//     cursor: 'grabbing',
//   },
//   '.note-header-dot:hover': {
//     cursor: 'pointer',
//   },
// });

// const CircleContainer = styled('div', {
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',

//   width: '2rem',
//   height: '100%',

//   '&:hover': {
//     cursor: 'pointer',
//   },
// });

// const Circle = styled('div', {
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',

//   width: '2rem',
//   height: '100%',

//   margin: '0 5px',

//   '&:after': {
//     content: '',

//     width: '0.6rem',
//     height: '0.6rem',

//     border: '0.5px solid $grey-600',
//     borderRadius: '9999px',
//   },
// });
