// src/App.tsx
import React from "react";
import "./App.css";
import Sidenav from "./components/sidenav/Sidenav";
import { Outlet } from "react-router";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Sidenav />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
