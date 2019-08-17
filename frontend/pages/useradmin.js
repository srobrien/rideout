import React, { useContext, useState, useEffect } from 'react';
import Router from 'next/router';
import { AuthContext } from '../components/context/Auth';
import UserDetails from '../components/UserDetails';

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
  return <UserDetails user={user} />;
};

export default UserAdmin;
