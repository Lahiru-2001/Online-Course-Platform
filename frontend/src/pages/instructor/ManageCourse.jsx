import { useState } from "react";
import "./ManageCourse.css";
import {
  FiEdit2, FiTrash2, FiBarChart2, FiPlusCircle, FiGrid,
  FiUsers, FiDollarSign, FiSettings, FiBell, FiHelpCircle,
  FiLogOut, FiSearch, FiRotateCcw, FiFlag, FiPlayCircle,
  FiShare2, FiGlobe,
} from "react-icons/fi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const COURSES = [
  {
    id: 1,
    title: "Advanced Web Systems Architecture",
    status: "PUBLISHED",
    students: "1,240",
    rating: "4.8",
    image: "advanced.jpg",
  },
  {
    id: 2,
    title: "Strategic Enterprise Management",
    status: "DRAFT",
    students: "0",
    rating: null,
    image: "strategic.jpg",
  },
  {
    id: 3,
    title: "Quantum Physics for Beginners",
    status: "PUBLISHED",
    students: "850",
    rating: "4.6",
    image: "quantum.jpg",
  },
  {
    id: 4,
    title: "Interpersonal Skills (V1.0)",
    status: "ARCHIVED",
    students: "3.2k",
    rating: "4.2",
    image: "interpersonal.jpg",
  },
];

const STATUS_COLORS = {
  PUBLISHED: "#22c55e",
  DRAFT: "#f97316",
  ARCHIVED: "#64748b",
};

export default function ManageCourse() {
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [search, setSearch] = useState("");

  const filtered = COURSES.filter((c) => {
    const matchStatus = statusFilter === "All Statuses" || c.status === statusFilter;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="mc-shell">

      {/* Topbar */}
      <header className="mc-topbar">
        <div className="mc-topbar-left">
          <span className="mc-logo">LMS</span>
          <nav className="mc-topnav">
            <span>Dashboard</span>
            <span className="mc-topnav-active">Courses</span>
            <span>Reports</span>
            <span>Users</span>
          </nav>
        </div>
        <div className="mc-topbar-right">
          <div className="mc-search-wrap">
            <FiSearch className="mc-search-icon" />
            <input
              className="mc-search"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <FiBell className="mc-topbar-icon" />
          <FiSettings className="mc-topbar-icon" />
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="avatar"
            className="mc-avatar"
          />
        </div>
      </header>

      <div className="mc-body">

        {/* Sidebar */}
        <aside className="mc-sidebar">
          <div className="mc-profile">
            <strong>LMS Admin</strong>
            <span>Instructor Portal</span>
          </div>

          <nav className="mc-sidenav">
            <div className="mc-sitem">
              <FiGrid size={16} /><span>Overview</span>
            </div>
            <div className="mc-sitem mc-sitem-active">
              <FiPlayCircle size={16} /><span>My Courses</span>
            </div>
            <div className="mc-sitem">
              <FiUsers size={16} /><span>Enrollments</span>
            </div>
            <div className="mc-sitem">
              <FiDollarSign size={16} /><span>Earnings (LKR)</span>
            </div>
            <div className="mc-sitem">
              <MdOutlineAdminPanelSettings size={16} /><span>Admin Panel</span>
            </div>
          </nav>

          <button className="mc-create-btn">
            <FiPlusCircle size={16} />
            <span>Create New<br />Course</span>
          </button>

          <div className="mc-sidebar-footer">
            <div className="mc-sitem">
              <FiHelpCircle size={16} /><span>Help Center</span>
            </div>
            <div className="mc-sitem">
              <FiLogOut size={16} /><span>Log Out</span>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="mc-main">
          <div className="mc-header-row">
            <div>
              <h1 className="mc-title">Course Management</h1>
              <p className="mc-subtitle">Organize, track, and update your educational content.</p>
            </div>
            <div className="mc-filters">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="mc-select">
                <option>All Statuses</option>
                <option>PUBLISHED</option>
                <option>DRAFT</option>
                <option>ARCHIVED</option>
              </select>
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="mc-select">
                <option>All Categories</option>
                <option>Technology</option>
                <option>Business</option>
                <option>Science</option>
                <option>Skills</option>
              </select>
            </div>
          </div>

          <div className="mc-grid">
            {filtered.map((course) => (
              <div key={course.id} className="mc-card">
                <div className="mc-thumb">
                  <img
                    src={`/src/assets/images/${course.image}`}
                    alt={course.title}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentNode.classList.add("mc-thumb-fallback");
                    }}
                  />
                  <span
                    className="mc-badge"
                    style={{ background: STATUS_COLORS[course.status] }}
                  >
                    {course.status}
                  </span>
                </div>

                <div className="mc-card-body">
                  <h3 className="mc-card-title">{course.title}</h3>

                  <div className="mc-stats">
                    <div>
                      <span className="mc-stat-label">STUDENTS</span>
                      <span className="mc-stat-val">{course.students}</span>
                    </div>
                    <div>
                      <span className="mc-stat-label">RATING</span>
                      <span className="mc-stat-val">
                        {course.rating
                          ? <span className="mc-rating">★ {course.rating}</span>
                          : <span className="mc-na">☆ N/A</span>
                        }
                      </span>
                    </div>
                  </div>

                  <div className="mc-actions">
                    {course.status === "ARCHIVED" ? (
                      <>
                        <button className="mc-btn mc-btn-outline">
                          <FiRotateCcw size={12} /> Restore
                        </button>
                        <button className="mc-btn mc-btn-outline">
                          <FiFlag size={12} /> Report
                        </button>
                      </>
                    ) : course.status === "DRAFT" ? (
                      <>
                        <button className="mc-btn mc-btn-primary">
                          <FiPlayCircle size={12} /> Resume Editing
                        </button>
                        <button className="mc-btn mc-btn-danger-icon">
                          <FiTrash2 size={12} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="mc-btn mc-btn-outline">
                          <FiEdit2 size={12} /> Edit
                        </button>
                        <button className="mc-btn mc-btn-outline">
                          <FiBarChart2 size={12} /> Data
                        </button>
                        <button className="mc-btn mc-btn-danger-icon">
                          <FiTrash2 size={12} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="mc-footer">
        <span className="mc-footer-logo">LMS</span>
        <span className="mc-footer-copy">© 2024 LMS Sri Lanka. All Rights Reserved.</span>
        <div className="mc-footer-links">
          <span>Support</span>
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
          <span>Contact Us</span>
        </div>
        <div className="mc-footer-icons">
          <FiShare2 size={15} />
          <FiGlobe size={15} />
        </div>
      </footer>

    </div>
  );
}
