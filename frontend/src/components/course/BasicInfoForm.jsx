import React, { useState } from 'react';

const BasicInfoForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Mathematics',
    difficulty: 'Beginner',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data to save:', formData);
  };

  return (
    <div className="course-card basic-info-card">
      <h2 className="card-title">General Information</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Course Title</label>
          <input 
            type="text" 
            name="title"
            placeholder="e.g. Advanced Mathematics for A/L"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-row">
          <div className="form-group half-width">
            <label>Category</label>
            <div className="select-wrapper">
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="IT">IT</option>
                <option value="Languages">Languages</option>
              </select>
              <svg className="select-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>
          
          <div className="form-group half-width">
            <label>Difficulty Level</label>
            <div className="select-wrapper">
              <select 
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <svg className="select-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label>Course Description</label>
          <textarea 
            name="description"
            placeholder="Provide a detailed overview of what students will learn..."
            rows="6"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Next Step <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default BasicInfoForm;
