import { useEffect, useId, useState } from "react";
import { LoaderCircleIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface InputSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const InputSearch = ({ value, onChange, placeholder }: InputSearchProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const id = useId();

  useEffect(() => {
    if (value) {
      setIsLoading(true);

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 100);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [value]);

  return (
    <div className="w-full space-y-2 bg-white dark:bg-gray-800">
      <div className="relative">
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <SearchIcon className="size-4" />
          <span className="sr-only">Search</span>
        </div>
        <Input
          id={id}
          type="search"
          placeholder={placeholder || "Search tasks..."}
          value={value}
          onChange={(e) => onChange(e.target.value)}
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
