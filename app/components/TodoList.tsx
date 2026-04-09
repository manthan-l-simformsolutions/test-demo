"use client";

import { memo } from "react";
import TodoItem from "./TodoItem";

interface Todo {
  id: number;
  text: string;
}

interface TodoListProps {
  todos: Todo[];
  editingId: number | null;
  editValue: string;
  onEdit: (id: number, text: string) => void;
  onDelete: (id: number) => void;
  onEditChange: (value: string) => void;
  onSave: (id: number) => void;
  onCancel: () => void;
}

const TodoList = memo(function TodoList({
  todos,
  editingId,
  editValue,
  onEdit,
  onDelete,
  onEditChange,
  onSave,
  onCancel,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <p className="empty-state">No todos yet. Add one to get started!</p>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          isEditing={editingId === todo.id}
          editValue={editValue}
          onEdit={onEdit}
          onDelete={onDelete}
          onEditChange={onEditChange}
          onSave={onSave}
          onCancel={onCancel}
        />
      ))}
    </div>
  );
});

export default TodoList;
