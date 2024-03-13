import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import VehicleBooking from "../components/vehiclebooking/VehicleBooking";
import Sidenav from "../components/sidenav/Sidenav";
import RoomBookingList from "../Pages/roombookinglist/RoomBookingList";
import UserManagement from "../components/usermanagement/UserManagement";
import ForgotPass from "../components/forgotpass/Forgotpass";
import Login from "../Pages/LoginPage/Login";
import HelpPage from "../Pages/HelpPage/HelpPage";
import Regulation from "../Pages/RegulationPage/Regulation";
import RoomBooking from "../Pages/roombooking/RoomBooking";
import RoomInfo from "../components/RoomInfo/RoomInfo";
import NotiPage from "../Pages/NotiPage/NotiPage";

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
      { path: "/room-booking/:building?", element: <RoomBooking /> },
      { path: "/room-booking-list", element: <RoomBookingList /> },
      { path: "/user-management", element: <UserManagement /> },
      { path: "/help", element: <HelpPage /> },
      { path: "/regulation", element: <Regulation /> },
      { path: "/room-info", element: <RoomInfo roomName={""} roomType={""} /> },
      { path: "/notification", element: <NotiPage /> },
    ],
  },
]);
