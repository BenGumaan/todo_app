import { useEffect, useId, useState } from "react";
import { LoaderCircleIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Todo } from "../types";

interface InputSearchProps {
  tasks: Todo[];
  onSearchResults: (filteredTasks: Todo[]) => void;
}

const InputSearch = ({ tasks, onSearchResults }: InputSearchProps) => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const id = useId();

  useEffect(() => {
    if (value) {
      setIsLoading(true);

      const timer = setTimeout(() => {
        const filteredTasks = tasks.filter((task: Todo) =>
          task.text.toLowerCase().includes(value.toLowerCase())
        );
        onSearchResults(filteredTasks);
        setIsLoading(false);
      }, 100);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
      onSearchResults(tasks);
    }
  }, [value, tasks]);

  return (
    <div className="w-full space-y-2">
      <div className="relative">
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <SearchIcon className="size-4" />
          <span className="sr-only">Search</span>
        </div>
        <Input
          id={id}
          type="search"
          placeholder="Search..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="peer px-9 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
        />
        {isLoading && (
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
            <LoaderCircleIcon className="size-4 animate-spin" />
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputSearch;
