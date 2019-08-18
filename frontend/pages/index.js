import React, { useContext, useState, useEffect } from 'react';
import Router from 'next/router';
import LoginForm from '../components/LoginForm';
import { LoggedOutContainer } from '../components/styled/StyledAuthentication';
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

  if (!user) {
    return (
      <LoggedOutContainer>
        <LoginForm />
      </LoggedOutContainer>
    );
  }

  if (componentLoaded) {
    Router.push('/events');
  }
  return null;
};

export default Home;
