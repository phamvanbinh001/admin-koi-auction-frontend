import React, { useState } from 'react';
import Logo from '../Logo';
import { Layout, Switch, Dropdown, Menu, Badge, Avatar } from 'antd';
import { BellFilled, GlobalOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const HeaderComponent = React.memo(() => {
  console.log('render HeaderComponent');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationCount, setNotificationCount] = useState(5);

  const handleThemeChange = (checked) => {
    setIsDarkMode(checked);
  };

  const languageMenu = (
    <Menu>
      <Menu.Item key="en">English</Menu.Item>
      <Menu.Item key="vn">Tiếng Việt</Menu.Item>
    </Menu>
  );

  return (
    <Header className={`${styles.header} ${isDarkMode ? styles.dark : styles.light}`}>
      <div className={styles['header-container']}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles['header-controls']}>
          <Switch
            checked={isDarkMode}
            onChange={handleThemeChange}
            checkedChildren="Dark"
            unCheckedChildren="Light"
            className={styles['dark-light-switch']}
          />
          <Dropdown menu={languageMenu} trigger={['click']}>
            <GlobalOutlined className={styles.language} />
          </Dropdown>
          {/* <Badge count={notificationCount} overflowCount={99} className={styles.badge}> */}
          <Badge count={100} overflowCount={99} className={styles.badge}>
            <BellFilled className={styles.noti} />
          </Badge>
          <Link to="/profile">
            <Avatar shape="square" size="large" />
          </Link>
        </div>
      </div>
    </Header>
  );
});

export default HeaderComponent;
