// Component for the form that allows users to add new tasks

import React from 'react';

function TodoForm({ inputValue, setInputValue, handleAddTask }) {
  return (
    <form onSubmit={handleAddTask}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TodoForm;
