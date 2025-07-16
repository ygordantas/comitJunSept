import { useEffect, useRef, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Dialog from "./components/Dialog";
import Menu from "./components/Menu";

const MAX_TIMER_FOR_DIALOG = 15000;

function App() {
  const [todos, setTodos] = useState<string[]>([]);
  const [todoText, setTodoText] = useState("");
  const [todoIndexBeingEdited, setTodoIndexBeingEdited] = useState<
    undefined | number
  >();
  const [closeDialogTime, setCloseDialogTime] =
    useState<number>(MAX_TIMER_FOR_DIALOG);
  const [pokemon, setPokemon] = useState<object | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const isEditMode = todoIndexBeingEdited !== undefined;
  const timerRef: React.Ref<number> = useRef(null);

  const fileInputRef: React.Ref<HTMLInputElement> = useRef(null);

  useEffect(() => {
    // promises // async code
    // that in a given time it will return something

    // async/await
    const getData = async () => {
      const data = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
      const dataJson = await data.json();
      setPokemon(dataJson);
    };

    //promise chaining

    // fetch("https://pokeapi.co/api/v2/pokemon/ditto")
    // .then((response) =>
    //   response.json().then((data) => setPokemon(data))
    // );

    getData();
  }, []);

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
    setOpenModal(true);
    timerRef.current = setInterval(() => {
      setCloseDialogTime((prev) => (prev -= 500));
    }, 500);
  };

  const onDialogCloseHandler = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setCloseDialogTime(MAX_TIMER_FOR_DIALOG);
    setOpenModal(false);
    setTodoText("");
    setTodoIndexBeingEdited(undefined);
  };

  if (closeDialogTime <= 0) {
    onDialogCloseHandler();
  }

  return (
    <main>
      <Menu
        buttons={
          <div>
            <button>My button</button>
            <button>My second button</button>
          </div>
        }
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa officia
          ullam, fugit expedita voluptatum, adipisci itaque omnis ea tempore
          doloribus molestiae delectus asperiores nulla, totam non illo libero
          exercitationem quidem.
        </p>
      </Menu>
      <TodoList
        onTodoDeleteClick={onDeleteClickHandler}
        onTodoEditClick={onEditClickHandler}
        todos={todos}
      />
      <Dialog open={openModal}>
        <TodoForm
          todoText={todoText}
          onTodoTextChange={onTodoTextChangeHandler}
          onSubmit={onSubmitHandler}
          isEditMode={isEditMode}
        />
        <progress value={closeDialogTime} max={MAX_TIMER_FOR_DIALOG} />
        <button onClick={onDialogCloseHandler}>Close</button>
      </Dialog>
      <button onClick={onDialogOpenHandler}>Show dialog</button>
      <input ref={fileInputRef} type="file" style={{ display: "none" }} />
      <button onClick={() => fileInputRef.current?.click()}>Pick a file</button>
      {/* <code>{pokemon ? JSON.stringify(pokemon) : "Loading..."}</code> */}
    </main>
  );
}

export default App;
