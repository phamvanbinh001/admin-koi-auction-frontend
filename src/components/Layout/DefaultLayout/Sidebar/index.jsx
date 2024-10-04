// components/Sidebar/index.jsx
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const items = [
  {
    key: '1',
    icon: <LaptopOutlined />,
    label: <Link to="/">Dashboard</Link>,
  },
  {
    key: 'sub1',
    icon: <UserOutlined />,
    label: 'User Management',
    children: [
      {
        key: '2',
        label: <Link to="/profile">Profile</Link>,
      },
      {
        key: '3',
        label: <Link to="/settings">Settings</Link>,
      },
    ],
  },
  {
    key: 'sub2',
    icon: <NotificationOutlined />,
    label: 'Notifications',
    children: [
      {
        key: '4',
        label: <Link to="/chat">Chat</Link>,
      },
      {
        key: '5',
        label: <Link to="/email">Email</Link>,
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      style={{ height: '100%', width: 200, position: 'fixed', left: 0, top: 64, borderRight: 0 }}
      items={items} // Sử dụng items thay vì children
    />
  );
};

export default Sidebar;
