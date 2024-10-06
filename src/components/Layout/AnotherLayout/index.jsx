import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

const AnotherLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '50px', backgroundColor: '#f0f2f5' }}>
        {children} {/* Nội dung sẽ được truyền vào từ các route */}
      </Content>
    </Layout>
  );
};

export default AnotherLayout;
