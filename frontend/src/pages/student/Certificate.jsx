import React, { useState } from 'react';
import StudentSidebar from '../../components/student/StudentSidebar';
import StudentNavbar from '../../components/student/StudentNavbar';
import Footer from '../../components/Footer';
import './Certificate.css';

// Reusable mini Certificate illustration/thumbnail component
const CertificateThumbnail = ({ name = "Gihan Perera" }) => (
  <div className="certificate-thumbnail">
    <div className="cert-inner-border">
      <div className="cert-corner-gold top-left"></div>
      <div className="cert-corner-gold top-right"></div>
      <div className="cert-corner-gold bottom-left"></div>
      <div className="cert-corner-gold bottom-right"></div>

      <span className="cert-title">Certificate</span>
      <span className="cert-name">{name}</span>
      <span className="cert-desc">of completion</span>

      <div className="cert-signatures"></div>
      <div className="cert-seal"></div>
    </div>
  </div>
);

export default function Certificate() {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'completed', 'progress'

  // Statistics data matching screenshot
  const stats = [
    { label: "Total Certificates", value: 17, iconClass: "fa-solid fa-award", type: "total" },
    { label: "Completed Courses", value: 5, iconClass: "fa-solid fa-graduation-cap", type: "completed" },
    { label: "In Progress", value: 7, iconClass: "fa-solid fa-spinner", type: "progress" },
    { label: "Member Since", value: "Jan 2024", iconClass: "fa-regular fa-calendar", type: "member" }
  ];

  // Completed Certificates (5 items)
  const completedCertificates = [
    { id: "CERT-0001", title: "G.C.E. A/L ICT - Masterclass 2024", publisher: "University of Moratuwa", date: "20 Apr 2026" },
    { id: "CERT-0002", title: "G.C.E. A/L ICT - Masterclass 2024", publisher: "University of Moratuwa", date: "20 Apr 2026" },
    { id: "CERT-0003", title: "G.C.E. A/L ICT - Masterclass 2024", publisher: "University of Moratuwa", date: "20 Apr 2026" },
    { id: "CERT-0004", title: "G.C.E. A/L ICT - Masterclass 2024", publisher: "University of Moratuwa", date: "20 Apr 2026" },
    { id: "CERT-0005", title: "G.C.E. A/L ICT - Masterclass 2024", publisher: "University of Moratuwa", date: "20 Apr 2026" }
  ];

  // Certificates In Progress (2 items)
  const inProgressCertificates = [
    { title: "G.C.E. A/L ICT - Masterclass 2024", publisher: "University of Moratuwa", progress: 40, estCompletion: "22 Jun 2026" },
    { title: "G.C.E. A/L ICT - Masterclass 2024", publisher: "University of Moratuwa", progress: 40, estCompletion: "22 Jun 2026" }
  ];

  return (
    <div className="student-portal-layout">

      {/* Sidebar + Main Content row */}
      <div className="student-portal-body">

        {/* Sidebar navigation */}
        <StudentSidebar />

        {/* Main Content Area */}
        <div className="student-portal-main">

          {/* Navbar header with custom title & subtitle */}
          <StudentNavbar
            title="My Certificates"
            subtitle="View and manage your earned certificates."
          />

          {/* Inner page content */}
          <div className="certificate-page-content">

            {/* Stats Deck */}
            <div className="certificate-stats-row">
              {stats.map((stat, i) => (
                <div key={i} className="stat-card">
                  <div className={`stat-icon-wrapper ${stat.type}`}>
                    <i className={stat.iconClass}></i>
                  </div>
                  <div className="stat-details">
                    <span className="stat-label">{stat.label}</span>
                    <span className="stat-value">{stat.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Filter Tabs */}
            <div className="certificate-tabs">
              <button
                className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Certificates (5)
              </button>
              <button
                className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
                onClick={() => setActiveTab('completed')}
              >
                Completed (5)
              </button>
              <button
                className={`tab-btn ${activeTab === 'progress' ? 'active' : ''}`}
                onClick={() => setActiveTab('progress')}
              >
                In Progress
              </button>
            </div>

            {/* Certificates List Section */}
            {(activeTab === 'all' || activeTab === 'completed') && (
              <div className="certificates-list">
                {completedCertificates.map((cert, index) => (
                  <div key={index} className="certificate-card-item">
                    <CertificateThumbnail />
                    <div className="certificate-info-pane">
                      <h4 className="certificate-item-title">{cert.title}</h4>
                      <span className="certificate-item-publisher">{cert.publisher}</span>
                      <div className="badge-and-date">
                        <span className="status-badge completed">Completed</span>
                        <span className="completion-date-text">Completed on {cert.date}</span>
                      </div>
                    </div>
                    <div className="certificate-action-pane">
                      <button className="download-btn">
                        <i className="fa-solid fa-arrow-down-to-line"></i> Download
                      </button>
                      <span className="cert-id-label">Certificate ID: {cert.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Certificates In Progress Section */}
            {(activeTab === 'all' || activeTab === 'progress') && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: activeTab === 'all' ? '12px' : '0px' }}>
                {activeTab === 'all' && (
                  <h3 className="section-subtitle">Certificates In Progress</h3>
                )}
                {inProgressCertificates.map((cert, index) => (
                  <div key={index} className="progress-card-item">
                    <div className="progress-info-pane">
                      <h4 className="certificate-item-title">{cert.title}</h4>
                      <span className="certificate-item-publisher">{cert.publisher}</span>
                      <div className="badge-and-date">
                        <span className="status-badge progress">In Progress</span>
                      </div>
                      <div className="progress-bar-container">
                        <div className="progress-bar-track">
                          <div
                            className="progress-bar-fill"
                            style={{ width: `${cert.progress}%` }}
                          ></div>
                        </div>
                        <span className="progress-percent-label">{cert.progress}% Completed</span>
                      </div>
                    </div>
                    <div className="certificate-action-pane">
                      <button className="continue-btn">Continue Learning</button>
                      <span className="est-completion-label">Estimated completion: {cert.estCompletion}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>{/* end certificate-page-content */}
        </div>{/* end student-portal-main */}
      </div>{/* end student-portal-body */}

      {/* Footer — full width at bottom */}
      <Footer />

    </div>
  );
}
