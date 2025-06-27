// config/theme.ts
export const radii = {
  sm: "calc(var(--radius) - 4px)",
  md: "calc(var(--radius) - 2px)",
  lg: "var(--radius)",
  xl: "calc(var(--radius) + 4px)",
}

export const variants = {
  todo: {
    complete: "bg-muted text-muted-foreground line-through",
    active: "bg-background text-foreground",
  },
}
