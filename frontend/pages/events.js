import React, { useContext, useState, useEffect } from 'react';
import Router from 'next/router';
import HomePage from '../components/HomePage';
import { AuthContext } from '../components/context/Auth';

const Home = () => {
  const user = useContext(AuthContext);

  const [componentLoaded, setComponentLoaded] = useState(false);
  useEffect(() => {
    setComponentLoaded(true);
    return function cleanup() {
      setComponentLoaded(false);
    };
  });

  if (componentLoaded && !user) {
    Router.push('/');
  }

  if (componentLoaded) {
    return <HomePage />;
  }
  return null;
};

export default Home;
