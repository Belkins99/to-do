import { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === '') {
      setError('Task cannot be empty!');
      return;
    }
    setError('');
    onAddTask(task, dueDate);
    setTask('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
  <input
    type="text"
    value={task}
    onChange={(e) => setTask(e.target.value)}
    placeholder="What needs to be done?"
    className="task-input"
  />
  <input
    type="date"
    value={dueDate}
    onChange={(e) => setDueDate(e.target.value)}
    className="task-date"
  />
  <button type="submit" className="task-button">
    Add
  </button>
</form>

  );
};

export default TaskForm;
