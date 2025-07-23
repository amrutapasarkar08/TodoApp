import React from 'react';
import type { Todo } from '../../types/todo';
import TodoItem from '../ToDoItem/TodoItem';
import './TodoList.css'; 

type Props = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

const TodoList: React.FC<Props> = ({ todos, onToggle, onDelete }) => {
  const pending = todos.filter(t => !t.completed);
  const completed = todos.filter(t => t.completed);

  if (todos.length === 0) {
    return <p>No todos available.</p>;
  }

  return (
    <div className="tables-container">
  <div className="todo-table">
    <h2>Pending</h2>
    {pending.map(todo => (
      <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
    ))}
  </div>
  <div className="todo-table">
    <h2>Completed</h2>
    {completed.map(todo => (
      <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
    ))}
  </div>
</div>
  );
};
export default TodoList;
