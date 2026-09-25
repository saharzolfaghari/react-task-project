import React from 'react';
import './Navbar.css';

export const Navbar=()=>{
return(
   <nav className="navbar">
      <h2>برنامه مدیریت تسک 📝</h2>
      <div className="nav-links">
        <a href="/">صفحه اصلی</a>
        <a href="/about">درباره ما</a>
      </div>
    </nav>
);
}; 