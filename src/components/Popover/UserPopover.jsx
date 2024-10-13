import React, { useState } from 'react';
import { Popover, Spin, Avatar, Button } from 'antd';
import { StarFilled } from '@ant-design/icons';
import axios from 'axios';

const UserPopover = ({ userId, children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    if (!userData) {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://koi-auction-backend-dwe7hvbuhsdtgafe.southeastasia-01.azurewebsites.net/api/admin-manager/users/get-user/${userId}`,
        );
        setUserData(response.data);
      } catch (error) {
        setUserData('Failed to fetch user data');
        console.error('Failed to fetch user data', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const renderStars = (role) => {
    let starCount = 0;
    switch (role) {
      case 'Staff':
        starCount = 3;
        break;
      case 'Admin':
        starCount = 5;
        break;
      case 'Breeder':
        starCount = 1;
        break;
      default:
        starCount = 0;
        break;
    }
    return (
      <div>
        {[...Array(starCount)].map((_, index) => (
          <StarFilled key={index} style={{ color: 'gold', fontSize: '16px', marginRight: '2px' }} />
        ))}
      </div>
    );
  };

  const srcAvatar = (role) => {
    switch (role) {
      case 'Admin':
        return 'src/assets/adminAvt.png';
      case 'Staff':
        return 'src/assets/staffAvt.png';
      case 'Breeder':
        return 'src/assets/breederAvt.png';
      default:
        return 'src/assets/defaultAvt.png';
    }
  };

  const content = userData ? (
    <div
      style={{
        minWidth: '300px',
        padding: '10px',
        backgroundColor: '#282c34',
        color: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgbYa(0, 0, 0, 0.15)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <Avatar src={srcAvatar(userData.role)} size={64} style={{ marginRight: '10px', border: '2px solid #1890ff' }} />
        <div>
          <h3 style={{ color: 'white', margin: 0 }}>{userData.fullName}</h3>
          {renderStars(userData.role)} {/* Hiển thị sao dựa trên vai trò */}
        </div>
      </div>
      <p style={{ margin: 0 }}>
        <b>Email:</b> {userData.email}
      </p>
      <p style={{ margin: 0 }}>
        <b>Phone:</b> {userData.phoneNumber}
      </p>
      <p style={{ margin: 0 }}>
        <b>Role:</b> {userData.role}
      </p>
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <Button type="primary" style={{ flex: 1, marginRight: '5px' }}>
          Chat
        </Button>
        <Button type="default" style={{ flex: 1 }}>
          Mail
        </Button>
      </div>
    </div>
  ) : (
    'No data available'
  );

  return (
    <Popover
      content={content}
      title="User Details"
      trigger="hover"
      placement="right"
      onClick={fetchUserData}
      overlayStyle={{ maxWidth: '400px' }}
    >
      <span style={{ cursor: 'pointer' }} onMouseEnter={fetchUserData}>
        {/* {children || 'User Details'} */}
        {children || <Avatar src="src/assets/defaultAvt.png" />}
      </span>
    </Popover>
  );
};

export default UserPopover;
