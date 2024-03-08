// src/App.tsx
import React from "react";
import "./App.css";
import Sidenav from "./Components/sidenav/Sidenav";
import { Outlet } from "react-router";

const App: React.FC = () => {
  return (
    <>
      <Sidenav />
      <Outlet />
    </>
  );
};

export default App;
