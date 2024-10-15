import React from 'react';
import { Layout } from 'antd';

const AnotherLayout = ({ children }) => {
  return <Layout style={{ minHeight: '100vh' }}>{children}</Layout>;
};

export default AnotherLayout;
