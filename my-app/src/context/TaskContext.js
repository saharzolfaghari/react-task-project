import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getStoredTasks, saveStoredTasks } from '../utils/storage ';

const TaskContext = createContext();


const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return action.payload;

    case 'ADD_TASK': {
      const updatedTasks = [action.payload, ...state];
      saveStoredTasks(updatedTasks);
      return updatedTasks;
    }

    case 'TOGGLE_TASK': {
      const updatedTasks = state.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
      saveStoredTasks(updatedTasks);
      return updatedTasks;
    }
    
    case 'UPDATE_TASK': {
      const updatedTasks = state.map((task) =>
        task.id === action.payload.id ? { ...task, title: action.payload.title } : task
      );
      saveStoredTasks(updatedTasks);
      return updatedTasks;
    }
    
    case 'DELETE_TASK': {
      const updatedTasks = state.filter((task) => task.id !== action.payload);
      saveStoredTasks(updatedTasks);
      return updatedTasks;
    }

    default:
      return state;
  }
};


export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  useEffect(() => {
    const initialTasks = getStoredTasks();
    if (initialTasks && initialTasks.length > 0) {
      dispatch({ type: 'SET_TASKS', payload: initialTasks });
    }
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks باید حتماً داخل TaskProvider استفاده شود!');
  }
  return context;
};