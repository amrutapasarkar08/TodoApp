// src/components/__tests__/TodoItem.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { Todo } from '../../types/todo';
import TodoItem from '../ToDoItem/TodoItem';  // Adjust path if needed

describe('TodoItem Component', () => {
  const baseTodo: Todo = {
    id: 1,
    todo: 'Test Task',
    completed: false
  };

  const onToggleMock = jest.fn();
  const onDeleteMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders pending todo with Complete button', () => {
    render(<TodoItem todo={baseTodo} onToggle={onToggleMock} onDelete={onDeleteMock} />);
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    const completeButton = screen.getByRole('button', { name: /complete/i });
    expect(completeButton).toBeInTheDocument();
  });

  it('calls onToggle when Complete button is clicked', () => {
    render(<TodoItem todo={baseTodo} onToggle={onToggleMock} onDelete={onDeleteMock} />);
    
    fireEvent.click(screen.getByRole('button', { name: /complete/i }));
    expect(onToggleMock).toHaveBeenCalledWith(baseTodo.id);
  });

  it('renders completed todo without Complete button', () => {
    const completedTodo = { ...baseTodo, completed: true };

    render(<TodoItem todo={completedTodo} onToggle={onToggleMock} onDelete={onDeleteMock} />);
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /complete/i })).not.toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    render(<TodoItem todo={baseTodo} onToggle={onToggleMock} onDelete={onDeleteMock} />);
    
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(onDeleteMock).toHaveBeenCalledWith(baseTodo.id);
  });

  it('has appropriate aria-labels', () => {
    render(<TodoItem todo={baseTodo} onToggle={onToggleMock} onDelete={onDeleteMock} />);
    
    expect(
      screen.getByLabelText(`Mark ${baseTodo.todo} as completed`)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(`Delete ${baseTodo.todo}`)
    ).toBeInTheDocument();
  });
});
