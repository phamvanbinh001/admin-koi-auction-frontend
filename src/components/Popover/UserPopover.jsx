import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, Space, Pagination, Input, Popover, message } from 'antd';
import api from '../../configs/api';
import UserPopover from '../../components/Popover/UserPopover';
import FishPopover from '../../components/Popover/FishPopover';

const Request = ({ userId }) => {
  const [auctionRequests, setAuctionRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [approvalComments, setApprovalComments] = useState({}); // Lưu comment cho từng auction

  // Hàm fetch data với tham số page
  const fetchData = async (page = 0, size = 10) => {
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
    fetchData(currentPage);
  }, [currentPage]);

  // Hàm xử lý duyệt/từ chối auction
  const handleApproveOrReject = async (auctionId, status) => {
    const comment = approvalComments[auctionId] || '';
    if (!comment) {
      message.warning('Please provide a reason for approval/rejection.');
      return;
    }

    try {
      const response = await api.post(`/auction/staff/update-auction-status`, {
        auctionId,
        staffId: userId,
        status,
        comment,
      });
      message.success('Auction status updated successfully');
      fetchData(currentPage); // Tải lại dữ liệu sau khi duyệt
    } catch (error) {
      console.error('Failed to update auction status', error);
      message.error('Failed to update auction status');
    }
  };

  // Hàm thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page - 1);
  };

  const handleCommentChange = (auctionId, comment) => {
    setApprovalComments({
      ...approvalComments,
      [auctionId]: comment,
    });
  };

  const columns = [
    {
      title: 'Auction ID',
      dataIndex: ['auction', 'id'],
      key: 'auctionId',
      render: (text, record) => text,
    },
    {
      title: 'Koi ID',
      dataIndex: 'koiFish',
      key: 'koiFish',
      render: (koiFish) => (
        <FishPopover fishIds={koiFish}>
          <Button type="link">View Koi</Button>
        </FishPopover>
      ),
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
      render: (text) => (
        <UserPopover userId={text}>
          <Button type="link">View Owner</Button>
        </UserPopover>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space direction="vertical">
          <Input
            placeholder="Enter comment"
            value={approvalComments[record.auction.id] || ''}
            onChange={(e) => handleCommentChange(record.auction.id, e.target.value)}
          />
          <Space>
            <Button type="primary" onClick={() => handleApproveOrReject(record.auction.id, 'approve')}>
              Approve
            </Button>
            <Button danger onClick={() => handleApproveOrReject(record.auction.id, 'reject')}>
              Reject
            </Button>
          </Space>
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
        pagination={false}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Pagination current={currentPage + 1} total={totalPages * 10} pageSize={10} onChange={handlePageChange} />
      </div>
    </>
  );
};

export default Request;
