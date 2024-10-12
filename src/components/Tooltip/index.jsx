import React, { useState } from 'react';
import { Tooltip, Spin } from 'antd';
import api from '../../auth/api';

// Tooltip cho user
const UserTooltip = ({ userId }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/admin-manager/users/get-user/${userId}`);
      setUserInfo(response.data);
    } catch (error) {
      console.error('Failed to fetch user details', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVisibleChange = (visible) => {
    if (visible && !userInfo) {
      fetchUserDetails();
    }
  };

  return (
    <Tooltip
      title={
        loading ? (
          <Spin />
        ) : userInfo ? (
          <div style={{ textAlign: 'left' }}>
            <p>
              <b>Name:</b> {userInfo.name || 'N/A'}
            </p>
            <p>
              <b>Phone:</b> {userInfo.phone || 'N/A'}
            </p>
            <p>
              <b>Email:</b> {userInfo.email || 'N/A'}
            </p>
            <p>
              <b>Role:</b> {userInfo.role || 'N/A'}
            </p>
          </div>
        ) : (
          'No data available'
        )
      }
      open={handleVisibleChange}
    >
      <b style={{ color: 'blue' }}>Hover Here</b>
    </Tooltip>
  );
};

// Tooltip cho fish
const FishTooltip = ({ fishIds }) => {
  const [fishDetails, setFishDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFishDetails = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/auction/get-fish-details`, { params: { ids: fishIds } });
      setFishDetails(response.data);
    } catch (error) {
      console.error('Failed to fetch fish details', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVisibleChange = (visible) => {
    if (visible && !fishDetails) {
      fetchFishDetails();
    }
  };

  return (
    <Tooltip
      title={
        loading ? (
          <Spin />
        ) : fishDetails ? (
          <div style={{ textAlign: 'left' }}>
            {fishDetails.map((fish, index) => (
              <div key={index}>
                <p>
                  <b>Fish ID:</b> {fish.id}
                </p>
                <p>
                  <b>Species:</b> {fish.species || 'N/A'}
                </p>
                <p>
                  <b>Size:</b> {fish.size || 'N/A'}
                </p>
                <hr />
              </div>
            ))}
          </div>
        ) : (
          'No data available'
        )
      }
      onVisibleChange={handleVisibleChange}
    >
      <b style={{ color: 'green' }}>Hover Here</b>
    </Tooltip>
  );
};

// Xuất ra cả UserTooltip và FishTooltip
export { UserTooltip, FishTooltip };
