import React from 'react';
import '../../styles/studentLerning.css';
import uiuxBanner from '../../assets/uiux_banner.png';
import StudentSidebar from '../../components/student/StudentSidebar';
import StudentNavbar from '../../components/student/StudentNavbar';
import StudentVideoLesson from '../../components/student/StudentVideoLesson';
import StudentQuiz from '../../components/student/StudentQuiz';
import StudentDocuments from '../../components/student/StudentDocuments';
import StudentMyNotes from '../../components/student/StudentMyNotes';
import StudentAssignments from '../../components/student/StudentAssignments';
import StudentLessonNavigation from '../../components/student/StudentLessonNavigation';

const Learning = ({ onBackToLanding }) => {
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
            {/* 1. Hero Card */}
            <div className="banner-card">
              <button className="back-to-landing-btn" onClick={onBackToLanding}>
                &larr; Exit Portal
              </button>

              <div className="banner-image-wrapper">
                <img 
                  src={uiuxBanner} 
                  alt="UI/UX Learning Banner" 
                  className="banner-illustration" 
                />
              </div>
            </div>

            {/* 2. Double-Column Layout */}
            <div className="learning-sections-container">
              {/* Left Column */}
              <div className="learning-column-left">
                {/* Video Lesson Component */}
                <StudentVideoLesson />

                {/* Quiz Component */}
                <StudentQuiz />
              </div>

              {/* Right Column */}
              <div className="learning-column-right">
                {/* Documents Component */}
                <StudentDocuments />

                {/* My Notes Component */}
                <StudentMyNotes />
              </div>
            </div>

            {/* 3. Assignments Component */}
            <StudentAssignments />

            {/* 4. Bottom Lesson Navigation Component */}
            <StudentLessonNavigation />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Learning;
