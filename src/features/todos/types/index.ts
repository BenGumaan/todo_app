export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  tags: string[];
  description?: string;
  createdAt?: string;
  date?: string;
}

export interface TodoFormData {
  taskName: string;
  description: string;
  categories: string[];
};

