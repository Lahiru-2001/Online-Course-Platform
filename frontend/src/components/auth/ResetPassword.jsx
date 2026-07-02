import React, { useState } from 'react';
import './ResetPassword.css';

const ResetPassword = () => {
  // Store the email input state
  const [email, setEmail] = useState('');

  // Handle the password reset submission
  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    // TODO: Connect this to the forgot password API endpoint
    console.log('Sending reset link to:', email);
    alert(`Reset link sent to ${email}!`);
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        
        {/* Header Section */}
        <div className="reset-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        
        <h2 className="reset-title">Reset your password</h2>
        <p className="reset-subtitle">
          Enter the email address associated with your account and we'll send you a link to reset your password.
        </p>
        
        {/* Form Section */}
        <form className="reset-form" onSubmit={handleResetSubmit}>
          <div className="form-group">
            <label htmlFor="resetEmail">Email Address</label>
            <input 
              type="email" 
              id="resetEmail" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn-primary reset-btn">
            Send Reset Link
          </button>
        </form>
        
        {/* Back navigation */}
        <a href="#" className="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Login
        </a>
        
      </div>
    </div>
  );
};

export default ResetPassword;
