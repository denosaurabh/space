import React from 'react';
import { styled } from '@styled';

import Page from '@layouts/page';
import TodoCollection from '@shared/todo/todoCollectionBox';

const Todo: React.FC = () => {
  return (
    <Page>
      <TodoContainer className="todo-container">
        <TodoCollection placeholder="Day" heading="Day" />
        <TodoCollection placeholder="Week" heading="Week" />
        <TodoCollection placeholder="Month" heading="Month" />
        <TodoCollection placeholder="Year" heading="Year" />
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
