// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import ForgotPass from './components/forgotpass/Forgotpass';
import Sidenav from './components/sidenav/Sidenav';
import './App.css'
import RoomBooking from './components/roombooking/RoomBooking';
import VehicleBooking from './components/vehiclebooking/VehicleBooking';
import UserManagement from './components/usermanagement/UserManagement';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPass/>} />
        <Route path="/sidenav" element={<Sidenav />} />
        {/* <Route path="/room-booking" element={<RoomBooking />} /> */}
        <Route path="/vehicle-booking" element={<VehicleBooking />} />
        <Route path="/user-management" element={<UserManagement />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>

  );
};

export default App;
