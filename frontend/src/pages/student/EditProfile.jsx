import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './EditProfile.css';

function EditProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Carter',
    email: 'alex.carter@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Passionate learner focusing on web development and UI/UX design. Always eager to build user-centric applications and expand my technical skill set.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/user-profile');
  };

  return (
    <div className="ep-layout">
      {/* ── Sidebar ── */}
      <aside className="ep-sidebar">
        <div className="ep-sidebar-logo">FUCHSIUS</div>

        <nav className="ep-sidebar-nav">
          <Link to="/user-profile" className="ep-nav-item active">
            <span className="ep-nav-icon">&#128100;</span>
            My Profile
          </Link>
          <Link to="/user-management" className="ep-nav-item">
            <span className="ep-nav-icon">&#9881;</span>
            Settings
          </Link>
        </nav>
      </aside>

      {/* ── Main Content ── */}
      <main className="ep-main">
        <form onSubmit={handleSubmit}>
          {/* Page header row */}
          <div className="ep-page-header">
            <div className="ep-header-left">
              <Link to="/user-profile" className="ep-back-arrow">&#8592;</Link>
              <h2 className="ep-page-title">Edit Profile</h2>
            </div>
            <button type="submit" className="ep-btn-primary">Save Changes</button>
          </div>

          {/* Form Card */}
          <div className="ep-card">
            {/* Avatar Upload */}
            <div className="ep-avatar-row">
              <img src={formData.avatar} alt="Profile" className="ep-avatar" />
              <div className="ep-avatar-info">
                <button type="button" className="ep-upload-btn">Upload new picture</button>
                <p className="ep-upload-hint">JPG, GIF or PNG. Max size of 800K</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="ep-form-grid">
              <div className="ep-form-group">
                <label htmlFor="ep-firstName">First Name</label>
                <input
                  id="ep-firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                />
              </div>

              <div className="ep-form-group">
                <label htmlFor="ep-lastName">Last Name</label>
                <input
                  id="ep-lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
              </div>

              <div className="ep-form-group">
                <label htmlFor="ep-email">Email Address</label>
                <input
                  id="ep-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                />
              </div>

              <div className="ep-form-group">
                <label htmlFor="ep-phone">Phone Number</label>
                <input
                  id="ep-phone"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                />
              </div>

              <div className="ep-form-group ep-full-width">
                <label htmlFor="ep-bio">About Me (Bio)</label>
                <textarea
                  id="ep-bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself"
                  rows={4}
                />
              </div>
            </div>

            {/* Footer action */}
            <div className="ep-form-footer">
              <button type="submit" className="ep-btn-primary">Update Profile</button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default EditProfile;
