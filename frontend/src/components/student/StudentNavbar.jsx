import "./StudentNavbar.css";

function StudentNavbar({ title = "Welcome Back, Student 👋", subtitle = "Continue your learning journey.", notificationCount = 0 }) {
  return (
    <header className="student-navbar">

      <div className="navbar-left">
        <h1>
          {title}
        </h1>

        <p>
          {subtitle}
        </p>
      </div>

      <div className="navbar-right">

        <div className="search-box">
          <input
            type="text"
            placeholder="Search courses..."
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>

        <div className="notification-wrapper">
          <button className="notification-btn">
            <i className="fa-regular fa-bell"></i>
          </button>
          <span className="notification-badge">{notificationCount}</span>
        </div>

      </div>

    </header>
  );
}

export default StudentNavbar;