import React from 'react';
import '../../styles/LerningCompleate.css';
import uiuxBanner from '../../assets/uiux_banner.png';
import pdfIcon from '../../assets/pdf-file-download-icon-with-transparent-background-free-png.webp';
import StudentSidebar from '../../components/student/StudentSidebar';
import StudentNavbar from '../../components/student/StudentNavbar';
import StudentVideoLesson from '../../components/student/StudentVideoLesson';
import StudentQuiz from '../../components/student/StudentQuiz';
import StudentDocuments from '../../components/student/StudentDocuments';
import StudentMyNotes from '../../components/student/StudentMyNotes';
import StudentAssignments from '../../components/student/StudentAssignments';
import StudentLessonNavigation from '../../components/student/StudentLessonNavigation';

const LerningCompleate = ({ onBackToLanding }) => {
  return (
    <div className="student-portal-layout">
      {/* Navbar Component at the very top spanning 100% width */}
      <StudentNavbar />

      <div className="student-portal-container">
        {/* Sidebar Component */}
        <StudentSidebar onBackToLanding={onBackToLanding} />

        {/* Main Content Area */}
        <main className="portal-main">
          {/* Content Body */}
          <div className="portal-content">
            {/* 1. Congratulations Hero Card */}
            <div className="congratulations-banner-card">
              <button className="back-to-landing-btn" onClick={onBackToLanding}>
                &larr; Exit Portal
              </button>

              <div className="congrats-left">
                {/* SVG Trophy matching the mockup */}
                <svg viewBox="0 0 320 220" className="trophy-svg">
                  {/* Handles */}
                  <path d="M 90,50 C 40,40 40,130 90,120" fill="none" stroke="#f4ca4f" strokeWidth="15" strokeLinecap="round" />
                  <path d="M 230,50 C 280,40 280,130 230,120" fill="none" stroke="#f4ca4f" strokeWidth="15" strokeLinecap="round" />
                  
                  <path d="M 95,65 C 55,55 55,120 95,110" fill="none" stroke="#e0af36" strokeWidth="8" strokeLinecap="round" />
                  <path d="M 225,65 C 265,55 265,120 225,110" fill="none" stroke="#e0af36" strokeWidth="8" strokeLinecap="round" />

                  {/* Stand Base */}
                  <polygon points="65,190 255,190 235,140 85,140" fill="#c3886b" />
                  <polygon points="85,140 235,140 225,130 95,130" fill="#d89c7c" />

                  {/* Stem */}
                  <path d="M 140,110 L 180,110 L 170,150 L 150,150 Z" fill="#f4ca4f" />
                  <circle cx="160" cy="125" r="15" fill="#f4ca4f" />
                  <circle cx="160" cy="142" r="18" fill="#e0af36" />

                  {/* Cup */}
                  <path d="M 90,38 C 90,110 120,125 160,125 C 200,125 230,110 230,38 Z" fill="#fcd34d" />
                  
                  {/* Star */}
                  <polygon points="160,52 165,68 182,68 168,78 173,95 160,84 147,95 152,78 138,68 155,68" fill="#ffffff" />
                </svg>
              </div>

              <div className="congrats-right">
                <h1 className="congrats-title">Congratulations!</h1>
                <p className="congrats-desc">
                  You have successfully completed this lesson.<br />
                  Great job! Keep up the excellent work.
                </p>

                <div className="congrats-stats-row">
                  {/* Time Spent */}
                  <div className="stats-card">
                    <div className="stats-icon-circle">
                      <i className="fa-regular fa-clock"></i>
                    </div>
                    <span className="stats-label">Time Spent</span>
                    <span className="stats-value">25.10</span>
                  </div>

                  {/* Score */}
                  <div className="stats-card">
                    <div className="stats-icon-circle">
                      <i className="fa-solid fa-gauge-high"></i>
                    </div>
                    <span className="stats-label">Score</span>
                    <span className="stats-value">100%</span>
                  </div>

                  {/* Status */}
                  <div className="stats-card">
                    <div className="stats-icon-circle">
                      <i className="fa-solid fa-trophy" style={{ color: '#eab308' }}></i>
                    </div>
                    <span className="stats-label">Status</span>
                    <span className="stats-value status-completed">Completed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Double-Column Layout */}
            <div className="learning-sections-container">
              {/* Left Column */}
              <div className="learning-column-left">
                {/* Video Lesson Component */}
                <StudentVideoLesson />

                {/* Quiz Component (Completed View) */}
                <div className="learning-card">
                  <h3 className="card-heading">Quiz</h3>
                  <div className="completed-quiz-card">
                    <div className="quiz-circle-progress-wrapper">
                      <svg className="progress-ring-svg" viewBox="0 0 120 120">
                        <circle 
                          cx="60" 
                          cy="60" 
                          r="45" 
                          fill="none" 
                          stroke="#dcfce7" 
                          strokeWidth="10" 
                        />
                        <circle 
                          cx="60" 
                          cy="60" 
                          r="45" 
                          fill="none" 
                          stroke="#00e600" 
                          strokeWidth="10" 
                          strokeDasharray="282.7" 
                          strokeDashoffset="0" 
                          strokeLinecap="round"
                        />
                        <text 
                          x="60" 
                          y="67" 
                          textAnchor="middle" 
                          className="progress-ring-text"
                        >
                          100%
                        </text>
                      </svg>
                    </div>

                    <div className="quiz-results-details">
                      {/* Small gold trophy icon */}
                      <svg viewBox="0 0 320 220" className="small-trophy-svg">
                        {/* Handles */}
                        <path d="M 90,50 C 40,40 40,130 90,120" fill="none" stroke="#f4ca4f" strokeWidth="15" strokeLinecap="round" />
                        <path d="M 230,50 C 280,40 280,130 230,120" fill="none" stroke="#f4ca4f" strokeWidth="15" strokeLinecap="round" />
                        
                        <path d="M 95,65 C 55,55 55,120 95,110" fill="none" stroke="#e0af36" strokeWidth="8" strokeLinecap="round" />
                        <path d="M 225,65 C 265,55 265,120 225,110" fill="none" stroke="#e0af36" strokeWidth="8" strokeLinecap="round" />

                        {/* Stand Base */}
                        <polygon points="65,190 255,190 235,140 85,140" fill="#c3886b" />
                        <polygon points="85,140 235,140 225,130 95,130" fill="#d89c7c" />

                        {/* Stem */}
                        <path d="M 140,110 L 180,110 L 170,150 L 150,150 Z" fill="#f4ca4f" />
                        <circle cx="160" cy="125" r="15" fill="#f4ca4f" />
                        <circle cx="160" cy="142" r="18" fill="#e0af36" />

                        {/* Cup */}
                        <path d="M 90,38 C 90,110 120,125 160,125 C 200,125 230,110 230,38 Z" fill="#fcd34d" />
                        
                        {/* Star */}
                        <polygon points="160,52 165,68 182,68 168,78 173,95 160,84 147,95 152,78 138,68 155,68" fill="#ffffff" />
                      </svg>
                      <h4 className="quiz-result-heading">Excellent Score!</h4>
                      <p className="quiz-result-subtext">You got 4 out of 4 correct</p>
                    </div>
                  </div>

                  <div className="completed-quiz-actions">
                    <button className="review-answers-btn">Review Answers</button>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="learning-column-right">
                {/* Documents Component (Completed/Checkmarked View) */}
                <div className="learning-card">
                  <h3 className="card-heading">Documents</h3>

                  <div className="documents-list">
                    {/* Item 1 (PDF) */}
                    <div className="document-item">
                      <div className="doc-info-left">
                        <img src={pdfIcon} alt="PDF" className="doc-icon-img" />
                        <div className="doc-text-block">
                          <span className="doc-name">UI Design Guide.pdf</span>
                          <span className="doc-size">2.4 MB</span>
                        </div>
                      </div>
                      <div className="doc-completed-badge">
                        <svg viewBox="0 0 24 24" className="doc-completed-checkmark-svg">
                          <circle cx="12" cy="12" r="10" fill="#10b981" />
                          <path d="M9 12l2 2 4-4" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>

                    {/* Item 2 (PDF) */}
                    <div className="document-item">
                      <div className="doc-info-left">
                        <img src={pdfIcon} alt="PDF" className="doc-icon-img" />
                        <div className="doc-text-block">
                          <span className="doc-name">UI Design Guide.pdf</span>
                          <span className="doc-size">2.4 MB</span>
                        </div>
                      </div>
                      <div className="doc-completed-badge">
                        <svg viewBox="0 0 24 24" className="doc-completed-checkmark-svg">
                          <circle cx="12" cy="12" r="10" fill="#10b981" />
                          <path d="M9 12l2 2 4-4" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>

                    {/* Item 3 (ZIP) */}
                    <div className="document-item">
                      <div className="doc-info-left">
                        <div className="custom-zip-icon">
                          <span className="zip-label">ZIP</span>
                        </div>
                        <div className="doc-text-block">
                          <span className="doc-name">Wireframe Templates.zip</span>
                          <span className="doc-size">2.4 MB</span>
                        </div>
                      </div>
                      <div className="doc-completed-badge">
                        <svg viewBox="0 0 24 24" className="doc-completed-checkmark-svg">
                          <circle cx="12" cy="12" r="10" fill="#10b981" />
                          <path d="M9 12l2 2 4-4" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>

                    {/* Item 4 (ZIP) */}
                    <div className="document-item">
                      <div className="doc-info-left">
                        <div className="custom-zip-icon">
                          <span className="zip-label">ZIP</span>
                        </div>
                        <div className="doc-text-block">
                          <span className="doc-name">Wireframe Templates.zip</span>
                          <span className="doc-size">2.4 MB</span>
                        </div>
                      </div>
                      <div className="doc-completed-badge">
                        <svg viewBox="0 0 24 24" className="doc-completed-checkmark-svg">
                          <circle cx="12" cy="12" r="10" fill="#10b981" />
                          <path d="M9 12l2 2 4-4" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* My Notes Component (Completed/Static View) */}
                <div className="learning-card">
                  <h3 className="card-heading">My Notes</h3>
                  <div className="completed-notes-container">
                    <p className="notes-heading">Great lesson on UI/UX fundamentals.</p>
                    <div className="notes-takeaways">
                      <span className="takeaways-title">Key takeaways:</span>
                      <ul className="takeaways-list">
                        <li>User-centered design is essential</li>
                        <li>Keep interfaces simple and consistent</li>
                        <li>Always test with real users</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Assignments Component (Completed View) */}
            <div className="learning-card assignment-card-outer">
              <div className="assignment-heading-row">
                <h3 className="card-heading">Assignments</h3>
                <span className="assignment-status-tag completed">Completed</span>
              </div>

              <div className="assignment-sub-row">
                <p className="assignment-description-text">
                  Design a mobile app login screen using UI/UX best practices.
                </p>
                <span className="assignment-submitted-date">Submitted:- 2026.05.30</span>
              </div>

              <div className="assignment-actions-row completed-state">
                <div className="assignment-file-box">
                  <div className="doc-info-left">
                    <img src={pdfIcon} alt="PDF" className="doc-icon-img" />
                    <div className="doc-text-block">
                      <span className="doc-name">Assignments 01.pdf</span>
                      <span className="doc-size">2.4 MB</span>
                    </div>
                  </div>
                  <div className="assignment-completed-badge">
                    <svg viewBox="0 0 24 24" className="doc-completed-checkmark-svg">
                      <circle cx="12" cy="12" r="10" fill="#10b981" />
                      <path d="M9 12l2 2 4-4" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                <div className="assignment-grade-badge">
                  Graded: 100%
                </div>
              </div>
            </div>

            {/* 4. Bottom Lesson Navigation Component (Completed View - No Mark as Complete button) */}
            <div className="lesson-navigation-footer">
              <button className="nav-btn-prev">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Previous Lesson
              </button>

              <button className="nav-btn-next">
                Next Lesson
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LerningCompleate;
