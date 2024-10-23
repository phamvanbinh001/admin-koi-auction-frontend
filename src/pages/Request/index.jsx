import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Pagination, message } from 'antd';
import api from '../../configs/api';
import FishPopover from '../../components/Popover/FishPopover';
import UserPopover from '../../components/Popover/UserPopover';
import ApproveAuction from '../../components/Modal/ApproveAuction';

const Request = () => {
  const [auctionRequests, setAuctionRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [currentAuction, setCurrentAuction] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0); // Lưu tổng số trang

  const fetchData = async (page = 0, size = 7) => {
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

  const handleActionClick = (auction) => {
    setCurrentAuction(auction); // Lưu auction hiện tại vào state
    setIsActionModalOpen(true);
  };

  const handleApprove = async () => {
    if (currentAuction) {
      try {
        const response = await api.post(`/auction/staff/approve/${currentAuction.auction.id}`, {
          // Thêm dữ liệu cần thiết nếu cần
        });
        message.success('Auction approved successfully!'); // Hiện thông báo thành công
        setIsActionModalOpen(false);
        fetchData(currentPage); // Cập nhật danh sách sau khi phê duyệt
      } catch (error) {
        message.error('Failed to approve auction. Please try again.');
      }
    }
  };

  const handleReject = async () => {
    if (currentAuction) {
      try {
        const response = await api.post(`/auction/staff/reject/${currentAuction.auction.id}`, {
          // Thêm dữ liệu cần thiết nếu cần
        });
        message.success('Auction rejected successfully!'); // Hiện thông báo thành công
        setIsActionModalOpen(false);
        fetchData(currentPage); // Cập nhật danh sách sau khi từ chối
      } catch (error) {
        message.error('Failed to reject auction. Please try again.'); // Hiện thông báo lỗi
      }
    }
  };

  const columns = [
    {
      title: 'Auction ID',
      dataIndex: ['auction', 'id'],
      key: 'auctionId',
    },
    {
      title: 'Koi',
      key: 'koiFish',
      render: (text, record) => {
        return (
          <>
            <b>
              {record.koiFish && record.koiFish.length > 0 ? (
                <FishPopover fishIds={record.koiFish}>Click here</FishPopover>
              ) : (
                'No Fish Data'
              )}
            </b>
          </>
        );
      },
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
      title: 'Breeder',
      dataIndex: ['auction', 'breederID'],
      key: 'breederID',
      render: (text) => <UserPopover userId={text} />,
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

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Pagination
          current={currentPage + 1} // Chuyển currentPage từ 0-based sang 1-based cho UI
          total={totalPages * 7} // Cập nhật tổng số record để phù hợp với số lượng mỗi trang
          pageSize={7} // Số lượng mỗi trang
          onChange={handlePageChange} // Gọi hàm khi chuyển trang
        />
      </div>

      <ApproveAuction
        visible={isActionModalOpen}
        onApprove={handleApprove}
        onReject={handleReject}
        onCancel={() => setIsActionModalOpen(false)}
        auction={currentAuction}
      />
    </>
  );
};

export default Request;
