import React from 'react';
import './InstructorSidebar.css';

export default function InstructorSidebar({ activeMenu = 'Performance' }) {
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
          
          <a href="#courses" className={activeMenu === 'My Courses' ? 'active' : ''}>
            <i className="fa-solid fa-book-open"></i>
            <span>My Courses</span>
          </a>

          <a href="#enrollments" className={activeMenu === 'Enrollments' ? 'active' : ''}>
            <i className="fa-solid fa-user-check"></i>
            <span>Enrollments</span>
          </a>

          <a href="#performance" className={activeMenu === 'Performance' ? 'active' : ''}>
            <i className="fa-solid fa-award"></i>
            <span>Performance</span>
          </a>

          <a href="#admin" className={activeMenu === 'Admin Panel' ? 'active' : ''}>
            <i className="fa-solid fa-user-shield"></i>
            <span>Admin Panel</span>
          </a>
        </nav>
      </div>

      <div className="sidebar-bottom-section">
        <button className="btn-create-course">
          <i className="fa-solid fa-plus"></i> Create New Course
        </button>

        <hr className="sidebar-divider" />

        <nav className="sidebar-secondary-menu">
          <a href="#help" className="secondary-link">
            <i className="fa-regular fa-circle-question"></i>
            <span>Help Center</span>
          </a>
          
          <a href="#logout" className="secondary-link logout-btn">
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Log Out</span>
          </a>
        </nav>
      </div>
    </aside>
  );
}
