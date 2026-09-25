import React, { useState, useEffect } from 'react';
import { TaskForm } from '../component/TaskForm';
import { TaskList } from '../component/TaskList';
import { ApiQuote } from '../component/ApiQuote';
import './Home.css';

export const Home = () => {
  // گرفتن وضعیت تم از LocalStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // اعمال کلاس دارک مود به body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="home-page">
      {/* دکمه تغییر تم */}
      <div className="theme-toggle-container">
        <button
          className="theme-toggle-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️ حالت روشن' : '🌙 حالت تاریک'}
        </button>
      </div>

      <header className="app-header">
        <h1>مدیریت هوشمند تسک‌ها 📝</h1>
        <ApiQuote />
      </header>

      <TaskForm />
      <TaskList />
    </div>
  );
};