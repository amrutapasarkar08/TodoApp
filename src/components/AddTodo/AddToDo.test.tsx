import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import AddTodoForm from './AddToDo';

describe('AddTodoForm', () => {
  it('renders input and button', () => {
    render(<AddTodoForm onAdd={jest.fn()} />);

    const input = screen.getByPlaceholderText(/new todo/i);
    const button = screen.getByRole('button', { name: /add/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('submits trimmed todo and clears input', () => {
    const onAdd = jest.fn();
    render(<AddTodoForm onAdd={onAdd} />);

    const input = screen.getByPlaceholderText(/new todo/i);
    const button = screen.getByRole('button', { name: /add/i });

    fireEvent.change(input, { target: { value: '  Learn React  ' } });
    fireEvent.click(button);

    expect(onAdd).toHaveBeenCalledWith('Learn React');
    expect(input).toHaveValue('');
  });

  it('does not submit empty or whitespace-only todo', () => {
    const onAdd = jest.fn();
    render(<AddTodoForm onAdd={onAdd} />);

    const input = screen.getByPlaceholderText(/new todo/i);
    const button = screen.getByRole('button', { name: /add/i });

    fireEvent.change(input, { target: { value: '    ' } });
    fireEvent.click(button);

    expect(onAdd).not.toHaveBeenCalled();
  });
});
