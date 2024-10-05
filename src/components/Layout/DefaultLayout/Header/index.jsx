// components/Header/index.jsx
import { Layout, Avatar, Input, Space, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icon

const { Header } = Layout;
const { Search } = Input;

const HeaderComponent = () => {
  return (
    <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%', height: 64 }}>
      <div className="logo">
        <img
          src="../../../../../public/images/logos.png"
          alt="Koi-logo"
          style={{ height: '20%', float: 'left', padding: '0 20px' }}
        />
      </div>

      <Space direction="vertical" style={{ float: 'left', marginLeft: '20px' }}>
        <Search placeholder="input search text" enterButton />
      </Space>

      {/* Badge for email notifications using FontAwesome icon */}
      <Badge count={5} style={{ float: 'right', marginLeft: '16px', lineHeight: '64px' }}>
        <FontAwesomeIcon icon={faEnvelope} size="lg" style={{ color: '#1677ff' }} />
      </Badge>

      {/* Avatar for user profile */}
      <Avatar icon={<UserOutlined />} style={{ float: 'right', marginLeft: '16px', lineHeight: '64px' }} />
    </Header>
  );
};

export default HeaderComponent;
