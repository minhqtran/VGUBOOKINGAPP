import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import VehicleBooking from "../Components/vehiclebooking/VehicleBooking";
import Sidenav from "../Components/sidenav/Sidenav";
import RoomBookingList from "../Components/roombookinglist/RoomBookingList";
import UserManagement from "../Components/usermanagement/UserManagement";
import ForgotPass from "../Components/forgotpass/Forgotpass";
import Login from "../Pages/login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // add more routes when needed
      { path: "", element: <HomePage /> },
      { path: "/login", element: <Login /> },
      { path: "/forgot-password", element: <ForgotPass /> },
      { path: "/sidenav", element: <Sidenav /> },
      { path: "/vehicle-booking", element: <VehicleBooking /> },
      { path: "/room-booking-list", element: <RoomBookingList /> },
      { path: "/user-management", element: <UserManagement /> },
    ],
  },
]);
