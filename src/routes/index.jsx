<<<<<<< HEAD
=======
import React from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import DefaultLayout from '../components/Layout/DefaultLayout';
import AnotherLayout from '../components/Layout/AnotherLayout';

>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import User from '../pages/User';
import Setting from '../pages/Setting';
<<<<<<< HEAD
import Auction from '../pages/Auction';
=======
import Chart from '../pages/Chart';
import Auction from '../pages/Auction';
import Order from '../pages/Order';
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
import Chat from '../pages/Chat';
import Email from '../pages/Email';
import Profile from '../pages/Profile';
import RequestPage from '../pages/Request';
import Blog from '../pages/Blog';
<<<<<<< HEAD
import Transaction from '../pages/Transaction';
import Page401 from '../pages/401';
import Page404 from '../pages/404';
import ForgotPassword from '../pages/ForgotPassword';

const publicRoutes = [
  { path: '/login', component: Login },
  { path: '/forgotPassword', component: ForgotPassword },
  { path: '/401', component: Page401 },
  { path: '*', component: Page404 },
];

const privateRoutes = [
  { path: '/', component: Dashboard },
  { path: '/profile', component: Profile },
  { path: '/management/request', component: RequestPage },
  { path: '/services/chat', component: Chat },
  { path: '/services/email', component: Email },
  { path: '/services/blog', component: Blog },
];

const protectedRoutes = [
  { path: '/management/user', component: User },
  { path: '/management/auction', component: Auction },
  { path: '/management/transaction', component: Transaction },
  { path: '/setting', component: Setting },
];

export { publicRoutes, privateRoutes, protectedRoutes };
=======
import Requirement from '../pages/Auction';
import Rule from '../pages/Rule';
import { AuthProvider, useAuth } from '../auth/AuthProvider'; // Import AuthProvider

// PrivateRoute để kiểm tra xác thực
const PrivateRoute = ({ element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Hiển thị trong quá trình kiểm tra token
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Unrequired-auth put here*/}
      <Route path="/login" element={<Login />} />

      {/* Require-auth put here*/}
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/chart" element={<PrivateRoute element={<Chart />} />} />
        <Route path="/user" element={<PrivateRoute element={<User />} />} />
        <Route path="/setting" element={<PrivateRoute element={<Setting />} />} />
        <Route path="/auction" element={<PrivateRoute element={<Auction />} />} />
        <Route path="/order" element={<PrivateRoute element={<Order />} />} />
        <Route path="/chat" element={<PrivateRoute element={<Chat />} />} />
        <Route path="/email" element={<PrivateRoute element={<Email />} />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/request" element={<PrivateRoute element={<RequestPage />} />} />
        <Route path="/blog" element={<PrivateRoute element={<Blog />} />} />
        <Route path="/rule" element={<PrivateRoute element={<Rule />} />} />
        <Route path="/requirement" element={<PrivateRoute element={<Requirement />} />} />
      </Route>
      {/* Route cho layout khác */}
      <Route
        path="/another"
        element={
          <PrivateRoute
            element={
              <AnotherLayout>
                <div>Another Page Content</div>
              </AnotherLayout>
            }
          />
        }
      />

      <Route path="*" element={<PrivateRoute element={<Navigate to="/" />} />} />
    </Routes>
  );
};

export default AppRoutes;
>>>>>>> d9fc573 (Get Auction Feature before using tooltip)
