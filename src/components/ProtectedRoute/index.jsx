import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from '../../configs/useUserStore';

const ProtectedRoute = ({ children }) => {
  const { user } = useUserStore();
  const isAuthenticated = user.isAuthenticated;
  const role = user.role;

  console.log('render ProtectedRoute');

  if (!isAuthenticated || role !== 'Admin') {
    return <Navigate to="/401" />;
  }
  return children;
};

export default React.memo(ProtectedRoute);
