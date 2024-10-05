import React from 'react';
import { Breadcrumb, Layout } from 'antd';
import { Link, Route, Routes } from 'react-router-dom';
import { publicRoutes } from '../../../../routes';

const { Content } = Layout;

const ContentComponent = () => {
  return (
    <Content
      style={{
        padding: 24,
        margin: '0',
        minHeight: 280,
        background: '#f0f2f5', // Màu nền tương tự như trong HeaderComponent
        borderRadius: '8px', // Tùy chỉnh border radius nếu cần
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
          padding: '24px', // Khoảng cách bên trong của div
          background: '#fff', // Nền trắng cho div
          borderRadius: '8px', // Bo tròn các góc
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Đổ bóng nhẹ cho div
        }}
      >
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Routes>
      </div>
    </Content>
  );
};

export default ContentComponent;
