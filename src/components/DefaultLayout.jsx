import React from 'react';
import { Layout } from 'antd';
import HeaderComponent from './Header';
import SidebarComponent from './Sidebar';
import BreadcrumbComponent from './Breadcrumb';
import ContentComponent from './Content';

const DefaultLayout = ({ children, collapsed, setCollapsed }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderComponent />
      <Layout>
        <SidebarComponent collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout style={{ padding: '16px' }}>
          <BreadcrumbComponent />
          <ContentComponent>{children}</ContentComponent>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
