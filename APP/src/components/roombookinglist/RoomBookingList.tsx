// RoomBookingList.tsx

import React, { useState } from "react";
import { Layout, Table, Button, Modal, Form, Input, Select } from "antd";
import Sidenav from "../sidenav/Sidenav";
import roomBookingData from "./roomBookingData"; // Import sample room booking data
import "./roombookinglist.css"; // Import CSS for styling

const { Content } = Layout;
const { Option } = Select;

const RoomBookingList: React.FC = () => {
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const columns = [
    {
      title: "No",
      dataIndex: "number",
      key: "number",
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
            className="edit-button"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="link"
            className="delete-button"
            onClick={() => handleDelete(record)}
          >
            Delete
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
      <Sidenav />

      <Layout className="site-layout">
        <Content style={{ margin: "16px" }}>
          {/* ... rest of the code ... */}

          <Table
            columns={columns}
            dataSource={roomBookingData}
            rowKey="number"
          />

          {/* Edit Booking Modal */}
          <Modal
            title="Edit Booking"
            visible={isEditModalVisible}
            onCancel={() => setIsEditModalVisible(false)}
            onOk={handleSaveEdit}
          >
            {/* Form for editing booking */}
            <Form>
              <Form.Item label="Number">
                <Input value={selectedBooking?.number} disabled />
              </Form.Item>
              <Form.Item label="Reason of Booking">
                <Input value={selectedBooking?.reason} />
              </Form.Item>
              <Form.Item label="Location">
                <Input value={selectedBooking?.location} />
              </Form.Item>
              <Form.Item label="Date">
                <Input value={selectedBooking?.date} />
              </Form.Item>
              <Form.Item label="Time">
                <Input value={selectedBooking?.time} />
              </Form.Item>
              <Form.Item label="Status">
                <Select value={selectedBooking?.status} disabled>
                  {/* Include options for different status values */}
                  <Option value="accepted">Accepted</Option>
                  <Option value="pending">Pending</Option>
                  <Option value="rejected">Rejected</Option>
                  <Option value="canceled">Canceled</Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default RoomBookingList;
