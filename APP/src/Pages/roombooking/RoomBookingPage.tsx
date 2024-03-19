import React from 'react';
import { useParams } from 'react-router-dom';
import RoomBooking from './RoomBooking';

const RoomBookingPage: React.FC = () => {
  const { building } = useParams<{ building: string }>();

  return (
    <div>
      <h1>Room Booking</h1>
      <RoomBooking building={building} />
    </div>
  );
};

export default RoomBookingPage;
