"use client";

import { useState } from "react";
import "./todo.css";

interface Todo {
  id: number;
  text: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleAddTodo = () => {
    if (inputValue.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id: number, text: string) => {
    setEditingId(id);
    setEditValue(text);
  };

  const handleSaveEdit = (id: number) => {
    if (editValue.trim() === "") return;
    setTodos(todos.map((todo) => 
      todo.id === id ? { ...todo, text: editValue } : todo
    ));
    setEditingId(null);
    setEditValue("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: number) => {
    if (e.key === "Enter") {
      handleSaveEdit(id);
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  return (
    <div className="app-container">
      <main className="todo-main">
        <h1 className="todo-title">
          Todo List
        </h1>

        {/* Input Section */}
        <div className="input-section">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a new todo..."
            className="todo-input"
          />
          <button
            onClick={handleAddTodo}
            className="btn btn-add"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <div className="todo-list">
          {todos.length === 0 ? (
            <p className="empty-state">
              No todos yet. Add one to get started!
            </p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="todo-item"
              >
                {editingId === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => handleEditKeyDown(e, todo.id)}
                      className="edit-input"
                      autoFocus
                    />
                    <div className="button-group">
                      <button
                        onClick={() => handleSaveEdit(todo.id)}
                        className="btn btn-save"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="btn btn-cancel"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="todo-text">{todo.text}</span>
                    <div className="button-group">
                      <button
                        onClick={() => handleEditTodo(todo.id, todo.text)}
                        className="btn btn-edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="btn btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
