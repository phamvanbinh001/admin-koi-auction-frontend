import React from 'react';
import HeaderComponent from './Header';
import Sidebar from './Sidebar';
import ContentComponent from './Content';
import { Layout } from 'antd';

const DefaultLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <HeaderComponent />
        <Layout style={{ marginLeft: 200 }}>
          {' '}
          Chỉ thêm margin cho content
          <ContentComponent />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
