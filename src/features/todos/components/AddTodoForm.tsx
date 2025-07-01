import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiCombobox } from "@/components/ui/multi_combobox";
import { FC, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const categoryOptions = [
  { label: "Home", value: "home" },
  { label: "Work", value: "work" },
  { label: "Personal", value: "personal" },
];

type FormData = {
  taskName: string;
  description: string;
  categories: string[];
};

interface AddTodoFormProps {
  onAdd: (data: FormData) => void;
}

export const AddTodoForm: FC<AddTodoFormProps> = ({ onAdd }) => {
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      taskName: "",
      description: "",
      categories: [],
    },
  });

  const onSubmit = (data: FormData) => {
    onAdd(data);
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Add task</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Task</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            void handleSubmit(onSubmit)(e);
          }}
          className="space-y-6"
        >
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
            <Button type="submit">Add task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
