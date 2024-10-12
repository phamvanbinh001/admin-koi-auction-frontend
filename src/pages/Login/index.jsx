import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
<<<<<<< HEAD
import api from '../../configs';
import { useNavigate } from 'react-router-dom';
import userStore from '../../zustand';
import styles from './index.module.scss';
import Logo from '../../components/Logo';

const Login = () => {
  const koiImg =
    'https://firebasestorage.googleapis.com/v0/b/koi-auction-backend.appspot.com/o/shortVideo.mp4?alt=media&token=d9603a4e-40f5-4e02-b32e-ea06e652625e';
  console.log('Render Login');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = userStore();
=======
import api from '../../auth/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import './Login.css';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await api.post('/security/login', values);

<<<<<<< HEAD
      if (response.data && response.data.token) {
        const userRole = response.data.role;
        if (userRole === 'Admin' || userRole === 'Staff') {
          login({
            ...response.data,
            isAuthenticated: true,
          });
          navigate('/');
        } else {
          throw new Error('403');
        }
      }
    } catch (error) {
      if (error.message === '403') {
        notification.error({
          message: 'Access Denied',
          description: 'You do not have permissions to access system.',
        });
      } else if (error.response) {
        notification.error({
          message: 'Login Failed',
          description: error.response.data,
=======
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
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.loginForm}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <h1 className={styles.h1}>Sign In Now</h1>

          <p className={styles.description}>Enter your email address and password to access your account.</p>
          <Form onFinish={onFinish}>
            <Form.Item name="userName" rules={[{ required: true, message: 'Please input your username or email!' }]}>
              <Input placeholder="Enter email or username" className={styles.input} />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password placeholder="Enter your password" className={styles.input} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} className={styles.btn}>
=======
    <div className="login-container">
      <div className="login-box">
        <div className="login-form">
          <div className="login-logo">
            <img src="/logo.png" alt="Logo" />
          </div>
          <h1>Sign In Now</h1>
          <p className="description">Enter your email address and password to access your account.</p>
          <Form name="login" onFinish={onFinish}>
            <Form.Item name="userName" rules={[{ required: true, message: 'Please input your username or email!' }]}>
              <Input placeholder="Enter email or username" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
                Sign In
              </Button>
            </Form.Item>
          </Form>
<<<<<<< HEAD

          <span className={styles.forgotPassword} onClick={() => navigate('/forgotPassword')}>
            Forgot password?
          </span>
        </div>
        <div className={styles.loginBanner}>
          <video src={koiImg} autoPlay loop muted></video>
=======
          <a className="forgot-password" href="/forgot-password">
            Forgot password?
          </a>
        </div>
        <div className="login-banner">
          <video src="src/assets/videoLogin.mp4" autoPlay loop muted></video>
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
        </div>
      </div>
    </div>
  );
};

export default Login;
