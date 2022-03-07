import create from 'zustand';
import { persist } from 'zustand/middleware';
import produce from 'immer';
import { nanoid } from 'nanoid';

import useSettings from '@state/settings';
import { useTodoState } from '@lib/store/todo';

const useTodo = create<useTodoState>(
  persist(
    (set) => ({
      grabbedTodo: null,
      todosState: {
        day: {
          id: 'day',
          heading: 'Day',
          placeholder: 'day',
          todos: {},
        },
        week: {
          id: 'week',
          heading: 'Week',
          placeholder: 'week',
          todos: {},
        },
        month: {
          id: 'month',
          heading: 'Month',
          placeholder: 'month',
          todos: {},
        },
        year: {
          id: 'year',
          heading: 'Year',
          placeholder: 'year',
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
              collectionId,
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
            const todo = draft.todosState[collectionId]?.todos[todoId];

            if (!todo) return;

            draft.todosState[collectionId2].todos[todoId] = {
              id: todo.id,
              collectionId: collectionId2,
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
      setGrabbedTodo: (todo) => {
        set((draft: useTodoState) => {
          draft.grabbedTodo = todo;
        });
      },
      removeGrabbedTodo: () => {
        set((draft: useTodoState) => {
          draft.grabbedTodo = null;
        });
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
    console.log(state.todosState);
  }
});

export default useTodo;
