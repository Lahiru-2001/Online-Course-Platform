import React from 'react';

const CourseCreationProgress = () => {
  return (
    <div className="course-card side-widget">
      <h3 className="widget-title">Course Progress</h3>
      
      <div className="progress-section">
        <div className="progress-header">
          <span>Profile Completion</span>
          <span className="progress-percentage">65%</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: '65%' }}></div>
        </div>
      </div>
      
      <ul className="checklist">
        <li className="checklist-item completed">
          <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.177-7.86l-2.765-2.767L7 12.431l3.118 3.121a1 1 0 0 0 1.414 0l5.952-5.95-1.062-1.062-5.599 5.6z"></path></svg>
          <span>Basic Info Completed</span>
        </li>
        <li className="checklist-item">
          <div className="empty-circle"></div>
          <span>Add at least 3 lessons</span>
        </li>
        <li className="checklist-item">
          <div className="empty-circle"></div>
          <span>Set course pricing</span>
        </li>
      </ul>
    </div>
  );
};

export default CourseCreationProgress;
