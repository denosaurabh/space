export interface Todo {
  id: string;
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
  todos: Todo[];
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

  reorderCollection: (list, startIndex, endIndex) => void;
  moveTodo: (
    source,
    destination,
    droppableSource,
    droppableDestination
  ) => void;

  updateCollectionHeading: (collectionId: string, heading: string) => void;

  setGrabbedTodo: (todo: GrabbedTodo) => void;
  removeGrabbedTodo: () => void;
}
