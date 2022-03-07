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
  const { addTodo, grabbedTodo, updateTodoCollection } = useTodo(
    (state) => state
  );

  const onAddTodoClick = () => {
    addTodo(collectionId);
  };

  const onDragEnterHandler = () => {
    console.log('onDragEnterHandler');
  };

  const onDragLeaveHandler = () => {
    console.log('onDragLeaveHandler');

    if (grabbedTodo && hover) {
      updateTodoCollection(
        grabbedTodo.collectionId,
        grabbedTodo.id,
        collectionId
      );
    } else {
    }
  };

  const onDropHandler = (e) => {
    e.preventDefault();

    const [todoId, todoCollectionId] = e.dataTransfer
      .getData('data')
      .split('-');

    console.log('onDropHandler', todoId, todoCollectionId);

    if (!todoId || !todoCollectionId) return;

    updateTodoCollection(todoCollectionId, todoId, collectionId);
  };

  const onHeadingChange = (e) => {
    console.log('onHeadingChange', e.target.value);
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
