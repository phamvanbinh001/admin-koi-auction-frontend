import React, { useState } from 'react';
import Logo from '../Logo';
import { Layout, Switch, Dropdown, Menu, Badge, Button } from 'antd';
import { BellFilled, GlobalOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import useUserStore from '../../configs/useUserStore';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const HeaderComponent = React.memo(() => {
  console.log('render HeaderComponent');
  const [isDarkMode, setIsDarkMode] = useState(false);
  // const [notificationCount, setNotificationCount] = useState(5);
  const { user } = useUserStore();
  const navigate = useNavigate();

  const fullName = user.fullname;

  const handleThemeChange = (checked) => {
    setIsDarkMode(checked);
  };

  const languageMenu = (
    <Menu
      items={[
        {
          key: 'en',
          label: 'English',
        },
        {
          key: 'vn',
          label: 'Tiếng Việt',
        },
      ]}
    />
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
          <Dropdown overlay={languageMenu} trigger={['click']}>
            <span className={styles.language}>
              <GlobalOutlined />
            </span>
          </Dropdown>

          <div className={styles.noti}>
            <Badge count={100} overflowCount={99} className={styles.badge} />
            <BellFilled />
          </div>
          <Button
            className={styles.user}
            onClick={() => {
              navigate('/Profile');
            }}
          >
            {fullName}
          </Button>
        </div>
      </div>
    </Header>
  );
});

export default HeaderComponent;
