import { useState, useRef } from "react";
import "./UploadMaterial.css";
import { FiUsers, FiBookOpen, FiUploadCloud, FiCheck, FiX } from "react-icons/fi";

export default function UploadMaterial() {
  const [selectedCourse, setSelectedCourse] = useState("Introduction to UI/UX Design");
  const [materialTitle, setMaterialTitle] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setUploadedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setUploadedFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleCancel = () => {
    setMaterialTitle("");
    setUploadedFile(null);
    setSelectedCourse("Introduction to UI/UX Design");
  };

  return (
    <div className="um-shell">

      {/* Sidebar */}
      <aside className="um-sidebar">
        <div className="um-brand">
          <span className="um-brand-name">FUCHSIUS</span>
          <span className="um-instructor-badge">Instructor</span>
        </div>

        <nav className="um-sidenav">
          <div className="um-sitem">
            <FiUsers size={16} />
            <span>My Courses</span>
          </div>
          <div className="um-sitem um-sitem-active">
            <FiUploadCloud size={16} />
            <span>Upload Material</span>
          </div>
          <div className="um-sitem">
            <FiUsers size={16} />
            <span>Students</span>
          </div>
        </nav>
      </aside>

      {/* Main */}
      <div className="um-main">

        {/* Top header */}
        <header className="um-topbar">
          <h1 className="um-topbar-title">Upload Course Material</h1>
        </header>

        {/* Form card */}
        <div className="um-content">
          <div className="um-card">

            {/* Step 1 */}
            <div className="um-section">
              <h2 className="um-step-title">Step 1: Course Details</h2>
              <hr className="um-divider" />

              <div className="um-field">
                <label className="um-label">Select Course</label>
                <select
                  className="um-select"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option>Introduction to UI/UX Design</option>
                  <option>Advanced Web Systems Architecture</option>
                  <option>Strategic Enterprise Management</option>
                  <option>Quantum Physics for Beginners</option>
                  <option>Interpersonal Skills (V1.0)</option>
                </select>
              </div>

              <div className="um-field">
                <label className="um-label">Material Title</label>
                <input
                  className="um-input"
                  type="text"
                  placeholder="e.g., Chapter 1: Wireframing Basics"
                  value={materialTitle}
                  onChange={(e) => setMaterialTitle(e.target.value)}
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="um-section">
              <h2 className="um-step-title">Step 2: File Upload</h2>

              {/* Drop zone */}
              <div
                className={`um-dropzone ${dragOver ? "um-dropzone-active" : ""} ${uploadedFile ? "um-dropzone-done" : ""}`}
                onClick={() => fileInputRef.current.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.mp4,.zip,.pptx"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />

                <div className="um-drop-icon">
                  <FiUploadCloud size={28} color="#90aec4" />
                </div>

                {uploadedFile ? (
                  <>
                    <p className="um-drop-text um-drop-success">
                      <FiCheck size={14} /> {uploadedFile.name}
                    </p>
                    <p className="um-drop-sub">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB — click to change
                    </p>
                  </>
                ) : (
                  <>
                    <p className="um-drop-text">Click to upload or drag and drop</p>
                    <p className="um-drop-sub">PDF, MP4, ZIP or PPTX (Max. 500MB)</p>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="um-actions">
              <button className="um-btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button
                className="um-btn-upload"
                onClick={() => fileInputRef.current.click()}
              >
                <FiCheck size={15} /> Upload Material
              </button>
            </div>

          </div>
        </div>

        {/* Footer */}
        <footer className="um-footer">
          <span className="um-footer-logo">LMS</span>
          <span className="um-footer-copy">© 2024 LMS Sri Lanka. All Rights Reserved.</span>
          <div className="um-footer-links">
            <span>Support</span>
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
            <span>Contact Us</span>
          </div>
          <div className="um-footer-icons">
            <span className="um-footer-icon">&#x1F517;</span>
            <span className="um-footer-icon">&#x1F310;</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
