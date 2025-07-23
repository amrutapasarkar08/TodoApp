import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

const mockTodos = [
  { id: 1, todo: 'Pending Task', completed: false },
  { id: 2, todo: 'Completed Task', completed: true },
];

describe('TodoList', () => {
  test('renders no todos message when empty', () => {
    render(<TodoList todos={[]} onToggle={() => {}} onDelete={() => {}} />);
    expect(screen.getByText(/no todos available/i)).toBeInTheDocument();
  });

  test('renders pending and completed todos separately', () => {
    render(<TodoList todos={mockTodos} onToggle={() => {}} onDelete={() => {}} />);
    
    // Check Pending header and task
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Pending Task')).toBeInTheDocument();

    // Check Completed header and task
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('Completed Task')).toBeInTheDocument();
  });

  test('calls onToggle when checkbox clicked on pending todo', () => {
    const onToggle = jest.fn();
    render(<TodoList todos={mockTodos} onToggle={onToggle} onDelete={() => {}} />);

    // The checkbox only appears for pending todos
    const checkbox = screen.getByLabelText(/mark pending task as completed/i);
    fireEvent.click(checkbox);

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith(1);
  });

  test('calls onDelete when delete button clicked', () => {
    const onDelete = jest.fn();
    render(<TodoList todos={mockTodos} onToggle={() => {}} onDelete={onDelete} />);

    // There should be delete buttons for both todos
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    expect(deleteButtons.length).toBe(2);

    // Click the delete button for the first todo
    fireEvent.click(deleteButtons[0]);
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith(1);
  });
});
