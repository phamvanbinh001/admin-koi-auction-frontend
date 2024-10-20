import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './reset.module.scss';

const ResetPassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { newPassword, confirmPassword } = values;

    if (newPassword !== confirmPassword) {
      message.error('Passwords do not match!');
      return;
    }

    setLoading(true);
    try {
      // Gọi API để reset password
      // const response = await api.post('/reset-password', { newPassword });
      message.success('Password reset successfully!');
      // Điều hướng đến trang đăng nhập hoặc trang khác sau khi reset thành công
      navigate('/login');
    } catch (error) {
      message.error('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2>Reset Password</h2>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true, message: 'Please input your new password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: 'Please confirm your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Reset Password
            </Button>
          </Form.Item>
        </Form>

        <Button onClick={handleBackToLogin} style={{ marginTop: '20px' }}>
          Back to Login
        </Button>
      </div>
    </div>
  );
};

export default ResetPassword;
