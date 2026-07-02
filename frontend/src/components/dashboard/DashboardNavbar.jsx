import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DashboardNavbar = ({ activeTab = 'Dashboard' }) => {
  const navigate = useNavigate();
  // State for the search input
  const [searchQuery, setSearchQuery] = useState('');

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle form submission for search
  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      console.log('Searching for courses:', searchQuery);
    }
  };

  return (
    <header className="dashboard-navbar">
      
      {/* Left side: Logo and Navigation Links */}
      <div className="navbar-left">
        <h1 className="navbar-logo">LMS</h1>
        <ul className="navbar-links">
          <li><Link to="/dashboard" className={activeTab === 'Dashboard' ? 'active' : ''}>Dashboard</Link></li>
          <li><Link to="/admin/courses" className={activeTab === 'Courses' ? 'active' : ''}>Courses</Link></li>
          <li><Link to="/admin/reports" className={activeTab === 'Reports' ? 'active' : ''}>Reports</Link></li>
          <li><Link to="/admin/users" className={activeTab === 'Users' ? 'active' : ''}>Users</Link></li>
        </ul>
      </div>
      
      {/* Right side: Search, Icons, and Profile */}
      <div className="navbar-right">
        
        {/* Search Bar */}
        <div className="search-container">
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="Search courses..." 
            className="search-input" 
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchSubmit}
          />
        </div>
        
        {/* Notification Icon */}
        <button className="icon-btn" aria-label="Notifications" onClick={() => navigate('/student/notifications')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </button>
        
        {/* Settings Icon */}
        <button className="icon-btn" aria-label="Settings" onClick={() => navigate('/admin/settings')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>
        
        {/* User Avatar */}
        <div className="user-avatar" role="button" tabIndex="0" onClick={() => navigate('/student/profile')}>
          <img src="https://i.pravatar.cc/150?img=11" alt="Current User" />
        </div>
      </div>
      
    </header>
  );
};

export default DashboardNavbar;
