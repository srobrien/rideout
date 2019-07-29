import React, { useContext, useState, useEffect } from 'react';
import Router from 'next/router';
import { AuthContext } from '../components/context/Auth';
import AdminPage from '../components/AdminPage';

const UserAdmin = () => {
  const user = useContext(AuthContext);
  const [componentLoaded, setComponentLoaded] = useState(false);
  useEffect(() => {
    setComponentLoaded(true);
    return function cleanUp() {
      setComponentLoaded(false);
    };
  });

  if (!user && componentLoaded) {
    Router.push('/');
  }
  return <AdminPage user={user} />;
};

export default UserAdmin;
