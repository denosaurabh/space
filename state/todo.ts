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
          todos: [],
        },
        week: {
          id: 'week',
          heading: 'Week',
          placeholder: 'week',
          todos: [],
        },
        month: {
          id: 'month',
          heading: 'Month',
          placeholder: 'month',
          todos: [],
        },
        year: {
          id: 'year',
          heading: 'Year',
          placeholder: 'year',
          todos: [],
        },
      },
      addTodo: (collectionId) => {
        set(
          produce((draft: useTodoState) => {
            const newTodoID = nanoid();

            draft.todosState[collectionId].todos.push({
              id: newTodoID,
              text: '',
              isComplete: false,
            });
          })
        );
      },
      updateTodoText: (collectionId, todoId, text) => {
        set(
          produce((draft: useTodoState) => {
            draft.todosState[collectionId].todos.find(
              (t) => t.id === todoId
            ).text = text;
          })
        );
      },
      toggleTodoComplete: (collectionId, todoId) => {
        set(
          produce((draft: useTodoState) => {
            const toggleComplete = !draft.todosState[collectionId].todos.find(
              (t) => t.id === todoId
            ).isComplete;

            draft.todosState[collectionId].todos.find(
              (t) => t.id === todoId
            ).isComplete = toggleComplete;
          })
        );
      },
      updateTodoCollection: (collectionId, todoId, collectionId2) => {
        set(
          produce((draft: useTodoState) => {
            const todo = draft.todosState[collectionId]?.todos[todoId];

            if (!todo) return;
            if (collectionId === collectionId2) return;

            draft.todosState[collectionId2].todos.push({
              id: todo.id,
              text: todo.text,
              isComplete: todo.isComplete,
            });

            draft.removeTodo(collectionId, todoId);
          })
        );
      },
      reorderCollection: (collectionId, startIndex, endIndex) => {
        set(
          produce((draft: useTodoState) => {
            const todos = draft.todosState[collectionId].todos;

            const [removed] = todos.splice(startIndex, 1);
            todos.splice(endIndex, 0, removed);

            draft.todosState[collectionId].todos = todos;
          })
        );
      },
      moveTodo: (
        fromCollectionId,
        toCollectionId,
        droppableSource,
        droppableDestination
      ) => {
        set(
          produce((draft: useTodoState) => {
            console.log('moveTodo', {
              fromCollectionId,
              toCollectionId,
              droppableSource,
              droppableDestination,
            });

            const sourceClone = Array.from(
              draft.todosState[fromCollectionId].todos
            );
            const destClone = Array.from(
              draft.todosState[toCollectionId].todos
            );
            const [removed] = sourceClone.splice(droppableSource.index, 1);

            destClone.splice(droppableDestination.index, 0, removed);

            draft.todosState[fromCollectionId].todos = sourceClone;
            draft.todosState[toCollectionId].todos = destClone;
          })
        );
      },
      removeTodo: (collectionId, todoId) => {
        set(
          produce((draft: useTodoState) => {
            const elIndex = draft.todosState[collectionId].todos.findIndex(
              (t) => t.id === todoId
            );

            draft.todosState[collectionId].todos.splice(elIndex, 1);
          })
        );
      },
      updateCollectionHeading: (collectionId, heading) => {
        set(
          produce((draft: useTodoState) => {
            draft.todosState[collectionId].heading = heading;
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
