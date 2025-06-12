import React from 'react';

function TodoItem({ todo, toggleComplete, deleteTask }) {
  // Add styles based on category
  const getCategoryStyle = (category) => {
    switch(category) {
      case 'Work': return { borderLeft: '4px solid #4a90e2' };
      case 'Personal': return { borderLeft: '4px solid #50e3c2' };
      case 'Shopping': return { borderLeft: '4px solid #e6a23c' };
      case 'Health': return { borderLeft: '4px solid #f56c6c' };
      default: return { borderLeft: '4px solid #909399' };
    }
  };

  return (
    <li style={getCategoryStyle(todo.category)}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <span className="category-tag">{todo.category}</span>
      <button onClick={() => deleteTask(todo.id)}>Delete</button>
    </li>
  );
}

export default TodoItem;
