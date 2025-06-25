import { TaskItem } from "./TaskItem"

type Task = {
  id: string
  text: string
  completed: boolean
  tags: string[]
  description?: string
  createdAt?: string
  date?: string
}

type TaskListProps = {
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return <div className="text-muted-foreground">No tasks available</div>
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggle(task.id)}
          onDelete={() => onDelete(task.id)}
        />
      ))}
    </div>
  )
}
