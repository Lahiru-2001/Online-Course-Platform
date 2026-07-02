import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./StudentNavbar.css";

const NOTIFICATIONS = [
  { id: 1, text: "Your React Architecture assignment was graded.", time: "2 min ago", read: false },
  { id: 2, text: "New lesson added: \"Advanced Hooks\" in your course.", time: "1 hr ago", read: false },
  { id: 3, text: "Your certificate for ICT Masterclass is ready!", time: "3 hrs ago", read: true },
];

function StudentNavbar({ pageTitle, breadcrumb }) {
  const navigate = useNavigate();
  const [showNotifs, setShowNotifs] = useState(false);
  const unreadCount = NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <header className="student-navbar">

      <div className="navbar-left">
        {pageTitle ? (
          <>
            <h1>{pageTitle}</h1>
            {breadcrumb && (
              <nav className="breadcrumb-trail" aria-label="breadcrumb">
                {breadcrumb.map((crumb, i) => (
                  <span key={i}>
                    {i > 0 && <span className="breadcrumb-sep">›</span>}
                    {crumb.path ? (
                      <span
                        className="breadcrumb-link"
                        onClick={() => navigate(crumb.path)}
                      >
                        {crumb.label}
                      </span>
                    ) : (
                      <span className="breadcrumb-current">{crumb.label}</span>
                    )}
                  </span>
                ))}
              </nav>
            )}
          </>
        ) : (
          <>
            <h1>Welcome Back, Student 👋</h1>
            <p>Continue your learning journey.</p>
          </>
        )}
      </div>

      <div className="navbar-right">

        <div className="search-box">
          <input type="text" placeholder="Search courses..." />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>

        {/* Notification Bell with Badge */}
        <div className="notif-wrapper">
          <button
            className="notification-btn"
            onClick={() => setShowNotifs(!showNotifs)}
            aria-label="Notifications"
          >
            <i className="fa-regular fa-bell"></i>
            {unreadCount > 0 && (
              <span className="notif-badge">{unreadCount}</span>
            )}
          </button>

          {showNotifs && (
            <div className="notif-dropdown">
              <div className="notif-header">
                <span>Notifications</span>
                <span className="notif-count">{unreadCount} new</span>
              </div>
              <ul className="notif-list">
                {NOTIFICATIONS.map(n => (
                  <li key={n.id} className={`notif-item ${n.read ? "" : "unread"}`}>
                    <div className="notif-dot"></div>
                    <div>
                      <p>{n.text}</p>
                      <span>{n.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                className="notif-view-all"
                onClick={() => { setShowNotifs(false); navigate('/student/notifications'); }}
              >
                View All Notifications
              </button>
            </div>
          )}
        </div>

      </div>

    </header>
  );
}

export default StudentNavbar;