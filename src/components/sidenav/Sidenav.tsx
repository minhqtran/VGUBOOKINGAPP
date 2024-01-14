import React from 'react';
import { Layout, Menu, ConfigProvider } from 'antd';
import {
  HomeOutlined,
  CalendarOutlined,
  CarOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  TeamOutlined,
  ToolOutlined,
  BookOutlined,
  UnorderedListOutlined,
  FileProtectOutlined,
  QuestionCircleOutlined,
  BellOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import VGULogo from '../../assets/img/VGU-logo2.png'
import './sidenav.css'
import 'boxicons'


const { Sider } = Layout;

const Sidenav: React.FC = () => {
  return (
    <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: '#F28130',
        borderRadius: 5,

        // Alias Token
        
      },
    }}
  >
    <Sider className='sider-container' width={250} theme="light" breakpoint="lg" collapsedWidth="0">
        <div className="sider-logo-name-container">
          <img src={VGULogo} alt="Logo" className="sider-logo" />
          <div className="sider-app-name">VGU Booking App</div>
        </div>
        <Menu 
            mode="vertical" 
            theme="light" 
            defaultSelectedKeys={['1']}
            className='sider-menu-bar'
        >
        {/* Booking Section */}
        <Menu.SubMenu  
          key="booking" 
          icon={<BookOutlined />} 
          title="Booking"
        >
          <Menu.Item 
            key="roomBooking" 
            
          >
            <Link 
              to="/room-booking"
            >
              Room Booking
            </Link>
          </Menu.Item>
          <Menu.Item key="vehicleBooking">
            <Link 
              to="/vehicle-booking"
            >
              Vehicle Booking
              </Link>
          </Menu.Item>
        </Menu.SubMenu>

        {/* My Booking Section */}
        <Menu.SubMenu 
          key="myBooking" 
          icon={<UnorderedListOutlined />} 
          title="My Booking List"
          className='sider-menu-submenu'
        >
          <Menu.Item key="roomBookingList">
            <Link to="/room-booking-list">Room Booking List</Link>
          </Menu.Item>
          <Menu.Item key="carBookingList">
            <Link to="/car-booking-list">Car Booking List</Link>
          </Menu.Item>
        </Menu.SubMenu>

        {/* Management Section */}
        <Menu.SubMenu key="management" icon={<ToolOutlined />} title="Management">
          <Menu.Item key="userManagement">
            <Link to="/user-management">User Management</Link>
          </Menu.Item>
          <Menu.Item key="appConfigManagement">
            <Link to="/app-config-management">App Config Management</Link>
          </Menu.Item>
        </Menu.SubMenu>

        {/* Regulation Section */}
        <Menu.Item key="regulation" icon={<FileProtectOutlined />}>
          <Link to="/regulation">Regulation</Link>
        </Menu.Item>

        {/* Help Section */}
        <Menu.Item key="help" icon={<QuestionCircleOutlined />}>
          <Link to="/help">Help</Link>
        </Menu.Item>

        {/* Notification Section */}
        <Menu.Item key="notification" icon={<BellOutlined />}>
          <Link to="/notification">Notification</Link>
        </Menu.Item>

        {/* Profile Section */}
        <div className="profile-section">
        <div className="profile-user-info">
          {/* Use the box-icon for the user icon */}
          <i className='bx bxs-user'></i>
          <div className="user-details">
            <div className="user-name">Hai Cao Xuan</div>
            <div className="user-role">Admin</div>
          </div>
        </div>
        <div className="user-email">16140@student.vgu.edu.vn</div>
      </div>
      </Menu>
    </Sider>
    </ConfigProvider>
  );
};

export default Sidenav;
