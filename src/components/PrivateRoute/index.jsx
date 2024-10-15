import React from 'react';
import useUserStore from '../../configs/useUserStore';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, requireRole }) => {
  const { user } = useUserStore();

  //   if (!user.isAuthenticated) {
  //     return <Navigate to="/login" />;
  //   }

  //   if (requireRole && user.role !== requireRole) {
  //     return <Navigate to="/401" />;
  //   }

  return children;
};

export default PrivateRoute;
