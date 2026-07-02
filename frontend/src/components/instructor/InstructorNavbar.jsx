import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './InstructorNavbar.css';

export default function InstructorNavbar({ activeLink = 'Dashboard', searchPlaceholder = 'Search students...' }) {
  const navigate = useNavigate();
  return (
    <header className="instructor-navbar">
      <div className="navbar-brand-sec">
        <span className="brand-logo-text">LMS</span>
      </div>
      
      <nav className="navbar-mid-links">
        <Link to="/admin/dashboard" className={activeLink === 'Dashboard' ? 'active' : ''}>Dashboard</Link>
        <Link to="/admin/courses" className={activeLink === 'Courses' ? 'active' : ''}>Courses</Link>
        <Link to="/admin/reports" className={activeLink === 'Reports' ? 'active' : ''}>Reports</Link>
        <Link to="/admin/users" className={activeLink === 'Users' ? 'active' : ''}>Users</Link>
      </nav>

      <div className="navbar-right-sec">
        <div className="search-students-box">
          <input type="text" placeholder={searchPlaceholder} />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>

        <button className="nav-icon-btn" onClick={() => navigate('/student/notifications')}>
          <i className="fa-regular fa-bell"></i>
        </button>

        <button className="nav-icon-btn" onClick={() => navigate('/admin/settings')}>
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
