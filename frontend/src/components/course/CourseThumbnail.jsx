import React from 'react';

const CourseThumbnail = () => {
  return (
    <div className="course-card side-widget">
      <h3 className="widget-title">Course Thumbnail</h3>
      
      <div className="thumbnail-preview">
        <img 
          src="https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          alt="Course Thumbnail Placeholder" 
          className="thumbnail-img"
        />
      </div>
      
      <p className="thumbnail-help-text">
        Upload a high-quality image (1280x720px) to represent your course.
      </p>
      
      <button className="btn-outline full-width">Upload Image</button>
    </div>
  );
};

export default CourseThumbnail;
