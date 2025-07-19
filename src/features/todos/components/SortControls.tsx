import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";

interface SortControlsProps {
  sortBy: "date" | "name" | "completed";
  sortOrder: "asc" | "desc";
  onSortByChange: (sortBy: "date" | "name" | "completed") => void;
  onSortOrderChange: (sortOrder: "asc" | "desc") => void;
}

export const SortControls = ({
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
}: SortControlsProps) => {
  return (
    <div className="flex items-center gap-2 w-inherit">
      <span className="text-sm text-muted-foreground">Sort by:</span>
      <select
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value as typeof sortBy)}
        className="px-3 py-2 border rounded-md bg-white"
      >
        <option value="date">Date</option>
        <option value="name">Name</option>
        <option value="completed">Completion</option>
      </select>

      <button
        onClick={() => onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")}
        className="p-2 border rounded-md hover:bg-gray-100 transition-colors bg-white border-gray-200 cursor-pointer"
        title={`Currently: ${sortOrder === "asc" ? "Ascending" : "Descending"}`}
      >
        {sortOrder === "asc" ? (
          <ArrowUpAZ className="size-4" />
        ) : (
          <ArrowDownAZ className="size-4" />
        )}
      </button>
    </div>
  );
};
