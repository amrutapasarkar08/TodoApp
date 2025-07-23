import React from 'react';
import { useTodos } from './hooks/useTodo';
import AddTodoForm from './components/AddTodo/AddToDo';
import TodoList from './components/ToDoList/TodoList';
import './App.css';

const App: React.FC = () => {
  const {
    todos,
    loading,
    error,
    toggleComplete,
    addTodo,
    deleteTodo,
  } = useTodos();

  return (
    <main>
      <h1>Todo App</h1>

      <AddTodoForm onAdd={addTodo} />

      {loading && <p>Loading todos...</p>}
      {error && <p role="alert" style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <TodoList
          todos={todos}
          onToggle={toggleComplete}
          onDelete={deleteTodo}
        />
      )}
    </main>
  );
};

export default App;
