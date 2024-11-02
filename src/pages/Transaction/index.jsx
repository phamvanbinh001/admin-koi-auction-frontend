import React, { useEffect, useState } from 'react';
import { Table, Spin, Button, Input, DatePicker, Space, Select, Slider } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import api from '../../configs/api';
import * as XLSX from 'xlsx';

const { RangePicker } = DatePicker;
const { Option } = Select;

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState({});
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    dateRange: null,
    amountRange: [0, 10000],
    paymentMethod: null,
    userID: null,
  });

  useEffect(() => {
    fetchInitialTransactions();
    fetchTotalAmount();
  }, []);

  const fetchInitialTransactions = async (page = 0) => {
    setLoading(true);
    try {
      const res = await api.get('/admin/transaction', {
        params: { page, size: 10 },
      });
      const data = res.data.auctions;
      setTransactions((prev) => ({ ...prev, [page]: data }));
      setFilteredTransactions(data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalAmount = async () => {
    setLoading(true);
    try {
      const res = await api.get('/wallet/get-wallet');
      setTotalAmount(res.data.amount);
    } catch (error) {
      console.error('Error fetching total amount:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilteredData = async () => {
    setLoading(true);
    let url = '';
    let params = {};

    if (filters.paymentMethod) {
      url = '/admin/transaction/by-type';
      params = { transactionType: filters.paymentMethod };
    } else if (filters.dateRange) {
      url = '/admin/transaction/by-time-range';
      const [start, end] = filters.dateRange;
      params = { startTime: start.toISOString(), endTime: end.toISOString() };
    }
    // else if (filters.amountRange) {
    //   url = '/admin/transaction/by-amount';
    //   params = { amount: filters.amountRange[1] };
    // }
    else {
      fetchInitialTransactions();
      return;
    }

    try {
      const res = await api.get(url, { params });
      setFilteredTransactions(res.data);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (transactions[page]) {
      setFilteredTransactions(transactions[page]);
    } else {
      fetchInitialTransactions(page);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
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

      <Space style={{ marginBottom: 20 }}>
        <RangePicker onChange={(dates) => handleFilterChange('dateRange', dates)} format="DD/MM/YYYY" />
        {/* <Slider
          range
          defaultValue={filters.amountRange}
          min={0}
          max={1000000000000}
          step={1000}
          onChange={(value) => handleFilterChange('amountRange', value)}
          style={{ width: 200 }}
        /> */}
        <Input placeholder="Wallet ID" onChange={(e) => handleFilterChange('walletID', parseInt(e.target.value))} />
        <Select placeholder="Transaction Type" onChange={(value) => handleFilterChange('paymentMethod', value)}>
          <Option value="">All</Option>
          <Option value="Top-up">Top up</Option>
          <Option value="Payment">Payment</Option>
          <Option value="Deposit">Deposit</Option>
        </Select>
        <Button onClick={fetchFilteredData} type="primary">
          Fetch Data
        </Button>
      </Space>

      <Button type="primary" icon={<DownloadOutlined />} onClick={exportToExcel} style={{ marginBottom: '20px' }}>
        Export to Excel
      </Button>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={filteredTransactions}
          rowKey={(record) => record.id}
          pagination={{
            current: currentPage + 1,
            total: totalPages * 10,
            onChange: (page) => handlePageChange(page - 1),
          }}
        />
      )}
    </div>
  );
};

export default TransactionManagement;
