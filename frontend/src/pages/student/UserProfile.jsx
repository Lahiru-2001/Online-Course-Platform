import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserProfile.css';

function UserProfile() {
  const [activeTab, setActiveTab] = useState('About Me');
  const navigate = useNavigate();

  const profile = {
    name: 'Alex Carter',
    role: 'Student • Computer Science',
    bio: 'Passionate learner focusing on web development and UI/UX design. Always eager to build user-centric applications and expand my technical skill set.',
    enrolledCourses: 12,
    completedCourses: 4,
    certificates: 3,
    email: 'alex.carter@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joined: 'September 2024',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80'
  };

  return (
    <div className="up-layout">
      {/* ── Sidebar ── */}
      <aside className="up-sidebar">
        <div className="up-sidebar-logo">FUCHSIUS</div>

        <nav className="up-sidebar-nav">
          <Link to="/user-profile" className="up-nav-item active">
            <span className="up-nav-icon">&#128100;</span>
            My Profile
          </Link>
          <Link to="/course-list" className="up-nav-item">
            <span className="up-nav-icon">&#128218;</span>
            Enrolled Courses
          </Link>
          <Link to="/certificates" className="up-nav-item">
            <span className="up-nav-icon">&#127942;</span>
            Achievements
          </Link>
        </nav>

        <button className="up-logout-btn" onClick={() => navigate('/')}>
          &#8594; Logout
        </button>
      </aside>

      {/* ── Main Content ── */}
      <main className="up-main">
        {/* Page header row */}
        <div className="up-page-header">
          <h2 className="up-page-title">Profile Overview</h2>
          <button onClick={() => navigate('/edit-profile')} className="up-btn-primary">Edit Profile</button>
        </div>

        {/* Profile Info Card */}
        <div className="up-card up-info-card">
          <img src={profile.avatar} alt={profile.name} className="up-avatar" />
          <div className="up-info-text">
            <h1 className="up-name">{profile.name}</h1>
            <p className="up-role">{profile.role}</p>
            <p className="up-bio">{profile.bio}</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="up-stats-row">
          <div className="up-stat-card">
            <span className="up-stat-label">Enrolled Courses</span>
            <span className="up-stat-value">{profile.enrolledCourses}</span>
          </div>
          <div className="up-stat-card">
            <span className="up-stat-label">Completed Courses</span>
            <span className="up-stat-value">{profile.completedCourses}</span>
          </div>
          <div className="up-stat-card">
            <span className="up-stat-label">Certificates Earned</span>
            <span className="up-stat-value">{profile.certificates}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="up-card up-tabs-card">
          <div className="up-tabs-header">
            {['About Me', 'Recent Activity', 'Reviews'].map((tab) => (
              <button
                key={tab}
                className={`up-tab-btn${activeTab === tab ? ' active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="up-tab-body">
            {activeTab === 'About Me' && (
              <div>
                <h3 className="up-section-title">Contact Information</h3>
                <div className="up-contact-grid">
                  <div className="up-contact-item">
                    <span className="up-contact-label">Email</span>
                    <span className="up-contact-value">{profile.email}</span>
                  </div>
                  <div className="up-contact-item">
                    <span className="up-contact-label">Phone</span>
                    <span className="up-contact-value">{profile.phone}</span>
                  </div>
                  <div className="up-contact-item">
                    <span className="up-contact-label">Location</span>
                    <span className="up-contact-value">{profile.location}</span>
                  </div>
                  <div className="up-contact-item">
                    <span className="up-contact-label">Joined</span>
                    <span className="up-contact-value">{profile.joined}</span>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'Recent Activity' && (
              <p className="up-empty-msg">No recent activity to show.</p>
            )}
            {activeTab === 'Reviews' && (
              <p className="up-empty-msg">No reviews submitted yet.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default UserProfile;
