export type Task = {
  id: string;
  text: string;
  completed: boolean;
  tags: string[];
  description?: string;
  createdAt?: string;
  date?: string;
}

export type FormData = {
  taskName: string;
  description: string;
  categories: string[];
};

