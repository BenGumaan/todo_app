import { Todo, TodoFormData } from "@/features/todos";
import { TodoItem } from "@/features/todos";

type TodoListProps = {
  tasks: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, data: TodoFormData) => void;
};

export function TodoList({ tasks, onToggle, onDelete, onEdit }: TodoListProps) {
  if (tasks.length === 0) {
    return <div className="text-muted-foreground">No tasks available</div>;
  }

  return (
    <div className="space-y-2 scrollable-container">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={() => onToggle(task.id)}
          onDelete={() => onDelete(task.id)}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
