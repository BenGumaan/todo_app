import { Todo } from "@/features/todos";

const localStorageKey = "tasks";
export const getStoredData = (): Todo[] | null => {
  const data = localStorage.getItem(localStorageKey);
  return data ? (JSON.parse(data) as Todo[]) : null;
};

export const setStoredData = (data: Todo[]) => {
  localStorage.setItem(localStorageKey, JSON.stringify(data));
};
