import './polyfills';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles';
import { publicRoutes, privateRoutes } from './routes';
import PrivateRoute from './components/PrivateRoute';
import DefaultLayout from './components/DefaultLayout';
function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <GlobalStyles>
      <BrowserRouter>
        <Routes>
          {/* Không cần layout */}
          {publicRoutes.map((route) => {
            const Page = route.component;
            return <Route key={route.path} path={route.path} element={<Page />} />;
          })}

          {/* Cần layout */}
          {privateRoutes.map((route) => {
            const Page = route.component;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <PrivateRoute>
                    <DefaultLayout collapsed={collapsed} setCollapsed={setCollapsed}>
                      <Page />
                    </DefaultLayout>
                  </PrivateRoute>
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </GlobalStyles>
  );
}

export default App;
