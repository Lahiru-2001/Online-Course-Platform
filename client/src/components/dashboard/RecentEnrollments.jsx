import React, { useState } from 'react';

// Initial mock data for enrollments
const initialEnrollments = [
  {
    id: 1,
    name: 'Sithumini Perera',
    course: 'ICT Masterclass 2024',
    amount: '2,500',
    time: '2 mins ago',
    avatar: 'https://i.pravatar.cc/150?img=5'
  },
  {
    id: 2,
    name: 'Kasun Jayawardena',
    course: 'Advanced React Architecture',
    amount: '5,000',
    time: '15 mins ago',
    avatar: 'https://i.pravatar.cc/150?img=12'
  },
  {
    id: 3,
    name: 'Dilini Gunasekara',
    course: 'English for IT Professionals',
    amount: '1,800',
    time: '1 hour ago',
    avatar: 'https://i.pravatar.cc/150?img=42'
  },
  {
    id: 4,
    name: 'Arjun Silva',
    course: 'ICT Masterclass 2024',
    amount: '2,500',
    time: '3 hours ago',
    avatar: 'https://i.pravatar.cc/150?img=33'
  }
];

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
