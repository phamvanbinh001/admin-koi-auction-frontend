import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './Login.css'; // Tùy chọn nếu bạn muốn thêm CSS riêng

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Sử dụng hook useNavigate

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://koi-auction-backend-dwe7hvbuhsdtgafe.southeastasia-01.azurewebsites.net/api/security/login',
        values,
      );
  
      // Kiểm tra xem token có tồn tại không
      if (response.data && response.data.token) {
        const token = response.data.token;
        console.log('Token: ' + token);
  
        // Lưu token (localStorage hoặc state quản lý)
        // localStorage.setItem('token', token);
  
        // Thiết lập token vào axios headers cho tất cả các request sau
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
        // Điều hướng tới trang chính
        navigate('/');
      } else {
        throw new Error('Token not found in response');
      }
    } catch (error) {
      // Kiểm tra nếu lỗi có phản hồi từ server
      if (error.response) {
        notification.error({
          message: 'Login Failed',
          description: error.response.data.message || 'Invalid username or password!',
        });
      } else {
        notification.error({
          message: 'Login Failed',
          description: error.message || 'An error occurred during login!',
        });
      }
    } finally {
      setLoading(false);
    }
  };  

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <Form name="login" onFinish={onFinish}>
        <Form.Item name="userName" rules={[{ required: true, message: 'Please input your username!' }]}>
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
