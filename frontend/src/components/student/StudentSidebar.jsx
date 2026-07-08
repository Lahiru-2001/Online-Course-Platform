import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./StudentSidebar.css";

function StudentSidebar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile Hamburger Toggle */}
      <button
        className="sidebar-hamburger"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle sidebar"
      >
        <i className={`fa-solid ${mobileOpen ? "fa-xmark" : "fa-bars"}`}></i>
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`student-sidebar ${mobileOpen ? "mobile-open" : ""}`}>

        <div>

          <div className="sidebar-logo">
            <h2>Dashboard</h2>
            <span>Student Portal</span>
          </div>

          <nav className="sidebar-menu">

            <NavLink
              to="/student/dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMobileOpen(false)}
            >
              <i className="fa-solid fa-table-cells-large"></i>
              Dashboard
            </NavLink>

            <NavLink
              to="/student/my-courses"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMobileOpen(false)}
            >
              <i className="fa-solid fa-graduation-cap"></i>
              My Courses
            </NavLink>

            <NavLink
              to="/student/payments"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMobileOpen(false)}
            >
              <i className="fa-solid fa-credit-card"></i>
              Payment
            </NavLink>

            <NavLink
              to="/student/certificates"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMobileOpen(false)}
            >
              <i className="fa-solid fa-award"></i>
              Certificate
            </NavLink>

            <NavLink
              to="/student/messages"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMobileOpen(false)}
            >
              <i className="fa-solid fa-comments"></i>
              Chat
            </NavLink>

          </nav>
        </div>

        <div className="student-user-wrapper">

          <div
            className="student-user"
            onClick={() => setShowDropdown(!showDropdown)}
          >

            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="student"
            />

            <div className="student-info">
              <h4>Kasun Perera</h4>
              <span>Student</span>
            </div>

            <i
              className={`fa-solid ${
                showDropdown ? "fa-chevron-up" : "fa-chevron-down"
              }`}
            ></i>

          </div>

          {showDropdown && (
            <div className="user-dropdown">

              <Link to="/student/profile" onClick={() => setMobileOpen(false)}>
                <i className="fa-regular fa-user"></i>
                Profile
              </Link>

              <Link to="/" onClick={() => setMobileOpen(false)}>
                <i className="fa-solid fa-right-from-bracket"></i>
                Logout
              </Link>

            </div>
          )}

        </div>

      </aside>
    </>
  );
}

export default StudentSidebar;