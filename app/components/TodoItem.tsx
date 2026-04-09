"use client";

import { memo } from "react";

interface TodoItemProps {
  id: number;
  text: string;
  isEditing: boolean;
  editValue: string;
  onEdit: (id: number, text: string) => void;
  onDelete: (id: number) => void;
  onEditChange: (value: string) => void;
  onSave: (id: number) => void;
  onCancel: () => void;
}

const TodoItem = memo(function TodoItem({
  id,
  text,
  isEditing,
  editValue,
  onEdit,
  onDelete,
  onEditChange,
  onSave,
  onCancel,
}: TodoItemProps) {
  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSave(id);
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editValue}
            onChange={(e) => onEditChange(e.target.value)}
            onKeyDown={handleEditKeyDown}
            className="edit-input"
            autoFocus
          />
          <div className="button-group">
            <button onClick={() => onSave(id)} className="btn btn-save">
              Save
            </button>
            <button onClick={onCancel} className="btn btn-cancel">
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <span className="todo-text">{text}</span>
          <div className="button-group">
            <button onClick={() => onEdit(id, text)} className="btn btn-edit">
              Edit
            </button>
            <button onClick={() => onDelete(id)} className="btn btn-delete">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
});

export default TodoItem;
