function ForgotPassword({ onNavigate }) {
  return (
    <div className="page">
      <div className="container">

        {/* Header bar */}
        <div className="forgot-header">FUCHSIUS</div>

        {/* Main Content */}
        <div className="forgot-body">
          <div className="forgot-card">

            {/* Lock icon */}
            <div className="lock-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6b7280"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>

            <h2 className="forgot-title">Reset your password</h2>
            <p className="forgot-subtitle">
              Enter the email address associated with your account
              <br />
              and we'll send you a link to reset your password.
            </p>

            <label className="forgot-label">Email Address</label>
            <input
              className="forgot-input"
              type="email"
              placeholder="Enter your email"
            />

            <button className="signin-btn forgot-btn">Send Reset Link</button>

            <p
              className="back-to-login"
              onClick={() => onNavigate("login")}
            >
              ← Back to Login
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="forgot-footer">
          <div className="footer-left">
            <span className="footer-logo">LMS</span>
            <span className="footer-copy">
              © 2024 LMS Sri Lanka. All Rights Reserved.
            </span>
          </div>
          <div className="footer-links">
            <span>Support</span>
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
            <span>Contact Us</span>
          </div>
          <div className="footer-icons">
            <span>🔗</span>
            <span>🌐</span>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default ForgotPassword;
