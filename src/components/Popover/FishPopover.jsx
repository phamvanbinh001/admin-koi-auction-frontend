import React, { useState } from 'react';
import { Popover, List, Spin, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import axios from 'axios';

const defaultImage = 'src/assets/defaultKoi.jpg';

const FishPopover = ({ fishIds, children }) => {
  const [fishData, setFishData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchFishData = async () => {
    if (!fishData) {
      setLoading(true);
      try {
        const fishDetails = await Promise.all(
          fishIds.map(async (fishId) => {
            const response = await axios.get(
              `https://koi-auction-backend-dwe7hvbuhsdtgafe.southeastasia-01.azurewebsites.net/api/koi-fish/${fishId}`,
            );
            return response.data;
          }),
        );
        setFishData(fishDetails);
      } catch (error) {
        setFishData('Failed to fetch fish data');
        console.error('Failed to fetch fish data', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleNextFish = () => {
    if (currentIndex < fishData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevFish = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const content = fishData ? (
    <div
      style={{
        minWidth: '400px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        color: '#333',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      {fishData.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <Button
            icon={<LeftOutlined />}
            onClick={handlePrevFish}
            disabled={currentIndex === 0}
            style={{
              backgroundColor: '#808080',
              border: '2px solid #d9d9d9',
              borderRadius: '5px',
              width: '30px',
              height: '30px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '18px',
            }}
          />
          <Button
            icon={<RightOutlined />}
            onClick={handleNextFish}
            disabled={currentIndex === fishData.length - 1}
            style={{
              backgroundColor: '#808080',
              color: '#fff',
              border: '2px solid #d9d9d9',
              borderRadius: '5px',
              width: '30px',
              height: '30px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '18px',
            }}
          />
        </div>
      )}

      {/* images */}
      {fishData[currentIndex].mediaList?.[0]?.url ? (
        <div style={{ marginBottom: '0' }}>
          <img
            src={fishData[currentIndex].mediaList[0].url}
            alt={fishData[currentIndex].koiName}
            style={{
              maxWidth: '100%',
              maxHeight: '300px',
              objectFit: 'cover',
              borderRadius: '10px',
              border: '2px solid #1890ff',
            }}
            onError={(e) => (e.target.src = defaultImage)} // Thay đổi ảnh lỗi thành ảnh mặc định
          />
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            height: '300px',
            backgroundColor: '#e0e0e0',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '18px',
            color: '#999',
          }}
        >
          <img
            src={defaultImage}
            alt="default koi"
            style={{
              maxWidth: '100%',
              maxHeight: '300px',
              objectFit: 'cover',
              borderRadius: '10px',
              border: '2px solid #1890ff',
            }}
          />
        </div>
      )}

      <List.Item>
        <List.Item.Meta
          title={<b>{fishData[currentIndex].koiName || 'Unknown Name'}</b>}
          description={
            <div style={{ textAlign: 'left' }}>
              <p>
                <b>ID:</b> {fishData[currentIndex].koiId}
              </p>
              <p>
                <b>Type:</b> {fishData[currentIndex].koiTypeName}
              </p>
              <p>
                <b>Origin:</b> {fishData[currentIndex].koiOriginName}
              </p>
              <p>
                <b>Weight:</b> {fishData[currentIndex].weight} kg
              </p>
              <p>
                <b>Sex:</b> {fishData[currentIndex].sex}
              </p>
              <p>
                <b>Length:</b> {fishData[currentIndex].length} cm
              </p>
              <p>
                <b>Description:</b> {fishData[currentIndex].description}
              </p>
            </div>
          }
        />
      </List.Item>
    </div>
  ) : loading ? (
    <Spin />
  ) : (
    'No data available'
  );

  return (
    <Popover
      content={content}
      placement="right"
      trigger="click"
      overlayStyle={{ maxWidth: '400px' }}
      onClick={fetchFishData} // Lấy dữ liệu khi nhấn
    >
      <span style={{ cursor: 'pointer' }}>{children}</span>
    </Popover>
  );
};

export default FishPopover;
