import React, { useState } from 'react';
import { Form, Divider, Input, Button, notification } from 'antd';
import api from '../../configs/api';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../configs/useUserStore';
import './Login.css';
import Logo from '../../components/Logo';

const Login = () => {
  console.log('Login');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useUserStore();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await api.post('/security/login', values);

      if (response.data && response.data.token) {
        const userRole = response.data.role;
        if (userRole === 'Admin' || userRole === 'Staff') {
          login({
            ...response.data,
            isAuthenticated: true,
          });
          navigate('/');
        } else {
          throw new Error('Access denied: You do not have the required permissions.');
        }
      } else {
        throw new Error('Token not found in response');
      }
    } catch (error) {
      if (error.message === 'Access denied: You do not have the required permissions.') {
        notification.error({
          message: 'Access Denied',
          description: 'You do not have the necessary permissions to access this resource.',
        });
      } else if (error.response) {
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
          <Form onFinish={onFinish}>
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
          <video src="src\assets\tienca.mp4" autoPlay loop muted></video>
        </div>
      </div>
    </div>
  );
};

export default Login;
