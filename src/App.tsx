// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import ForgotPass from './components/forgotpass/Forgotpass';
import Sidenav from './components/sidenav/Sidenav';
import './App.css'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPass/>} />
        <Route path="/sidenav" element={<Sidenav />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>

  );
};

export default App;
