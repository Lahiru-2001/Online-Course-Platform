import { useNavigate } from "react-router-dom";
import "./StudentNavbar.css";

function StudentNavbar() {
  const navigate = useNavigate();
  return (
    <header className="student-navbar">

      <div className="navbar-left">
        <h1>
          Welcome Back, Student 👋
        </h1>

        <p>
          Continue your learning journey.
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

        <button className="notification-btn" onClick={() => navigate('/notifications')}>
          <i className="fa-regular fa-bell"></i>
        </button>

      </div>

    </header>
  );
}

export default StudentNavbar;