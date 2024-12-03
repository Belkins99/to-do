import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ProgressBar from './components/ProgressBar';
import { FaMoon, FaSun } from 'react-icons/fa';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState('All');
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task, dueDate) => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task,
        dueDate,
        completed: false,
      },
    ]);
  };

  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return task.completed;
    if (filter === 'Pending') return !task.completed;
    return true;
  });

  const searchedTasks = filteredTasks.filter((task) =>
    task.text.toLowerCase().includes(search.toLowerCase())
  );

  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className={darkMode ? 'app dark-mode' : 'app light-mode'}>
      <div className="header">
        <h1 className="header-title">Check<span className='font-thin'>mate</span></h1>
        <button
          className="dark-mode-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
      <TaskForm onAddTask={addTask} />
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      <div className="filter-buttons">
        {['All', 'Completed', 'Pending'].map((status) => (
          <button
            key={status}
            className={`filter-button ${
              filter === status ? 'active' : ''
            }`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>
      <ProgressBar completed={completedTasks} total={tasks.length} />
      <TaskList
        tasks={searchedTasks}
        onToggleCompletion={toggleCompletion}
        onEditTask={editTask}
        onDeleteTask={deleteTask}
      />
    </div>
  );
};

export default App;
