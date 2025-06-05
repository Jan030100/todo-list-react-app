// Component that renders the list of todo items

import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, toggleComplete, deleteTask }) {
  return (
    <div className="todo-list">
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
