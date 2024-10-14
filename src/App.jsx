import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeaderComponent from './components/Header';
import SidebarComponent from './components/Sidebar';
import GlobalStyles from './components/GlobalStyles';
import { Layout } from 'antd';
import ContentComponent from './components/Content';
import BreadcrumbComponent from './components/Breadcrumb';
import { publicRoutes, privateRoutes } from './routes';

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <GlobalStyles>
      <BrowserRouter>
        <Layout style={{ minHeight: '100vh' }}>
          <HeaderComponent />
          <Layout>
            <SidebarComponent collapsed={collapsed} setCollapsed={setCollapsed} />
            <Layout style={{ padding: '16px' }}>
              <BreadcrumbComponent />
              <ContentComponent>
                <Routes>
                  {publicRoutes.map((route) => {
                    const Page = route.component;
                    return <Route key={route.path} path={route.path} element={<Page />} />;
                  })}
                  {privateRoutes.map((route) => {
                    const Page = route.component;
                    return (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={
                          // <PrivateRoutes>
                          <Page />
                          // </PrivateRoutes>
                        }
                      />
                    );
                  })}
                </Routes>
              </ContentComponent>
            </Layout>
          </Layout>
        </Layout>
      </BrowserRouter>
    </GlobalStyles>
  );
}

export default App;
