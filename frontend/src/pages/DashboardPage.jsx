import React from 'react';
import StatCard from '../components/dashboard/StatCard';
import CourseProgress from '../components/dashboard/CourseProgress';
import RecentEnrollments from '../components/dashboard/RecentEnrollments';
import '../styles/Dashboard.css';

const DashboardPage = () => {
  return (
    <div className="dashboard-content">
      {/* Header Section */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-greeting">Ayubowan, Professor Perera</h1>
          <p className="dashboard-subtitle">Here's what's happening with your courses today.</p>
        </div>
        <div className="server-status">
          <span className="status-dot"></span>
          Live Server: Colombo 01
        </div>
      </div>
      
      {/* Stat Cards Section */}
      <div className="dashboard-stats">
        <StatCard 
          type="students"
          title="TOTAL STUDENTS"
          value="1,248"
          trend="+12%"
          trendType="positive"
          footer="Active learners across 8 courses"
        />
        <StatCard 
          type="courses"
          title="ACTIVE COURSES"
          value="08"
          badge="Live"
          footer="2 courses pending approval"
        />
        <StatCard 
          type="earnings"
          title="TOTAL EARNINGS"
          value="LKR 386,383"
          footer="This month: + LKR 82,400"
        />
      </div>
      
      {/* Bottom Grid Section */}
      <div className="dashboard-grid">
        <CourseProgress />
        <RecentEnrollments />
      </div>
    </div>
  );
};

export default DashboardPage;
