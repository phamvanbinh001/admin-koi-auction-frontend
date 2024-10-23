import React, { useEffect, useState } from 'react';
import { Table, Spin, Button, Input, DatePicker, Space, Select, Slider, Flex } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import api from '../../configs/api';
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
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await api.get('/admin/transaction', {
          requireAuth: true,
        });

        setTransactions(response.data);
        setFilteredTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const fetchTotalAmount = async () => {
      setLoading(true);
      try {
        const res = await api.get(
          '/wallet/get-wallet',
          //  { requireAuth: true }
        );
        console.log(res);
        console.log(res.data);
        console.log('Total amount:', res.data.amount);

        setTotalAmount(res.data.amount);
      } catch (error) {
        console.error('Error fetching total amount:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTotalAmount();
  }, []);

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

    if (filters.walletID) {
      filtered = filtered.filter((transaction) => transaction.walletID.id === filters.walletID);
    }

    if (filters.paymentMethod !== '') {
      filtered = filtered.filter((transaction) => transaction.transactionType === filters.paymentMethod);
    }

    setFilteredTransactions(filtered);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredTransactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');
    XLSX.writeFile(workbook, 'transaction_data.xlsx');
  };

  const columns = [
    { title: 'Transaction ID', dataIndex: 'id' },
    { title: 'Wallet ID', dataIndex: ['walletID', 'id'] },
    { title: 'Transaction Amount', dataIndex: 'amount' },
    {
      title: 'Transaction Time',
      dataIndex: 'time',
      render: (text) => new Date(text).toLocaleString(),
    },
    { title: 'Auction ID', dataIndex: 'auctionID' },
    { title: 'Status', dataIndex: 'status' },
    { title: 'Transaction Type', dataIndex: 'transactionType', render: (text) => text || 'N/A' },
  ];

  return (
    <div>
      <h2>Total Amount in System: {totalAmount.toLocaleString()} VND</h2>

      {/* Khu vực filter */}
      <Space style={{ marginBottom: 20 }}>
        {/* Lọc theo khoảng thời gian */}
        <RangePicker onChange={(dates) => handleFilterChange('dateRange', dates)} format="DD/MM/YYYY" />

        {/* Lọc theo khoảng số tiền */}
        <Slider
          range
          defaultValue={filters.amountRange}
          min={0}
          max={1000000000000}
          step={1000}
          onChange={(value) => handleFilterChange('amountRange', value)}
          style={{ width: 200 }}
        />

        {/* Lọc theo Wallet ID */}
        <Input placeholder="Wallet ID" onChange={(e) => handleFilterChange('walletID', parseInt(e.target.value))} />

        {/* Lọc theo Transaction Type (Phương thức thanh toán) */}
        <Select placeholder="Transaction Type" onChange={(value) => handleFilterChange('paymentMethod', value)}>
          <Option value="">All</Option>
          <Option value="Top-up">Top up</Option>
          <Option value="Payment">Payment</Option>
          <Option value="Deposit">Deposit</Option>
        </Select>
      </Space>

      <Flex gap="small" align="flex-end" vertical style={{ marginBottom: '20px' }}>
        <Flex gap="small" onClick={exportToExcel} wrap>
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
