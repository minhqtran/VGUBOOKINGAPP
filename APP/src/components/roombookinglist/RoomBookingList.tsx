// RoomBookingList.tsx

import React, { useState } from 'react';
import { Layout, Table, Button, Modal } from 'antd';
import Sidenav from '../sidenav/Sidenav';
import roomBookingData from './roomBookingData'; // Import sample room booking data
import './roombookinglist.css'; // Import CSS for styling

const { Content } = Layout;

const RoomBookingList: React.FC = () => {
  const columns = [
    {
      title: 'No',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span className={`status-${status.toLowerCase()}`}>{status}</span>
      ),
    },
    {
        title: 'Action',
        key: 'action',
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

  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isDeleteConfirmationModalVisible, setIsDeleteConfirmationModalVisible] =
    useState<boolean>(false);

  const handleEdit = (record: any) => {
    // Handle edit logic
    console.log('Edit', record);
  };

  const handleDelete = (record: any) => {
    // Handle delete logic
    setSelectedBooking(record);
    setIsDeleteConfirmationModalVisible(true);
  };

  const handleConfirmDelete = () => {
    // Handle confirm delete logic
    console.log('Delete', selectedBooking);
    setIsDeleteConfirmationModalVisible(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationModalVisible(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidenav />

      <Layout className="site-layout">
        <Content style={{ margin: '16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Table columns={columns} dataSource={roomBookingData} rowKey="number" />
            <Modal
              title="Confirm Delete"
              visible={isDeleteConfirmationModalVisible}
              onOk={handleConfirmDelete}
              onCancel={handleCancelDelete}
            >
              <p>Are you sure you want to delete this booking?</p>
            </Modal>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default RoomBookingList;
