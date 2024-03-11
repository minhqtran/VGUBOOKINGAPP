// RoomBooking.tsx

import React from "react";
import { useTable } from "react-table";
import { Layout, Card, Select, DatePicker } from "antd";
import Sidenav from "../sidenav/Sidenav";
import columns from "./columns"; // Import the columns array
import "./roombooking.css";

const { Content } = Layout;
const { Option } = Select;

const RoomBooking: React.FC = () => {
  const data = React.useMemo(() => {
    // your data logic
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout className="site-layout">
        <Content style={{ margin: "16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <div className="roombooking-controls">
              <Select
                defaultValue="all"
                style={{ width: 120, marginRight: 16 }}
              >
                <Option value="all">All Categories</Option>
                <Option value="lectureHall">Lecture Hall</Option>
                <Option value="adminBuilding">Admin Building</Option>
                <Option value="academicCluster1">Academic Cluster 1</Option>
                {/* Add other category options here */}
              </Select>
              <DatePicker style={{ marginRight: 16 }} />
            </div>
            <div className="room-cards">
              {rows.map((row) => (
                <Card key={row.id} className="room-card">
                  {/* Render your room card content here */}
                </Card>
              ))}
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default RoomBooking;
