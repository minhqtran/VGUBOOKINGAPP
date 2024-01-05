// import React, { useEffect, useState } from 'react';
import './login.css';
// import { Link, useNavigate } from 'react-router-dom';
import login_img from './assets/img/login-bg.jpg';
import VGU_logo from './assets/img/VGU-logo.png';
// import { auth, logInWithEmailAndPassword } from '../../firebase';
// import { useAuthState } from 'react-firebase-hooks/auth';


function Login() {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [user, loading, error] = useAuthState(auth);

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     // Handle form submission logic
//   };

//   const navigate = useNavigate();
//   useEffect(() => {
//     if (loading) {
//       // maybe trigger a loading screen
//       return;
//     }
//     if (user) navigate('/dashboard');
//   }, [user, loading, navigate]);

  return (
    <div className="main-login">
      <div className="login-contain">
        <div id="logo">
          <a href="/">
            <img
              src={VGU_logo}
              alt="VGU Logo"
              style={{ width: '130px', height: '90px', objectFit: 'fill' }}
            />
          </a>
        </div>
        <div className="left-side">
          <div className="title">Welcome Back!</div>
          <h2>Please sign in to use the system.</h2>
          <form 
        //   onSubmit={handleSubmit}
          >
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
            //   value={email}
            //   onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="pass"
            //   value={password}
            //   onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />

            <button
              type="submit"
              id="button_login"
            //   onClick={() => {
            //     logInWithEmailAndPassword(email, password);
            //   }}
            >
              Sign in
            </button>
          </form>
        </div>

        <div className="right-side">
          <img
            src={login_img}
            alt="Login Background"
            style={{ width: '95%', height: '100%', objectFit: 'fill' }}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
