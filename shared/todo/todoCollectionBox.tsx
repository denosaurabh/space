import React, { useState } from 'react';
import { styled } from '@styled';
import TodoBox from './todoBox';
import { TodoCollection as TodoCollectionI } from '@lib/store/todo';
import useTodo from '@state/todo';

type TodoContainerProps = TodoCollectionI;

const TodoCollection: React.FC<TodoContainerProps> = ({
  id: collectionId,
  heading,
  placeholder,
  todos,
}) => {
  const [hover, setHover] = useState(false);
  const [dragEnter, setDragEnter] = useState(false);

  const { addTodo, updateTodoCollection, updateCollectionHeading } = useTodo(
    (state) => state
  );

  const onAddTodoClick = () => {
    addTodo(collectionId);
  };

  const onDragEnterHandler = () => {
    setDragEnter(true);
  };

  const onDragLeaveHandler = () => {
    setDragEnter(false);
  };

  const onDropHandler = (e) => {
    e.preventDefault();

    const [todoId, todoCollectionId] = e.dataTransfer
      .getData('data')
      .split('-');

    if (!todoId || !todoCollectionId) return;

    updateTodoCollection(todoCollectionId, todoId, collectionId);

    setDragEnter(false);
  };

  const onHeadingChange = (e) => {
    updateCollectionHeading(collectionId, e.target.value);
  };

  return (
    <TodoCollectionStyled
      onDragEnter={onDragEnterHandler}
      onDragLeave={onDragLeaveHandler}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={onDropHandler}
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

        {!Object.values(todos).length ? (
          <Text>No Todo in this Collection!</Text>
        ) : null}

        <AddTodo onClick={onAddTodoClick} collectionHovered={hover}>
          + New Todo
        </AddTodo>

        {dragEnter ? <Text>Drop Todo</Text> : null}
      </TodoDroppable>
    </TodoCollectionStyled>
  );
};

export default TodoCollection;

const TodoCollectionStyled = styled('div', {
  flex: 1,
  height: '100%',

  // overflowY: 'scroll',

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

const TodoDroppable = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

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

const Text = styled('p', {
  margin: '2rem 0',

  fontFamily: '$mono',
  fontSize: '1.4rem',
  color: '$grey-400',

  width: '100%',
  textAlign: 'center',
});
