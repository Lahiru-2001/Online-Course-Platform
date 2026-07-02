import React from 'react';
import InstructorNavbar from '../../components/instructor/InstructorNavbar';
import InstructorSidebar from '../../components/instructor/InstructorSidebar';
import Footer from '../../components/Footer';
import './ProgressTracking.css';

export default function ProgressTracking() {
  const studentsData = [
    {
      initials: "AS",
      name: "Amara Silva",
      id: "#2409-ST",
      pathway: "Advanced UI/UX Design",
      progress: 92,
      avgQuiz: "94/100",
      status: "On Track",
      colorClass: "avatar-blue"
    },
    {
      initials: "KP",
      name: "Kasun Perera",
      id: "#2411-ST",
      pathway: "Web Development Bootcamp",
      progress: 45,
      avgQuiz: "62/100",
      status: "At Risk",
      colorClass: "avatar-orange"
    },
    {
      initials: "RF",
      name: "Ruwan Fernando",
      id: "#2415-ST",
      pathway: "Data Science with Python",
      progress: 100,
      avgQuiz: "98/100",
      status: "Completed",
      colorClass: "avatar-pink"
    },
    {
      initials: "NK",
      name: "Nethmi Kumari",
      id: "#2422-ST",
      pathway: "Mobile App Development",
      progress: 72,
      avgQuiz: "88/100",
      status: "On Track",
      colorClass: "avatar-teal"
    }
  ];

  const successRates = [
    { name: "Graphic Design 101", rate: 94 },
    { name: "Introduction to React", rate: 76 },
    { name: "Digital Marketing Essentials", rate: 88 }
  ];

  return (
    <div className="instructor-portal-layout">
      {/* Top Navbar */}
      <InstructorNavbar activeLink="Reports" />

      {/* Main Body: sidebar + content */}
      <div className="instructor-portal-body">

        {/* Left Sidebar */}
        <InstructorSidebar activeMenu="Performance" />

        {/* Right Content Area */}
        <div className="instructor-portal-main">
          <div className="progress-page-content">

            {/* Header row */}
            <div className="progress-actions-header">
              <h2 className="page-heading-main">Student Progress Tracking</h2>
              <div className="header-buttons">
                <button className="btn-filter">
                  <i className="fa-solid fa-sliders"></i> Filters
                </button>
                <button className="btn-export">
                  <i className="fa-solid fa-file-export"></i> Export Report
                </button>
              </div>
            </div>

            {/* Stats Deck */}
            <div className="progress-stats-row">

              {/* Card 1: Average Completion Rate */}
              <div className="prog-stat-card">
                <span className="prog-stat-label">AVERAGE COMPLETION RATE</span>
                <span className="prog-stat-value">78.4%</span>
                <div className="prog-mini-bar-track">
                  <div className="prog-mini-bar-fill" style={{ width: '78.4%' }}></div>
                </div>
                <span className="prog-stat-subtext text-up">
                  <i className="fa-solid fa-arrow-trend-up"></i> +5.2% from last month
                </span>
              </div>

              {/* Card 2: Active Students */}
              <div className="prog-stat-card icon-layout">
                <div className="stat-card-left">
                  <div className="prog-icon-wrapper orange-icon">
                    <i className="fa-solid fa-users"></i>
                  </div>
                </div>
                <div className="stat-card-right">
                  <span className="prog-stat-value">1,248</span>
                  <span className="prog-stat-label-light">Active Students</span>
                </div>
              </div>

              {/* Card 3: Quiz Pass Rate */}
              <div className="prog-stat-card icon-layout">
                <div className="stat-card-left">
                  <div className="prog-icon-wrapper red-icon">
                    <i className="fa-solid fa-file-circle-check"></i>
                  </div>
                </div>
                <div className="stat-card-right">
                  <span className="prog-stat-value">85%</span>
                  <span className="prog-stat-label-light">Quiz Pass Rate</span>
                </div>
              </div>

              {/* Card 4: Learning Engagement Chart */}
              <div className="prog-stat-card chart-layout">
                <div className="chart-info">
                  <span className="chart-label-top">Learning Engagement</span>
                  <span className="chart-label-sub">Hours Spent per Course</span>
                </div>
                <div className="engagement-bar-chart">
                  <div className="engagement-bar" style={{ height: '30%' }}></div>
                  <div className="engagement-bar" style={{ height: '60%' }}></div>
                  <div className="engagement-bar" style={{ height: '45%' }}></div>
                  <div className="engagement-bar" style={{ height: '80%' }}></div>
                  <div className="engagement-bar active" style={{ height: '95%' }}></div>
                  <div className="engagement-bar" style={{ height: '40%' }}></div>
                </div>
              </div>

            </div>

            {/* Student Performance Registry Table */}
            <div className="registry-table-card">
              <div className="registry-header">
                <h3>Student Performance Registry</h3>
                <div className="registry-tags">
                  <span className="tag-all">All Courses</span>
                  <span className="tag-term">Term 3, 2024</span>
                </div>
              </div>

              <div className="registry-table-container">
                <table className="registry-table">
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>Course Pathway</th>
                      <th>Progress</th>
                      <th>Avg. Quiz Score</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsData.map((student, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className="student-profile-cell">
                            <div className={`student-avatar-circle ${student.colorClass}`}>
                              {student.initials}
                            </div>
                            <div className="student-meta-details">
                              <span className="student-name-bold">{student.name}</span>
                              <span className="student-id-sub">ID: {student.id}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="course-pathway-txt">{student.pathway}</span>
                        </td>
                        <td>
                          <div className="table-progress-container">
                            <div className="table-progress-bar-track">
                              <div
                                className="table-progress-bar-fill"
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className="table-progress-percent">{student.progress}%</span>
                          </div>
                        </td>
                        <td>
                          <span className="quiz-score-txt">{student.avgQuiz}</span>
                        </td>
                        <td>
                          <span className={`status-badge-registry ${student.status.toLowerCase().replace(' ', '-')}`}>
                            {student.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn-action-view" title="View details">
                            <i className="fa-solid fa-eye"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="registry-table-footer">
                <span className="showing-entries-txt">Showing 4 of 1,248 students</span>
                <div className="pagination-ctrls">
                  <button className="pag-btn"><i className="fa-solid fa-chevron-left"></i></button>
                  <button className="pag-btn active">1</button>
                  <button className="pag-btn">2</button>
                  <button className="pag-btn">3</button>
                  <button className="pag-btn"><i className="fa-solid fa-chevron-right"></i></button>
                </div>
              </div>
            </div>

            {/* Bottom Split: Success Rates + Action Required */}
            <div className="progress-bottom-split">

              {/* Left: Course Success Rates */}
              <div className="success-rates-card">
                <div className="success-header">
                  <h3>Course Success Rates</h3>
                  <button className="btn-three-dots">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </button>
                </div>
                <div className="success-rates-list">
                  {successRates.map((course, idx) => (
                    <div key={idx} className="success-rate-item">
                      <div className="success-rate-labels">
                        <span className="course-name">{course.name}</span>
                        <span className="course-percentage">{course.rate}% Success</span>
                      </div>
                      <div className="success-bar-track">
                        <div className="success-bar-fill" style={{ width: `${course.rate}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Action Required */}
              <div className="action-required-card">
                <h3>Action Required</h3>
                <div className="action-alerts-list">

                  <div className="action-alert-item warning-alert">
                    <div className="alert-icon-col">
                      <i className="fa-solid fa-triangle-exclamation"></i>
                    </div>
                    <div className="alert-content-col">
                      <h4>Quiz #4 Failure Spike</h4>
                      <p>32% failure rate in "UI Foundations". Recommend review.</p>
                      <a href="#view-quiz" className="alert-action-link">View Quiz Analytics</a>
                    </div>
                  </div>

                  <div className="action-alert-item info-alert">
                    <div className="alert-icon-col">
                      <i className="fa-regular fa-clipboard"></i>
                    </div>
                    <div className="alert-content-col">
                      <h4>24 Pending Assignments</h4>
                      <p>New submissions ready for grading in "Web Security".</p>
                      <a href="#open-gradebook" className="alert-action-link">Open Gradebook</a>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
