import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Table, Button, Space, Pagination, message } from 'antd';
import api from '../../configs';
import FishPopover from '../../components/Popover/FishPopover';
import UserPopover from '../../components/Popover/UserPopover';
import ApproveAuction from '../../components/Modal/ApproveAuction';

const Request = () => {
  const [auctionRequests, setAuctionRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [currentAuction, setCurrentAuction] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

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
=======
import { Table, Modal, Button, Space } from 'antd';
import api from '../../auth/api'; // Import đúng đường dẫn API của bạn

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
    const fetchData = async () => {
      try {
        const response = await api.get('/auction/get-auction-requets');
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
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
  };

  const handleActionClick = (auction) => {
    setCurrentAuction(auction);
    setIsActionModalOpen(true);
  };

<<<<<<< HEAD
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
=======
  const handleApprove = () => {
    // Gọi API để duyệt yêu cầu đấu giá
    console.log('Approve auction', currentAuction);
    setIsActionModalOpen(false); // Đóng modal sau khi thực hiện hành động
  };

  const handleReject = () => {
    // Gọi API để từ chối yêu cầu đấu giá
    console.log('Reject auction', currentAuction);
    setIsActionModalOpen(false); // Đóng modal sau khi thực hiện hành động
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
  };

  const columns = [
    {
<<<<<<< HEAD
      title: 'Auction ID',
      dataIndex: ['auction', 'id'],
      key: 'auctionId',
    },
    {
      title: 'Koi',
      key: 'koiFish',
      render: (text) => {
        return (
          <>
            <b>
              {text.koiFish && text.koiFish.length > 0 ? (
                <FishPopover fishIds={text.koiFish}>Click here</FishPopover>
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
=======
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
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
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
<<<<<<< HEAD
      <Table
        columns={columns}
        dataSource={auctionRequests}
        loading={loading}
        rowKey={(record) => record.auction.id}
        pagination={false} // Tắt phân trang của Ant Design, dùng Pagination riêng
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Pagination current={currentPage + 1} total={totalPages * 7} pageSize={7} onChange={handlePageChange} />
      </div>

      <ApproveAuction
        visible={isActionModalOpen}
        onApprove={handleApprove}
        onReject={handleReject}
        onCancel={() => setIsActionModalOpen(false)}
        auction={currentAuction}
      />
=======
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
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
    </>
  );
};

export default Request;
