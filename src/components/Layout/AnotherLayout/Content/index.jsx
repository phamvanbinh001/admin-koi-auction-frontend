// components/Layout/AnotherLayout/index.jsx
import { Layout } from 'antd';

import HeaderComponent from '../../DefaultLayout/Header';
const { Content } = Layout;

const AnotherLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderComponent />
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>{children}</Content>
    </Layout>
  );
};

export default AnotherLayout;
