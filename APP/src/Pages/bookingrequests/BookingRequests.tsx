import React, { useState } from "react";
import { Layout, Table, Button, Modal, Form, Input, Select } from "antd";
import "./bookingrequests.css"; // Import CSS for styling
import requestsData from "./requestsData"; // Import CSS for styling

const { Content } = Layout;
const { Option } = Select;

const BookingRequests: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>(requestsData);

  const columns = [
    {
      title: "No",
      dataIndex: "number",
      key: "number",
    },
    {
        title: "From",
        dataIndex: "from",
        key: "from",
      },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span className={`status-${status.toLowerCase()}`}>{status}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <span>
          <Button
            type="link"
            className="accept-button"
            onClick={() => handleAccept(record)}
          >
            Accept
          </Button>
          <Button
            type="link"
            className="decline-button"
            onClick={() => handleDecline(record)}
          >
            Decline
          </Button>
        </span>
      ),
    },
  ];

  const handleAccept = (record: any) => {
    // Update the status of the selected booking to "accepted"
    const updatedBookings = bookings.map((booking) =>
      booking.number === record.number ? { ...booking, status: "accepted" } : booking
    );
    setBookings(updatedBookings);
  };

  const handleDecline = (record: any) => {
    // Update the status of the selected booking to "declined"
    const updatedBookings = bookings.map((booking) =>
      booking.number === record.number ? { ...booking, status: "declined" } : booking
    );
    setBookings(updatedBookings);
  };

  
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout className="site-layout">
        <Content style={{ margin: "0px" }}>


          <Table
            columns={columns}
            dataSource={requestsData}
            rowKey="number"
          />

        </Content>
      </Layout>
    </Layout>
  );
};

export default BookingRequests;
