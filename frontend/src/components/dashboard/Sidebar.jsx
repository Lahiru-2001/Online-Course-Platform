import React, { useState } from 'react';

const Sidebar = () => {
  // State to track which menu item is currently active
  const [activeTab, setActiveTab] = useState('Overview');

  // Handle navigation clicks
  const handleNavClick = (e, tabName) => {
    e.preventDefault();
    setActiveTab(tabName);
    // TODO: In a real app, this would use React Router's useNavigate or Link
    console.log(`Navigating to ${tabName}`);
  };

  return (
    <aside className="sidebar">
      
      {/* Brand Header */}
      <div className="sidebar-header">
        <h2 className="sidebar-logo">LMS Admin</h2>
        <p className="sidebar-role">Instructor Portal</p>
      </div>
      
      {/* Main Navigation Menu */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <a 
              href="#" 
              className={`nav-link ${activeTab === 'Overview' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'Overview')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              Overview
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="#" 
              className={`nav-link ${activeTab === 'My Courses' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'My Courses')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
              My Courses
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="#" 
              className={`nav-link ${activeTab === 'Enrollments' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'Enrollments')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              Enrollments
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="#" 
              className={`nav-link ${activeTab === 'Earnings' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'Earnings')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path></svg>
              Earnings (LKR)
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="#" 
              className={`nav-link ${activeTab === 'Admin Panel' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'Admin Panel')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              Admin Panel
            </a>
          </li>
        </ul>
      </nav>
      
      {/* Bottom Footer Navigation */}
      <div className="sidebar-footer">
        <ul className="nav-list">
          <li className="nav-item">
            <a 
              href="#" 
              className="nav-link"
              onClick={(e) => { e.preventDefault(); console.log('Opening Help Center'); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              Help Center
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="#" 
              className="nav-link logout"
              onClick={(e) => { e.preventDefault(); console.log('Logging out user...'); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              Log Out
            </a>
          </li>
        </ul>
      </div>
      
    </aside>
  );
};

export default Sidebar;
