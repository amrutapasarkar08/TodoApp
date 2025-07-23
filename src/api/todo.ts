import type { Todo } from '../types/todo';

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch('https://dummyjson.com/todos');
  if (!response.ok) throw new Error('Network error');
  const data = await response.json();
  return data.todos;
};