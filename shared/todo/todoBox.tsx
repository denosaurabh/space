import React from 'react';
import { styled } from '@styled';
import { Todo } from '@lib/store/todo';
import useTodo from '@state/todo';
import { Draggable } from 'react-beautiful-dnd';

import CheckSvg from '@assets/svg/Check.svg';
import PencilSvg from '@assets/svg/Pencil.svg';

import CloseSvg from '@assets/svg/Close.svg';

interface TodoBoxProps extends Todo {
  collectionId: string;
  index: number;
}

const TodoBox: React.FC<TodoBoxProps> = ({
  id,
  collectionId,
  index,
  text,
  isComplete,
}) => {
  const { updateTodoText, toggleTodoComplete, removeTodo } = useTodo(
    ({ updateTodoText, toggleTodoComplete, removeTodo }) => ({
      updateTodoText,
      toggleTodoComplete,
      removeTodo,
    })
  );

  const onToggleCompleteClick = () => {
    toggleTodoComplete(collectionId, id);
  };

  const onRemoveIconClick = () => {
    removeTodo(collectionId, id);
  };

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided, snapshot) => (
        <TodoContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          // isDragging={snapshot.isDragging}
          css={provided.draggableProps.style}
          draggableId={id}
          index={index}
        >
          <TodoHeader
          // isDragging={snapshot.isDragging}
          >
            <CheckBox onClick={onToggleCompleteClick} isComplete={isComplete}>
              {isComplete ? <PencilSvg /> : <CheckSvg />}
            </CheckBox>

            <ActionBox
              onClick={onRemoveIconClick}
              className="remove-todo-button"
              css={{
                marginLeft: 'auto',
                svg: {
                  width: '18px',
                },
              }}
            >
              <CloseSvg />
            </ActionBox>
          </TodoHeader>

          <TodoContent
            value={text}
            placeholder="Type something here ....."
            spellCheck={false}
            onChange={(e) => {
              updateTodoText(collectionId, id, e.target.value);
            }}
            isComplete={isComplete}
          />
        </TodoContainer>
      )}
    </Draggable>
  );
};

export default TodoBox;

const TodoContainer = styled('div', {
  margin: '1rem',

  border: '1px solid $grey-400',
  borderRadius: '$small',

  transition: 'transform, margin 0.18s cubic-bezier(0.4, 0.0, 0.2, 1)',

  backgroundColor: '$grey-100',

  '&:focus-within': {
    outline: '2px solid $grey-600',
  },

  variants: {
    isDragging: {
      true: {
        transform: 'scale(0.98)',
        marginTop: '4rem',
      },
    },
  },
});

const TodoHeader = styled('div', {
  display: 'flex',
  gap: '1rem',

  padding: '0.6rem',

  '.remove-todo-button': { opacity: 0 },

  '&:hover': {
    '.remove-todo-button': { opacity: 1 },
  },

  transition: 'transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',

  variants: {
    isDragging: {
      true: {
        transform: `translateY(-50px)`,
      },
    },
  },
});

const ActionBox = styled('div', {
  width: '30px',
  height: '30px',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  border: '2px solid $grey-400',
  borderRadius: '8px',

  color: '$grey-700',

  transition: 'all 0.2s',

  svg: {
    width: '100%',
    height: '100%',
  },

  '&:hover': {
    cursor: 'pointer',
  },
});

const CheckBox = styled(ActionBox, {
  variants: {
    isComplete: {
      true: {
        backgroundColor: '$grey-700',
        color: '$grey-100',

        svg: {
          width: '60%',
          height: '60%',
        },
      },
    },
  },

  defaultVariants: {
    isComplete: false,
  },
});

const TodoContent = styled('textarea', {
  width: '100%',

  minWidth: '30rem',
  minHeight: '10rem',

  maxWidth: '60rem',
  maxHeight: '50rem',

  display: 'flex',
  flexDirection: 'column',
  zIndex: 1,

  border: 'none',

  borderRadius: '$small',
  backgroundColor: '$grey-100',

  padding: '1rem',

  fontFamily: '$mono',
  fontSize: '1.4rem',
  color: '$grey-800',

  '&:focus': {
    outline: 'none',
  },

  transition: 'color 0.18s cubic-bezier(0.4, 0.0, 0.2, 1)',

  variants: {
    isDragging: {
      true: {
        transform: `translateY(-50px)`,
      },
    },

    isComplete: {
      true: {
        color: '$grey-500',
        textDecoration: 'line-through',
      },
    },
  },

  defaultVariants: {
    isComplete: false,
  },
});
