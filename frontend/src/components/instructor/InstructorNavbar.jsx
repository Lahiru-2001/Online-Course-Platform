import React from 'react';
import './InstructorNavbar.css';

export default function InstructorNavbar({ activeLink = 'Reports' }) {
  return (
    <header className="instructor-navbar">
      <div className="navbar-brand-sec">
        <span className="brand-logo-text">LMS</span>
      </div>
      
      <nav className="navbar-mid-links">
        <a href="#dashboard" className={activeLink === 'Dashboard' ? 'active' : ''}>Dashboard</a>
        <a href="#courses" className={activeLink === 'Courses' ? 'active' : ''}>Courses</a>
        <a href="#reports" className={activeLink === 'Reports' ? 'active' : ''}>Reports</a>
        <a href="#users" className={activeLink === 'Users' ? 'active' : ''}>Users</a>
      </nav>

      <div className="navbar-right-sec">
        <div className="search-students-box">
          <input type="text" placeholder="Search students..." />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>

        <button className="nav-icon-btn">
          <i className="fa-regular fa-bell"></i>
        </button>

        <button className="nav-icon-btn">
          <i className="fa-solid fa-gear"></i>
        </button>

        <div className="instructor-avatar-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=crop" 
            alt="Instructor profile" 
            className="instructor-avatar-img"
          />
        </div>
      </div>
    </header>
  );
}
