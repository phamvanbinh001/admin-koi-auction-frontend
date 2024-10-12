import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Tag, Table, Button, Pagination, Flex } from 'antd';
import FishPopover from '../../components/Popover/FishPopover';
import UserPopover from '../../components/Popover/UserPopover';
import { DownloadOutlined } from '@ant-design/icons';
import api from '../../configs';
import * as XLSX from 'xlsx';
=======
import { Table, Tag, Button, Tooltip } from 'antd';
import api from '../../auth/api';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)

const Auction = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const response = await api.get('/auction/admin', {
        params: {
          page,
          size: 9,
        },
      });

      console.log('fetch page: ', page + 1);

      if (response?.data) {
        setAuctions(response.data.auctions);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch auction data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page - 1);
  };

=======

  useEffect(() => {
    // Fetch auction data
    const fetchData = async () => {
      try {
        const response = await api.get('/auction/get-all');
        setAuctions(response.data);
      } catch (error) {
        console.error('Failed to fetch auction data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // handle null value to uppercase
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
  const toUpperCase2 = (value) => {
    return value ? value.toUpperCase() : 'N/A';
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: ['auction', 'id'],
<<<<<<< HEAD
=======
      key: 'id',
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
    },
    {
      title: 'Fish Details',
      key: 'koiFish',
<<<<<<< HEAD
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
=======
      render: (text, record) => (
        <Tooltip title={`Koi Fish IDs: ${record.koiFish.join(', ')}`}>
          <b style={{ color: 'blue' }}>Hover Here</b>
        </Tooltip>
      ),
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
    },
    {
      title: 'Start Time',
      dataIndex: ['auction', 'startTime'],
<<<<<<< HEAD
      render: (text) => {
        return text ? new Date(text).toLocaleString() : 'N/A';
=======
      render: (text, record) => {
        return record.startTime ? format(new Date(record.startTime), 'dd/MM/yyyy HH:mm:ss') : 'N/A';
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
      },
    },
    {
      title: 'Estimated End Time',
      dataIndex: ['auction', 'endTime'],
<<<<<<< HEAD
      render: (text) => {
        return text ? new Date(text).toLocaleString() : 'N/A';
=======
      render: (text, record) => {
        return record.startTime ? format(new Date(record.endTime), 'dd/MM/yyyy HH:mm:ss') : 'N/A';
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
      },
    },
    {
      title: 'Method',
      dataIndex: ['auction', 'auctionMethod'],
<<<<<<< HEAD
=======
      key: 'auctionMethod',
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
    },
    {
      title: 'Start Price',
      dataIndex: ['auction', 'startingPrice'],
      render: (text) => <span>{text ? `${text}` : 'N/A'}</span>,
    },
    {
      title: 'Bid Step',
      dataIndex: ['auction', 'bidStep'],
<<<<<<< HEAD
=======
      key: 'bidStep',
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
    },
    {
      title: 'Buyout Price',
      dataIndex: ['auction', 'buyoutPrice'],
<<<<<<< HEAD
=======
      key: 'buyoutPrice',
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
    },
    {
      title: 'Final Price',
      dataIndex: ['auction', 'finalPrice'],
      render: (text) => <span>{text ? `${text}` : 'N/A'}</span>,
    },
    {
      title: 'Winner',
      dataIndex: ['auction', 'winnerID'],
      render: (text) => <span>{text || 'N/A'}</span>,
    },
    {
      title: 'Breeder',
      dataIndex: ['auction', 'breederID'],
<<<<<<< HEAD
      render: (text) => <UserPopover userId={text} />,
    },
    {
      title: 'Approved By',
      dataIndex: ['auction', 'staffID'],
      render: (text) => <UserPopover userId={text} />,
    },
=======
      render: (text) => (
        <Tooltip title={`Breeder Name: ${text}`}>
          <b style={{ color: 'blue' }}>Hover Here</b>
        </Tooltip>
      ),
    },

    {
      title: 'Approved By',
      dataIndex: ['auction', 'staffID'],
      render: (text) => (
        <Tooltip title={`Approved By Staff ID: ${text}`}>
          <b style={{ color: 'blue' }}>Hover Here</b>
        </Tooltip>
      ),
    },

>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
    {
      title: 'Status',
      dataIndex: ['auction', 'status'],
      key: 'status',
      render: (status) => {
        let color;
        switch (status) {
          case 'Ongoing':
            color = 'blue';
            break;
          case 'Closed':
            color = 'green';
            break;
          case 'Pending':
            color = 'orange';
            break;
<<<<<<< HEAD
          case 'Reject':
=======
          case 'Finished':
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
            color = 'red';
            break;
          default:
            color = 'gray';
        }
        return <Tag color={color}>{toUpperCase2(status)}</Tag>;
      },
    },
  ];

  const exportToExcel = () => {
<<<<<<< HEAD
    if (!auctions || auctions.length === 0) {
      console.error('No auction data available to export');
      return;
    }

    const exportData = auctions.map((auctionItem) => ({
      id: auctionItem.auction.id || 'N/A',
      breederID: auctionItem.auction.breederID || 'N/A',
      staffID: auctionItem.auction.staffID || 'N/A',
      winnerID: auctionItem.auction.winnerID || 'N/A',
      auctionMethod: auctionItem.auction.auctionMethod || 'N/A',
      startTime: auctionItem.auction.startTime ? new Date(auctionItem.auction.startTime).toLocaleString() : 'N/A',
      endTime: auctionItem.auction.endTime ? new Date(auctionItem.auction.endTime).toLocaleString() : 'N/A',
      breederDeposit: auctionItem.auction.breederDeposit !== undefined ? auctionItem.auction.breederDeposit : 'N/A',
      bidderDeposit: auctionItem.auction.bidderDeposit !== undefined ? auctionItem.auction.bidderDeposit : 'N/A',
      startingPrice: auctionItem.auction.startingPrice !== undefined ? auctionItem.auction.startingPrice : 'N/A',
      buyoutPrice: auctionItem.auction.buyoutPrice !== undefined ? auctionItem.auction.buyoutPrice : 'N/A',
      finalPrice: auctionItem.auction.finalPrice !== undefined ? auctionItem.auction.finalPrice : 'N/A',
      bidStep: auctionItem.auction.bidStep !== undefined ? auctionItem.auction.bidStep : 'N/A',
      auctionFee: auctionItem.auction.auctionFee !== undefined ? auctionItem.auction.auctionFee : 'N/A',
      createAt: auctionItem.auction.createAt ? new Date(auctionItem.auction.createAt).toLocaleString() : 'N/A',
      status: auctionItem.auction.status || 'N/A',
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData); // Tạo sheet từ dữ liệu
    const workbook = XLSX.utils.book_new(); // Tạo workbook mới
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Auctions'); // Thêm sheet vào workbook
    XLSX.writeFile(workbook, 'AuctionsData.xlsx'); // Xuất file Excel
=======
    const worksheet = XLSX.utils.json_to_sheet(auctions); // Chuyển đổi dữ liệu đấu giá sang sheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Auctions');
    XLSX.writeFile(workbook, 'auction_data.xlsx'); // Tạo file và xuất ra với tên "auction_data.xlsx"
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
  };

  return (
    <>
<<<<<<< HEAD
      <Flex align="flex-end" vertical style={{ marginBottom: '20px' }}>
        <Flex>
          <Button onClick={exportToExcel} type="primary" icon={<DownloadOutlined />}>
            Export to Excel
          </Button>
        </Flex>
      </Flex>

      <Table
        columns={columns}
        dataSource={auctions}
        loading={loading}
        rowKey={(record) => record.auction.id}
        pagination={false}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Pagination current={currentPage + 1} total={totalPages * 9} pageSize={9} onChange={handlePageChange} />
      </div>
=======
      <Button type="primary" onClick={exportToExcel} style={{ marginBottom: '20px' }}>
        Export to Excel
      </Button>
      <Table columns={columns} dataSource={auctions} loading={loading} rowKey={(record) => record.auction.id} />
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
    </>
  );
};

export default Auction;
