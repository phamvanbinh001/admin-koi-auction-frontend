import React from 'react';
import HeaderComponent from './Header';
import Sidebar from './Sidebar';
import { Layout } from 'antd';

const { Content } = Layout;

const DefaultLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <HeaderComponent />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
