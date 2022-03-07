import React from 'react';
import { styled } from '@styled';

import Page from '@layouts/page';
import TodoCollection from '@shared/todo/todoCollectionBox';
import useTodo from '@state/todo';

const Todo: React.FC = () => {
  const { todosState } = useTodo((state) => state);

  return (
    <Page>
      <TodoContainer className="todo-container">
        {Object.values(todosState).map((todoContainer) => {
          return <TodoCollection key={todoContainer.id} {...todoContainer} />;
        })}
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

  width: '100%',
  height: '100vh',

  padding: '2rem',

  '@mobile': {
    padding: '0',
  },
});
