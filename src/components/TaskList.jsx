import { useState } from 'react';
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';

const TaskList = ({ tasks, onToggleCompletion, onEditTask, onDeleteTask }) => {
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEditSave = (id) => {
    onEditTask(id, editText);
    setEditId(null);
    setEditText('');
  };

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`task-item ${task.completed ? 'completed' : ''}`}
        >
          <div className="task-content">
            {editId === task.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="edit-input"
              />
            ) : (
              <span
                className="task-text"
                onClick={() => onToggleCompletion(task.id)}
              >
                {task.text}
              </span>
            )}
            <span className="task-date">
              {task.dueDate && ` ${new Date(task.dueDate).toLocaleDateString()}`}
            </span>
          </div>
          <div className="task-actions">
            {editId === task.id ? (
              <button onClick={() => handleEditSave(task.id)} title="Save Edit">
                <FaCheck />
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditId(task.id);
                  setEditText(task.text);
                }}
                title="Edit Task"
              >
                <FaEdit />
              </button>
            )}
            <button
              onClick={() => onDeleteTask(task.id)}
              title="Delete Task"
              className="delete-button"
            >
              <FaTrash />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
