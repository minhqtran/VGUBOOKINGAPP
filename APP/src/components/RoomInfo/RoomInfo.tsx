import "./roominfo.css";
import "../../App.css";

import React, { useState } from "react";
// import { useHistory } from "react-router-dom";

interface RoomInfoProps {
  roomName: string;
  roomType: string;
}

const RoomInfo: React.FC<RoomInfoProps> = ({ roomName, roomType }) => {
  const [selectedOption, setSelectedOption] = useState<string>("Overall Info");
  // const history = useHistory();

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  roomName = "Lecture Hall - Room 666";
  roomType = "You know what it is";

  const handleReturnButtonClick = () => {
    // history.goBack();
     // Go back to the previous page (room booking page)
  };

  return (
    <div className="room-info-container">
      <img
        src="your_image_url.jpg"
        alt="Room Picture"
        className="room-picture"
      />
      <div className="button-and-title-container">
        <button className="button return-button" type="button" onClick={handleReturnButtonClick}>
            Return
        </button>
        <div className="room-name">{roomName}</div>
      </div>
      <div className="room-type">{roomType}</div>
      <div className="option-buttons">
        <button
          className={`option-button ${
            selectedOption === "Overall Info" ? "selected" : ""
          }`}
          onClick={() => handleOptionClick("Overall Info")}
        >
          Overall Info
        </button>
        <button
          className={`option-button ${
            selectedOption === "More Info" ? "selected" : ""
          }`}
          onClick={() => handleOptionClick("More Info")}
        >
          More Info
        </button>
      </div>
      {selectedOption === "Overall Info" && (
        <div className="selected-option-content">
          <div className="room-description">This is testing for room info</div>
          <ul className="info-list">
            <li>8:00 - 16:00</li>
            <li>100 Persons</li>
            <li>Project Equipped</li>
            <li>CSE Manager, Operator, Admin</li>
          </ul>
        </div>
      )}
      {selectedOption === "More Info" && (
        <div className="selected-option-content">
          <div className="room-description">This is testing for room info</div>
          <div className="table-info">Import Table here</div>
        </div>
      )}
      <div className="booking-button-container">
        <button className="button booking-button" type="button" onClick={handleReturnButtonClick}>
            Create Booking
        </button>
      </div>
    </div>
  );
};

export default RoomInfo;
