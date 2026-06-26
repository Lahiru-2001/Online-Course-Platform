import StudentNavbar from "../../components/student/StudentNavbar";
import StudentSidebar from "../../components/student/StudentSidebar";
import Footer from "../../components/Footer";
import "./Dashboard.css";

function Dashboard() {
  const progressData = [
    {
      title: "Advanced React Architecture for Sri Lankan Fintech",
      progress: 78,
    },
    {
      title: "G.C.E. A/L ICT - Masterclass 2024",
      progress: 45,
    },
    {
      title: "English for IT Professionals - Level 01",
      progress: 92,
    },
    {
      title: "English for IT Professionals - Level 01",
      progress: 92,
    },
  ];

  const deadlines = [
    "Advanced React Architecture for Sri Lankan Fintech",
    "G.C.E. A/L ICT - Masterclass 2024",
    "English for IT Professionals - Level 01",
    "English for IT Professionals - Level 01",
  ];

  const monthlyData = [40, 55, 75, 65, 85, 95];
  const months = ["MAR", "APR", "MAY", "JUN", "JUL", "AUG"];

  return (
    <div className="dashboard-page">

      {/* Navbar */}
      <StudentNavbar />

      <div className="dashboard-layout">

        {/* Sidebar */}
        <StudentSidebar />

        {/* Main Content */}
        <main className="dashboard-main">

          {/* Statistics Cards */}
          <div className="stats-grid">

            <div className="stat-card">
              <div className="icon orange">
                <i className="fa-solid fa-graduation-cap"></i>
              </div>

              <div>
                <h4>Enrolled Courses</h4>
                <h2>17</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="icon green">
                <i className="fa-solid fa-circle-check"></i>
              </div>

              <div>
                <h4>Completed Courses</h4>
                <h2>07</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="icon orange">
                <i className="fa-solid fa-book-open"></i>
              </div>

              <div>
                <h4>Ongoing Courses</h4>
                <h2>07</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="icon orange">
                <i className="fa-regular fa-file-lines"></i>
              </div>

              <div>
                <h4>Certificates Earned</h4>
                <h2>17</h2>
              </div>
            </div>

          </div>

          {/* Row 1 */}
          <div className="dashboard-row">

            {/* Progress Summary */}
            <div className="card progress-card">

              <div className="card-header">
                <h2>Course Progress Summary</h2>
                <span>View All Courses</span>
              </div>

              {progressData.map((item, index) => (
                <div key={index} className="progress-item">

                  <div className="progress-top">
                    <span>{item.title}</span>
                    <span>{item.progress}% Completion</span>
                  </div>

                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>

                </div>
              ))}

            </div>

            {/* Monthly Progress */}
            <div className="card chart-card">

              <h2>Monthly Learning Progress</h2>

              <div className="bar-chart">

                {monthlyData.map((value, index) => (
                  <div className="bar-wrapper" key={index}>

                    <div
                      className={`bar ${index === 5 ? "orange-bar" : ""
                        }`}
                      style={{ height: `${value * 2}px` }}
                    ></div>

                    <span>{months[index]}</span>

                  </div>
                ))}

              </div>

            </div>

          </div>

          {/* Row 2 */}
          <div className="dashboard-row">

            {/* Deadlines */}
            <div className="card deadline-card">

              <h2>Upcoming Deadlines</h2>

              {deadlines.map((item, index) => (
                <div key={index} className="deadline-item">

                  <span>{item}</span>
                  <span>2026.05.30</span>

                </div>
              ))}

            </div>

            {/* Learning Hours */}
            <div className="card hours-card">

              <h2>Total Learning Hours</h2>

              <div className="hours-number">
                120
              </div>

            </div>

          </div>

        </main>

      </div>

      {/* Footer */}

      <div className="dashboard-footer">
        <Footer />
      </div>

    </div>
  );
}

export default Dashboard;