import React from 'react';
import { styled } from '@styled';
import { DragDropContext } from 'react-beautiful-dnd';

import Page from '@layouts/page';
import TodoCollection from '@shared/todo/todoCollectionBox';
import useTodo from '@state/todo';

const Todo: React.FC = () => {
  const { todosState } = useTodo((state) => state);

  const { reorderCollection, moveTodo } = useTodo((state) => state);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    console.log({ source, destination });

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sourceCollectionId = source.droppableId;
    const destinationCollectionId = destination.droppableId;

    console.log({ sourceCollectionId, destinationCollectionId });

    if (sourceCollectionId === destinationCollectionId) {
      reorderCollection(sourceCollectionId, source.index, destination.index);
    } else {
      moveTodo(
        sourceCollectionId,
        destinationCollectionId,
        source,
        destination
      );
    }
  };

  return (
    <Page>
      <TodoContainer className="todo-container">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.values(todosState).map((todoCollection) => {
            return (
              <TodoCollection key={todoCollection.id} {...todoCollection} />
            );
          })}
        </DragDropContext>
      </TodoContainer>
    </Page>
  );
};

export default Todo;

const TodoContainer = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  gap: '2rem',

  width: '100vw',
  height: '100vh',

  // overflowX: 'scroll',

  padding: '2rem',

  '@mobile': {
    padding: '0',
  },
});
