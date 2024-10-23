import React, { useState } from 'react';
import { Form, Input, Button, message, Statistic, ConfigProvider } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../../configs/api';
import CountDown from '../../components/Modal/CountDown'; // Your custom modal
import styles from './forgot.module.scss';

const { Countdown } = Statistic;

const ForgotPassword = () => {
  console.log('Render ForgotPassword');

  const [email, setEmail] = useState('');
  const [isTokenFieldVisible, setIsTokenFieldVisible] = useState(false);
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [redirectPath, setRedirectPath] = useState('');
  const [deadline, setDeadline] = useState(Date.now() + 59 * 1000); // 59 seconds countdown
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const role = 'Staff';
      if (role === 'Staff') {
        await api.post(`forgot-password/verifyMail/${email}`);
        message.success('Mail has been sent to your email.');
        setIsTokenFieldVisible(true);
        setDeadline(Date.now() + 59 * 1000); // Reset to 59 seconds
        setIsTokenExpired(false);
      } else {
        setRedirectPath('/401');
        setIsModalVisible(true);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setRedirectPath('/404');
        setIsModalVisible(true);
      } else {
        message.error('An error occurred. Please try again later.');
      }
    }
  };

  const handleResendToken = async () => {
    try {
      await api.post(`forgot-password/verifyMail/${email}`);
      message.success('A new token has been sent to your email.');
      setDeadline(Date.now() + 59 * 1000); // Reset to 59 seconds
      setIsTokenExpired(false);
    } catch (error) {
      message.error('Failed to resend token. Please try again later.');
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleFinishCountdown = () => {
    setIsTokenExpired(true);
  };

  const handleCloseModal = (path) => {
    setIsModalVisible(false);
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.header}>
          <Button onClick={handleBackToLogin} className={styles.loginBtn}>
            Back to Login
          </Button>
          <h2 style={{ flex: 1 }}>Forgot Password</h2>
        </div>
        <Form onFinish={handleSubmit}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email', message: 'Please put email' }]}
          >
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>

          {isTokenFieldVisible && (
            <Form.Item label="Token" name="token" rules={[{ required: true, message: 'Please enter your token' }]}>
              <Input disabled={isTokenExpired} />
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

        <div className={styles.countdown}>
          {isTokenFieldVisible &&
            (isTokenExpired ? (
              'Token has expired.'
            ) : (
              <ConfigProvider
                theme={{
                  components: {
                    Statistic: {
                      contentFontSize: '16px',
                    },
                  },
                  token: {
                    colorText: 'var(--color-primary)',
                  },
                }}
              >
                <Countdown value={deadline} format="Token will expire in s" onFinish={handleFinishCountdown} />
              </ConfigProvider>
            ))}
        </div>

        {isTokenExpired && (
          <Button type="primary" onClick={handleResendToken}>
            Resend Token
          </Button>
        )}

        {isModalVisible && (
          <CountDown
            title="You don't have permission to reset password here."
            initialTime={5}
            onClose={handleCloseModal}
            redirectPath={redirectPath}
          />
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
