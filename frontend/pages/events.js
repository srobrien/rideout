import React, { useContext, useState, useEffect } from 'react';
import Router from 'next/router';
import HomePage from '../components/HomePage';
import { AuthContext } from '../components/context/Auth';

// events page route '/events'
const Home = () => {
  // checks if user is logged in and component is not on the server.
  const user = useContext(AuthContext);
  const [componentLoaded, setComponentLoaded] = useState(false);
  useEffect(() => {
    setComponentLoaded(true);
    return function cleanup() {
      setComponentLoaded(false);
    };
  });

  // if not user and component on server push client to login page.
  if (componentLoaded && !user) {
    Router.push('/');
  }

  // else return HomePage component.
  if (componentLoaded) {
    return <HomePage />;
  }
  return null;
};

export default Home;
