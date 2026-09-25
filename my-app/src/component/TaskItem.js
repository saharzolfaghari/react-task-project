import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import './TaskItem.css';

export const TaskItem = ({ task }) => {
  const { dispatch } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleToggle = () => {
    if (!isEditing) {
      dispatch({ type: 'TOGGLE_TASK', payload: task.id });
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch({ type: 'DELETE_TASK', payload: task.id });
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    if (newTitle.trim().length >= 3) {
      dispatch({
        type: 'UPDATE_TASK',
        payload: { id: task.id, title: newTitle.trim() }
      });
      setIsEditing(false);
    }
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setNewTitle(task.title);
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content" onClick={handleToggle}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => {}}
        />

        {isEditing ? (
          <input
            type="text"
            className="edit-input"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            autoFocus
          />
        ) : (
          <span className="task-title">{task.title}</span>
        )}
      </div>

      <div className="task-actions">
        {isEditing ? (
          <>
            <button className="save-btn" onClick={handleSave}>ذخیره</button>
            <button className="cancel-btn" onClick={handleCancel}>انصراف</button>
          </>
        ) : (
          <>
            <button className="edit-btn" onClick={handleEditClick}>ویرایش</button>
            <button className="delete-btn" onClick={handleDelete}>حذف</button>
          </>
        )}
      </div>
    </div>
  );
};