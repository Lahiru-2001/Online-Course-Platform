import React from 'react';
import pdfIcon from '../../assets/pdf-file-download-icon-with-transparent-background-free-png.webp';

const StudentAssignments = () => {
  return (
    <div className="learning-card assignment-card-outer">
      <div className="assignment-heading-row">
        <h3 className="card-heading">Assignments</h3>
        <span className="assignment-status-tag">On Progress</span>
      </div>

      <p className="assignment-description-text">
        Design a mobile app login screen using UI/UX best practices.
      </p>

      <div className="assignment-actions-row">
        <div className="assignment-file-box">
          <img src={pdfIcon} alt="PDF" className="doc-icon-img" />
          <div className="doc-text-block">
            <span className="doc-name">Assignments 01.pdf</span>
            <span className="doc-size">2.4 MB</span>
          </div>
          <button className="assignment-download-btn" aria-label="Download Assignment">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </button>
        </div>

        <button className="assignment-submit-btn">Submit</button>
      </div>
    </div>
  );
};

export default StudentAssignments;
