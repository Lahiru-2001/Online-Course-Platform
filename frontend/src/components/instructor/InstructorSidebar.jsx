import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './InstructorSidebar.css';

export default function InstructorSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const isActive = (route) => path === route || path.startsWith(route + '/');

  return (
    <aside className="instructor-sidebar">
      <div className="sidebar-top-section">
        <div className="sidebar-header-branding">
          <h2 className="sidebar-title">LMS Admin</h2>
          <span className="sidebar-subtitle">Instructor Portal</span>
        </div>

        <nav className="sidebar-navigation-menu">
          <Link to="/admin/dashboard" className={isActive('/admin/dashboard') ? 'active' : ''}>
            <i className="fa-solid fa-chart-pie"></i>
            <span>Overview</span>
          </Link>
          
          <Link to="/admin/courses" className={isActive('/admin/courses') ? 'active' : ''}>
            <i className="fa-solid fa-book-open"></i>
            <span>My Courses</span>
          </Link>

          <Link to="/admin/earnings" className={isActive('/admin/earnings') ? 'active' : ''}>
            <i className="fa-solid fa-coins"></i>
            <span>Earnings (LKR)</span>
          </Link>

          <Link to="/admin/reports" className={isActive('/admin/reports') ? 'active' : ''}>
            <i className="fa-solid fa-chart-line"></i>
            <span>Reports</span>
          </Link>

          <Link to="/admin/users" className={isActive('/admin/users') ? 'active' : ''}>
            <i className="fa-solid fa-user-shield"></i>
            <span>Admin Panel</span>
          </Link>
        </nav>
      </div>

      <div className="sidebar-bottom-section">
        <button className="btn-create-course" onClick={() => navigate('/admin/create-course')}>
          <i className="fa-solid fa-plus"></i> Create New Course
        </button>

        <hr className="sidebar-divider" />

        <nav className="sidebar-secondary-menu">
          <Link to="/admin/settings" className={`secondary-link ${isActive('/admin/settings') ? 'active' : ''}`}>
            <i className="fa-solid fa-sliders"></i>
            <span>Settings</span>
          </Link>
          
          <Link to="/" className="secondary-link logout-btn">
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Log Out</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}
