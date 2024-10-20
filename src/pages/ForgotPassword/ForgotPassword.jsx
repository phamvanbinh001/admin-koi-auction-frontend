import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../../configs/api';
import CountDown from '../../components/Modal/CountDown';
import styles from './forgot.module.scss';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isTokenFieldVisible, setIsTokenFieldVisible] = useState(false);
  const [tokenExpiryTime, setTokenExpiryTime] = useState(59);
  const [isCounting, setIsCounting] = useState(false);
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [redirectPath, setRedirectPath] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let countdown;
    if (isCounting && tokenExpiryTime > 0) {
      countdown = setInterval(() => {
        setTokenExpiryTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (tokenExpiryTime === 0) {
      clearInterval(countdown);
      setIsTokenExpired(true);
      setIsCounting(false);
    }

    return () => clearInterval(countdown);
  }, [isCounting, tokenExpiryTime]);

  const handleSubmit = async () => {
    try {
      const role = 'Staff';
      if (role === 'Staff') {
        await api.post(`forgot-password/verifyMail/${email}`);
        message.success('Mail has been sent to your email.');
        setIsTokenFieldVisible(true);
        setTokenExpiryTime(59);
        setIsCounting(true);
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
      setTokenExpiryTime(59);
      setIsCounting(true);
      setIsTokenExpired(false);
    } catch (error) {
      message.error('Failed to resend token. Please try again later.');
    }
  };

  const handleCloseModal = (path) => {
    setIsModalVisible(false);
    if (path) {
      navigate(path);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
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
          {isTokenFieldVisible && (isTokenExpired ? 'Token has expired.' : `Token will expire in ${tokenExpiryTime}`)}
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
