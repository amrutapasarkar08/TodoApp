import type { Todo } from '../types/todo';
const apiUrl = import.meta.env.VITE_Todo_API_URL;

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(apiUrl);
  if (!response.ok) throw new Error('Network error');
  const data = await response.json();
  return data.todos;
};