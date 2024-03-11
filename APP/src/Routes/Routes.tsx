import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage/HomePage";
import VehicleBooking from "../components/vehiclebooking/VehicleBooking";
import Sidenav from "../components/sidenav/Sidenav";
import RoomBookingList from "../pages/roombookinglist/RoomBookingList";
import UserManagement from "../components/usermanagement/UserManagement";
import ForgotPass from "../components/forgotpass/Forgotpass";
import Login from "../pages/LoginPage/Login";
import Help from "../pages/HelpPage/Help";
import Regulation from "../pages/RegulationPage/Regulation";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // add more routes when needed
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <Login /> },
      { path: "/forgot-password", element: <ForgotPass /> },
      { path: "/sidenav", element: <Sidenav /> },
      { path: "/vehicle-booking", element: <VehicleBooking /> },
      { path: "/room-booking-list", element: <RoomBookingList /> },
      { path: "/user-management", element: <UserManagement /> },
      { path: "/help", element: <Help /> },
      { path: "/regulation", element: <Regulation /> },
    ],
  },
]);
