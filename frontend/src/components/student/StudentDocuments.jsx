import React from 'react';
import pdfIcon from '../../assets/pdf-file-download-icon-with-transparent-background-free-png.webp';

const StudentDocuments = () => {
  return (
    <div className="learning-card">
      <h3 className="card-heading">Documents</h3>

      <div className="documents-list">
        {/* Item 1 (PDF) */}
        <div className="document-item">
          <div className="doc-info-left">
            <img src={pdfIcon} alt="PDF" className="doc-icon-img" />
            <div className="doc-text-block">
              <span className="doc-name">UI Design Guide.pdf</span>
              <span className="doc-size">2.4 MB</span>
            </div>
          </div>
          <button className="doc-download-btn" aria-label="Download Document">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </button>
        </div>

        {/* Item 2 (PDF) */}
        <div className="document-item">
          <div className="doc-info-left">
            <img src={pdfIcon} alt="PDF" className="doc-icon-img" />
            <div className="doc-text-block">
              <span className="doc-name">UI Design Guide.pdf</span>
              <span className="doc-size">2.4 MB</span>
            </div>
          </div>
          <button className="doc-download-btn" aria-label="Download Document">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </button>
        </div>

        {/* Item 3 (ZIP) */}
        <div className="document-item">
          <div className="doc-info-left">
            <div className="custom-zip-icon">
              <span className="zip-label">ZIP</span>
            </div>
            <div className="doc-text-block">
              <span className="doc-name">Wireframe Templates.zip</span>
              <span className="doc-size">2.4 MB</span>
            </div>
          </div>
          <button className="doc-download-btn" aria-label="Download Document">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </button>
        </div>

        {/* Item 4 (ZIP) */}
        <div className="document-item">
          <div className="doc-info-left">
            <div className="custom-zip-icon">
              <span className="zip-label">ZIP</span>
            </div>
            <div className="doc-text-block">
              <span className="doc-name">Wireframe Templates.zip</span>
              <span className="doc-size">2.4 MB</span>
            </div>
          </div>
          <button className="doc-download-btn" aria-label="Download Document">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDocuments;
