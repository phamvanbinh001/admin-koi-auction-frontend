import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Form, Button, Input } from 'antd';
import api from '../../configs/api';
import styles from './index.module.scss';

Chart.register(...registerables);

// Component cho Summary Card
const SummaryCard = React.memo(({ label, value }) => {
  return (
    <div className={styles.summaryCard}>
      {label}: {value}
    </div>
  );
});

// Component cho Biểu đồ Bar
const BarChart = React.memo(({ data }) => {
  return <Bar data={data} options={{ maintainAspectRatio: false, responsive: true }} />;
});

// Component cho Biểu đồ Pie
const PieChart = React.memo(({ data }) => {
  return <Pie data={data} options={{ maintainAspectRatio: false, responsive: true }} />;
});

// Component cho Biểu đồ Line
const LineChart = React.memo(({ data }) => {
  return <Line data={data} options={{ maintainAspectRatio: false, responsive: true }} />;
});

const Dashboard = () => {
  const [summaryData, setSummaryData] = useState(null);
  const [dateFilters, setDateFilters] = useState({
    day: null,
    month: null,
    year: new Date().getFullYear(), // Mặc định năm hiện tại
  });

  const dataDemo = {
    lineChartData: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'New Users',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
        },
      ],
    },
    pieChartData: {
      labels: ['Red', 'Blue', 'Yellow'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
          borderWidth: 2,
        },
      ],
    },
    barChartData: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Sales',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: 'rgba(75, 192, 192, 0.8)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
        },
      ],
    },
  };

  // Fetch API data dựa trên các bộ lọc thời gian
  const fetchSummaryData = async () => {
    try {
      const { day, month, year } = dateFilters;
      const params = {};

      if (day) params.day = day;
      if (month) params.month = month;
      if (year) params.year = year;

      const response = await api.get('/dashboard', { params });
      setSummaryData(response.data); // Cập nhật dữ liệu tóm tắt
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Lấy dữ liệu mặc định cho năm hiện tại
    fetchSummaryData();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDateFilters((prev) => ({
      ...prev,
      [name]: value ? parseInt(value) : null, // Chuyển đổi thành số nếu có giá trị
    }));
  };

  // Submit form để fetch data
  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchSummaryData();
  };

  return (
    <div className={styles.dashboard}>
      <Form layout="inline" className={styles.filterForm} onSubmit={handleFormSubmit}>
        <Form.Item label="Day">
          <Input name="day" type="number" onChange={handleInputChange} placeholder="Enter day" />
        </Form.Item>
        <Form.Item label="Month">
          <Input name="month" type="number" onChange={handleInputChange} placeholder="Enter month" />
        </Form.Item>
        <Form.Item label="Year">
          <Input
            name="year"
            type="number"
            value={dateFilters.year}
            onChange={handleInputChange}
            placeholder="Enter year"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleFormSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>

      <div className={styles.summaryWrapper}>
        {summaryData && (
          <>
            <SummaryCard label="New Users" value={summaryData.newUserCount} />
            <SummaryCard label="Revenue" value={summaryData.revenue} />
            <SummaryCard label="Auctions" value={summaryData.auctionCount} />
            <SummaryCard label="Finished Auctions" value={summaryData.finishedAuctionCount} />
          </>
        )}
      </div>

      <div className={styles.chartWrapper}>
        <div className={styles.chartBorder}>
          <BarChart data={dataDemo.barChartData} />
        </div>
        <div className={styles.chartBorderPie}>
          <PieChart data={dataDemo.pieChartData} />
        </div>
      </div>
      <div className={styles.chartBorder}>
        <LineChart data={dataDemo.lineChartData} />
      </div>
    </div>
  );
};

export default Dashboard;
