import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './InstructorSidebar.css';

export default function InstructorSidebar({ activeMenu = 'Performance' }) {
  const navigate = useNavigate();
  return (
    <aside className="instructor-sidebar">
      <div className="sidebar-top-section">
        <div className="sidebar-header-branding">
          <h2 className="sidebar-title">LMS Admin</h2>
          <span className="sidebar-subtitle">Instructor Portal</span>
        </div>

        <nav className="sidebar-navigation-menu">
          <a href="#overview" className={activeMenu === 'Overview' ? 'active' : ''}>
            <i className="fa-solid fa-chart-pie"></i>
            <span>Overview</span>
          </a>
          
          <Link to="/manage-course" className={activeMenu === 'My Courses' ? 'active' : ''}>
            <i className="fa-solid fa-book-open"></i>
            <span>My Courses</span>
          </Link>

          <a href="#enrollments" className={activeMenu === 'Enrollments' ? 'active' : ''}>
            <i className="fa-solid fa-user-check"></i>
            <span>Enrollments</span>
          </a>

          <a href="#earnings" className={activeMenu === 'Earnings (LKR)' ? 'active' : ''}>
            <i className="fa-solid fa-coins"></i>
            <span>Earnings (LKR)</span>
          </a>

          <Link to="/user-management" className={activeMenu === 'Admin Panel' ? 'active' : ''}>
            <i className="fa-solid fa-user-shield"></i>
            <span>Admin Panel</span>
          </Link>
        </nav>
      </div>

      <div className="sidebar-bottom-section">
        <button className="btn-create-course" onClick={() => navigate('/courses/create')}>
          <i className="fa-solid fa-plus"></i> Create New Course
        </button>

        <hr className="sidebar-divider" />

        <nav className="sidebar-secondary-menu">
          <a href="#help" className="secondary-link">
            <i className="fa-regular fa-circle-question"></i>
            <span>Help Center</span>
          </a>
          
          <Link to="/login" className="secondary-link logout-btn">
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Log Out</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}
