import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/Notifications.css';

const Notifications = ({ onBackToLanding, onNavigateToForum, onNavigateToLearning }) => {
  const [activeTab, setActiveTab] = useState('All Notifications');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      category: 'About Courses',
      title: 'New Assignment Published',
      body: "Lina (Instructor) published 'Assignment 2: Hydraulic Circuit Simulation' in Industrial Fluid systems.",
      time: '10 mins ago',
      read: true,
      iconType: 'assignment'
    },
    {
      id: 2,
      category: 'About Courses',
      title: 'Grade Released successfully',
      body: "Your submission for 'Quiz 1: Fluid Dynamics Basics' has been evaluated. Score: 85% (Grade: A).",
      time: '15 mins ago',
      read: true,
      iconType: 'grade'
    },
    {
      id: 3,
      category: 'Forum Activities',
      title: 'Saman S. Kumar replied to your thread',
      body: "Replied on: 'How to configure hydraulic cylinder simulation coordinates?' in Mechatronics Hub.",
      time: '10 mins ago',
      read: false, // unread - shows pink/red dot
      iconType: 'forum'
    },
    {
      id: 4,
      category: 'About Courses',
      title: 'Grade Released successfully',
      body: "Your submission for 'Quiz 1: Fluid Dynamics Basics' has been evaluated. Score: 85% (Grade: A).",
      time: '15 mins ago',
      read: true,
      iconType: 'grade'
    },
    {
      id: 5,
      category: 'System Updates',
      title: 'System Maintenance Scheduled',
      body: "The learning portal will undergo scheduled maintenance on Sunday, June 28, from 2:00 AM to 4:00 AM UTC. Some services may be temporarily unavailable.",
      time: '1 day ago',
      read: true,
      iconType: 'system'
    }
  ]);

  const tabs = ['All Notifications', 'About Courses', 'Forum Activities', 'System Updates'];

  const toggleReadStatus = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => {
        if (notif.id === id) {
          return { ...notif, read: !notif.read };
        }
        return notif;
      })
    );
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === 'All Notifications') return true;
    return notif.category === activeTab;
  });

  // Render SVG icons matching mockup aesthetics
  const renderIcon = (type) => {
    switch (type) {
      case 'assignment':
        return (
          <div className="notif-icon-circle blue">
            <svg viewBox="0 0 24 24" className="notif-svg-icon">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 14H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7V7h10v2z" fill="#ffffff" />
            </svg>
          </div>
        );
      case 'grade':
        return (
          <div className="notif-icon-circle green">
            <svg viewBox="0 0 24 24" className="notif-svg-icon" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
              <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
              <path d="M9 9l2 2 4-4" />
            </svg>
          </div>
        );
      case 'forum':
        return (
          <div className="notif-icon-circle light-blue">
            <svg viewBox="0 0 24 24" className="notif-svg-icon">
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" fill="#ffffff" />
            </svg>
          </div>
        );
      case 'system':
      default:
        return (
          <div className="notif-icon-circle orange-bg">
            <svg viewBox="0 0 24 24" className="notif-svg-icon">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#ffffff" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="notifications-page-wrapper">
      <Navbar />
      <div className="notifications-layout">
        <div className="notifications-container">
          <h1 className="notifications-header-title">Notifications Center</h1>

          {/* Tabs navigation row */}
          <div className="notifications-tabs-row">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`notifications-tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Notifications feed list */}
          <div className="notifications-feed">
            {filteredNotifications.length === 0 ? (
              <div className="empty-notifications-card">
                <p>No notifications in this category.</p>
              </div>
            ) : (
              filteredNotifications.map((notif) => (
                <div key={notif.id} className="notification-card">
                  {/* Icon wrapper */}
                  {renderIcon(notif.iconType)}

                  {/* Content body */}
                  <div className="notif-content-wrapper">
                    <div className="notif-card-header">
                      <div className="notif-title-row">
                        <h3 className="notif-title-text">{notif.title}</h3>
                        {!notif.read && <span className="unread-badge-dot"></span>}
                      </div>
                      <span className="notif-timestamp">{notif.time}</span>
                    </div>

                    <p className="notif-body-text">{notif.body}</p>

                    <button
                      className="notif-action-btn"
                      onClick={() => toggleReadStatus(notif.id)}
                    >
                      {notif.read ? 'Mark as unread' : 'Mark as read'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Notifications;
