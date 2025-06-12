import React from 'react';

function TodoForm({ inputValue, setInputValue, handleAddTask, categories, selectedCategory, setSelectedCategory }) {
  return (
    <form onSubmit={handleAddTask}>
      <div className="form-row">
        <input
          type="text"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <button type="submit">Add Task</button>
      </div>
    </form>
  );
}

export default TodoForm;
