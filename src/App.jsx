import './polyfills';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles';
<<<<<<< HEAD
import { publicRoutes, privateRoutes } from './routes';
<<<<<<< HEAD

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2dcbb75 (fixing loi khong co defaultlayout)
=======
import PrivateRoute from './components/PrivateRoute';
import DefaultLayout from './components/DefaultLayout';
<<<<<<< HEAD
import AnotherLayout from './components/AnotherLayout';
>>>>>>> eb748c7 (Rebuilt layout part 2)
=======
>>>>>>> d573450 (CSS for dashboard)
=======
import { publicRoutes, privateRoutes, protectedRoutes } from './routes';
import PrivateRoute from './components/PrivateRoute';
import DefaultLayout from './components/DefaultLayout';
import ProtectedRoute from './components/ProtectedRoute';

>>>>>>> 4d7a428 (improve performance, CSS pages, create protect route)
function App() {
  return (
    <GlobalStyles>
      <BrowserRouter>
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
                  <PrivateRoute>
                    <DefaultLayout>
                      <Page />
                    </DefaultLayout>
                  </PrivateRoute>
                }
              />
            );
          })}

          {protectedRoutes.map((route) => {
            const Page = route.component;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRoute>
                    <DefaultLayout>
                      <Page />
                    </DefaultLayout>
                  </ProtectedRoute>
                }
              />
            );
          })}
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
