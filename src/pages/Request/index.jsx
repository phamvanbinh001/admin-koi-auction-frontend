import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, Space } from 'antd';
import api from '../../configs/api'; // Import đúng đường dẫn API của bạn

const RequestPage = () => {
  const [auctionRequests, setAuctionRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedKoi, setSelectedKoi] = useState(null);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [isKoiModalOpen, setIsKoiModalOpen] = useState(false);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [currentAuction, setCurrentAuction] = useState(null); // Để lưu phiên đấu giá hiện tại khi mở Action Modal

  useEffect(() => {
    // Fetch auction requests data
    const fetchData = async (page = 1, size = 10) => {
      try {
        const response = await api.get('/auction/get-auction-requets', {
          requireAuth: true,
          params: {
            page,
            size,
          },
        });
        setAuctionRequests(response.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleKoiClick = (koi) => {
    setSelectedKoi(koi);
    setIsKoiModalOpen(true);
  };

  const handleOwnerClick = (owner) => {
    setSelectedOwner(owner);
    setIsOwnerModalOpen(true);
  };

  const handleActionClick = (auction) => {
    setCurrentAuction(auction);
    setIsActionModalOpen(true);
  };

  const handleApprove = () => {
    // Gọi API để duyệt yêu cầu đấu giá
    console.log('Approve auction', currentAuction);
    setIsActionModalOpen(false); // Đóng modal sau khi thực hiện hành động
  };

  const handleReject = () => {
    // Gọi API để từ chối yêu cầu đấu giá
    console.log('Reject auction', currentAuction);
    setIsActionModalOpen(false); // Đóng modal sau khi thực hiện hành động
  };

  const columns = [
    {
      title: 'ID of Koi',
      dataIndex: 'auctionId',
      key: 'auctionId',
      render: (text, record) => (
        <Button type="link" onClick={() => handleKoiClick(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: 'Variety',
      dataIndex: 'variety',
      key: 'variety',
    },
    {
      title: 'Starting Bid',
      dataIndex: 'startingBid',
      key: 'startingBid',
    },
    {
      title: 'Estimated Value',
      dataIndex: 'estimatedValue',
      key: 'estimatedValue',
    },
    {
      title: 'Buy Now Price',
      dataIndex: 'buyNowPrice',
      key: 'buyNowPrice',
    },
    {
      title: 'Expected Auction Date',
      dataIndex: 'expectedAuctionDate',
      key: 'expectedAuctionDate',
    },
    {
      title: 'Expected End Date',
      dataIndex: 'expectedEndDate',
      key: 'expectedEndDate',
    },
    {
      title: 'Owner',
      dataIndex: 'breederName',
      key: 'breederName',
      render: (text, record) => (
        <Button type="link" onClick={() => handleOwnerClick(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleActionClick(record)}>
            Approve/Reject
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={auctionRequests} loading={loading} rowKey="auctionId" />

      {/* Koi Details Modal */}
      <Modal title="Koi Details" open={isKoiModalOpen} onCancel={() => setIsKoiModalOpen(false)} footer={null}>
        {selectedKoi && (
          <div>
            <p>
              <strong>ID:</strong> {selectedKoi.auctionId}
            </p>
            <p>
              <strong>Name:</strong> {selectedKoi.koiName}
            </p>
            <p>
              <strong>Variety:</strong> {selectedKoi.variety}
            </p>
            <p>
              <strong>Starting Bid:</strong> {selectedKoi.startingBid}
            </p>
            <p>
              <strong>Estimated Value:</strong> {selectedKoi.estimatedValue}
            </p>
            <p>
              <strong>Size:</strong> {selectedKoi.size}
            </p>
            <p>
              <strong>Born In:</strong> {selectedKoi.bornIn}
            </p>
            <img src={selectedKoi.imageUrl} alt={selectedKoi.koiName} style={{ width: '100%' }} />
          </div>
        )}
      </Modal>

      {/* Owner Details Modal */}
      <Modal title="Owner Details" open={isOwnerModalOpen} onCancel={() => setIsOwnerModalOpen(false)} footer={null}>
        {selectedOwner && (
          <div>
            <p>
              <strong>Breeder Name:</strong> {selectedOwner.breederName}
            </p>
            <p>
              <strong>Other Details:</strong> More info can be added here...
            </p>
          </div>
        )}
      </Modal>

      {/* Approve/Reject Action Modal */}
      <Modal
        title="Approve/Reject Auction"
        open={isActionModalOpen}
        onCancel={() => setIsActionModalOpen(false)}
        footer={[
          <Button key="reject" type="danger" onClick={handleReject}>
            Reject
          </Button>,
          <Button key="approve" type="primary" onClick={handleApprove}>
            Approve
          </Button>,
        ]}
      >
        {currentAuction && (
          <div>
            <p>
              <strong>ID of Koi:</strong> {currentAuction.auctionId}
            </p>
            <p>
              <strong>Variety:</strong> {currentAuction.variety}
            </p>
            <p>
              <strong>Starting Bid:</strong> {currentAuction.startingBid}
            </p>
            <p>Do you want to approve or reject this auction request?</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default RequestPage;
