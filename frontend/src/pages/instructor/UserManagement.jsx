import React, { useState } from 'react';
import InstructorNavbar from '../../components/instructor/InstructorNavbar';
import InstructorSidebar from '../../components/instructor/InstructorSidebar';
import Footer from '../../components/Footer';
import './UserManagement.css';

const usersData = [
  { id: 1, name: 'Amara Silva', email: 'amara.silva@email.com', role: 'Student', status: 'Active', joined: '12 Jan 2024', courses: 4, avatar: 'AS', color: 'av-blue' },
  { id: 2, name: 'Kasun Perera', email: 'kasun.perera@email.com', role: 'Student', status: 'At Risk', joined: '18 Feb 2024', courses: 2, avatar: 'KP', color: 'av-orange' },
  { id: 3, name: 'Ruwan Fernando', email: 'ruwan.fernando@email.com', role: 'Instructor', status: 'Active', joined: '05 Mar 2023', courses: 7, avatar: 'RF', color: 'av-pink' },
  { id: 4, name: 'Nethmi Kumari', email: 'nethmi.k@email.com', role: 'Student', status: 'Inactive', joined: '22 Apr 2024', courses: 1, avatar: 'NK', color: 'av-teal' },
  { id: 5, name: 'Dilshan Rajapaksa', email: 'dilshan.r@email.com', role: 'Admin', status: 'Active', joined: '01 Jun 2023', courses: 0, avatar: 'DR', color: 'av-purple' },
  { id: 6, name: 'Ishara Mendis', email: 'ishara.m@email.com', role: 'Instructor', status: 'Active', joined: '14 Aug 2023', courses: 5, avatar: 'IM', color: 'av-green' },
  { id: 7, name: 'Priya Bandara', email: 'priya.b@email.com', role: 'Student', status: 'Active', joined: '30 Sep 2024', courses: 3, avatar: 'PB', color: 'av-red' },
];

const roleColors = {
  Student: 'role-student',
  Instructor: 'role-instructor',
  Admin: 'role-admin',
};

const statusColors = {
  Active: 'status-active',
  'At Risk': 'status-atrisk',
  Inactive: 'status-inactive',
};

export default function UserManagement() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = usersData.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'All' || u.role === roleFilter;
    const matchStatus = statusFilter === 'All' || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const totalStudents = usersData.filter(u => u.role === 'Student').length;
  const totalInstructors = usersData.filter(u => u.role === 'Instructor').length;
  const totalAdmins = usersData.filter(u => u.role === 'Admin').length;
  const totalActive = usersData.filter(u => u.status === 'Active').length;

  return (
    <div className="instructor-portal-layout">
      <InstructorNavbar activeLink="Users" searchPlaceholder="Global Search..." />

      <div className="instructor-portal-body">
        <InstructorSidebar activeMenu="Admin Panel" />

        <div className="instructor-portal-main">
          <div className="um-page-content">

            {/* Page Header */}
            <div className="um-page-header">
              <div className="um-header-left">
                <h1 className="um-page-title">User Management</h1>
                <p className="um-page-subtitle">Manage all registered users, roles, and access levels.</p>
              </div>
              <button className="um-add-user-btn" onClick={() => setShowAddModal(true)}>
                <i className="fa-solid fa-user-plus"></i> Add New User
              </button>
            </div>

            {/* Stats Cards */}
            <div className="um-stats-row">
              <div className="um-stat-card">
                <div className="um-stat-icon-wrap icon-blue">
                  <i className="fa-solid fa-users"></i>
                </div>
                <div className="um-stat-info">
                  <span className="um-stat-num">{usersData.length}</span>
                  <span className="um-stat-label">Total Users</span>
                </div>
              </div>
              <div className="um-stat-card">
                <div className="um-stat-icon-wrap icon-green">
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <div className="um-stat-info">
                  <span className="um-stat-num">{totalStudents}</span>
                  <span className="um-stat-label">Students</span>
                </div>
              </div>
              <div className="um-stat-card">
                <div className="um-stat-icon-wrap icon-orange">
                  <i className="fa-solid fa-chalkboard-teacher"></i>
                </div>
                <div className="um-stat-info">
                  <span className="um-stat-num">{totalInstructors}</span>
                  <span className="um-stat-label">Instructors</span>
                </div>
              </div>
              <div className="um-stat-card">
                <div className="um-stat-icon-wrap icon-purple">
                  <i className="fa-solid fa-user-shield"></i>
                </div>
                <div className="um-stat-info">
                  <span className="um-stat-num">{totalAdmins}</span>
                  <span className="um-stat-label">Admins</span>
                </div>
              </div>
              <div className="um-stat-card">
                <div className="um-stat-icon-wrap icon-teal">
                  <i className="fa-solid fa-circle-check"></i>
                </div>
                <div className="um-stat-info">
                  <span className="um-stat-num">{totalActive}</span>
                  <span className="um-stat-label">Active Users</span>
                </div>
              </div>
            </div>

            {/* Table Card */}
            <div className="um-table-card">
              {/* Filters Bar */}
              <div className="um-filters-bar">
                <div className="um-search-box">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>

                <div className="um-filter-group">
                  <label>Role:</label>
                  <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
                    <option>All</option>
                    <option>Student</option>
                    <option>Instructor</option>
                    <option>Admin</option>
                  </select>
                </div>

                <div className="um-filter-group">
                  <label>Status:</label>
                  <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option>All</option>
                    <option>Active</option>
                    <option>At Risk</option>
                    <option>Inactive</option>
                  </select>
                </div>

                <button className="um-export-btn">
                  <i className="fa-solid fa-file-export"></i> Export
                </button>
              </div>

              {/* Table */}
              <div className="um-table-wrapper">
                <table className="um-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Courses</th>
                      <th>Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="um-empty-row">
                          <i className="fa-solid fa-magnifying-glass"></i>
                          <p>No users found matching your search.</p>
                        </td>
                      </tr>
                    ) : (
                      filtered.map(user => (
                        <tr key={user.id}>
                          <td>
                            <div className="um-user-cell">
                              <div className={`um-avatar ${user.color}`}>{user.avatar}</div>
                              <span className="um-user-name">{user.name}</span>
                            </div>
                          </td>
                          <td><span className="um-email">{user.email}</span></td>
                          <td>
                            <span className={`um-role-badge ${roleColors[user.role]}`}>
                              {user.role}
                            </span>
                          </td>
                          <td>
                            <span className={`um-status-badge ${statusColors[user.status]}`}>
                              <span className="status-dot"></span>
                              {user.status}
                            </span>
                          </td>
                          <td><span className="um-courses-num">{user.courses}</span></td>
                          <td><span className="um-joined">{user.joined}</span></td>
                          <td>
                            <div className="um-action-btns">
                              <button className="um-btn-icon edit-btn" title="Edit user">
                                <i className="fa-solid fa-pen-to-square"></i>
                              </button>
                              <button className="um-btn-icon view-btn" title="View profile">
                                <i className="fa-solid fa-eye"></i>
                              </button>
                              <button className="um-btn-icon delete-btn" title="Delete user">
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="um-table-footer">
                <span className="um-showing-text">Showing {filtered.length} of {usersData.length} users</span>
                <div className="um-pagination">
                  <button className="pag-btn"><i className="fa-solid fa-chevron-left"></i></button>
                  <button className="pag-btn active">1</button>
                  <button className="pag-btn">2</button>
                  <button className="pag-btn">3</button>
                  <button className="pag-btn"><i className="fa-solid fa-chevron-right"></i></button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="um-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="um-modal" onClick={e => e.stopPropagation()}>
            <div className="um-modal-header">
              <h3>Add New User</h3>
              <button className="um-modal-close" onClick={() => setShowAddModal(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="um-modal-body">
              <div className="um-form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter full name" />
              </div>
              <div className="um-form-group">
                <label>Email Address</label>
                <input type="email" placeholder="Enter email address" />
              </div>
              <div className="um-form-group">
                <label>Role</label>
                <select>
                  <option>Student</option>
                  <option>Instructor</option>
                  <option>Admin</option>
                </select>
              </div>
              <div className="um-form-group">
                <label>Status</label>
                <select>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
            <div className="um-modal-footer">
              <button className="um-modal-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="um-modal-save">Save User</button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
