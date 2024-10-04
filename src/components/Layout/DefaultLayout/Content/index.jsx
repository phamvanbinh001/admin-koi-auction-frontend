import React from 'react';
import { Breadcrumb, Layout } from 'antd';

const { Content } = Layout;

const ContentComponent = () => {
  return (
    <Content
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
        background: '#f0f2f5', // Màu nền tương tự như trong HeaderComponent
        borderRadius: '8px', // Tùy chỉnh border radius nếu cần
      }}
    >
      <Breadcrumb
        items={[
          {
            title: 'Home',
          },
          {
            title: 'List',
          },
          {
            title: 'App',
          },
        ]}
        style={{
          margin: '16px 0',
        }}
      />
      Content
    </Content>
  );
};

export default ContentComponent;
