import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { TaskItem } from './TaskItem';
import './TaskList.css';

export const TaskList = () => {
  const { tasks } = useTasks();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // فیلتر هم‌زمان بر اساس سرچ و تب فیلتر
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="task-list-container">
      {/* کادر جستجو */}
      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 جستجو در تسک‌ها..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* دکمه‌های فیلتر */}
      <div className="filter-container">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          همه ({tasks.length})
        </button>
        <button
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          در حال انجام ({tasks.filter((t) => !t.completed).length})
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          تکمیل‌شده ({tasks.filter((t) => t.completed).length})
        </button>
      </div>

      {/* نمایش لیست تسک‌ها */}
      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <p className="empty-message">تسکی یافت نشد!</p>
        ) : (
          filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
};