import React, { useState } from 'react';
import { initialEnrollments } from '../../data/mockData';

const RecentEnrollments = () => {
  // State to hold recent enrollments data
  const [enrollments, setEnrollments] = useState(initialEnrollments);

  // Handler for viewing the full history
  const handleViewHistory = () => {
    console.log('Fetching full enrollment history...');
    // TODO: Implement navigation to detailed history page or load more data
  };

  return (
    <div className="dashboard-card recent-enrollments-card">
      
      {/* Header Section */}
      <div className="card-header">
        <h2>Recent Enrollments</h2>
      </div>
      
      {/* Enrollments List */}
      <div className="enrollment-list">
        {enrollments.map((student) => (
          <div className="enrollment-item" key={student.id}>
            
            {/* Student Profile Info */}
            <div className="student-info">
              <img src={student.avatar} alt={`${student.name}'s avatar`} className="student-avatar" />
              <div>
                <h4>{student.name}</h4>
                <p>{student.course}</p>
              </div>
            </div>
            
            {/* Financial and Timing Stats */}
            <div className="enrollment-stats">
              <span className="amount">LKR<br/>{student.amount}</span>
              <span className="time">{student.time}</span>
            </div>
            
          </div>
        ))}
      </div>
      
      {/* Call to Action Button */}
      <button 
        className="view-history-btn"
        onClick={handleViewHistory}
      >
        View Full History
      </button>
      
    </div>
  );
};

export default RecentEnrollments;
