import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [categories] = useState(['Work', 'Personal', 'Shopping', 'Health', 'Other']);
  const [selectedCategory, setSelectedCategory] = useState('Other');
// Add these new state variables for priority
const [priorities] = useState(['High', 'Medium', 'Low']);
const [selectedPriority, setSelectedPriority] = useState('Medium');
// Add due date state
const [selectedDueDate, setSelectedDueDate] = useState('');


  // Remove the first useEffect and keep only this one:
useEffect(() => {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos && storedTodos !== "[]") {
    try {
      const parsedTodos = JSON.parse(storedTodos);
      
      // Add default values for missing fields
      const updatedTodos = parsedTodos.map(todo => ({
        ...todo,
        category: todo.category || 'Other',
        priority: todo.priority || 'Medium',
        dueDate: todo.dueDate || null
      }));
      
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    } catch (error) {
      console.error("Error parsing todos from localStorage:", error);
    }
  }
}, []);



  // Save todos to localStorage when they change
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

const handleAddTask = (event) => {
  event.preventDefault();
  if (inputValue.trim() === '') return;

  const newTodo = {
    id: Date.now(),
    text: inputValue,
    completed: false,
    category: selectedCategory,
    priority: selectedPriority,
    dueDate: selectedDueDate || null // Add this line
  };

  setTodos([...todos, newTodo]);
  setInputValue('');
  setSelectedDueDate(''); // Clear the date picker
};



  const toggleComplete = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    
    setTodos(updatedTodos);
  };

  const deleteTask = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

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

  // Add priority-based styling function
const getPriorityStyle = (priority) => {
  switch(priority) {
    case 'High': 
      return { 
        backgroundColor: '#fee2e2', 
        borderLeft: '4px solid #dc2626',
        color: '#dc2626'
      };
    case 'Medium': 
      return { 
        backgroundColor: '#fef3c7', 
        borderLeft: '4px solid #d97706',
        color: '#d97706'
      };
    case 'Low': 
      return { 
        backgroundColor: '#dcfce7', 
        borderLeft: '4px solid #16a34a',
        color: '#16a34a'
      };
    default: 
      return { 
        backgroundColor: '#f3f4f6', 
        borderLeft: '4px solid #6b7280',
        color: '#6b7280'
      };
  }
};

// Date utility functions
const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  const today = new Date().toISOString().split('T')[0];
  return dueDate < today;
};

const isDueToday = (dueDate) => {
  if (!dueDate) return false;
  const today = new Date().toISOString().split('T')[0];
  return dueDate === today;
};

const isDueSoon = (dueDate) => {
  if (!dueDate) return false;
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 3 && diffDays > 0;
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
};

const getDueDateStyle = (dueDate) => {
  if (isOverdue(dueDate)) {
    return { 
      backgroundColor: '#fecaca', 
      color: '#dc2626',
      border: '1px solid #dc2626'
    };
  }
  if (isDueToday(dueDate)) {
    return { 
      backgroundColor: '#fed7aa', 
      color: '#ea580c',
      border: '1px solid #ea580c'
    };
  }
  if (isDueSoon(dueDate)) {
    return { 
      backgroundColor: '#fef3c7', 
      color: '#d97706',
      border: '1px solid #d97706'
    };
  }
  return { 
    backgroundColor: '#e0f2fe', 
    color: '#0369a1',
    border: '1px solid #0369a1'
  };
};



  return (
    <div className="app">
      <h1>My Todo List</h1>
      
      {/* Form with category selection */}
    <form onSubmit={handleAddTask}>
  <div className="form-row">
    <input 
      type="text" 
      placeholder="Add a new task..." 
      value={inputValue}
      onChange={handleInputChange}
    />
    <select 
      className="category-select"
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
    >
      {categories.map(category => (
        <option key={category} value={category}>{category}</option>
      ))}
    </select>
    <select 
      className="priority-select"
      value={selectedPriority}
      onChange={(e) => setSelectedPriority(e.target.value)}
    >
      {priorities.map(priority => (
        <option key={priority} value={priority}>{priority}</option>
      ))}
    </select>
    <input
  type="date"
  className="date-picker"
  value={selectedDueDate}
  onChange={(e) => setSelectedDueDate(e.target.value)}
  min={new Date().toISOString().split('T')[0]}
/>

    <button type="submit">Add Task</button>
  </div>
</form>

      {/* Todo List */}
    {/* Todo List with Priority Sorting */}
<div className="todo-list">
  <ul>
    {todos
      .sort((a, b) => {
        // First sort by priority
        const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
        const priorityDiff = (priorityOrder[b.priority] || 1) - (priorityOrder[a.priority] || 1);
        
        if (priorityDiff !== 0) return priorityDiff;
        
        // Then sort by due date
        if (a.dueDate && b.dueDate) {
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        if (a.dueDate && !b.dueDate) return -1;
        if (!a.dueDate && b.dueDate) return 1;
        return 0;
      })
      .map(todo => (
        <li key={todo.id} style={getCategoryStyle(todo.category)}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
          />
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
          <span className="category-tag">{todo.category}</span>
          <span 
            className="priority-tag" 
            style={getPriorityStyle(todo.priority)}
          >
            {todo.priority || 'Medium'}
          </span>
          {todo.dueDate && (
            <span 
              className="due-date-tag"
              style={getDueDateStyle(todo.dueDate)}
            >
              {isOverdue(todo.dueDate) && '⚠️ '}
              {isDueToday(todo.dueDate) && '📅 '}
              {isDueSoon(todo.dueDate) && '⏰ '}
              {formatDate(todo.dueDate)}
            </span>
          )}
          <button onClick={() => deleteTask(todo.id)}>Delete</button>
        </li>
      ))}
  </ul>
</div>


    </div>
  );
}

export default App;
