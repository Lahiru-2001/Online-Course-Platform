import { useState } from "react";
import { FiBell, FiSettings, FiEye, FiEyeOff } from "react-icons/fi";

function Login({ onNavigate }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="page">
      <div className="container">

        {/* Navbar */}
        <nav className="navbar">
          <div className="logo">LMS</div>
          <ul className="nav-links">
            <li className="active">Home</li>
            <li>Courses</li>
          </ul>
          <div className="nav-right">
            <FiBell />
            <FiSettings />
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt=""
              className="avatar"
            />
          </div>
        </nav>

        {/* Main Content */}
        <div className="content">

          {/* Left Side */}
          <div className="left-section">
            <div className="overlay">
              <h1>FUCHSIUS</h1>
              <p>Empowering education through seamless online learning.</p>
            </div>
          </div>

          {/* Right Side */}
          <div className="right-section">
            <div className="login-card">
              <h2>Welcome Back</h2>
              <p className="subtitle">Please enter your details to sign in.</p>

              <label>Email Address</label>
              <input type="email" placeholder="Enter your email" />

              <label>Password</label>
              <div className="password-box">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>

              <div className="options">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("forgot");
                  }}
                >
                  Forgot password?
                </a>
              </div>

              <button className="signin-btn">Sign In</button>

              <div className="social-divider">
                <span className="divider-line" />
                <span className="divider-text">or continue with</span>
                <span className="divider-line" />
              </div>

              <div className="social-grid">
                <button className="social-btn">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                    alt="Google"
                  />
                  Google
                </button>
                <button className="social-btn social-btn--facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                  </svg>
                  Facebook
                </button>
                <button className="social-btn social-btn--github">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </button>
              </div>

              <p className="signup-text">
                Don't have an account?{" "}
                <span onClick={() => onNavigate("register")}>Sign up</span>
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <footer className="footer">FUCHSIUS</footer>
      </div>
    </div>
  );
}

export default Login;
