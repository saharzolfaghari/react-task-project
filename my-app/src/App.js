import React from 'react';
import { TaskProvider } from './context/TaskContext';
import { Home } from './pages/Home';
import './App.css';

function App() {
  return (
    <TaskProvider>
      <div className="app">
        <main className="main-content">
          <Home />
        </main>
      </div>
    </TaskProvider>
  );
}

export default App;