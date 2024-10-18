import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, Space, Pagination } from 'antd';
import api from '../../configs/api';
import FishPopover from '../../components/Popover/FishPopover';
import UserPopover from '../../components/Popover/UserPopover';

const Request = () => {
  const [auctionRequests, setAuctionRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedKoi, setSelectedKoi] = useState(null);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [isKoiModalOpen, setIsKoiModalOpen] = useState(false);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [currentAuction, setCurrentAuction] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // Mặc định trang đầu là 0
  const [totalPages, setTotalPages] = useState(0); // Lưu tổng số trang

  // Hàm fetch data với tham số page
  const fetchData = async (page = 0, size = 2) => {
    try {
      setLoading(true);
      const response = await api.get('/auction/staff/get-auction-request', {
        requireAuth: true,
        params: {
          page,
          size,
        },
      });
      setAuctionRequests(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage); // Gọi fetchData khi component load với trang hiện tại là 0
  }, [currentPage]);

  const handlePageChange = (page) => {
    console.log('render page: ', page);

    setCurrentPage(page - 1); // Chuyển trang, nhưng trừ đi 1 để đúng với API bắt đầu từ 0
    fetchData(page - 1);
  };

  const handleOwnerClick = (record) => {
    setSelectedOwner(record.auction.breederID);
    setIsOwnerModalOpen(true);
  };

  const handleActionClick = (auction) => {
    setCurrentAuction(auction);
    setIsActionModalOpen(true);
  };

  const handleApprove = () => {
    console.log('Approve auction', currentAuction);
    setIsActionModalOpen(false);
  };

  const handleReject = () => {
    console.log('Reject auction', currentAuction);
    setIsActionModalOpen(false);
  };

  const columns = [
    {
      title: 'Auction ID',
      dataIndex: ['auction', 'id'],
      key: 'auctionId',
    },
    {
      title: 'Koi ID',
      dataIndex: 'koiFish',
      key: 'koiFish',
      render: (koiFish) => koiFish.join(', '),
    },
    {
      title: 'Starting Price',
      dataIndex: ['auction', 'startingPrice'],
      key: 'startingPrice',
    },
    {
      title: 'Buy Now Price',
      dataIndex: ['auction', 'buyoutPrice'],
      key: 'buyoutPrice',
    },
    {
      title: 'Bid Step',
      dataIndex: ['auction', 'bidStep'],
      key: 'bidStep',
    },
    {
      title: 'Auction method',
      dataIndex: ['auction', 'auctionMethod'],
      key: 'auctionMethod',
    },
    {
      title: 'Start Time',
      dataIndex: ['auction', 'startTime'],
      key: 'startTime',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'End Time',
      dataIndex: ['auction', 'endTime'],
      key: 'endTime',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Owner',
      dataIndex: ['auction', 'breederID'],
      key: 'breederID',
      render: (text, record) => (
        <Button type="link" onClick={() => handleOwnerClick(record)}>
          Breeder {text}
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
      <Table
        columns={columns}
        dataSource={auctionRequests}
        loading={loading}
        rowKey={(record) => record.auction.id}
        pagination={false} // Tắt phân trang của Ant Design, dùng Pagination riêng
      />

      {/* Koi Details Modal */}
      <Modal title="Koi Details" open={isKoiModalOpen} onCancel={() => setIsKoiModalOpen(false)} footer={null}>
        {selectedKoi && (
          <div>
            <p>
              <strong>Koi Fish IDs:</strong> {selectedKoi.join(', ')}
            </p>
          </div>
        )}
      </Modal>

      {/* Owner Details Modal */}
      <Modal title="Owner Details" open={isOwnerModalOpen} onCancel={() => setIsOwnerModalOpen(false)} footer={null}>
        {selectedOwner && (
          <div>
            <p>
              <strong>Breeder ID:</strong> {selectedOwner}
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
              <strong>ID of Koi:</strong> {currentAuction.auction.id}
            </p>
            <p>
              <strong>Starting Price:</strong> {currentAuction.auction.startingPrice}
            </p>
            <p>
              <strong>Buy Now Price:</strong> {currentAuction.auction.buyoutPrice}
            </p>
            <p>Do you want to approve or reject this auction request?</p>
          </div>
        )}
      </Modal>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        {' '}
        {/* Căn Pagination sang phải */}
        <Pagination
          current={currentPage + 1} // Chuyển currentPage từ 0-based sang 1-based cho UI
          total={totalPages * 10} // Tổng số item (lấy totalPages từ API và nhân với số item mỗi trang)
          pageSize={10} // Số lượng item trên mỗi trang
          onChange={handlePageChange} // Gọi hàm khi chuyển trang
        />
      </div>
    </>
  );
};

export default Request;
