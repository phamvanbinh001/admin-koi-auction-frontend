import React, { useState } from 'react';
import { Form, Divider, Input, Button, notification } from 'antd';
import api from '../../auth/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import './Login.css';
import Logo from '../../components/Logo';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await api.post('/security/login', values);

      // Kiểm tra xem token có tồn tại không
      if (response.data && response.data.token) {
        const token = response.data.token;
        const role = response.data.role; // Giả sử API trả về role

        // Cập nhật trạng thái xác thực
        login(token);
        localStorage.setItem('role', role); // Lưu vai trò vào local storage

        // Điều hướng dựa trên vai trò
        if (role === 'Admin' || role === 'Staff') {
          navigate('/'); // Chuyển hướng đến trang chính
        } else {
          notification.error({
            message: 'Access Denied',
            description: 'You do not have permission to access this application.',
          });
        }
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
      <div className="login-box">
        <div className="login-form">
          <div className="logo">
            <Logo />
          </div>
          <h1>Sign In Now</h1>
          <p className="description">Enter your email address and password to access your account.</p>
          <Divider orientation="left" plain style={{ color: 'gray' }}>
            Manage system
          </Divider>
          <Form name="login" onFinish={onFinish}>
            <Form.Item name="userName" rules={[{ required: true, message: 'Please input your username or email!' }]}>
              <Input placeholder="Enter email or username" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Sign In
              </Button>
            </Form.Item>
          </Form>
          <a className="forgot-password" href="/forgot-password">
            Forgot password?
          </a>
        </div>
        <div className="login-banner">
          <video src="src/assets/videoLogin.mp4" autoPlay loop muted></video>
        </div>
      </div>
    </div>
  );
};

export default Login;
