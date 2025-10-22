import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';

const PublicRoute = ({ children }) => {
  const isAuthenticated = AuthService.isAuthenticated();
  
  return !isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PublicRoute;