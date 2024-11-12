import React, { useMemo, useState } from 'react';
import { Layout, Menu, Button, ConfigProvider } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faFolderOpen,
  faCogs,
  faSignOutAlt,
  faEnvelope,
  faUsers,
  faBlog,
  faListCheck,
  faWallet,
  faFileContract,
  faHandshakeSimple,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import useUserStore from '../../configs/useUserStore';

const { Sider } = Layout;

const SidebarComponent = React.memo(() => {
  console.log('render SidebarComponent');
  const { logout } = useUserStore();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useUserStore();
  //Tránh việc reRender kể cả khi props không thay đổi
  const role = useMemo(() => user.role, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const items = useMemo(
    () => [
      {
        key: '1',
        icon: <FontAwesomeIcon icon={faHouse} />,
        label: <Link to="/">Dashboard</Link>,
        className: styles.menuItem,
      },
      {
        key: 'sub1',
        icon: <FontAwesomeIcon icon={faListCheck} />,
        label: 'Management',
        className: styles.subMenuItem,
        children: [
          {
            key: '2',
            label: <Link to="/request">Requests</Link>,
            icon: <FontAwesomeIcon icon={faListCheck} />,
            className: styles.menuItem,
          },
          {
            key: '3',
            label: <Link to="/auction">Auctions</Link>,
            icon: <FontAwesomeIcon icon={faFileContract} />,
            className: styles.menuItem,
          },
          role === 'Admin' && {
            key: '4',
            label: <Link to="/transaction">Transactions</Link>,
            icon: <FontAwesomeIcon icon={faWallet} />,
            className: styles.menuItem,
          },
          role === 'Admin' && {
            key: '5',
            label: <Link to="/user">Users</Link>,
            icon: <FontAwesomeIcon icon={faUsers} />,
            className: styles.menuItem,
          },
          {
            key: '1000',
            label: <Link to="/category">Category</Link>,
            icon: <FontAwesomeIcon icon={faFolderOpen} />,
            className: styles.menuItem,
          },
        ].filter(Boolean),
      },
      {
        key: 'sub2',
        icon: <FontAwesomeIcon icon={faHandshakeSimple} />,
        label: 'Services',
        className: styles.subMenuItem,
        children: [
          {
            key: '6',
            label: <Link to="/chat">Chat</Link>,
            icon: <FontAwesomeIcon icon={faCommentDots} />,
            className: styles.menuItem,
          },
          {
            key: '7',
            label: <Link to="/email">Email</Link>,
            icon: <FontAwesomeIcon icon={faEnvelope} />,
            className: styles.menuItem,
          },
          {
            key: '8',
            label: <Link to="/blog">Blogs</Link>,
            icon: <FontAwesomeIcon icon={faBlog} />,
            className: styles.menuItem,
          },
        ],
      },
      {
        key: '9',
        icon: <FontAwesomeIcon icon={faCogs} />,
        label: 'Setting',
        className: styles.menuItem,
      },
      {
        key: '10',
        icon: <FontAwesomeIcon icon={faSignOutAlt} />,
        label: 'Logout',
        onClick: handleLogout,
        className: styles.menuItem,
      },
    ],
    [role],
  );

  return (
    <Sider collapsible collapsed={collapsed} trigger={null} width={200} className={styles.sider}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        className={styles.collapseButton}
      />
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemBg: '#F5F5F5',
              itemColor: 'var(--primary-color)',
              subMenuItemBg: '#F5F5F5',
            },
          },
        }}
      >
        <Menu mode="inline" className={styles.menu} items={items} />
      </ConfigProvider>
    </Sider>
  );
});

export default SidebarComponent;
