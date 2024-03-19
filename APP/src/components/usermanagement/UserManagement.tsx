// UserManagement.tsx

import React, { useState } from "react";
import { Layout, Button, Table, Card, Modal, Form, Input } from "antd";
import Sidenav from "../sidenav/Sidenav";
import userData from "./userData"; // Import sample user data
import "./usermanagement.css"; // Import CSS for styling

const { Content } = Layout;

const UserManagement: React.FC = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a: any, b: any) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Staff Code",
      dataIndex: "staffCode",
      key: "staffCode",
    },
  ];

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isViewModalVisible, setIsViewModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [
    isDeleteConfirmationModalVisible,
    setIsDeleteConfirmationModalVisible,
  ] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleRowClick = (record: any) => {
    setSelectedUser(record);
    setIsViewModalVisible(true);
    form.setFieldsValue(record); // Populate form fields with user data
  };

  const handleExportData = () => {
    // Logic for exporting data
  };

  const handleAddUser = () => {
    // Logic for adding a user
  };

  const handleCloseViewModal = () => {
    setIsViewModalVisible(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
  };

  const handleEditUser = () => {
    setIsEditModalVisible(true);
  };

  const handleSaveEdit = () => {
    // Logic for saving edited user data
    const updatedUserData = userData.map((user: any) =>
      user.id === selectedUser.id ? { ...user, ...form.getFieldsValue() } : user
    );

    // Save updated data to userData file (you might need to use appropriate APIs or storage mechanisms)
    console.log(updatedUserData);

    // Close both modals
    setIsViewModalVisible(false);
    setIsEditModalVisible(false);
  };

  const handleConfirmDeleteUser = () => {
    // Logic for confirming and deleting the user
    const updatedUserData = userData.filter(
      (user: any) => user.id !== selectedUser.id
    );

    // Save updated data to userData file (you might need to use appropriate APIs or storage mechanisms)
    console.log(updatedUserData);

    // Close both modals
    setIsDeleteConfirmationModalVisible(false);
    setIsViewModalVisible(false);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>

      <Layout className="site-layout">
        <Content style={{ margin: "16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <div className="user-management-header">
              <Button type="primary" onClick={handleExportData}>
                Export Data
              </Button>
              <Button type="primary" onClick={handleAddUser}>
                Add User
              </Button>
            </div>
            <Table
              columns={columns}
              dataSource={userData}
              rowKey="id"
              onRow={(record) => ({
                onClick: () => handleRowClick(record),
              })}
            />
            {selectedUser && (
              <>
                <Modal
                  title="User Information"
                  open={isViewModalVisible}
                  onCancel={handleCloseViewModal}
                  footer={[
                    <Button key="close" onClick={handleCloseViewModal}>
                      Close
                    </Button>,
                    <Button key="edit" type="primary" onClick={handleEditUser}>
                      Edit
                    </Button>,
                    <Button
                      key="delete"
                      className="delete-button"
                      onClick={() => setIsDeleteConfirmationModalVisible(true)}
                    >
                      Delete
                    </Button>,
                  ]}
                >
                  {/* Display user information */}
                  <p>ID: {selectedUser.id}</p>
                  <p>Name: {selectedUser.name}</p>
                  <p>Email: {selectedUser.email}</p>
                  <p>Role: {selectedUser.role}</p>
                  <p>Department: {selectedUser.department}</p>
                  <p>Staff Code: {selectedUser.staffCode}</p>
                </Modal>
                <Modal
                  title="Edit User Information"
                  open={isEditModalVisible}
                  onCancel={handleCloseEditModal}
                  footer={[
                    <Button key="close" onClick={handleCloseEditModal}>
                      Close
                    </Button>,
                    <Button key="save" type="primary" onClick={handleSaveEdit}>
                      Save
                    </Button>,
                  ]}
                >
                  <Form form={form}>
                    {/* Include form fields for editing user information */}
                    <Form.Item label="ID" name="id">
                      <Input readOnly />
                    </Form.Item>
                    <Form.Item label="Name" name="name">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Role" name="role">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Department" name="department">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Staff Code" name="staffCode">
                      <Input />
                    </Form.Item>
                  </Form>
                </Modal>
                <Modal
                  title="Confirm Deletion"
                  open={isDeleteConfirmationModalVisible}
                  onCancel={() => setIsDeleteConfirmationModalVisible(false)}
                  onOk={handleConfirmDeleteUser}
                >
                  Are you sure you want to delete this user?
                </Modal>
              </>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserManagement;
