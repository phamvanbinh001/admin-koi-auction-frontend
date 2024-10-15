import React, { useEffect, useState } from 'react';
import { Table, Spin, Button, Input, DatePicker, Space, Select, Slider, Flex } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import api from '../../configs/api';
import axios from 'axios';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';
const { RangePicker } = DatePicker;
const { Option } = Select;

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [filters, setFilters] = useState({
    dateRange: null,
    amountRange: [0, 10000],
    paymentMethod: null,
    userID: null,
    walletID: null,
  });

  // Fetch API
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        // const response = await api.get('/wallet/transactions');
        // const data = await response.json();
        const response = await axios.get(
          'https://koi-auction-backend-dwe7hvbuhsdtgafe.southeastasia-01.azurewebsites.net/api/wallet/transactions',
        );
        setTransactions(response.data);
        setFilteredTransactions(response.data);
        calculateTotalAmount(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Tính tổng số tiền
  const calculateTotalAmount = (data) => {
    const total = data.reduce((acc, transaction) => acc + transaction.walletID.amount, 0);
    setTotalAmount(total);
  };

  // Tự động lọc theo khi thay đổi bộ lọc
  useEffect(() => {
    applyFilters();
  }, [filters]);

  // Filter logic
  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const applyFilters = () => {
    let filtered = [...transactions];

    if (filters.dateRange) {
      const [start, end] = filters.dateRange;
      filtered = filtered.filter(
        (transaction) => new Date(transaction.time) >= start && new Date(transaction.time) <= end,
      );
    }

    if (filters.amountRange) {
      const [minAmount, maxAmount] = filters.amountRange;
      filtered = filtered.filter((transaction) => transaction.amount >= minAmount && transaction.amount <= maxAmount);
    }

    if (filters.userID) {
      filtered = filtered.filter((transaction) => transaction.walletID.userID === filters.userID);
    }

    if (filters.walletID) {
      filtered = filtered.filter((transaction) => transaction.walletID.id === filters.walletID);
    }

    if (filters.paymentMethod) {
      filtered = filtered.filter((transaction) => transaction.transactionType === filters.paymentMethod);
    }

    setFilteredTransactions(filtered);
  };

  // Xuất ra Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredTransactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');
    XLSX.writeFile(workbook, 'transaction_data.xlsx');
  };

  // Định nghĩa các cột của bảng
  const columns = [
    { title: 'Transaction ID', dataIndex: 'id' },
    { title: 'Wallet ID', dataIndex: ['walletID', 'id'] },
    { title: 'User ID', dataIndex: ['walletID', 'userID'] },
    { title: 'Transaction Amount', dataIndex: 'amount' },
    {
      title: 'Transaction Time',
      dataIndex: 'time',
      render: (text) => format(new Date(text), 'dd/MM/yyyy HH:mm:ss'),
    },
    { title: 'Auction ID', dataIndex: 'auctionID' },
    { title: 'Status', dataIndex: 'status' },
    { title: 'Transaction Type', dataIndex: 'transactionType', render: (text) => text || 'N/A' },
  ];

  return (
    <div>
      {/* Khu vực hiển thị số tiền hiện tại của hệ thống */}
      <h2>Total Amount in System: {totalAmount.toLocaleString()} VND</h2>

      {/* Khu vực filter */}
      <Space style={{ marginBottom: 20 }}>
        {/* Lọc theo khoảng thời gian */}
        <RangePicker
          onChange={(dates) => handleFilterChange('dateRange', dates)}
          format="DD/MM/YYYY" // Sửa để hiển thị cả năm
        />

        {/* Lọc theo khoảng số tiền */}
        <Slider
          range
          defaultValue={filters.amountRange}
          min={0}
          max={100000}
          step={1000}
          onChange={(value) => handleFilterChange('amountRange', value)}
          style={{ width: 200 }}
        />

        {/* Lọc theo User ID */}
        <Input placeholder="User ID" onChange={(e) => handleFilterChange('userID', parseInt(e.target.value))} />

        {/* Lọc theo Wallet ID */}
        <Input placeholder="Wallet ID" onChange={(e) => handleFilterChange('walletID', parseInt(e.target.value))} />

        {/* Lọc theo Transaction Type (Phương thức thanh toán) */}
        <Select placeholder="Transaction Type" onChange={(value) => handleFilterChange('paymentMethod', value)}>
          <Option value="Cash">Cash</Option>
          <Option value="QR">QR</Option>
          <Option value="Bank Transfer">Bank Transfer</Option>
        </Select>
      </Space>

      <Flex gap="small" align="flex-end" vertical onClick={exportToExcel} style={{ marginBottom: '20px' }}>
        <Flex gap="small" wrap>
          <Button type="primary" icon={<DownloadOutlined />} size={'middle'}>
            Export to Excel
          </Button>
        </Flex>
      </Flex>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Table columns={columns} dataSource={filteredTransactions} rowKey={(record) => record.id} />
      )}
    </div>
  );
};

export default TransactionManagement;
