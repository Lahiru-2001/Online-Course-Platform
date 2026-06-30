import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import "./StudentSidebar.css";

function StudentSidebar() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <aside className="student-sidebar">

      <div>

        <div className="sidebar-logo">
          <h2>Dashboard</h2>
          <span>Student Portal</span>
        </div>

        <nav className="sidebar-menu">

          <NavLink
            to="#"
            className={({ isActive }) => (isActive ? "active" : "")}
            style={{ pointerEvents: "none", opacity: 0.6 }}
            onClick={(e) => e.preventDefault()}
          >
            <i className="fa-solid fa-table-cells-large"></i>
            Dashboard
          </NavLink>

          <NavLink
            to="/my-courses"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <i className="fa-solid fa-graduation-cap"></i>
            My Courses
          </NavLink>

        </nav>

      </div>

      {/* User Dropdown */}
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

            <Link to="/user-profile">
              <i className="fa-regular fa-user"></i>
              Profile
            </Link>

            <Link to="/login">
              <i className="fa-solid fa-right-from-bracket"></i>
              Logout
            </Link>

          </div>
        )}

      </div>

    </aside>
  );
}

export default StudentSidebar;