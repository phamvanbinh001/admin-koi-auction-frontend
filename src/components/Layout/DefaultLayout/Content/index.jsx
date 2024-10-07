import React from 'react';
import { Breadcrumb, Layout } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Content } = Layout;

const ContentComponent = () => {
  return (
    <Layout
      style={{
        padding: '0 24px 24px',
        marginLeft: '200px', // Adjust this based on your sidebar width
        minHeight: '100vh', // Ensure the content takes the full viewport height
        overflow: 'auto', // Allow scrolling if content is too large
      }}
    >
      <Content
        style={{
          padding: 24,
          margin: '0',
          minHeight: 280,
          background: '#f0f2f5',
          borderRadius: '8px',
        }}
      >
        <Breadcrumb
          items={[
            {
              title: <Link to="./">Home</Link>,
            },
            {
              title: 'List',
            },
            {
              title: 'App',
            },
          ]}
          style={{
            margin: '50px 50px 10px 0px',
          }}
        />
        <div
          style={{
            padding: '24px',
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default ContentComponent;
