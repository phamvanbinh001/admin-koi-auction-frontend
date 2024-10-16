import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles';
import { publicRoutes, privateRoutes } from './routes';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import DefaultLayout from './components/DefaultLayout';
import AnotherLayout from './components/AnotherLayout';
function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <GlobalStyles>
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route) => {
            const Page = route.component;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <AnotherLayout>
                    <Page />
                  </AnotherLayout>
                }
              />
            );
          })}

          {/* Cần layout */}
          <Route element={<DefaultLayout collapsed={collapsed} setCollapsed={setCollapsed} />}>
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
                    <PrivateRoute>
                      <Page />
                    </PrivateRoute>
                  }
                />
              );
            })}
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalStyles>
  );
}

export default App;
