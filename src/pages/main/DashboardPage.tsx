import { useEffect, useState } from "react";
import { TaskList } from "@/components/TaskList";
import { Button } from "@/components/ui/button";
import data from "@/data/tasks.json"; // Assuming you have a tasks data file


const DashboardPage = () => {

    const tasksData = data as { id: string; text: string; completed: boolean; tags: string[]; description?: string }[];
    const [tasks, setTasks] = useState(tasksData);

    const handleToggle = (id: string) => {
        setTasks(prevTasks => {
            return prevTasks.map(task => {
                if (task.id === id) {
                    return { ...task, completed: !task.completed };
                }
                return task;
            });
        });
    };
    const handleDelete = (id: string) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    useEffect(() => {
    }, []);

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
            <Button>Add task</Button>
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
