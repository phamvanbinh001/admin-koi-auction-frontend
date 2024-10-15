// src/components/Header/index.jsx

import React, { useState } from 'react';
import Logo from '../Logo'; // Giả định bạn có một component Logo
import { Layout, Switch, Dropdown, Menu, Badge } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUserCircle, faGlobe } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';

const { Header } = Layout;

const HeaderComponent = React.memo(() => {
  console.log('render HeaderComponent');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationCount, setNotificationCount] = useState(5); // Số lượng thông báo giả định

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
            <FontAwesomeIcon icon={faGlobe} className={styles['language-icon']} />
          </Dropdown>
          <Badge count={notificationCount} overflowCount={99}>
            <FontAwesomeIcon icon={faBell} className={styles['notification-icon']} />
          </Badge>
          <FontAwesomeIcon icon={faUserCircle} className={styles['user-icon']} />
        </div>
      </div>
    </Header>
  );
});

export default HeaderComponent;
