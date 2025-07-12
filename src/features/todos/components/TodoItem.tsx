import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CalendarDays, Timer, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { DeleteTodoPrompt } from "@/features/todos/components/DeleteTodoPrompt";
import { EditTodoModal } from "@/features/todos/components/EditTodoModal";
import { Todo, TodoFormData } from "@/features/todos/types";
import TodoDetailsModal from "@/features/todos/components/TodoDetailsModal";

type TodoItemProps = {
  task: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, data: TodoFormData) => void;
};

export function TodoItem({ task, onToggle, onDelete, onEdit }: TodoItemProps) {
  return (
    <div className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm hover:shadow-md transition">
      <div className="flex items-center space-x-3 gap-3">
        <Checkbox
          id={`task-${task.id}`}
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
        />
        <div>
          <div>
            <label htmlFor={`task-${task.id}`} className={cn("text-base")}>
              <TodoDetailsModal todo={task}>
                <button className="text-left hover:underline cursor-pointer">
                  <h3
                    className={cn(
                      "my-2 text-2xl font-bold text-foreground",
                      task.completed && "line-through text-muted-foreground"
                    )}
                  >
                    {task.text}
                  </h3>
                </button>
              </TodoDetailsModal>
            </label>
          </div>
          <div>
            <div className="flex gap-2 text-sm leading-snug text-muted-foreground">
              <div className="flex items-center gap-1">
                <CalendarDays size={16} />
                <span>{task.date}</span>
              </div>
              <span className="opacity-50">|</span>
              <div className="flex items-center gap-1">
                <Timer size={16} />
                <time dateTime={task.createdAt}>{task.createdAt}</time>
              </div>
            </div>
            <div>
              {task?.tags && (
                <ul className="my-4 flex list-none flex-wrap gap-2 p-0">
                  {task.tags.map((tag: string) => (
                    <li key={tag}>
                      <Badge
                        variant="outline"
                        className="inline-block rounded-full border border-muted-foreground/50 bg-muted-foreground/10 px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {tag}
                      </Badge>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {task.description && (
              <p
                className="text-sm leading-snug text-muted-foreground line-clamp-2"
                title={task.description}
              >
                {task.description}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="action-btns">
        <EditTodoModal
          onEdit={(data) => onEdit(task.id, data)}
          task={task}
          trigger={
            <Button variant="ghost" size="icon" aria-label="Edit task">
              <Pencil className="h-4 w-4 text-shadow-primary-foreground" />
            </Button>
          }
        />
        <DeleteTodoPrompt onConfirm={() => onDelete(task.id)} />
      </div>
    </div>
  );
}
