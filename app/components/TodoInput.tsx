"use client";

import { memo } from "react";

interface TodoInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

const TodoInput = memo(function TodoInput({ value, onChange, onAdd }: TodoInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onAdd();
    }
  };

  return (
    <div className="input-section">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter a new todo..."
        className="todo-input"
      />
      <button onClick={onAdd} className="btn btn-add">
        Add
      </button>
    </div>
  );
});

export default TodoInput;
