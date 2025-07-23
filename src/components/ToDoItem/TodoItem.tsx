// src/components/TodoItem.tsx
import React from 'react';
import type { Todo } from '../../types/todo';
import './ToDoItem.css';

type Props = {
  todo: Todo;
  onToggle: (id: number) => void;  // This will mark the todo as completed
  onDelete: (id: number) => void;
};

const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : 'pending'}`}>
      <label className="label">
        <span className="todo-text">{todo.todo}</span>
      </label>

      {/* Show Complete button only if todo is not completed */}
      {!todo.completed && (
        <button
          type="button"
          className="complete"
          onClick={() => onToggle(todo.id)}
          aria-label={`Mark ${todo.todo} as completed`}
          style={{ marginLeft: '10px' }}
        >
          Complete
        </button>
      )}

      <button
        className="delete"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete ${todo.todo}`}
        style={{ marginLeft: '10px' }}
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default TodoItem;
