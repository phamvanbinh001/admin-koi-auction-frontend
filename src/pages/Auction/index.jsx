import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Tooltip } from 'antd';
import UserPopover from '../../components/Popover/UserPopover';
import api from '../../auth/api';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';

const Auction = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

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
  const toUpperCase2 = (value) => {
    return value ? value.toUpperCase() : 'N/A';
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: ['auction', 'id'],
      key: 'id',
    },
    {
      title: 'Fish Details',
      key: 'koiFish',
      render: (text, record) => (
        <Tooltip title={`Koi Fish IDs: ${record.koiFish.join(', ')}`}>
          <b style={{ color: 'blue' }}>Hover Here</b>
        </Tooltip>
      ),
    },
    {
      title: 'Start Time',
      dataIndex: ['auction', 'startTime'],
      render: (text, record) => {
        return record.startTime ? format(new Date(record.startTime), 'dd/MM/yyyy HH:mm:ss') : 'N/A';
      },
    },
    {
      title: 'Estimated End Time',
      dataIndex: ['auction', 'endTime'],
      render: (text, record) => {
        return record.startTime ? format(new Date(record.endTime), 'dd/MM/yyyy HH:mm:ss') : 'N/A';
      },
    },
    {
      title: 'Method',
      dataIndex: ['auction', 'auctionMethod'],
      key: 'auctionMethod',
    },
    {
      title: 'Start Price',
      dataIndex: ['auction', 'startingPrice'],
      render: (text) => <span>{text ? `${text}` : 'N/A'}</span>,
    },
    {
      title: 'Bid Step',
      dataIndex: ['auction', 'bidStep'],
      key: 'bidStep',
    },
    {
      title: 'Buyout Price',
      dataIndex: ['auction', 'buyoutPrice'],
      key: 'buyoutPrice',
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
      render: (text) => <UserPopover userId={text} />,
    },

    {
      title: 'Approved By',
      dataIndex: ['auction', 'staffID'],
      key: 'staffID',
      render: (text) => <UserPopover userId={text} />,
    },

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
          case 'Finished':
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
    const worksheet = XLSX.utils.json_to_sheet(auctions); // Chuyển đổi dữ liệu đấu giá sang sheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Auctions');
    XLSX.writeFile(workbook, 'auction_data.xlsx'); // Tạo file và xuất ra với tên "auction_data.xlsx"
  };

  return (
    <>
      <Button type="primary" onClick={exportToExcel} style={{ marginBottom: '20px' }}>
        Export to Excel
      </Button>
      <Table columns={columns} dataSource={auctions} loading={loading} rowKey={(record) => record.auction.id} />
    </>
  );
};

export default Auction;
