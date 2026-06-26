import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../dashboard/Sidebar';
import DashboardNavbar from '../dashboard/DashboardNavbar';
import Footer from './Footer';

/**
 * DashboardLayout wrapper for the internal instructor portal.
 * Handles the sidebar, top navbar, and footer layout structure.
 */
const DashboardLayout = () => {
  const location = useLocation();
  
  // Determine which tab should be active based on the current URL
  const getActiveTab = () => {
    if (location.pathname.includes('/courses')) return 'Courses';
    if (location.pathname.includes('/dashboard')) return 'Dashboard';
    return 'Dashboard';
  };

  const hasSidebar = location.pathname === '/dashboard';

  return (
    <div className={hasSidebar ? "dashboard-layout" : "create-course-layout"}>
      {/* Conditionally render sidebar for dashboard, hide for course creation */}
      {hasSidebar && <Sidebar />}
      
      <div className={hasSidebar ? "dashboard-main" : ""}>
        <DashboardNavbar activeTab={getActiveTab()} />
        
        {/* The Outlet renders the specific page content (DashboardPage or CreateCoursePage) */}
        <Outlet />
        
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
