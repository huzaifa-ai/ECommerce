import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import LoadingtoRedirect from './LoadingtoRedirect';
import { currentAdmin } from '../../functions/auth';

function AdminRoute(props) {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setok] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log(res);
          setok(true);
        })
        .catch((err) => {
          console.log(err);
          setok(false);
        });
    }
  }, [user]);

  return ok ? (
    props.children
  ) : (
    <h1>
      {' '}
      <LoadingtoRedirect />{' '}
    </h1>
  );
}

export default AdminRoute;
