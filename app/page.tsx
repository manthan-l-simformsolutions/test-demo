"use client";

import { useState, useCallback } from "react";
import "./todo.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

interface Todo {
  id: number;
  text: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleAddTodo = useCallback(() => {
    if (inputValue.trim() === "") return;
    setTodos((prev) => [...prev, { id: Date.now(), text: inputValue.trim() }]);
    setInputValue("");
  }, [inputValue]);

  const handleDeleteTodo = useCallback((id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const handleEditTodo = useCallback((id: number, text: string) => {
    setEditingId(id);
    setEditValue(text);
  }, []);

  const handleSaveEdit = useCallback(
    (id: number) => {
      if (editValue.trim() === "") return;
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, text: editValue.trim() } : todo
        )
      );
      setEditingId(null);
      setEditValue("");
    },
    [editValue]
  );

  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    setEditValue("");
  }, []);

  return (
    <div className="app-container">
      <main className="todo-main">
        <h1 className="todo-title">Todo List</h1>

        <TodoInput
          value={inputValue}
          onChange={setInputValue}
          onAdd={handleAddTodo}
        />

        <TodoList
          todos={todos}
          editingId={editingId}
          editValue={editValue}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
          onEditChange={setEditValue}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      </main>
    </div>
  );
}
