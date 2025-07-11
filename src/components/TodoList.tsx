type TodoListProps = {
  todos: string[];
  onTodoDeleteClick: (index: number) => void;
  onTodoEditClick: (index: number) => void;
};

export default function TodoList({
  todos,
  onTodoDeleteClick,
  onTodoEditClick,
}: TodoListProps) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          <p>{todo}</p>
          <button onClick={() => onTodoDeleteClick(index)}>X</button>
          <button onClick={() => onTodoEditClick(index)}>Edit</button>
        </li>
      ))}
    </ul>
  );
}
