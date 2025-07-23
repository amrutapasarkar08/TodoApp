// src/hooks/useTodos.ts
import { useState, useEffect } from 'react';
import type { Todo } from '../types/todo';
import { fetchTodos } from '../api/todo';

const LOCAL_STORAGE_KEY = 'todos';

export const useTodos = () => {
  // Initialize state with localStorage or fallback to an empty array
  const initialTodos = (() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  })();

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load todos from API if localStorage is empty or invalid
  useEffect(() => {
    if (todos.length === 0) {
      fetchTodos()
        .then((data) => {
          setTodos(data);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        })
        .catch(() => setError('Failed to load todos'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [todos]);

  // Update localStorage whenever todos change
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos]);

  // Toggle completion status of a todo
  const toggleComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Add a new todo
  const addTodo = (todo: string) => {
    if (!todo.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      todo,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  // Delete a todo
  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return { todos, loading, error, toggleComplete, addTodo, deleteTodo };
};
