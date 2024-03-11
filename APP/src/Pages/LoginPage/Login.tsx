// src/auth/Login.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginBgImage from "../../assets/img/login-bg.jpg";
import loginLogo from "../../assets/img/VGU-logo.png";
import "./login.css"; // Import the CSS file

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  // const history = useHistory();

  const isValidCredentials = () => {
    // Your logic to validate credentials (e.g., comparing with predefined values)
    // Return true if credentials are valid, otherwise return false
    const sampleEmail = "admin@vgu.com";
    const samplePassword = "admin123";

    return email === sampleEmail && password === samplePassword;
  };

  const handleLogin = () => {
    // Check if entered credentials match the sample credentials
    if (isValidCredentials()) {
      // Logic for successful login, e.g., redirect to dashboard
      // history.push('/dashboard');
      console.log("Successfully logged in");
    } else {
      // Handle unsuccessful login with a toast notification
      toast.error("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="grid wide login-container">
      <div className="row login-container-wrapper">
        <div className="col l-4 m-0 c-0">
          <div className="login-form-container">
            <img src={loginLogo} alt="VGU Logo" className="login-form-logo" />
            <div>
              <h1 className="login-form-title">VGU Booking App</h1>
              <p className="login-form-subtitle">Please Sign in to continue</p>
            </div>

            <form className="login-form-content">
              <label className="login-form-label" htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                className="login-form-input"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              <label className="login-form-label" htmlFor="password">
                Password:
              </label>
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
                    className="login-remember-checkbox"
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label className="login-remember-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <div className="login-forgot-password">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </div>
              </div>
              <button
                className="button login-form-button"
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="col l-8 m-12 c-12">
          <div className="login-image-container">
            <img
              src={loginBgImage}
              alt="Login Background"
              className="login-img"
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
