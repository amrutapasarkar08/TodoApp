import type { Todo } from '../types/todo';
const apiUrl = import.meta.env.VITE_Todo_API_URL;
console.log('apiUrl',apiUrl);

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${apiUrl}/todos`);
  if (!response.ok) throw new Error('Something went wrong');
  const data = await response.json();
  return data.todos;
};