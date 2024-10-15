import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles';
import { publicRoutes, privateRoutes } from './routes';
<<<<<<< HEAD

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2dcbb75 (fixing loi khong co defaultlayout)
=======
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import DefaultLayout from './components/DefaultLayout';
import AnotherLayout from './components/AnotherLayout';
>>>>>>> eb748c7 (Rebuilt layout part 2)
function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <GlobalStyles>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <AnotherLayout>
                <Login />
              </AnotherLayout>
            }
          />
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
<<<<<<< HEAD
=======
return (
  <AuthProvider>
    <Router>
      <AppRoutes />
    </Router>
  </AuthProvider>
);
>>>>>>> d77dfd8 (Resolve conflicts and move login from dashboard branch to authen branch)
=======
>>>>>>> 2dcbb75 (fixing loi khong co defaultlayout)

export default App;
