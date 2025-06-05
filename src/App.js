// Main App component that manages state and coordinates child componentsf
import React, { useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

// State for the todo list and input field
function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Adds a new task to the todo list
  const handleAddTask = (event) => {
    event.preventDefault();
    if (inputValue.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

// Toggles the completed status of a task
  const toggleComplete = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    
    setTodos(updatedTodos);
  };

  // Removes a task from the todo list
  const deleteTask = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="app">
      <h1>My Todo List</h1>
      <TodoForm
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleAddTask={handleAddTask}
      />
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
