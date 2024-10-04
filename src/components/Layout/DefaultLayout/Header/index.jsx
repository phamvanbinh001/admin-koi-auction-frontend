// components/Header/index.jsx
import { Layout, Avatar, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const items = [
  {
    key: '1',
    label: <Link to="/">Home</Link>,
  },
  {
    key: '2',
    label: <Link to="/about">About</Link>,
  },
];

const HeaderComponent = () => {
  return (
    <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%', height: 64 }}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        items={items} // Sử dụng items thay vì children
        style={{ float: 'right', lineHeight: '64px' }}
      />
      <Avatar icon={<UserOutlined />} style={{ float: 'right', marginLeft: '16px', lineHeight: '64px' }} />
    </Header>
  );
};

export default HeaderComponent;
