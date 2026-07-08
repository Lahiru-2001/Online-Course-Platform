import React from 'react';
import './CourseCard.css'; // We'll add some specific card styling here or in Landing.css

const CourseCard = ({ title, duration, price, provider, logo, image }) => {
  return (
    <div className="course-card">
      <div className="course-card-image-container">
        <img src={image} alt={title} className="course-card-image" />
      </div>
      
      <div className="course-card-content">
        <div className="course-card-provider">
          {logo && <img src={logo} alt={provider} className="provider-logo" />}
          <span className="provider-name">{provider}</span>
        </div>
        
        <h3 className="course-card-title">{title}</h3>
        
        <div className="course-card-footer">
          <span className="course-duration">{duration}</span>
          <span className="course-price">{price}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
