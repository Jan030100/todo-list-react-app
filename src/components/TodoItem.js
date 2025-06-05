// Component that renders an individual todo item with checkbox and delete button

import React from 'react';

function TodoItem({ todo, toggleComplete, deleteTask }) {
  return (
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => deleteTask(todo.id)}>Delete</button>
    </li>
  );
}

export default TodoItem;
