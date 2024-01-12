// src/auth/Login.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import loginBgImage from '../../assets/img/login-bg.jpg';
import loginLogo from '../../assets/img/VGU-logo.png';
import './Login.css'; // Import the CSS file

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleLogin = () => {
    // Add your authentication logic here
    // For simplicity, we're just redirecting to a dashboard page
  };

  return (
    <div className="grid wide login-container">
      <div className="row login-container-wrapper">
        <div className="col l-4 m-0 c-0">
          <div className="login-form-container">
            <img src={loginLogo} alt="VGU Logo" className='login-form-logo' />
            <div>
              <h1 className="login-form-title">VGU Booking App</h1>
              <p className="login-form-subtitle">Please Sign in to continue</p>
            </div>
            
            <form className="login-form-content">
              <label className="login-form-label" htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                className="login-form-input"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              <label className="login-form-label" htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                className="login-form-input"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <div className="login-remember-forgot-container">
                <div className="login-remember-me">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    className='login-remember-checkbox'
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label className='login-remember-label' htmlFor="rememberMe">Remember me</label>
                </div>
                <div className="login-forgot-password">
                  <Link className="login-forgot-password-link" to="/forgot-password">Forgot Password?</Link>
                </div>
              </div>
              <button className="button login-form-button" type="button" onClick={handleLogin}>
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="col l-8 m-12 c-12">
          <div className="login-image-container">
            <img src={loginBgImage} alt="Login Background" className="login-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
