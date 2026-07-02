import React from 'react';
import CourseStepper from '../components/course/CourseStepper';
import BasicInfoForm from '../components/course/BasicInfoForm';
import CourseThumbnail from '../components/course/CourseThumbnail';
import CourseCreationProgress from '../components/course/CourseCreationProgress';
import '../styles/CreateCourse.css';

const CreateCoursePage = () => {
  return (
    <main className="create-course-main">
      <div className="content-container">
        
        {/* Page Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Create New Course</h1>
            <p className="page-subtitle">Fill in the details below to launch your educational journey.</p>
          </div>
          <div className="header-actions">
            <button className="btn-outline">Save Draft</button>
          </div>
        </div>
        
        {/* Navigation Stepper */}
        <CourseStepper />
        
        {/* Two-column Layout for Form and Widgets */}
        <div className="course-grid">
          
          {/* Left Column: Main Form */}
          <div className="course-form-column">
            <BasicInfoForm />
          </div>
          
          {/* Right Column: Widgets */}
          <div className="course-widgets-column">
            <CourseThumbnail />
            <CourseCreationProgress />
          </div>
          
        </div>
        
      </div>
    </main>
  );
};

export default CreateCoursePage;
