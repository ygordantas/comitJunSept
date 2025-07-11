type TodoFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onTodoTextChange: (textValue: string) => void;
  isEditMode: boolean;
  todoText: string;
};

export default function TodoForm({
  onSubmit,
  onTodoTextChange,
  isEditMode,
  todoText,
}: TodoFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <textarea
        onChange={(e) => onTodoTextChange(e.target.value)}
        value={todoText}
        placeholder="enter todo text"
      />
      <input type="submit" value={isEditMode ? "edit" : "add"} />
    </form>
  );
}
