import { useEffect, useMemo, useState } from "react";
import { TodoList } from "@/features/todos/components/TodoList";
import { AddTodoForm } from "@/features/todos/components/AddTodoForm";
import { Todo, TodoFormData } from "@/features/todos/types";
import { getStoredData, setStoredData } from "@/lib";
import { InputSearch } from "@/features/todos/components";
import { Funnel } from "lucide-react";

const DashboardPage = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const displayedTasks = useMemo(() => {
    if (!searchTerm.trim()) return tasks;
    return tasks.filter((task) =>
      task.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tasks, searchTerm]);

  const handleToggle = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  const handleDelete = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleEdit = (id: string, data: TodoFormData) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              text: data.taskName,
              tags: data.categories,
              description: data.description,
            }
          : task
      )
    );
  };

  const handleAdd = (data: TodoFormData) => {
    const now = new Date();
    const newTask: Todo = {
      id: crypto.randomUUID(),
      text: data.taskName,
      completed: false,
      tags: data.categories,
      description: data.description,
      createdAt: now.toLocaleTimeString(),
      date: now.toLocaleDateString("en-GB"),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  useEffect(() => {
    const stored: unknown = getStoredData();
    if (Array.isArray(stored)) {
      setTasks(stored as Todo[]);
    }
  }, []);

  useEffect(() => {
    setStoredData(tasks);
  }, [tasks]);

  return (
    <div className="flex flex-col items-start min-h-screen bg-secondary p-4">
      <div className="flex flex-col items-stretch w-auto">
        <div>
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <p className="text-lg mb-2">Welcome to your dashboard!</p>
          <p className="text-sm text-muted-foreground">
            Here you can manage your todos list. Add, edit, delete your tasks
            and more.
          </p>
        </div>
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold mb-2">Your Tasks:</h2>
            <AddTodoForm onAdd={(data) => handleAdd(data)} />
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            You currently have {tasks.length} tasks.
          </p>
          <div className="flex w-full items-center justify-between gap-5 mb-4">
            <InputSearch value={searchTerm} onChange={setSearchTerm} />
            <span className="bg-white p-2 rounded-md hover:bg-gray-100 transition-colors border border-gray-200 cursor-pointer">
              <Funnel className="size-5" />
            </span>
          </div>
          {displayedTasks.length > 0 ? (
            <TodoList
              tasks={displayedTasks}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ) : (
            <p className="text-muted-foreground">
              {searchTerm
                ? `No tasks found matching "${searchTerm}"`
                : 'You currently have no tasks. Click the button "Add task" to add a new task.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
