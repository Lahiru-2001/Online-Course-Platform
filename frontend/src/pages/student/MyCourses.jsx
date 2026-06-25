import StudentNavbar from "../../components/student/StudentNavbar";
import StudentSidebar from "../../components/student/StudentSidebar";
import "./MyCourses.css";

import courseImage from "../../assets/images/3.jpg";
import universityLogo from "../../assets/images/Moratuwa.png";

const courses = [
  {
    id: 1,
    title: "Automation with Python",
    university: "University of Moratuwa",
    enrolled: "2026.06.15",
    progress: 100,
    status: "Completed",
    button: "View",
  },
  {
    id: 2,
    title: "Automation with Python",
    university: "University of Moratuwa",
    enrolled: "2026.06.15",
    progress: 78,
    status: "On Track",
    button: "Continue",
  },
  {
    id: 3,
    title: "Automation with Python",
    university: "University of Moratuwa",
    enrolled: "2026.06.15",
    progress: 65,
    status: "On Track",
    button: "Continue",
  },
  {
    id: 4,
    title: "Automation with Python",
    university: "University of Moratuwa",
    enrolled: "2026.06.15",
    progress: 100,
    status: "Completed",
    button: "View",
  },
];

function MyCourses() {
  return (
    <div className="dashboard-page">
      <StudentNavbar />

      <div className="dashboard-layout">
        <StudentSidebar />

        <main className="dashboard-main">
          <div className="courses-grid">
            {courses.map((course) => (
              <div className="course-card" key={course.id}>
                {/* Course Image */}
                <img
                  src={courseImage}
                  alt={course.title}
                  className="course-image"
                />

                <div className="course-content">
                  {/* Title + Status */}
                  <div className="course-header">
                    <h2>{course.title}</h2>

                    <span
                      className={
                        course.status === "Completed"
                          ? "status completed"
                          : "status track"
                      }
                    >
                      {course.status}
                    </span>
                  </div>

                  {/* University */}
                  <div className="course-university">
                    <img
                      src={universityLogo}
                      alt="University Logo"
                      className="university-logo"
                    />

                    <span>{course.university}</span>
                  </div>

                  {/* Enrolled Date */}
                  <p className="enrolled">
                    Enrolled:{course.enrolled}
                  </p>

                  {/* Progress */}
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${course.progress}%`,
                      }}
                    ></div>
                  </div>

                  {/* Button */}
                  <div className="course-footer">
                    <button className="course-btn">
                      {course.button}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <footer className="dashboard-footer">
        <h2>LMS</h2>

        <p>© 2024 LMS Sri Lanka. All Rights Reserved.</p>

        <div className="footer-links">
          <a href="#">Support</a>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}

export default MyCourses;