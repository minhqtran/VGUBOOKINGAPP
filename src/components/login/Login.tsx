// src/Login.tsx
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './login.css'

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const history = useHistory();

  const handleLogin = () => {
    // Add your authentication logic here
    // For simplicity, we're just redirecting to a dashboard page
    history.push('/dashboard');
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
         <Link to="/signup">Forgot password</Link>
    </div>
  );
};

export default Login;
