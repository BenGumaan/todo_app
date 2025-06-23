// import { useState } from "react";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
    
    return (
        <div className="flex flex-col items-start min-h-screen bg-secondary p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p className="text-lg mb-2">Welcome to your dashboard!</p>
            <p className="text-sm text-muted-foreground">
                Here you can manage your todos list. Add, edit, delete your tasks and more.
            </p>
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Your Tasks</h2>
                <Button>Add task</Button>
                <p className="text-sm text-muted-foreground mb-4">
                    You currently have no tasks. Click the button below to add a new task.
                </p>
            </div>
        </div>
    );
};

export default DashboardPage;
