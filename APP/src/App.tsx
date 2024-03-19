// src/App.tsx
import React from "react";
import "./App.css";
import Sidenav from "./Components/sidenav/Sidenav";
import { Outlet } from "react-router";

const App: React.FC = () => {
  return (
    <>
    <div className="app-container">
      <Sidenav />
      <Outlet />
    </div>
    </>
  );
};

export default App;
