import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';
import './Login.css'; // Tùy chọn nếu bạn muốn thêm CSS riêng

const Login = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://koi-auction-backend-dwe7hvbuhsdtgafe.southeastasia-01.azurewebsites.net/api/security/login',
        values,
      );
      // Giả sử token trả về từ server
      const token = response.data.token;

      // Lưu token (localStorage hoặc state quản lý)
      localStorage.setItem('token', token);

      // Thiết lập token vào axios headers cho tất cả các request sau
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Redirect hoặc điều hướng đến trang chính
      window.location.href = '/dashboard'; // Hoặc sử dụng react-router để điều hướng
    } catch (error) {
      notification.error({
        message: 'Login Failed',
        description: 'Invalid username or password!',
      });
    } finally {
      console.log(token);

      setLoading(false);
    }
  };

  // Thiết lập axios để thêm token từ localStorage vào header
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <Form name="login" onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
