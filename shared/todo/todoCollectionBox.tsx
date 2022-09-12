import React, { useState } from 'react';
import { styled } from '@styled';
import TodoBox from './todoBox';
import { TodoCollection as TodoCollectionI } from '@lib/store/todo';
import useTodo from '@state/todo';
import { Droppable } from 'react-beautiful-dnd';

type TodoContainerProps = TodoCollectionI;

const TodoCollection: React.FC<TodoContainerProps> = ({
  id: collectionId,
  heading,
  placeholder,
  todos,
}) => {
  const [hovered, setHovered] = useState(false);
  const { addTodo, updateCollectionHeading } = useTodo((state) => state);

  const onAddTodoClick = () => {
    addTodo(collectionId);
  };

  const onHeadingChange = (e) => {
    updateCollectionHeading(collectionId, e.target.value);
  };

  return (
    <TodoCollectionStyled
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <HeadingRow>
        <TodoCollectionHeading
          contentEditable
          onChange={onHeadingChange}
          value={heading}
          placeholder={placeholder}
        />

        {hovered && <AddTodo onClick={onAddTodoClick}>+</AddTodo>}

        {!hovered && !Object.values(todos).length ? (
          <Text>No Todos</Text>
        ) : null}
      </HeadingRow>

      <Droppable key={collectionId} droppableId={collectionId}>
        {(provided, snapshot) => (
          <TodoDroppable
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
            {...provided.droppableProps}
          >
            {todos.map((todo, i) => {
              return (
                <TodoBox
                  key={todo.id}
                  {...todo}
                  collectionId={collectionId}
                  index={i}
                />
              );
            })}

            {provided.placeholder}
          </TodoDroppable>
        )}
      </Droppable>
    </TodoCollectionStyled>
  );
};

export default TodoCollection;

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
  height: 30,

  backgroundColor: 'transparent',
});

const Row = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
});

const HeadingRow = styled(Row, {
  marginBottom: '2rem',
});

const Column = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

const TodoDroppable = styled(Column, {
  height: '100%',
  overflowY: 'scroll',
  borderRadius: '$small',

  variants: {
    isDraggingOver: {
      true: {
        backgroundColor: '$grey-200',
      },
    },
  },
});

const AddTodo = styled('button', {
  background: 'none',
  border: 'none',

  fontFamily: '$mono',
  fontSize: '2.5rem',
  fontWeight: '500',
  color: '$grey-500',
  textAlign: 'center',

  transition: 'all 0.2s ease-in-out',

  '&:hover': {
    cursor: 'pointer',
    color: '$grey-500',
  },
});

const Text = styled('p', {
  margin: 'auto 0',

  fontFamily: '$mono',
  fontSize: '1.4rem',
  color: '$grey-400',

  height: 'fit-content',
  minWidth: 'max-content',
  textAlign: 'center',
});

// const BoldText = styled(Text, {
//   fontWeight: '600',
// });
