// src/components/AddTodoForm.tsx
import React, { useState } from 'react';

type Props = {
  onAdd: (title: string) => void;
};

const AddTodoForm: React.FC<Props> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="New todo"
        aria-label="Add new todo"
        style={{ padding: 6, width: 220 }}
      />
      <button type="submit" style={{ marginLeft: 10 }}>
        Add
      </button>
    </form>
  );
};

export default AddTodoForm;
