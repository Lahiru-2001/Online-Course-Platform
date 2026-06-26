import React from 'react';

const CourseStepper = () => {
  return (
    <div className="course-stepper">
      <div className="step active">
        <span className="step-number">01</span> Basic Info
      </div>
      <div className="step">
        <span className="step-number">02</span> Curriculum
      </div>
      <div className="step">
        <span className="step-number">03</span> Settings
      </div>
      <div className="step">
        <span className="step-number">04</span> Pricing (LKR)
      </div>
    </div>
  );
};

export default CourseStepper;
