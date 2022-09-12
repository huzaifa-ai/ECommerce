import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function UserRoute(props) {
  const { user } = useSelector((state) => ({ ...state }));
  return user && user ? props.children : <Navigate to="/login" />;
}

export default UserRoute;
