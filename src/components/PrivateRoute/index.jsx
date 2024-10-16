import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from '../../configs/useUserStore';

const PrivateRoute = ({ children }) => {
  const { user } = useUserStore();
  const isAuthenticated = user.isAuthenticated;
  const userRole = user.role;

  if (!isAuthenticated || (userRole !== 'Admin' && userRole !== 'Staff')) {
    return <Navigate to="/login" />;
  }
  console.log('render PrivateRoute');

  return children;
};

export default React.memo(PrivateRoute);
