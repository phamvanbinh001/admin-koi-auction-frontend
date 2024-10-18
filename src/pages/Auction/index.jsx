import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Flex } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import UserPopover from '../../components/Popover/UserPopover';
import api from '../../configs/api';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import FishPopover from '../../components/Popover/FishPopover';

const Auction = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalElements, setTotalElements] = useState(0); // Để quản lý tổng số phần tử
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [pageSize, setPageSize] = useState(10); // Số phần tử trên mỗi trang

  // Hàm để fetch dữ liệu auction
  const fetchData = async (page = 1, size = 10) => {
    setLoading(true);
    try {
      const response = await api.get('auction/admin/get-all', {
        requireAuth: true,
        params: {
          page,
          size,
        },
      });

      setAuctions(response.data.content); // Cập nhật dữ liệu auction
      setTotalElements(response.data.totalElements); // Cập nhật tổng số phần tử để hiển thị pagination
    } catch (error) {
      console.error('Failed to fetch auction data', error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect để fetch dữ liệu khi component render lần đầu tiên
  useEffect(() => {
    fetchData(currentPage, pageSize);
  }, [currentPage, pageSize]); // Fetch lại dữ liệu khi trang hoặc kích thước trang thay đổi

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
      title: 'Start Time',
      dataIndex: ['auction', 'startTime'],
      render: (text, record) => {
        return record.auction && record.auction.startTime
          ? format(new Date(record.auction.startTime), 'dd/MM/yyyy HH:mm:ss')
          : 'N/A';
      },
    },
    {
      title: 'Estimated End Time',
      dataIndex: ['auction', 'endTime'],
      render: (text, record) => {
        return record.auction && record.auction.endTime
          ? format(new Date(record.auction.endTime), 'dd/MM/yyyy HH:mm:ss')
          : 'N/A';
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
          case 'Reject':
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
    // Kiểm tra xem auctions có dữ liệu hay không
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
      startTime: auctionItem.auction.startTime
        ? format(new Date(auctionItem.auction.startTime), 'dd/MM/yyyy HH:mm:ss')
        : 'N/A',
      endTime: auctionItem.auction.endTime
        ? format(new Date(auctionItem.auction.endTime), 'dd/MM/yyyy HH:mm:ss')
        : 'N/A',
      breederDeposit: auctionItem.auction.breederDeposit !== undefined ? auctionItem.auction.breederDeposit : 'N/A',
      bidderDeposit: auctionItem.auction.bidderDeposit !== undefined ? auctionItem.auction.bidderDeposit : 'N/A',
      startingPrice: auctionItem.auction.startingPrice !== undefined ? auctionItem.auction.startingPrice : 'N/A',
      buyoutPrice: auctionItem.auction.buyoutPrice !== undefined ? auctionItem.auction.buyoutPrice : 'N/A',
      finalPrice: auctionItem.auction.finalPrice !== undefined ? auctionItem.auction.finalPrice : 'N/A',
      bidStep: auctionItem.auction.bidStep !== undefined ? auctionItem.auction.bidStep : 'N/A',
      auctionFee: auctionItem.auction.auctionFee !== undefined ? auctionItem.auction.auctionFee : 'N/A',
      createAt: auctionItem.auction.createAt
        ? format(new Date(auctionItem.auction.createAt), 'dd/MM/yyyy HH:mm:ss')
        : 'N/A',
      status: auctionItem.auction.status || 'N/A',
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData); // Tạo sheet từ dữ liệu
    const workbook = XLSX.utils.book_new(); // Tạo workbook mới
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Auctions'); // Thêm sheet vào workbook
    XLSX.writeFile(workbook, 'AuctionsData.xlsx'); // Xuất file Excel
  };

  return (
    <>
      <h2 style={{ marginBottom: '20px' }}>{`Có tổng cộng ${totalElements} cuộc đấu giá`}</h2>

      <Flex gap="small" align="flex-end" vertical onClick={exportToExcel} style={{ marginBottom: '20px' }}>
        <Flex gap="small" wrap>
          <Button type="primary" icon={<DownloadOutlined />} size={'middle'}>
            Export to Excel
          </Button>
        </Flex>
      </Flex>

      <Table
        columns={columns}
        dataSource={auctions}
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          // Tổng số phần tử để hiện pagination
          // total: totalElements,
          onChange: (page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          },
        }}
        rowKey={(record) => record.auction.id}
      />
    </>
  );
};

export default Auction;
