import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui";
import { Label } from "@/components/ui";
import { MultiCombobox } from "@/components/ui";
import { useState } from "react";
import { Textarea } from "@/components/ui";
import { TodoFormData, Todo } from "@/features/todos";

const categoryOptions = [
  { label: "Home", value: "home" },
  { label: "Work", value: "work" },
  { label: "Personal", value: "personal" },
];

interface EditTodoModalProps {
  task: Todo;
  onEdit: (data: TodoFormData) => void;
  trigger: React.ReactNode;
}

export function EditTodoModal({ task, onEdit, trigger }: EditTodoModalProps) {
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormData>({
    defaultValues: {
      taskName: task.text,
      description: task.description || "",
      categories: task.tags || [],
    },
  });

  const onSubmit = (data: TodoFormData) => {
    onEdit(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit a Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="task-name" className="mb-2">
              Task Name
            </Label>
            <Controller
              name="taskName"
              control={control}
              rules={{ required: "Task description is required" }}
              render={({ field }) => (
                <div>
                  <Input id="task-name" {...field} />
                  {errors.taskName && (
                    <span className="text-red-500 text-xs">
                      Task name is required
                    </span>
                  )}
                </div>
              )}
            />
          </div>

          <div>
            <Label htmlFor="task-description" className="mb-2">
              Task Description
            </Label>
            <Controller
              name="description"
              control={control}
              rules={{ required: "Task description is required" }}
              render={({ field }) => (
                <div>
                  <Textarea
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  {errors.description && (
                    <span className="text-red-500 text-xs">
                      {errors.description.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>

          <div>
            <Label className="mb-2">Categories</Label>
            <Controller
              control={control}
              name="categories"
              render={({ field: { value, onChange } }) => (
                <MultiCombobox
                  options={categoryOptions}
                  selected={value}
                  onChange={onChange}
                />
              )}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
