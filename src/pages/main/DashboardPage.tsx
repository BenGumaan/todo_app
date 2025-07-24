import { useEffect, useMemo, useState } from "react";
import { TodoList } from "@/features/todos/components/TodoList";
import { AddTodoForm } from "@/features/todos/components/AddTodoForm";
import { Todo, TodoFormData } from "@/features/todos/types";
import { getStoredData, setStoredData } from "@/lib";
import { InputSearch, SortControls } from "@/features/todos/components";

const DashboardPage = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "name" | "completed">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const completedTasks = tasks.filter((task) => task.completed).length;
  const progressPercentage =
    tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  const displayedTasks = useMemo(() => {
    // Filter tasks
    let filtered = tasks;
    if (searchTerm.trim()) {
      filtered = tasks.filter((task) =>
        task.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort tasks
    return [...filtered].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "name": {
          const aText = a.text.toLowerCase();
          const bText = b.text.toLowerCase();
          comparison = aText < bText ? 1 : -1;
          break;
        }
        case "date":
          comparison =
            new Date(a.date ?? "").getTime() - new Date(b.date ?? "").getTime();
          break;
        case "completed":
          comparison = Number(a.completed) - Number(b.completed);
          break;
        default:
          return 0;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [tasks, searchTerm, sortBy, sortOrder]);

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
          <div className="mb-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Task Progress</span>
              <span>
                {Math.round(progressPercentage) === 100 ? "🎉 " : ""}
                {completedTasks}/{tasks.length} (
                {Math.round(progressPercentage)}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-between gap-5 mb-4">
            <InputSearch value={searchTerm} onChange={setSearchTerm} />
            <SortControls
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortByChange={setSortBy}
              onSortOrderChange={setSortOrder}
            />
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
