// RoomBooking.tsx

import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Select, Card, Button } from "antd";
import "./roombooking.css"; // Import CSS for styling (create this file)

const { Option } = Select;

const RoomBooking: React.FC = () => {
  const { building, roomId } = useParams<{
    building: string;
    roomId?: string;
  }>();
  const [selectedRoom, setSelectedRoom] = useState<any | null>(null);

  const handleBuildingChange = (value: string) => {
    // Redirect to the selected building route
    window.location.href = `/room-booking/${value.toLowerCase()}`;
  };

  const renderRoomList = () => {
    // Simulate room data (replace with actual data or API call)
    const roomData = [
      {
        id: 101,
        name: "Room 101",
        capacity: 50,
        location: "1st Floor",
        image: "room101.jpg",
      },
      {
        id: 102,
        name: "Room 102",
        capacity: 30,
        location: "2nd Floor",
        image: "room102.jpg",
      },
      {
        id: 103,
        name: "Room 103",
        capacity: 40,
        location: "3rd Floor",
        image: "room103.jpg",
      },
    ];

    return roomData.map((room) => (
      <Card
        key={room.id}
        title={room.name}
        style={{ width: 300, margin: "16px" }}
      >
        {/* Additional room information can be added here */}
        <Link to={`/room-booking/${building}/${room.id}`}>View Details</Link>
      </Card>
    ));
  };

  const fetchRoomDetails = () => {
    // Simulate fetching room details (replace with actual data or API call)
    const roomDetails = [
      {
        id: 101,
        name: "Room 101",
        capacity: 50,
        location: "1st Floor",
        image: "room101.jpg",
      },
      {
        id: 102,
        name: "Room 102",
        capacity: 30,
        location: "2nd Floor",
        image: "room102.jpg",
      },
      {
        id: 103,
        name: "Room 103",
        capacity: 40,
        location: "3rd Floor",
        image: "room103.jpg",
      },
    ];

    const room = roomDetails.find((r) => r.id === parseInt(roomId || "", 10));

    if (room) {
      setSelectedRoom(room);
    } else {
      // Handle not found scenario (redirect to building page or show an error)
      window.location.href = `/room-booking/${building}`;
    }
  };

  const handleBackButtonClick = () => {
    window.location.href = `/room-booking/${building}`;
  };

  const handleMakeBooking = () => {
    // Implement booking logic (can be a form submission or API call)
    console.log("Booking made for room:", selectedRoom);
  };

  React.useEffect(() => {
    if (roomId) {
      fetchRoomDetails();
    }
  }, [roomId]);

  return (
    <div>
      <h1>Room Booking</h1>
      {building && !roomId && (
        <>
          <Select
            defaultValue="Select Building"
            style={{ width: 200 }}
            onChange={handleBuildingChange}
          >
            <Option value="lecture-hall">Lecture Hall</Option>
            <Option value="admin-building">Admin Building</Option>
            <Option value="academic-cluster-1">Academic Cluster 1</Option>
          </Select>

          <div className="room-list-container">{renderRoomList()}</div>
        </>
      )}

      {selectedRoom && (
        <div>
          <Button onClick={handleBackButtonClick}>Back</Button>
          <h2>Room Details</h2>
          <Card
            title={selectedRoom.name}
            style={{ width: 300, margin: "16px" }}
          >
            <img
              src={selectedRoom.image}
              alt={selectedRoom.name}
              style={{ width: "100%" }}
            />
            <p>Capacity: {selectedRoom.capacity}</p>
            <p>Location: {selectedRoom.location}</p>
            <Button type="primary" onClick={handleMakeBooking}>
              Make Booking
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RoomBooking;
