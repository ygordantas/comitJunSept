import { useRef, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const MAX_TIMER_FOR_DIALOG = 15000;

function App() {
  const [todos, setTodos] = useState<string[]>([]);
  const [todoText, setTodoText] = useState("");
  const [todoIndexBeingEdited, setTodoIndexBeingEdited] = useState<
    undefined | number
  >();
  const [closeDialogTime, setCloseDialogTime] =
    useState<number>(MAX_TIMER_FOR_DIALOG);

  const isEditMode = todoIndexBeingEdited !== undefined;

  const dialogRef: React.Ref<HTMLDialogElement> = useRef(null);
  const timerRef: React.Ref<number> = useRef(null);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEditMode) {
      setTodos((prev) => {
        const updatedTodos = [...prev];
        updatedTodos[todoIndexBeingEdited] = todoText;

        return updatedTodos;
      });

      setTodoIndexBeingEdited(undefined);
    } else {
      setTodos((prev) => {
        return [...prev, todoText];
      });
    }
    onDialogCloseHandler();
  };

  const onTodoTextChangeHandler = (todoText: string) => setTodoText(todoText);

  const onDeleteClickHandler = (index: number) =>
    setTodos((todos) => todos.filter((_, i) => i !== index));

  const onEditClickHandler = (index: number) => {
    const todoToUpdate = todos[index];
    setTodoText(todoToUpdate);
    setTodoIndexBeingEdited(index);
    onDialogOpenHandler();
  };

  const onDialogOpenHandler = () => {
    timerRef.current = setInterval(() => {
      setCloseDialogTime((prev) => (prev -= 500));
    }, 500);

    dialogRef.current?.showModal();
  };

  const onDialogCloseHandler = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setCloseDialogTime(MAX_TIMER_FOR_DIALOG);
    dialogRef.current?.close();
    setTodoText("");
    setTodoIndexBeingEdited(undefined);
  };

  if (closeDialogTime <= 0) {
    onDialogCloseHandler();
  }

  return (
    <main>
      <TodoList
        onTodoDeleteClick={onDeleteClickHandler}
        onTodoEditClick={onEditClickHandler}
        todos={todos}
      />
      <dialog ref={dialogRef}>
        <TodoForm
          todoText={todoText}
          onTodoTextChange={onTodoTextChangeHandler}
          onSubmit={onSubmitHandler}
          isEditMode={isEditMode}
        />
        <progress value={closeDialogTime} max={MAX_TIMER_FOR_DIALOG} />
        <button onClick={onDialogCloseHandler}>Close</button>
      </dialog>
      <button onClick={onDialogOpenHandler}>Show dialog</button>
    </main>
  );
}

export default App;
