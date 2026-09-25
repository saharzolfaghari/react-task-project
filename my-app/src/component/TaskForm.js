import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { validateTaskInput } from '../utils/validation';
import './TaskForm.css';

export const TaskForm = () => {

  const [title, setTitle] = useState('');
  
  const [error, setError] = useState('');

  const { dispatch } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault(); 

  
    const validation = validateTaskInput(title);

    if (!validation.isValid) {
      setError(validation.message); 
      return;
    }


    const newTask = {
      id: Date.now(),
      title: title.trim(),
      completed: false
    };


    dispatch({ type: 'ADD_TASK', payload: newTask });


    setTitle('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="input-group">
        <input
          type="text"
          placeholder="عنوان تسک جدید را وارد کنید..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError(''); 
          }}
        />
        <button type="submit">افزودن</button>
      </div>


      {error ? <p className="error-message">{error}</p> : null}
    </form>
  );
};