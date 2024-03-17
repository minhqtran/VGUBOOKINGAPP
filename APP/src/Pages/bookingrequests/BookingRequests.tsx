// RoomBookingList.tsx

import React, { useState } from "react";
import { Layout, Table, Button, Modal, Form, Input, Select } from "antd";
import "./bookingrequests.css"; // Import CSS for styling
import requestsData from "./requestsData"; // Import CSS for styling

const { Content } = Layout;
const { Option } = Select;

const BookingRequests: React.FC = () => {
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

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

  const [
    isDeleteConfirmationModalVisible,
    setIsDeleteConfirmationModalVisible,
  ] = useState<boolean>(false);

  const handleEdit = (record: any) => {
    setSelectedBooking(record);
    setIsEditModalVisible(true);
  };

  const handleSaveEdit = () => {
    // Handle save edited booking logic
    setIsEditModalVisible(false);
  };

  const handleDelete = (record: any) => {
    // Handle delete logic
    setSelectedBooking(record);
    setIsDeleteConfirmationModalVisible(true);
  };

  const handleConfirmDelete = () => {
    // Handle confirm delete logic
    console.log("Delete", selectedBooking);
    setIsDeleteConfirmationModalVisible(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationModalVisible(false);
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
