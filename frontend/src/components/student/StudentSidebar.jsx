import React, { useState } from "react";
import "./StudentSidebar.css";

function StudentSidebar({ onBackToLanding }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <aside className="student-sidebar">

      <div>

        <div className="sidebar-logo">
          <h2>Dashboard</h2>
          <span>Student Portal</span>
        </div>

        <nav className="sidebar-menu">

          <a
            href="#"
            className=""
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <i className="fa-solid fa-table-cells-large"></i>
            Dashboard
          </a>

          <a
            href="#"
            className=""
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <i className="fa-solid fa-graduation-cap"></i>
            My Courses
          </a>

          <a
            href="#"
            className="active"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <i className="fa-solid fa-book-open"></i>
            Learning
          </a>

          <a
            href="#"
            className=""
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <i className="fa-solid fa-credit-card"></i>
            Payment Review
          </a>

          <a
            href="#"
            className=""
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <i className="fa-solid fa-award"></i>
            Certificates
          </a>

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

            <a href="#">
              <i className="fa-regular fa-user"></i>
              Profile
            </a>

            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (onBackToLanding) onBackToLanding();
              }}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              Logout
            </a>

          </div>
        )}

      </div>

    </aside>
  );
}

export default StudentSidebar;
