import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { CalendarDays, Timer, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge";

type Task = {
  id: string
  text: string
  completed: boolean,
  tags: string[],
  description?: string
  date?: string
}

type TaskItemProps = {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
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
            <label
              htmlFor={`task-${task.id}`}
              className={cn(
                "text-base",
                task.completed && "line-through text-muted-foreground"
              )}
            >
              <h3 className="my-2 text-2xl font-bold text-foreground">{task.text}</h3>
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
                <time dateTime={task.id}>{task.id} ms ago</time>
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
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {task.description && (
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground line-clamp-2 w-100" title={task.description}>
                  {task.description}
                </p>
              )}
            </p>
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
      >
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  )
}
