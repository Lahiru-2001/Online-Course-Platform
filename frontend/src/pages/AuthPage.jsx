import React from 'react';
import Register from '../components/auth/Register';
import ResetPassword from '../components/auth/ResetPassword';

/**
 * Authentication Page
 * 
 * Houses the registration and password reset flows.
 */
const AuthPage = () => {
  return (
    <div className="auth-page">
      {/* Registration Form Flow */}
      <Register />
      
      {/* Divider Bar (Thematic transition) */}
      <div className="section-divider">
        FUCHSIUS
      </div>
      
      {/* Password Reset Flow */}
      <ResetPassword />
    </div>
  );
};

export default AuthPage;
