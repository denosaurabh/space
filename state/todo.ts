import create from 'zustand';
import { persist } from 'zustand/middleware';
import produce from 'immer';
import { nanoid } from 'nanoid';

import useSettings from '@state/settings';
import { useTodoState } from '@lib/store/todo';

const useTodo = create<useTodoState>(
  persist(
    (set) => ({
      todosState: {
        0: {
          id: 'day',
          heading: 'Day',
          placeholder: 'day',
          todos: {},
        },
        1: {
          id: 'day',
          heading: 'Day',
          placeholder: 'day',
          todos: {},
        },
        2: {
          id: 'day',
          heading: 'Day',
          placeholder: 'day',
          todos: {},
        },
        3: {
          id: 'day',
          heading: 'Day',
          placeholder: 'day',
          todos: {},
        },
      },
      addTodo: (collectionId) => {
        set(
          produce((draft: useTodoState) => {
            const newTodoID = nanoid();
            const order = Object.keys(
              draft.todosState[collectionId].todos
            ).length;

            draft.todosState[collectionId].todos[newTodoID] = {
              id: newTodoID,
              order,
              text: '',
            };
          })
        );
      },
      updateTodoText: (collectionId, todoId, text) => {
        set(
          produce((draft: useTodoState) => {
            draft.todosState[collectionId].todos[todoId].text = text;
          })
        );
      },
      updateTodoCollection: (collectionId, todoId, collectionId2) => {
        set(
          produce((draft: useTodoState) => {
            const todo = draft.todosState[collectionId].todos[todoId];

            draft.todosState[collectionId2].todos[todoId] = {
              id: todo.id,
              order: Object.keys(draft.todosState[collectionId2].todos).length,
              text: todo.text,
            };

            delete draft.todosState[collectionId].todos[todoId];
          })
        );
      },
      removeTodo: (collectionId, todoId) => {
        set(
          produce((draft: useTodoState) => {
            delete draft.todosState[collectionId].todos[todoId];
          })
        );
      },
    }),
    {
      name: 'todosStorage',
      version: 1,
      getStorage: () => {
        const { storage } = useSettings.getState();

        switch (storage) {
          case 'localStorage':
            return localStorage;

          default:
            return localStorage;
        }
      },
    }
  )
);

useTodo.subscribe((state) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(state.notesState, state.currentCollection);
  }
});

export default useTodo;
