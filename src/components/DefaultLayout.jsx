import React from 'react';
import { Layout } from 'antd';
import HeaderComponent from './Header';
import SidebarComponent from './Sidebar';
import BreadcrumbComponent from './Breadcrumb';
import ContentComponent from './Content';
import styles from './index.module.scss';
import { themeStore } from '../zustand';

const DefaultLayout = ({ children }) => {
  console.log('render DefaultLayout');

  const isDarkMode = themeStore((state) => state.isDarkMode);

  return (
    <Layout style={{ minHeight: '100vh' }} className={isDarkMode ? styles.dark : styles.light}>
      <HeaderComponent />
      <Layout>
        <SidebarComponent />
        <Layout style={{ padding: '16px' }}>
          <BreadcrumbComponent />
          <ContentComponent>{children}</ContentComponent>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default React.memo(DefaultLayout);
