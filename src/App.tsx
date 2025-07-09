import { useState } from "react";
import "./App.css";

function App() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState<string[]>([]);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTodos((prev) => {
      return [...prev, todoText];
    });

    setTodoText("");
  };

  const onTodoTextChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTodoText(event.target.value);
  };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <textarea
          onChange={onTodoTextChangeHandler}
          value={todoText}
          placeholder="enter todo text"
        />
        <input type="submit" value="add" />
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
