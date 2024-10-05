import React, { useState } from 'react';
import { Layout, Input, Space, Badge, Radio } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCircleUser } from '@fortawesome/free-solid-svg-icons'; // FontAwesome icon

const { Header } = Layout;
const { Search } = Input;

const HeaderComponent = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);

    if (selectedTheme === 'dark') {
      document.body.style.backgroundColor = '#000000'; // Dark background
      document.body.style.color = '#ffffff'; // Light text
    } else {
      document.body.style.backgroundColor = '#ffffff'; // Light background
      document.body.style.color = '#000000'; // Dark text
    }
  };

  return (
    <Header
      className="header"
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        backgroundColor: '#152238', // Background color for the header
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Optional shadow for a better look
      }}
    >
      <div className="logo">
        <img
          src="../../../../../public/images/logos.png"
          alt="logo"
          style={{ height: '40px', marginRight: '20px' }} // Logo size
        />
      </div>

      <Space style={{ flexGrow: 1, justifyContent: 'center' }}>
        <Search placeholder="Search..." enterButton style={{ width: 400 }} />
      </Space>

      <Space style={{ alignItems: 'center' }}>
        <Radio.Group value={theme} onChange={toggleTheme} size="small" style={{ margin: '20px 20px 20px 20px' }}>
          <Radio.Button value="light" style={{ fontSize: '10px' }}>
            <b>Light</b>
          </Radio.Button>
          <Radio.Button value="dark" style={{ fontSize: '10px' }}>
            <b>Dark</b>
          </Radio.Button>
        </Radio.Group>
        <Badge count={5} style={{ marginRight: '16px' }} className="custom-badge">
          <FontAwesomeIcon
            icon={faEnvelope}
            size="lg"
            style={{ color: '#1677ff', fontSize: '25px', marginRight: '20px', marginLeft: '30px' }}
          />
        </Badge>
        <FontAwesomeIcon
          icon={faCircleUser}
          size="lg"
          style={{ color: '#1677ff', fontSize: '35px', marginRight: '10px' }}
        />
      </Space>
    </Header>
  );
};

export default HeaderComponent;
