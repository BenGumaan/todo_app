import { Input } from "@/components/ui";
import { cn } from "@/lib";
import type { InputHTMLAttributes } from "react";

interface TodoInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

/**
 * A reusable input field for todo title/content.
 * Fully theme-aware, extends native input props, and uses ShadCN's Input component.
 */
export function TodoInput({ className, ...props }: TodoInputProps) {
  return (
    <Input
      {...props}
      className={cn(
        "text-base rounded-md border-border bg-background text-foreground",
        className
      )}
    />
  );
}
