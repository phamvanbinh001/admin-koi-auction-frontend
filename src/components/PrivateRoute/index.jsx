import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from '../../configs/useUserStore';

const PrivateRoute = ({ children }) => {
  const { user } = useUserStore();
  const isAuthenticated = user.isAuthenticated;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
