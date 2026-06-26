import React, { useState } from 'react';
import { initialCourses } from '../../data/mockData';

const CourseProgress = () => {
  // State to manage the list of courses
  const [courses, setCourses] = useState(initialCourses);

  // Handler for viewing all courses
  const handleViewAll = (e) => {
    e.preventDefault();
    console.log('Navigating to full courses list...');
    // TODO: Add router navigation logic here
  };

  return (
    <div className="dashboard-card course-progress-card">
      
      {/* Card Header with action link */}
      <div className="card-header">
        <h2>Course Progress Summary</h2>
        <a href="#" className="view-all" onClick={handleViewAll}>
          View All Courses
        </a>
      </div>
      
      {/* Course List Wrapper */}
      <div className="course-list">
        {courses.map((course) => (
          <div className="course-item" key={course.id}>
            
            {/* Title and percentage */}
            <div className="course-info">
              <h4>{course.title}</h4>
              <span className="completion-text">{course.completion}% Completion</span>
            </div>
            
            {/* Visual Progress Bar */}
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${course.completion}%` }}
                role="progressbar"
                aria-valuenow={course.completion}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            
            {/* Footer stats for the course */}
            <div className="course-stats">
              <span className="students-text">{course.students} Students Enrolled</span>
              <span className="earned-text">LKR {course.earned} Earned</span>
            </div>
            
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default CourseProgress;
