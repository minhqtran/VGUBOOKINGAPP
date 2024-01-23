// CarBooking.tsx

import React from "react";
import Sidenav from "../sidenav/Sidenav";

const VehicleBooking: React.FC = () => {
  return (
    <div>
      <Sidenav />
      <div style={{ marginLeft: "200px", padding: "16px" }}>
        <h1>Car Booking</h1>
      </div>
    </div>
  );
};

export default VehicleBooking;
