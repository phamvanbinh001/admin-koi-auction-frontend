import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import styles from './index.module.scss';

// Đăng ký các thành phần của Chart.js
Chart.register(...registerables);

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

// Tùy chọn cho biểu đồ tròn
const pieOptions = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: 'left',
      labels: {
        padding: 20, // Điều chỉnh khoảng cách giữa các chú thích
      },
    },
  },
};

// Tùy chọn cho các biểu đồ khác
const commonOptions = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
};

function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.summaryWrapper}>
        <div className={styles.summaryCard}>Today's Money: $200</div>
        <div className={styles.summaryCard}>Today's Users: 100</div>
        <div className={styles.summaryCard}>Total Sales: $1000</div>
        <div className={styles.summaryCard}>Total Users: 500</div>
      </div>

      <div className={styles.chartWrapper}>
        <div className={styles.chartBorder}>
          <Bar data={dataDemo.barChartData} options={commonOptions} />
        </div>
        <div className={styles.chartBorderPie}>
          <Pie data={dataDemo.pieChartData} options={pieOptions} />
        </div>
      </div>
      <div className={styles.chartBorder}>
        <Line data={dataDemo.lineChartData} options={commonOptions} />
      </div>
    </div>
  );
}

export default Dashboard;
