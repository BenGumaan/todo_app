import { useEffect, useState } from "react";
import { TaskList } from "@/components/TaskList";
import { AddTaskDialog } from "@/components/AddTaskDialog";
// import data from "@/data/tasks.json";

type FormData = {
  taskName: string;
  description: string;
  categories: string[];
};

type Task = {
  id: string;
  text: string;
  completed: boolean;
  tags: string[];
  description?: string;
  createdAt?: string;
  date?: string;
};

const DashboardPage = () => {

    // const tasksData = data as { id: string; text: string; completed: boolean; tags: string[]; description?: string, createdAt?: string, date?: string }[];
    const [tasks, setTasks] = useState<Task[]>(localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')!) : []);
    console.log("Tasks data:", tasks);

    const handleToggle = (id: string) => {
      setTasks(prevTasks => {
        return prevTasks.map(task => {
          if (task.id === id) {
              return { ...task, completed: !task.completed };
          }
          console.log("Task not found or already toggled:", task.id, id);
          
          return task;
        });
      });
    };
    const handleDelete = (id: string) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };
    
    const handleAdd = (data: FormData) => {
      const now = new Date();
      const newTask = {
        id: (Math.random() * 10000).toString(),
        text: data.taskName,
        completed: false, 
        tags: data.categories,
        description: data.description,
        createdAt: now.toLocaleTimeString(),
        date: now.toLocaleDateString("en-GB"),
      };      
      const updated = [...tasks, newTask];
      setTasks(updated);
    };

    useEffect(() => {
      const stored = localStorage.getItem('tasks');
      if (stored) {
        setTasks(() => JSON.parse(stored));
      }
    }, []);
    
    useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

  return (
    <div className="flex flex-col items-start min-h-screen bg-secondary p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg mb-2">Welcome to your dashboard!</p>
      <p className="text-sm text-muted-foreground">
        Here you can manage your todos list. Add, edit, delete your tasks and
        more.
      </p>
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold mb-2">Your Tasks:</h2>
            <AddTaskDialog onAdd={(data) => handleAdd(data)} />
            <dialog id="addTaskDialog" className="modal"></dialog>
        </div>
        {(Array.isArray(tasks) && tasks.length !== 0)? (
          <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
        ) : (
          <p className="text-muted-foreground">You currently have no tasks. Click the button "Add task" to add a new task.</p>
        )}    
      </div>
    </div>
  );
};

export default DashboardPage;
