export interface Todo {
  id: string;
  collectionId: string;
  order: number;
  text: string;
  isComplete: boolean;
}

export interface GrabbedTodo {
  id: string;
  collectionId: string;
}

export interface TodoCollection {
  id: string;
  heading: string;
  placeholder: string;
  todos: Record<string, Todo>;
}

export interface TodoState {
  [key: string]: TodoCollection;
}

export interface useTodoState {
  todosState: TodoState;
  grabbedTodo: GrabbedTodo;

  addTodo: (collectionId: string) => void;
  updateTodoText: (collectionId: string, todoId: string, text: string) => void;
  toggleTodoComplete: (collectionId: string, todoId: string) => void;
  updateTodoCollection: (
    collectionId: string,
    todoId: string,
    collectionId2: string
  ) => void;
  removeTodo: (collectionId: string, todoId: string) => void;

  updateCollectionHeading: (collectionId: string, heading: string) => void;

  setGrabbedTodo: (todo: GrabbedTodo) => void;
  removeGrabbedTodo: () => void;
}