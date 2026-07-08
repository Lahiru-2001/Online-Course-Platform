import { NavLink, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./StudentSidebar.css";

function StudentSidebar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    profileImage: "",
  });


  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/student/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStudent(res.data.student);
      } catch (err) {
        console.log(err);
      }
    };

    if (token) {
      loadStudent();
    }
  }, [token]);
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
              src={
                student.profileImage
                  ? `http://localhost:5000${student.profileImage}`
                  : "http://localhost:5000/uploads/images/default-profile.png"
              }
              alt="student"
            />

            <div className="student-info">
              <h4>
                {student.firstName} {student.lastName}
              </h4>
              <span>Student</span>
            </div>

            <i
              className={`fa-solid ${showDropdown ? "fa-chevron-up" : "fa-chevron-down"
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