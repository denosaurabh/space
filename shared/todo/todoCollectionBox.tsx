import React, { useState } from 'react';
import { styled } from '@styled';
import TodoBox from './todoBox';
import { TodoCollection } from '@lib/store/todo';
import useTodo from '@state/todo';

type TodoContainerProps = TodoCollection;

const TodoCollection: React.FC<TodoContainerProps> = ({
  id,
  heading,
  placeholder,
  todos,
}) => {
  const [hover, setHover] = useState(false);
  const { addTodo } = useTodo((state) => state);

  const onAddTodoClick = () => {
    addTodo();
  };

  const onDragEnterHandler = () => {
    console.log('onDragEnterHandler');
    
  };

  const onDragLeaveHandler = () => {
    // console.log('onDragLeaveHandler');
  };

  const onHeadingChange = (e) => {
    console.log('onHeadingChange', e.target.value);
  };

  return (
    <TodoCollectionStyled
      data-todoCollectionId={id}
      onDragEnter={onDragEnterHandler}
      onDragLeave={onDragLeaveHandler}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <TodoCollectionHeading
        contentEditable
        onChange={onHeadingChange}
        value={heading}
        placeholder={placeholder}
      />
      <TodoDroppable>
        {Object.values(todos)
          .sort((a, b) => {
            return a.order - b.order;
          })
          .map((todo) => {
            return <TodoBox key={todo.id} {...todo} />;
          })}

        <AddTodo onClick={onAddTodoClick} collectionHovered={hover}>
          + New Todo
        </AddTodo>
      </TodoDroppable>
    </TodoCollectionStyled>
  );
};

export default TodoCollection;

const AddTodo = styled('button', {
  background: 'none',
  border: 'none',

  fontFamily: '$mono',
  fontSize: '1.5rem',
  fontWeight: '500',
  color: '$grey-400',
  textAlign: 'center',

  width: '100%',

  marginTop: '2rem',

  transition: 'all 0.2s ease-in-out',

  opacity: 0,

  variants: {
    collectionHovered: {
      true: {
        opacity: 1,
      },
    },
  },

  '&:hover': {
    cursor: 'pointer',
    color: '$grey-500',
  },
});

const TodoCollectionStyled = styled('div', {
  flex: 1,
  height: '100%',

  padding: '2rem',
  borderRadius: '$medium',

  '&:last-child': {
    borderRight: 'none',
  },
});

const TodoCollectionHeading = styled('input', {
  fontFamily: '$mono',
  fontSize: '1.5rem',
  fontWeight: '500',
  color: '$grey-800',
  marginBottom: '2rem',

  backgroundColor: 'transparent',
});

const TodoDroppable = styled('div', {});
